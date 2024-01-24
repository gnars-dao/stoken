// ------------ Feed -------------------

export type GnarsBlogProps = {
tags: string[];
}

export interface HiveBlogProps {
tag?: string;
queryType?: any;
}


// ------------ Comments -------------------
export interface CommentProps {
author: string;
body: string;
created: string;
net_votes: number;
permlink: string;
url: string;
parentId: string; // Add this field to store the parent ID
id: string; // Add this field to store the unique identifier of the comment
replies: CommentProps[]; 
repliesFetched?: []; // for child comments
limit: number;
blockedUser: string;
parent_permlink: string;
payout: number;

}

export interface CommentsProps {
comments: CommentProps[];
commentPosted: boolean;
blockedUser: string;
permlink: string;
}

export interface CommentBoxProps {
user: any;
parentAuthor: string;
parentPermlink: string;
onCommentPosted: () => void;
}


// ------------ Post -------------------

export interface PostHeaderProps {
title: string;
author: string;
avatarUrl: string;
postUrl: string;
permlink: string;
onClose: () => void;
}

export interface PostModalProps {
isOpen: boolean;
onClose: () => void;
title: string;
content: string;
author: string;
user: any;
permlink: string;
weight: number;
comments: CommentProps[];
postUrl: string;
userVote: any;
json_metadata: any;
images: string[];
thumbnail: string;

}

export interface PostProps {
author: string;
permlink: string;
thumbnail: string;
title: string;
body: string;
user: string;
weight: number;
earnings: number;
postUrl: string;
}

export type Post = {
author: string;
permlink: string;
thumbnail: string;
title: string;
body: string;
user: string;
weight: number;
earnings: number;
postUrl: string;
url: string;
userVote: any;
json_metadata: any;
}

export interface PostFooterProps {
onClose: () => void;
user: any;  
author: string; 
permlink: string; 
weight?: number; 
userVote: any;
}

export interface EarningsModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: any; // Pass the selected post data here
  }

