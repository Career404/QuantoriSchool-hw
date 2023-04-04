import{s as u,j as e,U as q,r as a,R as re,G as L,c as se}from"./styled-components.browser.esm-629e6ed5.js";const le=u.div`
	pointer-events: none;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: hidden;
`,ce=u.div`
	display: block;
	width: 100vw;
	height: 200vh;
	transform: rotate(25deg) translate(-80%, -20%);
	background: rgba(255, 255, 255, 0.18);
	filter: blur(25px);
`;function ue(){return e.jsx(le,{children:e.jsx(ce,{})})}const de="/QuantoriSchool-hw/assets/charger-790dda75.png",he="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABwgAAAcIB6Dx9VAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQfSURBVHic7ZtNiFVlGMd/f2uGoCgRwj5MJp0msVZhQQYxDm2qXbQQTBKLlKBFiwIza7QMa5ELW9nGVhbRomX05SySPshFUAmJJKY0toiIFmr4b/HeiTtn7tx77vl4zpH6w4F7z/ue5/k///u+73nejyvbNAVJbwLHbR9sjENTAki6FjgLnLF9eyMkgCVNOQY2A1cDE5I2NEWiSQG2dX1+qikSjXQBSeuBL7puXQBW2P4tmktTLWB75vsosKUBHvEtQNIy4AxwVaboBDDhYEJNtIAtLAweYByYiqXSjADbCpbVgtAuIGkK+LRPlYukwfBcEKXwFjDoFx4BtkYQmUNYC5C0HDhNCrIfTgLjUYNhZAvYyuDgAVYBD9TM5V9ECrB5iLph3eDKKEfAPuDWzucx5ic+PwOHur5/FkEImkuFJ4HPu27N2J4MJ0Kzk6FWoPUCSPpQkvtc5yWtK2q/9QIA1w0oHwWuKWr8chCgVvwvQNMEmsZ/XoBKEiFJS4F1wDLgmO0TVdiNQOkWIOlJ0iTnY+A94CdJhzuitB6lWoCkjcDbPYo2AkuBB8vY72APcD8pfX686/4pUvr8J/BVYeu2C12AgHOA+1wPL/LsZKbekRz+hn4mz1WmC6wGrh9Q594S9kNQRoDzOepcLGE/BIUFsH0a+G5AtU+K2o9C2bfAflJ/7IWvKTM4BaGUALYPAZtY2NQ/AqZs/13Gfga1LN6UzgNsHwaOZW5P2/6rrO05SLoJeCtzu5LxJXJJrBAkrSCtHo1nit6vwn6r5wKSVgIzLAx+X1WnSlorgKQxUvCrMkWv2d5RlZ9WCiBpNSn4sUzRXts7q/TVOgEk3UYKfmWm6FXbL1btr1UCSFpDCv7mTNErtnfV4bM1AkhaCxwBbswU7bb9Ul1+2/IavIUUfHZyNW17d52Oq2oB2XR4mH1ASCN9NviX6w4eqhMge6DhaUlvlLC3y/aeMoRyo4pFBWAtvRdHpnMubnRfO6vglJt7ZYbgzkVEeH4IAV6IDL5SAQaI8EwOAXZEB1+5AJ3g7gBmM8FdAp7oI8DRJoK3y60J9oTt70nn/boHRgEHJW1a5LELVfPIi1oSoY4IG5gvwhLgHUmP1OGzKGrLBG3/QBJhtuv2FcC7wEN1+R0WtabCHRGmmC/CCPBcnX6HQe1zgUVaQmsQMhmy/SNJhF8j/A2DsNngABGWSyp8zKUMQqfDto8DH/QoWgN8KWkikg9QfSI0IEl6jP6bqX8A90RyijwsPQL8TvqnWD8ctX1fACUgtgvcxeDgAdZLuqFuMnOIFiAvsvsAtSFSgFND1D1ZG4sMIgX4FsizWfqL7bN1k5lDZB4wC7yeo+qzdXOZh+DX4ChpU7PXK/ASadsrlFNT/xd4lHTi627SUZtvgAO2Z6K5/APQd2uR1kIJDgAAAABJRU5ErkJggg==",ge=u.div`
	pointer-events: none;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: hidden;
`,ve=q`
  from {
		bottom: -100px
	}
	to {
    bottom: -100vh;
    }
`,pe=u.div`
	pointer-events: initial;
	position: absolute;
	bottom: -100px;
	right: -250px;
	height: max(400px, 4vh);
	width: max(500px, 5vh);
	background: url(${de}) center no-repeat;
	background-size: contain;
	transition: bottom 1s;
	cursor: pointer;
	animation: ${ve} reverse 1s;
`,fe=q`
	from {
		top: 100vh;
	}
	to {
		top: calc(50% + max(250px, 20vh) - max(20px, 1vh));
  }
`,xe=u.div`
	position: absolute;
	bottom: -50px;
	top: calc(50% + max(250px, 20vh) - max(20px, 1vh));
	left: 50%;
	transform: translate(-50%);
	width: max(40px, 4vh);
	cursor: pointer;
	pointer-events: initial;
	animation: ${fe} 1s;
`,me=u.div`
	position: absolute;
	top: 10%;
	left: 50%;
	right: 50%;
	transform: translate(-50%);
	width: 25%;
	height: 150%;
	background-color: white;
`,we=u.div`
	position: absolute;
	top: max(20px, 1vh);
	left: 50%;
	transform: translate(-50%);
	width: 80%;
	height: max(50px, 15%);
	border-radius: 5px;
	background: grey url(${he}) center no-repeat;
	background-size: 75%;
`,Ae=u.div`
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%);
	width: 60%;
	height: max(20px, 1vh);
	z-index: -1;
	background: repeating-linear-gradient(
		90deg,
		#d9d9d9 0%,
		#d9d9d9 20%,
		#c3b868 21%,
		#c3b868 69%,
		#d9d9d9 70%,
		#d9d9d9 100%
	);
	background-size: 10%;
`;function je({isCharging:t,setIsChargingcallback:s}){function i(n){n.currentTarget.style.bottom="-100vh",setTimeout(()=>{s(!0)},1e3)}function c(n){n.currentTarget.style.top="100vh",setTimeout(()=>{s(!1)},50)}return e.jsx(ge,{children:t?e.jsxs(xe,{onClick:n=>c(n),children:[e.jsx(me,{}),e.jsx(we,{}),e.jsx(Ae,{})]}):e.jsx(pe,{onClick:n=>i(n)})})}const ye=u.div`
	position: relative;
	height: 80%;
	aspect-ratio: 9/16;
	box-shadow: inset 0 0 2px black;
	background-color: rgb(30, 30, 30);
	overflow: hidden;
`;function be({isOn:t=!0,children:s}){return e.jsx(ye,{children:t&&s})}var P={exports:{}},J={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var te;function Se(){if(te)return J;te=1;var t=re,s=Symbol.for("react.element"),i=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,n=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,x={key:!0,ref:!0,__self:!0,__source:!0};function g(d,h,p){var v,y={},A=null,r=null;p!==void 0&&(A=""+p),h.key!==void 0&&(A=""+h.key),h.ref!==void 0&&(r=h.ref);for(v in h)c.call(h,v)&&!x.hasOwnProperty(v)&&(y[v]=h[v]);if(d&&d.defaultProps)for(v in h=d.defaultProps,h)y[v]===void 0&&(y[v]=h[v]);return{$$typeof:s,type:d,key:A,ref:r,props:y,_owner:n.current}}return J.Fragment=i,J.jsx=g,J.jsxs=g,J}(function(t){t.exports=Se()})(P);const Me=P.exports.Fragment,H=P.exports.jsx,Ce=P.exports.jsxs,ke=String.raw;function Ee({child:t,sliderWidth:s,sliderHeight:i,scaleOnDrag:c=!1}){const n=a.useRef(null),x=()=>{c&&n.current&&(n.current.style.transform="scale(0.9)")},g=()=>{c&&n.current&&(n.current.style.transform="scale(1)")};return Ce(Me,{children:[H("style",{children:ke`
          .rtds-single-slide-styles img {
            max-width: 100%;
            max-height: 100%;
          }
        `}),H("div",{ref:n,style:{width:`${s}px`,height:`${i}px`,transition:"transform 0.2s ease-out"},className:"rtds-single-slide-styles",children:H("div",{style:{padding:"1rem",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none"},onPointerDown:x,onPointerUp:g,onPointerLeave:g,onDragStart:d=>(d.preventDefault(),d.stopPropagation(),!1),children:t})})]})}function W(t){const s=t.clientWidth,i=t.clientHeight;return{width:s,height:i}}if(import.meta.vitest){const{it:t,expect:s}=import.meta.vitest,i=document.createElement("div");t("Gets an elements dimensions",()=>{s(W(i)).toStrictEqual({width:0,height:0})})}function Be({children:t,onSlideComplete:s,onSlideStart:i,activeIndex:c=null,threshHold:n=100,transition:x=.3,scaleOnDrag:g=!1}){const[d,h]=a.useState({width:0,height:0}),p=a.useRef(!1),v=a.useRef(0),y=a.useRef(0),A=a.useRef(0),r=a.useRef(0),f=a.useRef(null),Y=a.useRef(null),C=a.useCallback((j=d.width)=>{y.current=r.current*-j,A.current=y.current,F()},[d.width]),E=a.useCallback(()=>{f.current&&(f.current.style.transition=`transform ${x}s ease-out`)},[x]),X=()=>{f.current&&(f.current.style.transition="none")};a.useEffect(()=>{c!==r.current&&(E(),r.current=c,C())},[c,C,E]),a.useLayoutEffect(()=>{f.current&&(X(),h(W(f.current)),C(W(f.current).width))},[C]),a.useEffect(()=>{const j=()=>{if(X(),f.current){const{width:B,height:U}=W(f.current);h({width:B,height:U}),C(B)}},R=({key:B})=>{const U=["ArrowRight","ArrowLeft"].includes(B);U&&E(),U&&i&&i(r.current),B==="ArrowRight"&&r.current<t.length-1&&(r.current+=1),B==="ArrowLeft"&&r.current>0&&(r.current-=1),U&&s&&s(r.current),C()};return window.addEventListener("resize",j),window.addEventListener("keydown",R),()=>{window.removeEventListener("resize",j),window.removeEventListener("keydown",R)}},[t.length,C,s,i,E]);function T(j){return function(R){E(),r.current=j,v.current=R.pageX,p.current=!0,Y.current=requestAnimationFrame(I),f.current&&(f.current.style.cursor="grabbing"),i&&i(r.current)}}function V(j){if(p.current){const R=j.pageX;y.current=A.current+R-v.current}}function N(){E(),cancelAnimationFrame(Y.current),p.current=!1;const j=y.current-A.current;j<-n&&r.current<t.length-1&&(r.current+=1),j>n&&r.current>0&&(r.current-=1),E(),C(),f.current.style.cursor="grab",s&&s(r.current)}function I(){F(),p.current&&requestAnimationFrame(I)}function F(){!f.current||(f.current.style.transform=`translateX(${y.current}px)`)}return H("div",{className:"rtds-slider-wrapper",style:{overflow:"hidden",width:"100%",height:"100%",maxHeight:"100vh"},children:H("div",{"data-testid":"slider",ref:f,className:"rtds-slider-styles",style:{all:"initial",width:"100%",height:"100%",maxHeight:"100vh",display:"inline-flex",willChange:"transform, scale",cursor:"grab"},children:t.map((j,R)=>H("div",{onPointerDown:T(R),onPointerMove:V,onPointerUp:N,onPointerLeave:()=>{p.current&&N()},onContextMenu:B=>{B.preventDefault(),B.stopPropagation()},className:"slide-outer",style:{touchAction:"none"},children:H(Ee,{child:j,sliderWidth:d.width,sliderHeight:d.height,scaleOnDrag:g})},j.key))})})}const K="data:image/png;base64,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",De="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxElEQVR4nO3Z0QoBURSF4e0JSeSCl5h/zfO6MFHiDSg65Ibc731aXynNldU/UzMjwiwPYA1cgSOwiKJmki6SHu0D3IBNVAScP0NKj5G0bD++lzGr7zGS7sMw7KIaeUxScpmk5DJJyWWScpmsXCYrl8mqqzLA5s/D2SI6GTNFD0MkHaKSLk4t3u/Ffi52YBtVeEQWLpGFS2ThElm4RBb4tiMJXCIJeigxjuO8iz9Dgan8iEbSqfyIz6nVXhIA+/b9ddCsT08cJ3fUlGUOGAAAAABJRU5ErkJggg==",Le=u.div`
	height: 100%;
	width: 100%;
`,Re=u.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 30%;
	display: flex;
	align-items: center;
	justify-content: center;
`,Ie=u.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
`,Ue=q`
	0% {
		background-position: 0;
	}
	100% {
		background-position: 100px;
	}
`,Ye=u.div`
	position: relative;
	user-select: none;
	transition: ease-out 800ms;
	color: #ffffff;
	font-size: max(22px, 2vh);
	background: linear-gradient(to right, #4d4d4d 0, white 10%, #4d4d4d 20%);
	background-position: 0;
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: ${Ue} 6s infinite linear;
`,ze=u.div`
	height: 20%;
	aspect-ratio: 1/1;
	background-image: url(${De});
	background-size: contain;
`;function He({isLocked:t=!0,setIsLockedCallback:s,bg:i=`url(${K})`,bgColor:c="rgb(178, 151, 0) ",children:n}){const[x,g]=a.useState(!1);return e.jsxs(Le,{style:{backgroundImage:i,backgroundColor:c},onMouseUp:()=>g(!1),children:[n,e.jsx(Re,{children:e.jsxs(Be,{activeIndex:1,onSlideComplete:d=>{d===0&&s(!1)},children:[e.jsx("div",{},"empty"),e.jsxs(Ie,{onMouseDown:()=>g(!0),children:[e.jsx(ze,{}),e.jsx(Ye,{style:{bottom:x?"-500%":"0"},children:"Swipe to unlock"})]},"LockItems")]})})]})}function Ne(t){return L({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"circle",attr:{cx:"8",cy:"8",r:"8"}}]})(t)}function Fe(t){return L({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"}}]})(t)}function Xe(t){return L({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"}}]})(t)}function Te(t){return L({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"}}]})(t)}function Ve(t){return L({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}}]})(t)}function Je(t){return L({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"}}]})(t)}function Oe(t){return L({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"}}]})(t)}function Ge(t){return L({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M10.706 3.294A12.545 12.545 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27L8 6zm2.596 1.404.785-.785c.63.24 1.227.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.933-.933a6.455 6.455 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10zm4.905-4.905.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .047.737.518.518 0 0 1-.668.05 11.493 11.493 0 0 0-1.811-1.07zM9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75l10.75-10.75z"}}]})(t)}function ne(t){return L({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z"}},{tag:"path",attr:{d:"M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z"}}]})(t)}function We(t){return t.includes("Firefox")?"Firefox":t.includes("SamsungBrowser")?"Samsung":t.includes("Opera")||t.includes("OPR")?"Opera":t.includes("Edge")||t.includes("Edg")?"MS Edge":t.includes("Chrome")?"Chrome":t.includes("Safari")?"Safari":"unknown"}const Pe=We(navigator.userAgent),Qe=u.div`
	user-select: none;
	position: absolute;
	top: 0;
	width: 100%;
	height: 3%;
	background-color: rgba(0, 0, 0, 0.463);
	padding: 0 max(5px, 0.5vh);
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	font-size: max(10px, 1vh);
`,Ke=u.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: max(2px, 0.1vh);
`,qe=u.div`
	width: 22.5%;
	height: 90%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
	gap: 5%;
`,Ze=u.div`
	position: relative;
	height: 75%;
	width: 35%;
	display: flex;
	align-items: center;
	padding: 1% 2.5%;
	border: max(1px, 0.1vh) solid white;
	&:after {
		content: '';
		position: absolute;
		right: -15%;
		top: 33%;
		bottom: 33%;
		width: 12%;
		background-color: white;
	}
`,_e=u.div`
	position: relative;
	height: 75%;
`;function $e({network:t=5,randomizeNetworkQuality:s=!0,provider:i=Pe,isCharging:c=!1,battery:n=100,wifi:x=!1}){const[g,d]=a.useState(t);s&&a.useEffect(()=>{},[]);const h=[1,2,3,4,5];return e.jsxs(Qe,{children:[e.jsxs(Ke,{children:[h.map((p,v)=>v<g?e.jsx(Ne,{},v):e.jsx(Ve,{},v)),i,x&&e.jsx(ne,{})]}),e.jsxs(qe,{children:[" ",c&&e.jsx(Oe,{}),n+"%",e.jsx(Ze,{children:e.jsx(_e,{style:{width:n+"%",backgroundColor:c?n===100?"green":"yellow":n<=20?"red":"white"}})})]})]})}const et=u.div`
	user-select: none;
	height: 30%;
	width: 100%;
	padding-top: 10%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
`,tt=u.div`
	font-size: max(50px, 6vh);
	font-weight: 200;
`,rt=u.div`
	font-size: max(14px, 1.4vh);
`;function nt({dateObj:t}){const s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],i=["January","Febrauary","March","April","May","June","July","August","September","October","November","December"],[c,n]=a.useState(""),[x,g]=a.useState("");return a.useEffect(()=>{function d(){const p=new Date;n(p.getHours()+":"+p.getMinutes().toString().padStart(2,"0")),g(s[p.getDay()]+", "+p.getDate()+" "+i[p.getMonth()])}d();const h=setInterval(d,1e4);return()=>clearInterval(h)},[]),e.jsxs(et,{children:[e.jsx(tt,{children:c}),e.jsx(rt,{children:x})]})}var it=typeof window<"u"?a.useLayoutEffect:a.useEffect;function ot(t,s){var i=s===void 0?{}:s,c=i.decayRate,n=c===void 0?.95:c,x=i.safeDisplacement,g=x===void 0?10:x,d=i.applyRubberBandEffect,h=d===void 0?!1:d,p=i.activeMouseButton,v=p===void 0?"Left":p,y=i.isMounted,A=y===void 0?!0:y,r=a.useRef({isMouseDown:!1,isDraggingX:!1,isDraggingY:!1,initialMouseX:0,initialMouseY:0,lastMouseX:0,lastMouseY:0,scrollSpeedX:0,scrollSpeedY:0,lastScrollX:0,lastScrollY:0}),f=!1,Y=!1,C=0,E=0,X,T,V,N,I=1/60*1e3;it(function(){A&&(f=window.getComputedStyle(t.current).overflowX==="scroll",Y=window.getComputedStyle(t.current).overflowY==="scroll",C=t.current.scrollWidth-t.current.clientWidth,E=t.current.scrollHeight-t.current.clientHeight,X=window.getComputedStyle(t.current).cursor,T=[],V=[],N=[],t.current.childNodes.forEach(function(b){T.push(window.getComputedStyle(b).cursor),V.push(window.getComputedStyle(b).transform==="none"?"":window.getComputedStyle(b).transform),N.push(window.getComputedStyle(b).transition==="none"?"":window.getComputedStyle(b).transition)}))},[A]);var F=function(){var l=r.current.scrollSpeedX*I,m=r.current.scrollSpeedY*I,w=t.current.scrollLeft+l,S=t.current.scrollTop+m;t.current.scrollLeft=w,t.current.scrollTop=S,r.current.lastScrollX=w,r.current.lastScrollY=S},j=function(l){var m=l.clientX-r.current.initialMouseX,w=l.clientY-r.current.initialMouseY,S=t.current,D=S.clientWidth,k=S.clientHeight,M=0,z=0;f&&Y?(M=.3*D*Math.sign(m)*Math.log10(1+.5*Math.abs(m)/D),z=.3*k*Math.sign(w)*Math.log10(1+.5*Math.abs(w)/k)):f?M=.3*D*Math.sign(m)*Math.log10(1+.5*Math.abs(m)/D):Y&&(z=.3*k*Math.sign(w)*Math.log10(1+.5*Math.abs(w)/k)),t.current.childNodes.forEach(function(G){G.style.transform="translate3d("+M+"px, "+z+"px, 0px)",G.style.transition="transform 0ms"})},R=function(){t.current.childNodes.forEach(function(l,m){l.style.transform=V[m],l.style.transition=N[m]})},B,U,Q,ie=function(){var l=.05;if(U=setInterval(function(){var w=r.current.scrollSpeedX,S=w*n;r.current.scrollSpeedX=S;var D=t.current.scrollLeft<=0,k=t.current.scrollLeft>=C,M=D||k;F(),(Math.abs(S)<l||r.current.isMouseDown||M)&&(r.current.scrollSpeedX=0,clearInterval(U))},I),Q=setInterval(function(){var w=r.current.scrollSpeedY,S=w*n;r.current.scrollSpeedY=S;var D=t.current.scrollTop<=0,k=t.current.scrollTop>=E,M=D||k;F(),(Math.abs(S)<l||r.current.isMouseDown||M)&&(r.current.scrollSpeedY=0,clearInterval(Q))},I),r.current.isDraggingX=!1,r.current.isDraggingY=!1,h){var m=250;t.current.childNodes.forEach(function(w){w.style.transform="translate3d(0px, 0px, 0px)",w.style.transition="transform "+m+"ms"}),B=setTimeout(R,m)}},Z=function(l){l.preventDefault(),l.stopImmediatePropagation()},oe=function(l){return v==="Left"&&l===1||v==="Middle"&&l===4||v==="Right"&&l===2},ae=function(l){var m=oe(l.buttons);m&&(r.current.isMouseDown=!0,r.current.lastMouseX=l.clientX,r.current.lastMouseY=l.clientY,r.current.initialMouseX=l.clientX,r.current.initialMouseY=l.clientY)},_=function(l){var m=r.current.isDraggingX||r.current.isDraggingY,w=r.current.initialMouseX-l.clientX,S=r.current.initialMouseY-l.clientY,D=Math.abs(w)>g||Math.abs(S)>g,k=m&&D;k?t.current.childNodes.forEach(function(M){M.addEventListener("click",Z)}):t.current.childNodes.forEach(function(M){M.removeEventListener("click",Z)}),r.current.isMouseDown=!1,r.current.lastMouseX=0,r.current.lastMouseY=0,t.current.style.cursor=X,t.current.childNodes.forEach(function(M,z){M.style.cursor=T[z]}),k&&ie()},$=function(l){if(r.current.isMouseDown){l.preventDefault();var m=r.current.lastMouseX-l.clientX;r.current.lastMouseX=l.clientX,r.current.scrollSpeedX=m/I,r.current.isDraggingX=!0;var w=r.current.lastMouseY-l.clientY;r.current.lastMouseY=l.clientY,r.current.scrollSpeedY=w/I,r.current.isDraggingY=!0,t.current.style.cursor="grabbing",t.current.childNodes.forEach(function(G){G.style.cursor="grabbing"});var S=t.current.scrollLeft<=0&&f,D=t.current.scrollLeft>=C&&f,k=t.current.scrollTop<=0&&Y,M=t.current.scrollTop>=E&&Y,z=S||D||k||M;z&&h&&j(l),F()}},ee=function(){C=t.current.scrollWidth-t.current.clientWidth,E=t.current.scrollHeight-t.current.clientHeight};return a.useEffect(function(){return A&&(window.addEventListener("mouseup",_),window.addEventListener("mousemove",$),window.addEventListener("resize",ee)),function(){window.removeEventListener("mouseup",_),window.removeEventListener("mousemove",$),window.removeEventListener("resize",ee),clearInterval(U),clearInterval(Q),clearTimeout(B)}},[A]),{events:{onMouseDown:ae}}}const at=u.div`
	height: 100%;
	width: 100%;
`,st=u.div`
	height: 100%;
	width: 100%;
	padding: 10% 5% 35%;
	display: grid;
	grid-template-columns: repeat(4, 21%);
	column-gap: 5%;
	row-gap: 5%;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,lt=u.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: calc(45px + 5%);
	padding: 1% 5%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 5%;
	justify-content: space-evenly;
	align-items: center;
	background-color: #80808085;
	backdrop-filter: blur(5px);
	box-shadow: 0 -3px 5px #80808085;
`;function ct({pinned:t,menuBackground:s=`rgb(178, 151, 0) url(${K})`,children:i}){const c=a.useRef(),{events:n}=ot(c);return a.useEffect(()=>console.log(K),[]),e.jsxs(at,{style:{background:s},children:[e.jsx(st,{...n,ref:c,children:i}),e.jsx(lt,{children:t})]})}function ut(t){return L({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"}},{tag:"path",attr:{d:"M19 19V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v14H3v2h18v-2h-2zm-2 0H7V5h10v14z"}},{tag:"path",attr:{d:"M9 11h2v2H9z"}}]})(t)}function dt(t){return L({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"g",attr:{},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M12 11V5l-5 8h3v6l5-8h-3zM3 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm18 4h2v6h-2V9z"}}]}]})(t)}function ht(t){return L({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"g",attr:{},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M8 19H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6.625L8.458 7H4v10h4v2zm4.375 0l1.167-2H18V7h-4V5h5a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-6.625zM21 9h2v6h-2V9zm-9 2h3l-5 8v-6H7l5-8v6z"}}]}]})(t)}const gt=u.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: max(35px, 5vh);
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	gap: 5%;
	background-color: #808080a1;
`,O=u.div`
	height: 75%;
	aspect-ratio: 1/1;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #0000007a;
	font-size: calc(0.7 * max(35px, 5vh));
	&:hover {
		scale: 1.1;
		box-shadow: 0 0 1px 2px black;
	}
`;function vt({fullscreen:t,setFullscreenCallback:s,isLocked:i,setisLockedCallback:c,isCharging:n,setIsChargingCallback:x,isWiFiConnected:g,setIsWiFiConnectedCallback:d}){return e.jsxs(gt,{children:[e.jsx(O,{onClick:()=>s(!t),children:t?e.jsx(Je,{}):e.jsx(Te,{})}),e.jsx(O,{onClick:()=>c(!i),children:i?e.jsx(Xe,{}):e.jsx(Fe,{})}),e.jsx(O,{onClick:()=>x(!n),children:n?e.jsx(ht,{}):e.jsx(dt,{})}),e.jsx(O,{onClick:()=>d(!g),children:g?e.jsx(Ge,{}):e.jsx(ne,{})}),e.jsx(O,{onClick:()=>window.location.href="/QuantoriSchool-hw/",children:e.jsx(ut,{})})]})}const pt=u.div`
	min-width: 45px;
	width: 100%;
	aspect-ratio: 1/1;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		box-shadow: 0 0 1px 2px black;
	}
`;function o({background:t="#000000b6"}){return e.jsx(pt,{style:{background:t}})}function ft(){const[t,s]=a.useState(!1);a.useEffect(()=>{},[t]);const[i,c]=a.useState(!1),[n,x]=a.useState(100),[g,d]=a.useState(!1),h=n>0;a.useEffect(()=>{let A;return i?n>=100||(A=setInterval(()=>x(n+1),1e4)):h&&(A=setInterval(()=>x(n-1),15e3)),()=>clearInterval(A)},[i,h,n]);const[p,v]=a.useState(!0);a.useEffect(()=>{console.log("charging? "+i)},[i]);const y=[e.jsx(o,{},1),e.jsx(o,{},2),e.jsx(o,{},3),e.jsx(o,{},4)];return e.jsxs(e.Fragment,{children:[!t&&e.jsx(je,{isCharging:i,setIsChargingcallback:c}),e.jsxs("div",{id:"phone",style:{height:t?"100vh":"40vh"},children:[e.jsxs("div",{id:"sideButtons",children:[e.jsx("div",{className:"sideElement",id:"volSwitch"}),e.jsx("div",{className:"sideElement sideButton",id:"volUp"}),e.jsx("div",{className:"sideElement sideButton",id:"volDown"}),e.jsx("div",{className:"sideElement sideButton",id:"lock"})]}),e.jsxs("div",{id:"elements",children:[e.jsx("div",{id:"mic"}),e.jsxs("div",{id:"offsetLine",children:[e.jsx("div",{id:"camera"}),e.jsx("div",{id:"speaker"})]})]}),e.jsx(be,{isOn:h,children:e.jsxs(e.Fragment,{children:[e.jsx($e,{isCharging:i,battery:n,wifi:g}),p?e.jsx(He,{isLocked:p,setIsLockedCallback:v,children:e.jsx(e.Fragment,{children:e.jsx(nt,{})})}):e.jsxs(ct,{pinned:y,children:[e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{}),e.jsx(o,{})]})]})}),e.jsx("div",{id:"centerButton",children:e.jsx("div",{id:"centerButton_square"})}),e.jsx("div",{id:"glass"})]}),!t&&e.jsx(ue,{}),e.jsx(vt,{fullscreen:t,setFullscreenCallback:s,isLocked:p,setisLockedCallback:v,isCharging:i,setIsChargingCallback:c,isWiFiConnected:g,setIsWiFiConnectedCallback:d})]})}se.createRoot(document.getElementById("app")).render(e.jsx(re.StrictMode,{children:e.jsx(ft,{})}));
