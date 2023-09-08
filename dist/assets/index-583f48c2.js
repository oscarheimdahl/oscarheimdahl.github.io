(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function a(){}function Q(t,e){for(const n in e)t[n]=e[n];return t}function R(t){return t()}function F(){return Object.create(null)}function V(t){t.forEach(R)}function z(t){return typeof t=="function"}function b(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let T;function U(t,e){return T||(T=document.createElement("a")),T.href=e,t===T.href}function X(t){return Object.keys(t).length===0}function Y(t,e,n,l){if(t){const r=D(t,e,n,l);return t[0](r)}}function D(t,e,n,l){return t[1]&&l?Q(n.ctx.slice(),t[1](l(e))):n.ctx}function ee(t,e,n,l){if(t[2]&&l){const r=t[2](l(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const s=[],o=Math.max(e.dirty.length,r.length);for(let d=0;d<o;d+=1)s[d]=e.dirty[d]|r[d];return s}return e.dirty|r}return e.dirty}function te(t,e,n,l,r,s){if(r){const o=D(e,n,l,s);t.p(o,r)}}function ne(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let l=0;l<n;l++)e[l]=-1;return e}return-1}const re=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;"WeakMap"in re;function x(t,e){t.appendChild(e)}function h(t,e,n){t.insertBefore(e,n||null)}function m(t){t.parentNode&&t.parentNode.removeChild(t)}function v(t){return document.createElement(t)}function L(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function le(t){return document.createTextNode(t)}function C(){return le(" ")}function i(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function se(t){return Array.from(t.childNodes)}let Z;function N(t){Z=t}const A=[],G=[];let q=[];const K=[],oe=Promise.resolve();let B=!1;function ie(){B||(B=!0,oe.then(J))}function I(t){q.push(t)}const j=new Set;let O=0;function J(){if(O!==0)return;const t=Z;do{try{for(;O<A.length;){const e=A[O];O++,N(e),ce(e.$$)}}catch(e){throw A.length=0,O=0,e}for(N(null),A.length=0,O=0;G.length;)G.pop()();for(let e=0;e<q.length;e+=1){const n=q[e];j.has(n)||(j.add(n),n())}q.length=0}while(A.length);for(;K.length;)K.pop()();B=!1,j.clear(),N(t)}function ce(t){if(t.fragment!==null){t.update(),V(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(I)}}function ue(t){const e=[],n=[];q.forEach(l=>t.indexOf(l)===-1?e.push(l):n.push(l)),n.forEach(l=>l()),q=e}const S=new Set;let fe;function g(t,e){t&&t.i&&(S.delete(t),t.i(e))}function p(t,e,n,l){if(t&&t.o){if(S.has(t))return;S.add(t),fe.c.push(()=>{S.delete(t),l&&(n&&t.d(1),l())}),t.o(e)}else l&&l()}const ae=["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"];[...ae];function y(t){t&&t.c()}function $(t,e,n,l){const{fragment:r,after_update:s}=t.$$;r&&r.m(e,n),l||I(()=>{const o=t.$$.on_mount.map(R).filter(z);t.$$.on_destroy?t.$$.on_destroy.push(...o):V(o),t.$$.on_mount=[]}),s.forEach(I)}function _(t,e){const n=t.$$;n.fragment!==null&&(ue(n.after_update),V(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function de(t,e){t.$$.dirty[0]===-1&&(A.push(t),ie(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function k(t,e,n,l,r,s,o,d=[-1]){const u=Z;N(t);const c=t.$$={fragment:null,ctx:[],props:s,update:a,not_equal:r,bound:F(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:F(),dirty:d,skip_bound:!1,root:e.target||u.$$.root};o&&o(c.root);let w=!1;if(c.ctx=n?n(t,e.props||{},(f,E,...H)=>{const W=H.length?H[0]:E;return c.ctx&&r(c.ctx[f],c.ctx[f]=W)&&(!c.skip_bound&&c.bound[f]&&c.bound[f](W),w&&de(t,f)),E}):[],c.update(),w=!0,V(c.before_update),c.fragment=l?l(c.ctx):!1,e.target){if(e.hydrate){const f=se(e.target);c.fragment&&c.fragment.l(f),f.forEach(m)}else c.fragment&&c.fragment.c();e.intro&&g(t.$$.fragment),$(t,e.target,e.anchor,e.customElement),J()}N(u)}class M{$destroy(){_(this,1),this.$destroy=a}$on(e,n){if(!z(n))return a;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const r=l.indexOf(n);r!==-1&&l.splice(r,1)}}$set(e){this.$$set&&!X(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function me(t){let e,n,l;return{c(){e=v("h1"),e.textContent="I'm Oscar 👋🏼",n=C(),l=v("p"),l.textContent="A front-end developer with a passion for all things web.",i(e,"class","text-4xl font-semibold"),i(l,"class","w-[24ch] text-xl")},m(r,s){h(r,e,s),h(r,n,s),h(r,l,s)},p:a,i:a,o:a,d(r){r&&m(e),r&&m(n),r&&m(l)}}}class he extends M{constructor(e){super(),k(this,e,null,me,b,{})}}function ge(t){let e,n;const l=t[2].default,r=Y(l,t,t[1],null);return{c(){e=v("a"),r&&r.c(),i(e,"target","_blank"),i(e,"href",t[0]),i(e,"class","hover:scale-90 scale-95 transition-transform")},m(s,o){h(s,e,o),r&&r.m(e,null),n=!0},p(s,[o]){r&&r.p&&(!n||o&2)&&te(r,l,s,s[1],n?ee(l,s[1],o,null):ne(s[1]),null),(!n||o&1)&&i(e,"href",s[0])},i(s){n||(g(r,s),n=!0)},o(s){p(r,s),n=!1},d(s){s&&m(e),r&&r.d(s)}}}function pe(t,e,n){let{$$slots:l={},$$scope:r}=e,{href:s}=e;return t.$$set=o=>{"href"in o&&n(0,s=o.href),"$$scope"in o&&n(1,r=o.$$scope)},[s,r,l]}class P extends M{constructor(e){super(),k(this,e,pe,ge,b,{href:0})}}function $e(t){let e,n;return{c(){e=L("svg"),n=L("path"),i(n,"fill","currentColor"),i(n,"d","M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7l8-5V6l-8 5l-8-5v2l8 5Z"),i(e,"xmlns","http://www.w3.org/2000/svg"),i(e,"width","32"),i(e,"height","32"),i(e,"viewBox","0 0 24 24")},m(l,r){h(l,e,r),x(e,n)},p:a,i:a,o:a,d(l){l&&m(e)}}}class _e extends M{constructor(e){super(),k(this,e,null,$e,b,{})}}function we(t){let e,n;return{c(){e=L("svg"),n=L("path"),i(n,"fill","currentColor"),i(n,"fill-rule","evenodd"),i(n,"d","M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.536 10.536 0 0 1 12 6.32a10.49 10.49 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"),i(e,"xmlns","http://www.w3.org/2000/svg"),i(e,"width","32"),i(e,"height","32"),i(e,"viewBox","0 0 24 24")},m(l,r){h(l,e,r),x(e,n)},p:a,i:a,o:a,d(l){l&&m(e)}}}class xe extends M{constructor(e){super(),k(this,e,null,we,b,{})}}function ve(t){let e,n;return{c(){e=L("svg"),n=L("path"),i(n,"fill","currentColor"),i(n,"fill-rule","evenodd"),i(n,"d","M22.037 22h-4.152v-6.496c0-1.55-.026-3.542-2.157-3.542c-2.16 0-2.49 1.688-2.49 3.43V22H9.09V8.64h3.98v1.827h.058c.553-1.05 1.908-2.158 3.928-2.158c4.204 0 4.98 2.766 4.98 6.364V22ZM4.409 6.816A2.407 2.407 0 0 1 2 4.407a2.408 2.408 0 1 1 2.41 2.408ZM6.486 22H2.33V8.64h4.156V22Z"),i(e,"xmlns","http://www.w3.org/2000/svg"),i(e,"width","32"),i(e,"height","32"),i(e,"viewBox","0 0 24 24")},m(l,r){h(l,e,r),x(e,n)},p:a,i:a,o:a,d(l){l&&m(e)}}}class ye extends M{constructor(e){super(),k(this,e,null,ve,b,{})}}function be(t){let e,n;return e=new ye({}),{c(){y(e.$$.fragment)},m(l,r){$(e,l,r),n=!0},i(l){n||(g(e.$$.fragment,l),n=!0)},o(l){p(e.$$.fragment,l),n=!1},d(l){_(e,l)}}}function ke(t){let e,n;return e=new xe({}),{c(){y(e.$$.fragment)},m(l,r){$(e,l,r),n=!0},i(l){n||(g(e.$$.fragment,l),n=!0)},o(l){p(e.$$.fragment,l),n=!1},d(l){_(e,l)}}}function Me(t){let e,n,l;return n=new _e({}),{c(){e=v("div"),y(n.$$.fragment),i(e,"class","translate-y-[2px]")},m(r,s){h(r,e,s),$(n,e,null),l=!0},p:a,i(r){l||(g(n.$$.fragment,r),l=!0)},o(r){p(n.$$.fragment,r),l=!1},d(r){r&&m(e),_(n)}}}function Ee(t){let e,n,l,r,s,o,d;return n=new P({props:{href:"https://www.linkedin.com/in/oscar-heimdahl-9b9428152/",$$slots:{default:[be]},$$scope:{ctx:t}}}),r=new P({props:{href:"https://www.github.com/oscarheimdahl",$$slots:{default:[ke]},$$scope:{ctx:t}}}),o=new P({props:{href:"mailto:o.heimdahl@gmail.com",$$slots:{default:[Me]},$$scope:{ctx:t}}}),{c(){e=v("div"),y(n.$$.fragment),l=C(),y(r.$$.fragment),s=C(),y(o.$$.fragment),i(e,"class","flex gap-1 justify-center mt-4")},m(u,c){h(u,e,c),$(n,e,null),x(e,l),$(r,e,null),x(e,s),$(o,e,null),d=!0},p(u,[c]){const w={};c&1&&(w.$$scope={dirty:c,ctx:u}),n.$set(w);const f={};c&1&&(f.$$scope={dirty:c,ctx:u}),r.$set(f);const E={};c&1&&(E.$$scope={dirty:c,ctx:u}),o.$set(E)},i(u){d||(g(n.$$.fragment,u),g(r.$$.fragment,u),g(o.$$.fragment,u),d=!0)},o(u){p(n.$$.fragment,u),p(r.$$.fragment,u),p(o.$$.fragment,u),d=!1},d(u){u&&m(e),_(n),_(r),_(o)}}}class Oe extends M{constructor(e){super(),k(this,e,null,Ee,b,{})}}const Ae="/me.png";function Ce(t){let e,n;return{c(){e=v("img"),U(e.src,n=Ae)||i(e,"src",n),i(e,"alt","Oscar Heimdahl"),i(e,"class","rounded-full w-60 absolute -top-24 left-1/2 -translate-x-1/2")},m(l,r){h(l,e,r)},p:a,i:a,o:a,d(l){l&&m(e)}}}class qe extends M{constructor(e){super(),k(this,e,null,Ce,b,{})}}function Le(t){let e,n,l,r,s,o,d,u,c,w;return r=new qe({}),d=new he({}),c=new Oe({}),{c(){e=v("div"),n=v("div"),l=C(),y(r.$$.fragment),s=C(),o=v("div"),y(d.$$.fragment),u=C(),y(c.$$.fragment),i(n,"class","w-60 h-32"),i(o,"class","flex flex-col gap-3"),i(e,"id","main-modal"),i(e,"class","p-6 scale-50 bg-light2 rounded-lg shadow-lg relative cursor-move svelte-1epordp")},m(f,E){h(f,e,E),x(e,n),x(e,l),$(r,e,null),x(e,s),x(e,o),$(d,o,null),x(o,u),$(c,o,null),w=!0},p:a,i(f){w||(g(r.$$.fragment,f),g(d.$$.fragment,f),g(c.$$.fragment,f),w=!0)},o(f){p(r.$$.fragment,f),p(d.$$.fragment,f),p(c.$$.fragment,f),w=!1},d(f){f&&m(e),_(r),_(d),_(c)}}}class Ne extends M{constructor(e){super(),k(this,e,null,Le,b,{})}}function Te(t){let e,n,l;return n=new Ne({}),{c(){e=v("div"),y(n.$$.fragment),i(e,"class","h-full bg-light1 grid place-content-center")},m(r,s){h(r,e,s),$(n,e,null),l=!0},p:a,i(r){l||(g(n.$$.fragment,r),l=!0)},o(r){p(n.$$.fragment,r),l=!1},d(r){r&&m(e),_(n)}}}class Se extends M{constructor(e){super(),k(this,e,null,Te,b,{})}}new Se({target:document.getElementById("app")});