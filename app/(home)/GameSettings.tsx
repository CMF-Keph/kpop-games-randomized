import { useState } from "react";
import { Game, Lobby, Setting, SettingValue } from "../games";
import { usePopup } from "../hook/usePopup";
import { useRouter } from "next/navigation";

interface GameSettingsProps {
	game: Game;
}

const GameSettings: React.FC<GameSettingsProps> = ({ game }) => {
	const { hide } = usePopup();
	const [settings, setSettings] = useState<Record<string, Setting>>(game.settings || {});
	const router = useRouter();

	const updateSettingValue = (settingKey: string, optionKey: string, updatedValue: SettingValue) => {
		setSettings(prev => ({
			...prev,
			[settingKey]: {
				...prev[settingKey],
				values: {
					...prev[settingKey].values,
					[optionKey]: updatedValue
				}
			}
		}));
	}

	const generateCheckboxSection = (setting: Setting, settingKey: string): React.ReactNode => {
		var checkBoxes = Object.entries(setting.values).map(([key, settingValue]) => {
			return (
				<button
					key={key}
					onClick={() => updateSettingValue(settingKey, key, { ...settingValue, checked: !settingValue.checked })}
					className={`cursor-pointer p-2 w-full transition-colors rounded-lg ${settingValue.checked ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
				>
					{settingValue.value}
				</button>
			)
		});

		return <div className="flex flex-col md:flex-row gap-2 w-full justify-between">{checkBoxes}</div>
	}

	const generateInputSection = (setting: Setting, settingsKey: string): React.ReactNode => {
		var defaultValue = setting.values['input-value']?.value;
		var minValue = setting.values['min-value']?.value;
		var maxValue = setting.values['max-value']?.value;

		return (
			<input
				type="number"
				value={defaultValue}
				max={maxValue}
				min={minValue}
				onChange={(e) => updateSettingValue(settingsKey, 'input-value', { value: e.currentTarget.value })}
				className="outline-none border border-pink-900 text-gray-900 text-lg rounded-lg px-3 py-2 w-full"
			/>
		)
	}

	const settingToHtml = (setting: Setting, key: string) => {
		switch (setting.type) {
			case 'input':
				return generateInputSection(setting, key);
			case 'checkbox':
				return generateCheckboxSection(setting, key);
			default:
				return '';
		}
	}

	const mapToLobby = (): Lobby => {
		let lobbySettings: Record<string, any> = {};

		Object.entries(settings).map(([key, setting]) => {
			switch (setting.type) {
				case 'input':
					lobbySettings = {...lobbySettings, [key]: setting.values['input-value'].value };
					break;
				case 'checkbox':
					const selectedValues: string[] = [];
					Object.entries(setting.values).map(([key, option]) => {
						if (option.checked)
							selectedValues.push(key);
					});
					lobbySettings = {...lobbySettings, [key]: selectedValues };
					break;
				default:
					console.info(key, setting, 'type not matched');
					lobbySettings = {...lobbySettings};
					break;
			}			
		})				

		return {
			id: 'test-uuid',
			type: game.id,
			settings: lobbySettings
		} as Lobby;
	}

	const handleStartClick = () => {
		const lobbySettings = mapToLobby();
		sessionStorage.setItem('settings', JSON.stringify(lobbySettings));
		router.push('/games/guess-song');
		hide();
	}

	return (
		<div className="flex flex-col gap-6 h-full justify-between">
			<div className="flex flex-col gap-6">
				{Object.entries(settings).map(([key, setting]) => (
				<div key={key} className="flex flex-col">
					<label className="font-medium mb-2 text-lg text-pink-900">{setting.label}</label>
					{settingToHtml(setting, key)}
				</div>
			))}
			</div>			
			<button onClick={handleStartClick} className="bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-md p-2 rounded-lg transition-colors hover:to-pink-700 cursor-pointer">Start game!</button>
		</div>
	)
}

export default GameSettings;