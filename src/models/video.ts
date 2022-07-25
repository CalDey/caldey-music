export interface VideoUrl {
	id: string
	needPay: boolean
	payInfo: any
	r: number
	size: number
	url: string
	validityTime: number
}

// 获取mv详情
export interface VideoDetail {
	advertisement: boolean
	authType: number
	avatarUrl: string
	commentCount: number
	coverUrl: string
	creator: VideoDetailCreator
	description: string
	durationms: number
	hasRelatedGameAd: boolean
	height: number
	markTypes: any
	playTime: number
	praisedCount: number
	publishTime: number
	resolutions: VideoDetailResolutions
	shareCount: number
	subscribeCount: number
	threadId: string
	title: string
	vid: string
	videoGroup: any
	videoUserLiveInfo: any
	width: number
}

export interface VideoDetailCreator {
	accountStatus: number
	authStatus: number
	avatarDetail: VideoDetailAvatarDetail
	avatarUrl: string
	expertTags: any
	experts: any
	followed: boolean
	nickname: string
	userId: number
	userType: number
}

export interface VideoDetailAvatarDetail {
	identityIconUrl: string
	identityLevel: number
	userType: number
}

export interface VideoDetailResolutions {
	resolution: number
	size: number
}

// 获取video数据详情
export interface VideoDetailInfo {
    likedCount: number,
    shareCount: number,
    commentCount: number,
    liked: boolean,
}

// video精彩评论
export interface VideoHotComments {
	user: VideoHotCommentsUser,
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

export interface VideoHotCommentsUser {
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

// video评论
export interface VideoComments {
	user: VideoCommentsUser,
	beReplied: VideoCommentsBeReplied[],	// 回复
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

export interface VideoCommentsUser {
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

export interface VideoCommentsBeReplied {
	user: VideoCommentsBeRepliedUser,
	beRepliedCommentId: number,
	content: string,
	expressionUrl: any,
	richContent: any,
	status: number
}

export interface VideoCommentsBeRepliedUser {
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

// 相似视频
export interface RelatedVideo {
	alg: string
	aliaName: any
	coverUrl: string
	creator: RelatedVideoCreator[]
	durationms: number
	liveRoom: any
	markTypes: any
	playTime: number
	title: string
	transName: any
	type: number
	vid: string
}

export interface RelatedVideoCreator {
	userId: number
	userName: string
}