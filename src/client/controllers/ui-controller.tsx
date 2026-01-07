// UI Controller - Mounts React UI

import { Players } from "@rbxts/services";
import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import ReactReflex from "@rbxts/react-reflex";
import { store } from "shared/store";
import { App } from "../ui/app";

const { ReflexProvider } = ReactReflex;

export class UIController {
	private root?: ReturnType<typeof createRoot>;

	start() {
		const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

		const screenGui = new Instance("ScreenGui");
		screenGui.Name = "GameUI";
		screenGui.ResetOnSpawn = false;
		screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling;
		screenGui.IgnoreGuiInset = true;
		screenGui.Parent = playerGui;

		this.root = createRoot(new Instance("Folder"));
		this.root.render(
			<ReflexProvider producer={store}>
				<App />
			</ReflexProvider>,
		);

		print("[UIController] Started");
	}
}
