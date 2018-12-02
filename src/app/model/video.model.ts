export interface Video {
    id: string;
    title: string;
    videoInfo: string;
    collectTime: Date;
    playInfo: string;
    image: string;
    platform: string;
    fromUrl: string;
    category: string;
    rawValue: string;
    parseValue: PlayAddress[];
    single: boolean;

    properties: { [key: string]: object };
}

export interface PlayAddress {
    quality: string;
    codecs: string;
    url: string;
    width: number;
    height: number;
    type: string;
    script:string;
}