export class ChatMessage {
    time: Date;
    text: string;
    side: string;
    linkName: string;
    url: string;
    suggestions: any[];
    textSufix: string;
    linkMenu: any[];

    constructor(time: Date, text: string, side: string, linkName?: string, url?: string, suggestions?: any[], textSufix?: string, linkMenu?: any[]) {
        this.text = text;
        this.time = time;
        this.side = side;
        this.linkName = linkName;
        this.url = url;
        this.suggestions = suggestions;
        this.textSufix = textSufix;
        this.linkMenu = linkMenu;
    }

}
