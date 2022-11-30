export interface Channel {
	id?: string;
	channelName?: string;
	channelDescription?: string;
	channelImage?: string;
	parentBoard?: string;
	channelCreation?: number;
	channelMods?: string[];
	articles?: number;
}
