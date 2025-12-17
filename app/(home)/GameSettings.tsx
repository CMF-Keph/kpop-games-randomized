import { useRef, useState } from "react";
import { Game, Setting, SettingValue } from "../games";

interface GameSettingsProps {
	game: Game;
}

const GameSettings: React.FC<GameSettingsProps> = ({ game }) => {
	const [settings, setSettings] = useState<Record<string, Setting>>(game.settings || {});

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
					className={`cursor-pointer p-2 w-full transition-colors rounded-lg ${settingValue.checked ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600'}`}
				>
					{settingValue.value}
				</button>
			)
		});

		return <div className="flex gap-2 w-full justify-between">{checkBoxes}</div>
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

	return (
		<div className="flex flex-col gap-6">
			{Object.entries(settings).map(([key, setting]) => (
				<div key={key} className="flex flex-col">
					<label className="font-medium mb-2 text-lg text-pink-900">{setting.label}</label>
					{settingToHtml(setting, key)}
				</div>
			))}
		</div>
	)
}

export default GameSettings;