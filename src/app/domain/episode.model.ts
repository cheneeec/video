export interface Episode {
//id 不知道有没有用
    id: string;
    //标题 如：航海王 第201集
    title: string;
    //图片 如：http://pic3.qiyipic.com/image/20150803/a9/1b/v_109343453_m_601.jpg
    image: string;
    //播放地址 如：http://www.iqiyi.com/v_19rrok9n74.html
    playValue: string;
    //短的剧集描述
    shortDescription: string;
    //集数
    number: number;
    //剧集描述
    description: string;
    //播放时长
    timeLength: number;
    //vId
    vId: string;
}