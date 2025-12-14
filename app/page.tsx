import { ArrowRight } from "lucide-react";
import { GAMES } from "./games";

export const Home = () => {
  return (
    <div className="flex flex-col p-4 gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl text-center text-blue-600 font-medium">K-Pop <span className="text-5xl bg-linear-to-l from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">games Randomized!</span></h1>
        <p className="text-lg text-pink-600 text-center">Play your favorite K-Pop with your style and whenever you want!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          GAMES.map((game) => {
            const Icon = game.icon;
            return (
              <button
                className="bg-white rounded-2xl relative group p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left cursor-pointer"
              >
                <div
                  className={`absolute flex items-center justify-center top-6 right-6 w-16 h-16 rounded-full bg-linear-to-br ${game.color} opacity-20 group-hover:opacity-40 transition-opacity`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="max-w-9/12 flex flex-col justify-between h-full">
                  <h3 className="mb-2">{game.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{game.description}</p>                
                  <div className="flex items-center text-sm text-purple-600 group-hover:text-purple-700">
                    Start game
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })
        }

      </div>
    </div>
  );
}

export default Home;