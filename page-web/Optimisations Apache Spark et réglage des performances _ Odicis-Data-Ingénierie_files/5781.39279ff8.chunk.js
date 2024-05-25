(self.webpackChunklite=self.webpackChunklite||[]).push([[5781],{60028:(e,n,i)=>{"use strict";i.d(n,{N:()=>d});var t=i(87329),a={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CatalogCovers_catalogEntity"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CatalogEntity"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CatalogCover_catalogEntity"}}]}}].concat((0,t.Z)([{kind:"FragmentDefinition",name:{kind:"Name",value:"CatalogCover_catalogEntity"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CatalogEntity"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"}},{kind:"InlineFragment",typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Post"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"previewImage"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"alt"}}]}}]}}]}}]))},l=i(68216),d={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CatalogPreview_catalog"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Catalog"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"postItemsCount"}},{kind:"Field",name:{kind:"Name",value:"predefined"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"username"}}]}},{kind:"Field",name:{kind:"Name",value:"viewerEdge"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"followersCount"}}]}},{kind:"Field",name:{kind:"Name",value:"itemsConnection"},arguments:[{kind:"Argument",name:{kind:"Name",value:"pagingOptions"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"limit"},value:{kind:"IntValue",value:"5"}}]}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"items"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"catalogItemId"}},{kind:"Field",name:{kind:"Name",value:"entity"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CatalogCovers_catalogEntity"}}]}}]}}]}},{kind:"FragmentSpread",name:{kind:"Name",value:"catalogUrl_catalog"}}]}}].concat((0,t.Z)(a.definitions),(0,t.Z)(l.Ui.definitions))}},44266:(e,n,i)=>{"use strict";i.d(n,{S:()=>x});var t=i(23450),a=i.n(t),l=i(67294),d=i(77355),o=i(14646),m=i(4381),r=i(94124),s=i(31889),c=i(46696),u=function(e){var n,i,t=e.entity,a=e.size,o=(0,s.F)(),u="".concat(a,"px");return i="Post"===(null==t?void 0:t.__typename)&&null!==(n=t.previewImage)&&void 0!==n&&n.id?l.createElement(m.UV,{miroId:t.previewImage.id,alt:t.previewImage.alt||"",width:a,height:a,strategy:c._S.Crop,loading:r.K.LAZY}):l.createElement(d.x,{height:u,width:u,background:o.colorTokens.background.neutral.quaternary.base},l.createElement(d.x,{borderRadius:"50%",width:"100%",height:"100%",background:o.colorTokens.foreground.neutral.secondary.base})),l.createElement(d.x,{borderRadius:"2px",height:u,overflow:"hidden"},i)},k=function(e,n){return function(i){var t=.75*n,a=1===e?"-".concat(.5*n,"px"):2===e?"-".concat(t,"px"):void 0;return{position:"relative",borderRadius:"2px",borderRight:e<2?"".concat(3,"px solid ").concat(i.colorTokens.background.neutral.tertiary.base):void 0,backgroundColor:i.colorTokens.background.neutral.tertiary.base,zIndex:3-e,marginLeft:a}}},v=function(e){var n=e.entities,i=e.size,t=(0,o.I)(),a=3*(i+3)-.5*i-.75*i;return l.createElement(d.x,{display:"flex",overflow:"hidden",width:"".concat(a,"px"),borderRadius:"0 3px 3px 0",position:"relative",flexShrink:"0"},n.slice(0,3).map((function(e,n){return l.createElement("div",{key:n,className:t(k(n,i))},l.createElement(u,{entity:e,size:i}))})))},p=i(1109),S=i(73279),N=i(93310),g=i(20113),f=i(92780),F=i(43487),E=i(92305),y=i(50458),b={display:"flex",marginBottom:"16px",alignItems:"flex-start"},x=function(e){var n=e.catalog,i=e.titleMargin,t=(0,o.I)(),m=(0,F.v9)((function(e){return e.config.authDomain})),r=(0,f.n)({name:"detail",scale:"S",color:"LIGHTER"}),s=(0,y.yk)(n,m),c=n.itemsConnection.items.map((function(e){return e.entity})),u=n.viewerEdge.followersCount;return l.createElement(N.r,{href:s,rules:b},l.createElement(v,{entities:c,size:48}),l.createElement(d.x,{marginLeft:"16px"},l.createElement(g.X6,{clamp:2,scale:"XS"},n.predefined?(0,E.S6)(n.predefined):n.name),l.createElement("div",{className:t([r,{display:"flex",marginTop:i}])},(0,p.SZ)(n),u?l.createElement(l.Fragment,null,l.createElement(S.O,{margin:"0 8px"}),u," ",a()("save",u)):null)))}},77324:(e,n,i)=>{"use strict";i.d(n,{q:()=>f});var t=i(67294),a=i(70405),l=i(51615),d=i(96156),o=i(77355),m=i(92780),r=i(14646),s=i(97489),c={fontSize:"20px",textTransform:"uppercase"},u=function(e){return(0,d.Z)({display:"block",fontSize:"192px",lineHeight:"200px"},s.sm(e),{fontSize:"150px"})},k=function(e){var n=e.errorCode,i=(0,r.I)(),a=(0,m.n)({name:"brand",scale:"XXXL",color:"DARKER"});return t.createElement(o.x,{display:"flex",flexDirection:"column"},t.createElement("div",{className:i(c)},"Error"),t.createElement("div",{className:i([a,u])},n))},v=i(96370),p=i(93310),S=i(6402),N=i(21638),g={fontSize:"24px"};function f(e){var n=e.code,i=e.title,d=e.children,m=e.lumenId,s=(0,r.I)();return(0,t.useEffect)((function(){S.k.debug({status:n},"[".concat(n,"]: ").concat(i))}),[]),t.createElement(l.AW,{render:function(e){var l=e.staticContext;return l&&(l.statusCode=n),t.createElement("div",null,t.createElement(a.ql,null,t.createElement("title",null,i)),t.createElement(o.x,{tag:"section",paddingTop:"60px",paddingBottom:"60px"},t.createElement(v.P,{size:"inset"},t.createElement(o.x,null,t.createElement(k,{errorCode:n}),t.createElement("div",{className:s((0,N.rJ)())},t.createElement(o.x,{marginBottom:"28px"},t.createElement("div",{className:s(g)},d)),m?t.createElement("div",{className:s(g)},"A report is available on"," ",t.createElement(p.r,{href:"https://lumendatabase.org/notices/".concat(m),display:"inline-block",inline:!0,target:"_blank",linkStyle:"OBVIOUS"},"Lumen"),"."):null)))))}})}},57563:(e,n,i)=>{"use strict";i.d(n,{y:()=>s});var t=i(67294),a=i(77324),l=i(77355),d=i(47230),o=i(90586),m=i(18627),r=i(43487),s=function(e){var n=e.suspension,i=(0,m.A)(),s=(0,r.v9)((function(e){return e.config.authDomain}));return t.createElement(a.q,{code:410,title:"410 ".concat(n," suspended — Medium")},t.createElement(l.x,{display:"flex",marginTop:"-30px"},t.createElement(o.QE,{scale:"S"},"This ",n," is under investigation or was found in violation of the Medium Rules."," ")),t.createElement(l.x,{display:"flex",marginTop:"80px"},t.createElement(o.QE,{color:"DARKER",scale:"M"},"There are thousands of stories to read on Medium. Visit our homepage ",t.createElement("br",null)," to find one that’s right for you.")),t.createElement(l.x,{display:"flex",marginTop:"15px"},t.createElement(d.zx,{buttonStyle:"SUBTLE",href:"https://".concat(s),onClick:function(){i.event("suspendedPage.backToHomeClicked",{})}},"Take me to Medium")))}},9970:(e,n,i)=>{"use strict";i.d(n,{g:()=>t});var t={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"PublisherName_publisher"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Publisher"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}}]}}]}},57831:(e,n,i)=>{"use strict";i.d(n,{h:()=>l});var t=i(87329),a=i(68216),l={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"PublisherFollowersCount_publisher"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Publisher"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"__typename"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"InlineFragment",typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Collection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"slug"}},{kind:"Field",name:{kind:"Name",value:"subscriberCount"}},{kind:"FragmentSpread",name:{kind:"Name",value:"collectionUrl_collection"}}]}},{kind:"InlineFragment",typeCondition:{kind:"NamedType",name:{kind:"Name",value:"User"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"socialStats"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"followerCount"}}]}},{kind:"Field",name:{kind:"Name",value:"username"}},{kind:"FragmentSpread",name:{kind:"Name",value:"userUrl_user"}}]}}]}}].concat((0,t.Z)(a.nf.definitions),(0,t.Z)(a.$m.definitions))}},84492:(e,n,i)=>{"use strict";i.d(n,{i:()=>d});var t=i(87329),a=i(78693),l=i(44210),d={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"FollowAndSubscribeButtons_user"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"User"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserFollowButton_user"}},{kind:"FragmentSpread",name:{kind:"Name",value:"UserSubscribeButton_user"}}]}}].concat((0,t.Z)(a.s.definitions),(0,t.Z)(l.w.definitions))}},44210:(e,n,i)=>{"use strict";i.d(n,{w:()=>l});var t=i(87329),a=i(31579),l={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserSubscribeButton_user"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"User"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"isPartnerProgramEnrolled"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"viewerEdge"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"isFollowing"}},{kind:"Field",name:{kind:"Name",value:"isUser"}}]}},{kind:"Field",name:{kind:"Name",value:"viewerIsUser"}},{kind:"Field",name:{kind:"Name",value:"newsletterV3"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"FragmentSpread",name:{kind:"Name",value:"useNewsletterV3Subscription_newsletterV3"}}]}},{kind:"FragmentSpread",name:{kind:"Name",value:"useNewsletterV3Subscription_user"}},{kind:"FragmentSpread",name:{kind:"Name",value:"MembershipUpsellModal_user"}}]}}].concat((0,t.Z)(a.DI.definitions),(0,t.Z)(a.nj.definitions),(0,t.Z)([{kind:"FragmentDefinition",name:{kind:"Name",value:"MembershipUpsellModal_user"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"User"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"imageId"}},{kind:"Field",name:{kind:"Name",value:"postSubscribeMembershipUpsellShownAt"}},{kind:"Field",name:{kind:"Name",value:"newsletterV3"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]))}}}]);
//# sourceMappingURL=https://stats.medium.build/lite/sourcemaps/5781.39279ff8.chunk.js.map