(self.webpackChunklite=self.webpackChunklite||[]).push([[6358],{98598:(e,n,i)=>{"use strict";i.d(n,{g:()=>l});var t=i(87329),a=i(84683),o=i(19308),l={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CollectionTooltip_collection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Collection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"subscriberCount"}},{kind:"FragmentSpread",name:{kind:"Name",value:"CollectionAvatar_collection"}},{kind:"FragmentSpread",name:{kind:"Name",value:"CollectionFollowButton_collection"}}]}}].concat((0,t.Z)(a.d.definitions),(0,t.Z)(o.I.definitions))}},4088:(e,n,i)=>{"use strict";i.d(n,{u:()=>o});var t=i(87329),a=i(68216),o={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"usePostUrl_post"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Post"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"userUrl_user"}}]}},{kind:"Field",name:{kind:"Name",value:"collection"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"domain"}},{kind:"Field",name:{kind:"Name",value:"slug"}}]}},{kind:"Field",name:{kind:"Name",value:"isSeries"}},{kind:"Field",name:{kind:"Name",value:"mediumUrl"}},{kind:"Field",name:{kind:"Name",value:"sequence"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"slug"}}]}},{kind:"Field",name:{kind:"Name",value:"uniqueSlug"}}]}}].concat((0,t.Z)(a.$m.definitions))}},25145:(e,n,i)=>{"use strict";i.d(n,{D:()=>r,L:()=>u});var t=i(67294),a=i(84739),o=i(60671),l=i(92661),d=i(43487),c=i(68427),r=function(){var e=(0,d.v9)((function(e){return e.config.authDomain})),n=(0,l.k6)(),i=n.type===o.Cr.USER,r=(0,l.uk)(),u=(0,c.B)(),s=(0,a.I)();return(0,t.useCallback)((function(n){var t,a=n.uniqueSlug||n.id;if(n.isSeries)return"https://".concat(e).concat(r("ShowSeries",{postId:a}));if(null!==(t=n.sequence)&&void 0!==t&&t.slug)return"https://".concat(e).concat(r("ShowSequencePost",{sequenceSlug:n.sequence.slug,postId:a}));if(n.collection&&!i){var o=u({id:n.collection.id,domain:n.collection.domain,slug:n.collection.slug});return"".concat(o,"/").concat(a)}if(n.creator){var l=s(n.creator);return"".concat(l,"/").concat(a)}return"https://".concat(e).concat(r("ShowPost",{postId:a}))}),[n,r,u,s])},u=function(e){return r()(e)}},68427:(e,n,i)=>{"use strict";i.d(n,{B:()=>d,R:()=>c});var t=i(8575),a=i(67294),o=i(43487),l=i(78870),d=function(){var e=(0,o.v9)((function(e){return e.navigation.currentLocation})),n=(0,o.v9)((function(e){return e.config.authDomain})),i=(0,l.rp)();return(0,a.useCallback)((function(a){var o=a.id,l=a.domain,d=function(e){var n=e.id,i=e.slug;return i?"/".concat(i):"/c/".concat(n)}({id:o,domain:l,slug:a.slug});if(i)return"https://".concat(n).concat(d);var c=(0,t.parse)(e).port;return l?"https://".concat(l).concat(c?":".concat(c):""):"https://".concat(n).concat(d)}),[i])},c=function(e){return d()(e)}},84683:(e,n,i)=>{"use strict";i.d(n,{d:()=>o});var t=i(87329),a=i(68216),o={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CollectionAvatar_collection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Collection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"avatar"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"FragmentSpread",name:{kind:"Name",value:"collectionUrl_collection"}}]}}].concat((0,t.Z)(a.nf.definitions))}},71652:(e,n,i)=>{"use strict";i.d(n,{v:()=>s});var t=i(67294),a=i(68427),o=i(14818),l=i(4381),d=i(27323),c=i(29746),r=i(46696),u=function(e){return function(n){return{borderRadius:(0,c.a)(n.borderRadius.regular),width:(0,c.a)(e),height:(0,c.a)(e)}}},s=function(e){var n=e.circular,i=e.collection,c=e.size,s=void 0===c?60:c,m=e.link,k=e.showHoverState,v=(0,a.R)(i);if(!i||!i.avatar||!i.avatar.id)return null;var S=i.avatar.id,p=i.name||"Publication avatar",N=n?t.createElement(o.z,{miroId:S,alt:p,diameter:s,freezeGifs:!1,showHoverState:k}):t.createElement(l.UV,{rules:[u(s)],miroId:S,alt:p,width:s,height:s,strategy:r._S.Crop});return m?t.createElement(d.P,{href:v},N):N}},19308:(e,n,i)=>{"use strict";i.d(n,{b:()=>l,I:()=>d});var t=i(87329),a=i(68216),o=i(98007),l={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CollectionFollowButton_post"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Post"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},d={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CollectionFollowButton_collection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Collection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"slug"}},{kind:"FragmentSpread",name:{kind:"Name",value:"collectionUrl_collection"}},{kind:"FragmentSpread",name:{kind:"Name",value:"SusiClickable_collection"}}]}}].concat((0,t.Z)(a.nf.definitions),(0,t.Z)(o.Os.definitions))}},89080:(e,n,i)=>{"use strict";i.d(n,{W:()=>l});var t=i(87329),a=i(68216),o=i(98598),l={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CollectionLinkWithPopover_collection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Collection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"collectionUrl_collection"}},{kind:"FragmentSpread",name:{kind:"Name",value:"CollectionTooltip_collection"}}]}}].concat((0,t.Z)(a.nf.definitions),(0,t.Z)(o.g.definitions))}},98007:(e,n,i)=>{"use strict";i.d(n,{Os:()=>o,qU:()=>l,Vm:()=>d,GB:()=>c});var t=i(87329),a=i(20121),o={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SusiClickable_collection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Collection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SusiContainer_collection"}}]}}].concat((0,t.Z)(a.Hr.definitions))},l={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SusiClickable_post"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Post"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"mediumUrl"}},{kind:"FragmentSpread",name:{kind:"Name",value:"SusiContainer_post"}}]}}].concat((0,t.Z)(a.qt.definitions))},d=([{kind:"FragmentDefinition",name:{kind:"Name",value:"SusiClickable_topic"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Topic"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SusiContainer_topic"}}]}}].concat((0,t.Z)(a.Uh.definitions)),{kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SusiClickable_user"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"User"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SusiContainer_user"}}]}}].concat((0,t.Z)(a.Zd.definitions))}),c={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SusiClickable_newsletterV3"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"NewsletterV3"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SusiContainer_newsletterV3"}}]}}].concat((0,t.Z)(a.gs.definitions))};[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"SusiClickableAccountTokenQuery"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SusiContainer_query"}}]}}].concat((0,t.Z)(a.Zz.definitions))},13663:(e,n,i)=>{"use strict";i.d(n,{o:()=>u});var t=i(67294),a=function(e){switch(e){case"PUBLIC":return 0;case"UNLISTED":return 1;case"LOCKED":return 2;default:return}},o=i(18627),l=i(66411),d=i(14646),c=i(18122),r={width:"100%",height:"100%"};function u(e){var n=e.post,i=e.presentationContext,u=e.suppressedEvents,s=e.children,m=e.isDisplayingFullPost,k=e.reportClientViewedOnFullPost,v=e.postClientViewedContext,S=e.pinned,p=e.shouldReportClientViewed,N=void 0===p||p,f=e.referrerSource,F=(0,d.I)(),C=(0,o.A)(),g=(0,l.pK)(),y=t.useCallback((function(){if(n&&"ALL"!==u){var e=n.visibility,t=n.previewContent,o=n.collection,l=null!==m?m:t&&t.isFullContent,d=f?{referrerSource:f}:void 0;"PRESENTED"!==u&&C.event("post.clientPresented",{postId:n.id,source:g,collectionId:o?o.id:null,isFullPost:l,pinned:S,postVisibility:a(e),context:"POST_PREVIEW"!==i?i.toLowerCase():null},d),k&&l&&"VIEWED"!==u&&N&&C.event("post.clientViewed",{postId:n.id,source:g,collectionId:o?o.id:null,collectionSlug:o?o.slug:null,context:v,isFriendLink:!1,pinned:S})}}),[n,u,i,S,f,g]),h=(0,c.g)({onPresentedFn:y});return t.createElement("div",{className:F(r),ref:h},s)}}}]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/6358.a78f5809.chunk.js.map