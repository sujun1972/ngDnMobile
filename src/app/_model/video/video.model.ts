export class VL {
    //title: string;
    //poster: string;
    ID: string;
    vType: string;
    chn: string;
    type: string;
    year: string;
    added: string;
    updated: string;
    area: string;
    status: string;
    language: string;
    update_period: string;
    in_progress: boolean;
    view_counter: string;
    comment_counter: string;
    like_counter: string;
    dislike_counter: string;
    actors: string;
    summary: string;
    director: string;
    is_hot: boolean;    // 人气数量以红色或黄色表示
    ImgPath: string;
    Title: string;
    Hot: string;
    LastName: string; // 在获取列表时，代表剧集状态，比如""更新到第10集"或"全集"
    DD: any;
    DC: any;
    Starring: any;
}

export class VideoModel {
    VL: VL;
    Contxt: string;
    VipSeriesList: any;
    GuestSeriesList: any;
}
