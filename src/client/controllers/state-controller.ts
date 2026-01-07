// State Controller - Syncs state with server

import { Players } from "@rbxts/services";
import { store } from "shared/store";
import { remotes } from "shared/network";
import type { PlayerData } from "shared/data/player-data";

export class StateController {
	private localPlayerId = tostring(Players.LocalPlayer.UserId);

	start() {
		remotes.player.syncData.connect((data: PlayerData) => {
			store.setPlayerData(this.localPlayerId, data);
		});

		remotes.player.requestData.fire();
		print("[StateController] Started");
	}

	public getStore() {
		return store;
	}
}
