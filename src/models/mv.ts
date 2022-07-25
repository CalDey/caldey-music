// mv列表
export interface Mv {
	artistId: number
	artistName: string
	artists: MvArtists
	briefDesc: any
	cover: string
	desc: any
	duration: number
	id: number
	mark: number
	name: string
	playCount: number
	subed: boolean
}

export interface MvArtists {
	alias: any
	id: number
	name: string
	transNames: any
}

export interface MvUrl {
	id: number;
	url: string;
	r: number;
	size: number;
	md5: string;
	code: number;
	expi: number;
	fee: number;
	mvFee: number;
	st: number;
	promotionVo?: any;
	msg: string;
}

// mv详情
export interface MvDetail {
	id: number,
	name: string,
	artistId: number,
	artistName: string,
	briefDesc: string,
	desc: any,
	cover: string,
	coverId_str: string,
	coverId: number,
	playCount: number,
	subCount: number,
	shareCount: number,
	commentCount: number,
	duration: number,
	nType: number,
	publishTime: string,
	price: any,
	brs: MvDetailBrs,
	artists: MvDetailArtists
}

export interface MvDetailBrs {
	size: number,
    br: number,
    point: number
}

export interface MvDetailArtists {
	id: number,
	name: string,
	img1v1Url: any,
	followed: boolean
}

export interface MvDetailInfo {
    likedCount: number,
    shareCount: number,
    commentCount: number,
    liked: boolean,
}

// mv精彩评论
export interface MvHotComments {
	user: MvHotCommentsUser,
	beReplied: any,
	pendantData: any,
	showFloorComment: any,
	status: number,
	commentId: number,
	content: string,
	richContent: any,
	contentResource: any,
	time: number,
	timeStr: string,
	needDisplayTime: boolean,
	likedCount: number,
	expressionUrl: any,
	commentLocationType: number,
	parentCommentId: number,
	decoration: any,
	repliedMark: any,
	grade: any,
	liked: boolean
}

export interface MvHotCommentsUser {
	locationInfo: any,
	liveInfo: any,
	anonym: number,
	commonIdentity: any,
	userId: number,
	avatarUrl: string,
	avatarDetail: any,
	userType: number,
	followed: boolean,
	mutual: boolean,
	remarkName: any,
	vipRights: any,
	nickname: string,
	authStatus: number,
	expertTags: any,
	experts: any,
	vipType: number
}

// mv评论
export interface MvComments {
	user: MvCommentsUser,
	beReplied: MvCommentsBeReplied[],	// 回复
	commentId: number,
	commentLocationType: number,
	content: string,
	contentResource: any,
	decoration: any,
	expressionUrl: any,
	grade: any,
	liked: boolean,
	likedCount: number,
	needDisplayTime: boolean,
	parentCommentId: number,
	pendantData: any,
	repliedMark: any,
	richContent: any,
	showFloorComment: any,
	status: number,
	time: number,
	timeStr: string
}

export interface MvCommentsUser {
	anonym: number,
	authStatus: number,
	avatarDetail: any,
	avatarUrl: string,
	commonIdentity: any,
	expertTags: any,
	experts: any,
	followed: boolean,
	liveInfo: any,
	locationInfo: any,
	mutual: boolean,
	nickname: string,
	remarkName: any,
	userId: number,
	userType: number,
	vipRights: any,
	vipType: number
}

export interface MvCommentsBeReplied {
	user: MvCommentsBeRepliedUser,
	beRepliedCommentId: number,
	content: string,
	expressionUrl: any,
	richContent: any,
	status: number
}

export interface MvCommentsBeRepliedUser {
	anonym: number,
	authStatus: number,
	avatarDetail: any,
	avatarUrl: string,
	commonIdentity: any,
	expertTags: any,
	experts: any,
	followed: boolean,
	liveInfo: any,
	locationInfo: any,
	mutual: boolean,
	nickname: string,
	remarkName: any,
	userId: number,
	userType: number,
	vipRights: any,
	vipType: number
}

// 相似mv
export interface SimiMv {
	id: number,
	cover: string,
	name: string,
	playCount: number,
	briefDesc: string,
	desc: any,
	artistName: string,
	artistId: number,
	duration: number,
	mark: number,
	artists: SimiMvArtists,
	alg: string
}

export interface SimiMvArtists {
	id: number,
	name: string,
	alias: any,
	transNames: any
}