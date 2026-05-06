const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-C7NBGF--.js","assets/index-LEI-xCcP.js","assets/index-B4ZUyHfc.js"])))=>i.map(i=>d[i]);
var qn=Object.defineProperty;var Vn=(l,i,e)=>i in l?qn(l,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[i]=e;var c=(l,i,e)=>Vn(l,typeof i!="symbol"?i+"":i,e);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();/*! @license DOMPurify 3.4.2 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.2/LICENSE */const{entries:En,setPrototypeOf:Si,isFrozen:Gn,getPrototypeOf:Yn,getOwnPropertyDescriptor:Xn}=Object;let{freeze:se,seal:he,create:He}=Object,{apply:Gt,construct:Yt}=typeof Reflect<"u"&&Reflect;se||(se=function(i){return i});he||(he=function(i){return i});Gt||(Gt=function(i,e){for(var t=arguments.length,n=new Array(t>2?t-2:0),o=2;o<t;o++)n[o-2]=arguments[o];return i.apply(e,n)});Yt||(Yt=function(i){for(var e=arguments.length,t=new Array(e>1?e-1:0),n=1;n<e;n++)t[n-1]=arguments[n];return new i(...t)});const We=W(Array.prototype.forEach),Kn=W(Array.prototype.lastIndexOf),Ii=W(Array.prototype.pop),Ue=W(Array.prototype.push),Jn=W(Array.prototype.splice),oe=Array.isArray,Ye=W(String.prototype.toLowerCase),St=W(String.prototype.toString),Ai=W(String.prototype.match),Fe=W(String.prototype.replace),Mi=W(String.prototype.indexOf),Zn=W(String.prototype.trim),Qn=W(Number.prototype.toString),eo=W(Boolean.prototype.toString),Bi=typeof BigInt>"u"?null:W(BigInt.prototype.toString),Di=typeof Symbol>"u"?null:W(Symbol.prototype.toString),$=W(Object.prototype.hasOwnProperty),qe=W(Object.prototype.toString),Z=W(RegExp.prototype.test),nt=to(TypeError);function W(l){return function(i){i instanceof RegExp&&(i.lastIndex=0);for(var e=arguments.length,t=new Array(e>1?e-1:0),n=1;n<e;n++)t[n-1]=arguments[n];return Gt(l,i,t)}}function to(l){return function(){for(var i=arguments.length,e=new Array(i),t=0;t<i;t++)e[t]=arguments[t];return Yt(l,e)}}function A(l,i){let e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ye;if(Si&&Si(l,null),!oe(i))return l;let t=i.length;for(;t--;){let n=i[t];if(typeof n=="string"){const o=e(n);o!==n&&(Gn(i)||(i[t]=o),n=o)}l[n]=!0}return l}function io(l){for(let i=0;i<l.length;i++)$(l,i)||(l[i]=null);return l}function le(l){const i=He(null);for(const[e,t]of En(l))$(l,e)&&(oe(t)?i[e]=io(t):t&&typeof t=="object"&&t.constructor===Object?i[e]=le(t):i[e]=t);return i}function no(l){switch(typeof l){case"string":return l;case"number":return Qn(l);case"boolean":return eo(l);case"bigint":return Bi?Bi(l):"0";case"symbol":return Di?Di(l):"Symbol()";case"undefined":return qe(l);case"function":case"object":{if(l===null)return qe(l);const i=l,e=$e(i,"toString");if(typeof e=="function"){const t=e(i);return typeof t=="string"?t:qe(t)}return qe(l)}default:return qe(l)}}function $e(l,i){for(;l!==null;){const t=Xn(l,i);if(t){if(t.get)return W(t.get);if(typeof t.value=="function")return W(t.value)}l=Yn(l)}function e(){return null}return e}function oo(l){try{return Z(l,""),!0}catch{return!1}}const _i=se(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),It=se(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),At=se(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),so=se(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Mt=se(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ro=se(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ri=se(["#text"]),Fi=se(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Bt=se(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Hi=se(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ot=se(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ao=he(/\{\{[\w\W]*|[\w\W]*\}\}/gm),lo=he(/<%[\w\W]*|[\w\W]*%>/gm),co=he(/\$\{[\w\W]*/gm),po=he(/^data-[\-\w.\u00B7-\uFFFF]+$/),ho=he(/^aria-[\-\w]+$/),kn=he(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),uo=he(/^(?:\w+script|data):/i),go=he(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Cn=he(/^html$/i),fo=he(/^[a-z][.\w]*(-[.\w]+)+$/i);var $i=Object.freeze({__proto__:null,ARIA_ATTR:ho,ATTR_WHITESPACE:go,CUSTOM_ELEMENT:fo,DATA_ATTR:po,DOCTYPE_NAME:Cn,ERB_EXPR:lo,IS_ALLOWED_URI:kn,IS_SCRIPT_OR_DATA:uo,MUSTACHE_EXPR:ao,TMPLIT_EXPR:co});const Ve={element:1,text:3,progressingInstruction:7,comment:8,document:9},mo=function(){return typeof window>"u"?null:window},bo=function(i,e){if(typeof i!="object"||typeof i.createPolicy!="function")return null;let t=null;const n="data-tt-policy-suffix";e&&e.hasAttribute(n)&&(t=e.getAttribute(n));const o="dompurify"+(t?"#"+t:"");try{return i.createPolicy(o,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},zi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ln(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:mo();const i=S=>Ln(S);if(i.version="3.4.2",i.removed=[],!l||!l.document||l.document.nodeType!==Ve.document||!l.Element)return i.isSupported=!1,i;let{document:e}=l;const t=e,n=t.currentScript,{DocumentFragment:o,HTMLTemplateElement:s,Node:a,Element:r,NodeFilter:d,NamedNodeMap:p=l.NamedNodeMap||l.MozNamedAttrMap,HTMLFormElement:h,DOMParser:g,trustedTypes:f}=l,m=r.prototype,b=$e(m,"cloneNode"),w=$e(m,"remove"),v=$e(m,"nextSibling"),y=$e(m,"childNodes"),C=$e(m,"parentNode");if(typeof s=="function"){const S=e.createElement("template");S.content&&S.content.ownerDocument&&(e=S.content.ownerDocument)}let L,D="";const{implementation:_,createNodeIterator:ie,createDocumentFragment:M,getElementsByTagName:R}=e,{importNode:I}=t;let T=zi();i.isSupported=typeof En=="function"&&typeof C=="function"&&_&&_.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:B,ERB_EXPR:U,TMPLIT_EXPR:Q,DATA_ATTR:Rn,ARIA_ATTR:Fn,IS_SCRIPT_OR_DATA:Hn,ATTR_WHITESPACE:ii,CUSTOM_ELEMENT:$n}=$i;let{IS_ALLOWED_URI:ni}=$i,G=null;const oi=A({},[..._i,...It,...At,...Mt,...Ri]);let J=null;const si=A({},[...Fi,...Bt,...Hi,...ot]);let z=Object.seal(He(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,Ze=null;const we=Object.seal(He(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let ri=!0,ut=!0,ai=!1,li=!0,Le=!1,Pe=!0,Te=!1,gt=!1,ft=!1,Be=!1,Qe=!1,et=!1,di=!0,ci=!1;const pi="user-content-";let mt=!0,Oe=!1,De={},me=null;const bt=A({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let hi=null;const ui=A({},["audio","video","img","source","image","track"]);let xt=null;const gi=A({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),tt="http://www.w3.org/1998/Math/MathML",it="http://www.w3.org/2000/svg",be="http://www.w3.org/1999/xhtml";let _e=be,vt=!1,yt=null;const zn=A({},[tt,it,be],St);let wt=A({},["mi","mo","mn","ms","mtext"]),Et=A({},["annotation-xml"]);const Nn=A({},["title","style","font","a","script"]);let je=null;const Pn=["application/xhtml+xml","text/html"],On="text/html";let q=null,Re=null;const jn=e.createElement("form"),fi=function(u){return u instanceof RegExp||u instanceof Function},kt=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Re&&Re===u)return;(!u||typeof u!="object")&&(u={}),u=le(u),je=Pn.indexOf(u.PARSER_MEDIA_TYPE)===-1?On:u.PARSER_MEDIA_TYPE,q=je==="application/xhtml+xml"?St:Ye,G=$(u,"ALLOWED_TAGS")&&oe(u.ALLOWED_TAGS)?A({},u.ALLOWED_TAGS,q):oi,J=$(u,"ALLOWED_ATTR")&&oe(u.ALLOWED_ATTR)?A({},u.ALLOWED_ATTR,q):si,yt=$(u,"ALLOWED_NAMESPACES")&&oe(u.ALLOWED_NAMESPACES)?A({},u.ALLOWED_NAMESPACES,St):zn,xt=$(u,"ADD_URI_SAFE_ATTR")&&oe(u.ADD_URI_SAFE_ATTR)?A(le(gi),u.ADD_URI_SAFE_ATTR,q):gi,hi=$(u,"ADD_DATA_URI_TAGS")&&oe(u.ADD_DATA_URI_TAGS)?A(le(ui),u.ADD_DATA_URI_TAGS,q):ui,me=$(u,"FORBID_CONTENTS")&&oe(u.FORBID_CONTENTS)?A({},u.FORBID_CONTENTS,q):bt,Ne=$(u,"FORBID_TAGS")&&oe(u.FORBID_TAGS)?A({},u.FORBID_TAGS,q):le({}),Ze=$(u,"FORBID_ATTR")&&oe(u.FORBID_ATTR)?A({},u.FORBID_ATTR,q):le({}),De=$(u,"USE_PROFILES")?u.USE_PROFILES&&typeof u.USE_PROFILES=="object"?le(u.USE_PROFILES):u.USE_PROFILES:!1,ri=u.ALLOW_ARIA_ATTR!==!1,ut=u.ALLOW_DATA_ATTR!==!1,ai=u.ALLOW_UNKNOWN_PROTOCOLS||!1,li=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Le=u.SAFE_FOR_TEMPLATES||!1,Pe=u.SAFE_FOR_XML!==!1,Te=u.WHOLE_DOCUMENT||!1,Be=u.RETURN_DOM||!1,Qe=u.RETURN_DOM_FRAGMENT||!1,et=u.RETURN_TRUSTED_TYPE||!1,ft=u.FORCE_BODY||!1,di=u.SANITIZE_DOM!==!1,ci=u.SANITIZE_NAMED_PROPS||!1,mt=u.KEEP_CONTENT!==!1,Oe=u.IN_PLACE||!1,ni=oo(u.ALLOWED_URI_REGEXP)?u.ALLOWED_URI_REGEXP:kn,_e=typeof u.NAMESPACE=="string"?u.NAMESPACE:be,wt=$(u,"MATHML_TEXT_INTEGRATION_POINTS")&&u.MATHML_TEXT_INTEGRATION_POINTS&&typeof u.MATHML_TEXT_INTEGRATION_POINTS=="object"?le(u.MATHML_TEXT_INTEGRATION_POINTS):A({},["mi","mo","mn","ms","mtext"]),Et=$(u,"HTML_INTEGRATION_POINTS")&&u.HTML_INTEGRATION_POINTS&&typeof u.HTML_INTEGRATION_POINTS=="object"?le(u.HTML_INTEGRATION_POINTS):A({},["annotation-xml"]);const x=$(u,"CUSTOM_ELEMENT_HANDLING")&&u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING=="object"?le(u.CUSTOM_ELEMENT_HANDLING):He(null);if(z=He(null),$(x,"tagNameCheck")&&fi(x.tagNameCheck)&&(z.tagNameCheck=x.tagNameCheck),$(x,"attributeNameCheck")&&fi(x.attributeNameCheck)&&(z.attributeNameCheck=x.attributeNameCheck),$(x,"allowCustomizedBuiltInElements")&&typeof x.allowCustomizedBuiltInElements=="boolean"&&(z.allowCustomizedBuiltInElements=x.allowCustomizedBuiltInElements),Le&&(ut=!1),Qe&&(Be=!0),De&&(G=A({},Ri),J=He(null),De.html===!0&&(A(G,_i),A(J,Fi)),De.svg===!0&&(A(G,It),A(J,Bt),A(J,ot)),De.svgFilters===!0&&(A(G,At),A(J,Bt),A(J,ot)),De.mathMl===!0&&(A(G,Mt),A(J,Hi),A(J,ot))),we.tagCheck=null,we.attributeCheck=null,$(u,"ADD_TAGS")&&(typeof u.ADD_TAGS=="function"?we.tagCheck=u.ADD_TAGS:oe(u.ADD_TAGS)&&(G===oi&&(G=le(G)),A(G,u.ADD_TAGS,q))),$(u,"ADD_ATTR")&&(typeof u.ADD_ATTR=="function"?we.attributeCheck=u.ADD_ATTR:oe(u.ADD_ATTR)&&(J===si&&(J=le(J)),A(J,u.ADD_ATTR,q))),$(u,"ADD_URI_SAFE_ATTR")&&oe(u.ADD_URI_SAFE_ATTR)&&A(xt,u.ADD_URI_SAFE_ATTR,q),$(u,"FORBID_CONTENTS")&&oe(u.FORBID_CONTENTS)&&(me===bt&&(me=le(me)),A(me,u.FORBID_CONTENTS,q)),$(u,"ADD_FORBID_CONTENTS")&&oe(u.ADD_FORBID_CONTENTS)&&(me===bt&&(me=le(me)),A(me,u.ADD_FORBID_CONTENTS,q)),mt&&(G["#text"]=!0),Te&&A(G,["html","head","body"]),G.table&&(A(G,["tbody"]),delete Ne.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw nt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw nt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=u.TRUSTED_TYPES_POLICY,D=L.createHTML("")}else L===void 0&&(L=bo(f,n)),L!==null&&typeof D=="string"&&(D=L.createHTML(""));se&&se(u),Re=u},mi=A({},[...It,...At,...so]),bi=A({},[...Mt,...ro]),Wn=function(u){let x=C(u);(!x||!x.tagName)&&(x={namespaceURI:_e,tagName:"template"});const k=Ye(u.tagName),F=Ye(x.tagName);return yt[u.namespaceURI]?u.namespaceURI===it?x.namespaceURI===be?k==="svg":x.namespaceURI===tt?k==="svg"&&(F==="annotation-xml"||wt[F]):!!mi[k]:u.namespaceURI===tt?x.namespaceURI===be?k==="math":x.namespaceURI===it?k==="math"&&Et[F]:!!bi[k]:u.namespaceURI===be?x.namespaceURI===it&&!Et[F]||x.namespaceURI===tt&&!wt[F]?!1:!bi[k]&&(Nn[k]||!mi[k]):!!(je==="application/xhtml+xml"&&yt[u.namespaceURI]):!1},ue=function(u){Ue(i.removed,{element:u});try{C(u).removeChild(u)}catch{w(u)}},Se=function(u,x){try{Ue(i.removed,{attribute:x.getAttributeNode(u),from:x})}catch{Ue(i.removed,{attribute:null,from:x})}if(x.removeAttribute(u),u==="is")if(Be||Qe)try{ue(x)}catch{}else try{x.setAttribute(u,"")}catch{}},xi=function(u){let x=null,k=null;if(ft)u="<remove></remove>"+u;else{const j=Ai(u,/^[\r\n\t ]+/);k=j&&j[0]}je==="application/xhtml+xml"&&_e===be&&(u='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+u+"</body></html>");const F=L?L.createHTML(u):u;if(_e===be)try{x=new g().parseFromString(F,je)}catch{}if(!x||!x.documentElement){x=_.createDocument(_e,"template",null);try{x.documentElement.innerHTML=vt?D:F}catch{}}const ee=x.body||x.documentElement;return u&&k&&ee.insertBefore(e.createTextNode(k),ee.childNodes[0]||null),_e===be?R.call(x,Te?"html":"body")[0]:Te?x.documentElement:ee},vi=function(u){return ie.call(u.ownerDocument||u,u,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Ct=function(u){return u instanceof h&&(typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||!(u.attributes instanceof p)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function")},Lt=function(u){return typeof a=="function"&&u instanceof a};function ye(S,u,x){We(S,k=>{k.call(i,u,x,Re)})}const yi=function(u){let x=null;if(ye(T.beforeSanitizeElements,u,null),Ct(u))return ue(u),!0;const k=q(u.nodeName);if(ye(T.uponSanitizeElement,u,{tagName:k,allowedTags:G}),Pe&&u.hasChildNodes()&&!Lt(u.firstElementChild)&&Z(/<[/\w!]/g,u.innerHTML)&&Z(/<[/\w!]/g,u.textContent)||Pe&&u.namespaceURI===be&&k==="style"&&Lt(u.firstElementChild)||u.nodeType===Ve.progressingInstruction||Pe&&u.nodeType===Ve.comment&&Z(/<[/\w]/g,u.data))return ue(u),!0;if(Ne[k]||!(we.tagCheck instanceof Function&&we.tagCheck(k))&&!G[k]){if(!Ne[k]&&Ei(k)&&(z.tagNameCheck instanceof RegExp&&Z(z.tagNameCheck,k)||z.tagNameCheck instanceof Function&&z.tagNameCheck(k)))return!1;if(mt&&!me[k]){const F=C(u)||u.parentNode,ee=y(u)||u.childNodes;if(ee&&F){const j=ee.length;for(let re=j-1;re>=0;--re){const pe=b(ee[re],!0);F.insertBefore(pe,v(u))}}}return ue(u),!0}return u instanceof r&&!Wn(u)||(k==="noscript"||k==="noembed"||k==="noframes")&&Z(/<\/no(script|embed|frames)/i,u.innerHTML)?(ue(u),!0):(Le&&u.nodeType===Ve.text&&(x=u.textContent,We([B,U,Q],F=>{x=Fe(x,F," ")}),u.textContent!==x&&(Ue(i.removed,{element:u.cloneNode()}),u.textContent=x)),ye(T.afterSanitizeElements,u,null),!1)},wi=function(u,x,k){if(Ze[x]||di&&(x==="id"||x==="name")&&(k in e||k in jn))return!1;const F=J[x]||we.attributeCheck instanceof Function&&we.attributeCheck(x,u);if(!(ut&&!Ze[x]&&Z(Rn,x))){if(!(ri&&Z(Fn,x))){if(!F||Ze[x]){if(!(Ei(u)&&(z.tagNameCheck instanceof RegExp&&Z(z.tagNameCheck,u)||z.tagNameCheck instanceof Function&&z.tagNameCheck(u))&&(z.attributeNameCheck instanceof RegExp&&Z(z.attributeNameCheck,x)||z.attributeNameCheck instanceof Function&&z.attributeNameCheck(x,u))||x==="is"&&z.allowCustomizedBuiltInElements&&(z.tagNameCheck instanceof RegExp&&Z(z.tagNameCheck,k)||z.tagNameCheck instanceof Function&&z.tagNameCheck(k))))return!1}else if(!xt[x]){if(!Z(ni,Fe(k,ii,""))){if(!((x==="src"||x==="xlink:href"||x==="href")&&u!=="script"&&Mi(k,"data:")===0&&hi[u])){if(!(ai&&!Z(Hn,Fe(k,ii,"")))){if(k)return!1}}}}}}return!0},Un=A({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Ei=function(u){return!Un[Ye(u)]&&Z($n,u)},ki=function(u){ye(T.beforeSanitizeAttributes,u,null);const{attributes:x}=u;if(!x||Ct(u))return;const k={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:J,forceKeepAttr:void 0};let F=x.length;for(;F--;){const ee=x[F],{name:j,namespaceURI:re,value:pe}=ee,ge=q(j),Tt=pe;let Y=j==="value"?Tt:Zn(Tt);if(k.attrName=ge,k.attrValue=Y,k.keepAttr=!0,k.forceKeepAttr=void 0,ye(T.uponSanitizeAttribute,u,k),Y=k.attrValue,ci&&(ge==="id"||ge==="name")&&Mi(Y,pi)!==0&&(Se(j,u),Y=pi+Y),Pe&&Z(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,Y)){Se(j,u);continue}if(ge==="attributename"&&Ai(Y,"href")){Se(j,u);continue}if(k.forceKeepAttr)continue;if(!k.keepAttr){Se(j,u);continue}if(!li&&Z(/\/>/i,Y)){Se(j,u);continue}Le&&We([B,U,Q],Ti=>{Y=Fe(Y,Ti," ")});const Li=q(u.nodeName);if(!wi(Li,ge,Y)){Se(j,u);continue}if(L&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!re)switch(f.getAttributeType(Li,ge)){case"TrustedHTML":{Y=L.createHTML(Y);break}case"TrustedScriptURL":{Y=L.createScriptURL(Y);break}}if(Y!==Tt)try{re?u.setAttributeNS(re,j,Y):u.setAttribute(j,Y),Ct(u)?ue(u):Ii(i.removed)}catch{Se(j,u)}}ye(T.afterSanitizeAttributes,u,null)},Ci=function(u){let x=null;const k=vi(u);for(ye(T.beforeSanitizeShadowDOM,u,null);x=k.nextNode();)ye(T.uponSanitizeShadowNode,x,null),yi(x),ki(x),x.content instanceof o&&Ci(x.content);ye(T.afterSanitizeShadowDOM,u,null)};return i.sanitize=function(S){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},x=null,k=null,F=null,ee=null;if(vt=!S,vt&&(S="<!-->"),typeof S!="string"&&!Lt(S)&&(S=no(S),typeof S!="string"))throw nt("dirty is not a string, aborting");if(!i.isSupported)return S;if(gt||kt(u),i.removed=[],typeof S=="string"&&(Oe=!1),Oe){const pe=S.nodeName;if(typeof pe=="string"){const ge=q(pe);if(!G[ge]||Ne[ge])throw nt("root node is forbidden and cannot be sanitized in-place")}}else if(S instanceof a)x=xi("<!---->"),k=x.ownerDocument.importNode(S,!0),k.nodeType===Ve.element&&k.nodeName==="BODY"||k.nodeName==="HTML"?x=k:x.appendChild(k);else{if(!Be&&!Le&&!Te&&S.indexOf("<")===-1)return L&&et?L.createHTML(S):S;if(x=xi(S),!x)return Be?null:et?D:""}x&&ft&&ue(x.firstChild);const j=vi(Oe?S:x);for(;F=j.nextNode();)yi(F),ki(F),F.content instanceof o&&Ci(F.content);if(Oe)return S;if(Be){if(Le){x.normalize();let pe=x.innerHTML;We([B,U,Q],ge=>{pe=Fe(pe,ge," ")}),x.innerHTML=pe}if(Qe)for(ee=M.call(x.ownerDocument);x.firstChild;)ee.appendChild(x.firstChild);else ee=x;return(J.shadowroot||J.shadowrootmode)&&(ee=I.call(t,ee,!0)),ee}let re=Te?x.outerHTML:x.innerHTML;return Te&&G["!doctype"]&&x.ownerDocument&&x.ownerDocument.doctype&&x.ownerDocument.doctype.name&&Z(Cn,x.ownerDocument.doctype.name)&&(re="<!DOCTYPE "+x.ownerDocument.doctype.name+`>
`+re),Le&&We([B,U,Q],pe=>{re=Fe(re,pe," ")}),L&&et?L.createHTML(re):re},i.setConfig=function(){let S=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};kt(S),gt=!0},i.clearConfig=function(){Re=null,gt=!1},i.isValidAttribute=function(S,u,x){Re||kt({});const k=q(S),F=q(u);return wi(k,F,x)},i.addHook=function(S,u){typeof u=="function"&&Ue(T[S],u)},i.removeHook=function(S,u){if(u!==void 0){const x=Kn(T[S],u);return x===-1?void 0:Jn(T[S],x,1)[0]}return Ii(T[S])},i.removeHooks=function(S){T[S]=[]},i.removeAllHooks=function(){T=zi()},i}var te=Ln();class xo{execute(i){i.execute()}undo(){}redo(){}}class vo{constructor(i){c(this,"name");this.name=i}}class Ni extends vo{constructor(e,t,n){super(`format:${e}`);c(this,"tag");c(this,"savedRange");c(this,"ownerDocument");c(this,"lastActionWasWrap",!1);c(this,"wrappedElement",null);c(this,"movedChildren",null);c(this,"movedChildrenParent",null);c(this,"movedChildrenAnchor",null);this.tag=e,this.savedRange=t.cloneRange(),this.ownerDocument=n}execute(){const e=this.savedRange.cloneRange();if(e.collapsed)return;const t=this.ownerDocument.getSelection();this.isTagActive(e)?(this.lastActionWasWrap=!1,this.removeFormat(e,t)):(this.lastActionWasWrap=!0,this.applyFormat(e,t))}undo(){this.lastActionWasWrap?this.undoWrap():this.undoRemove()}isTagActive(e){return this.findAncestor(e.commonAncestorContainer,this.tag)!==null}applyFormat(e,t){const n=this.ownerDocument.createElement(this.tag);try{const o=e.extractContents();if(n.appendChild(o),e.insertNode(n),this.wrappedElement=n,t){t.removeAllRanges();const s=this.ownerDocument.createRange();s.selectNodeContents(n),t.addRange(s)}}catch{}}removeFormat(e,t){const n=this.findAncestor(e.commonAncestorContainer,this.tag);if(!n||!n.parentNode)return;const o=n.parentNode,s=Array.from(n.childNodes),a=n.nextSibling;if(s.forEach(r=>o.insertBefore(r,n)),o.removeChild(n),this.movedChildren=s,this.movedChildrenParent=o,this.movedChildrenAnchor=a,t&&s.length>0){t.removeAllRanges();const r=this.ownerDocument.createRange();r.setStartBefore(s[0]),r.setEndAfter(s[s.length-1]),t.addRange(r)}}undoWrap(){if(!this.wrappedElement||!this.wrappedElement.parentNode)return;const e=this.wrappedElement.parentNode;Array.from(this.wrappedElement.childNodes).forEach(t=>e.insertBefore(t,this.wrappedElement)),e.removeChild(this.wrappedElement),this.wrappedElement=null}undoRemove(){if(!this.movedChildren||!this.movedChildrenParent)return;const e=this.ownerDocument.createElement(this.tag);this.movedChildren.forEach(t=>e.appendChild(t)),this.movedChildrenParent.insertBefore(e,this.movedChildrenAnchor),this.movedChildren=null,this.movedChildrenParent=null,this.movedChildrenAnchor=null}findAncestor(e,t){let n=e;for(;n;){if(n.nodeType===1&&n.tagName.toLowerCase()===t.toLowerCase())return n;n=n.parentNode}return null}}class Dt{static async serialize(i){const e=new TextEncoder().encode(i);if(typeof CompressionStream>"u")return e;const t=new CompressionStream("gzip"),n=t.writable.getWriter();n.write(e).then(()=>n.close());const o=await new Response(t.readable).arrayBuffer();return new Uint8Array(o)}static async deserialize(i){if(!(i.length>=2&&i[0]===31&&i[1]===139)||typeof DecompressionStream>"u")return new TextDecoder().decode(i);const t=new DecompressionStream("gzip"),n=t.writable.getWriter();n.write(new Uint8Array(i)).then(()=>n.close());const o=await new Response(t.readable).arrayBuffer();return new TextDecoder().decode(o)}}class yo{constructor(){c(this,"entries",[]);c(this,"pointer",-1);c(this,"maxSize",100)}setInitial(i){const e=new TextEncoder().encode(i);this.entries=[{data:e,label:"initial",isCheckpoint:!1}],this.pointer=0}async push(i,e,t=!1){this.entries.splice(this.pointer+1);const n=await Dt.serialize(i);this.entries.push({data:n,label:e,isCheckpoint:t}),this.pointer++,this.entries.length>this.maxSize+1&&(this.entries.shift(),this.pointer--)}async undo(){return this.canUndo()?(this.pointer--,Dt.deserialize(this.entries[this.pointer].data)):null}async redo(){return this.canRedo()?(this.pointer++,Dt.deserialize(this.entries[this.pointer].data)):null}canUndo(){return this.pointer>0}canRedo(){return this.pointer>=0&&this.pointer<this.entries.length-1}isInitialized(){return this.pointer>=0}getStackSize(){return this.entries.length}getCurrentLabel(){return this.pointer<0?null:this.entries[this.pointer].label}}class wo{constructor(i={}){c(this,"config");c(this,"commandManager");c(this,"historyManager");c(this,"root",null);c(this,"inputTimer",null);c(this,"inputHandler",()=>{this.inputTimer!==null&&clearTimeout(this.inputTimer),this.inputTimer=setTimeout(()=>{this.inputTimer=null,this.root&&this.historyManager.push(this.root.innerHTML,"input").then(()=>{var i,e;console.log("[EditorCore inputHandler] debounce push 완료 | canUndo:",this.historyManager.canUndo()),(e=(i=this.config).onHistoryPush)==null||e.call(i)})},800)});c(this,"keydownHandler",async i=>{(i.ctrlKey||i.metaKey)&&(i.key==="z"&&!i.shiftKey?(i.preventDefault(),await this.undo()):i.key==="y"||i.key==="z"&&i.shiftKey?(i.preventDefault(),await this.redo()):i.key==="b"?(i.preventDefault(),await this.bold()):i.key==="i"?(i.preventDefault(),await this.italic()):i.key==="u"&&(i.preventDefault(),await this.underline()))});this.config=i,this.commandManager=new xo,this.historyManager=new yo}mount(i){this.root=i,i.contentEditable=this.config.readonly?"false":"true",i.setAttribute("role","textbox"),i.setAttribute("aria-multiline","true"),this.config.placeholder&&(i.dataset.placeholder=this.config.placeholder),this.historyManager.setInitial(i.innerHTML),i.addEventListener("input",this.inputHandler),i.addEventListener("keydown",this.keydownHandler)}unmount(){this.root&&(this.inputTimer!==null&&(clearTimeout(this.inputTimer),this.inputTimer=null),this.root.removeEventListener("input",this.inputHandler),this.root.removeEventListener("keydown",this.keydownHandler),this.root.contentEditable="inherit",this.root.removeAttribute("role"),this.root.removeAttribute("aria-multiline"),delete this.root.dataset.placeholder,this.root=null)}async execute(i){if(!this.root)throw new Error("EditorCore가 마운트되지 않았습니다.");await this.flushInput(),this.commandManager.execute(i),await this.historyManager.push(this.root.innerHTML,i.name),console.log("[EditorCore execute] push 완료 | canUndo:",this.historyManager.canUndo(),"| canRedo:",this.historyManager.canRedo(),"| stackSize:",this.historyManager.getStackSize())}async undo(){if(!this.root)return;await this.flushInput();const i=await this.historyManager.undo();i!==null&&(this.root.innerHTML=te.sanitize(i))}async redo(){if(!this.root)return;const i=await this.historyManager.redo();i!==null&&(this.root.innerHTML=te.sanitize(i))}async flushInput(){this.inputTimer!==null&&(clearTimeout(this.inputTimer),this.inputTimer=null,this.root&&await this.historyManager.push(this.root.innerHTML,"input"))}async captureHistory(i){this.root&&await this.historyManager.push(this.root.innerHTML,i)}canUndo(){return this.historyManager.canUndo()}canRedo(){return this.historyManager.canRedo()}async bold(){await this.applyFormat("strong")}async italic(){await this.applyFormat("em")}async underline(){await this.applyFormat("u")}async applyFormatWithRange(i,e){if(!this.root)throw new Error("EditorCore가 마운트되지 않았습니다.");const t=new Ni(i,e,this.root.ownerDocument);await this.execute(t)}async strike(){await this.applyFormat("s")}isMounted(){return this.root!==null}async applyFormat(i){if(!this.root)throw new Error("EditorCore가 마운트되지 않았습니다.");const e=this.root.ownerDocument,t=e.getSelection();if(!t||t.rangeCount===0)return;const n=t.getRangeAt(0),o=new Ni(i,n,e);await this.execute(o)}}const Eo={bold:"strong",italic:"em",underline:"u",strike:"s"};class ko{constructor(){c(this,"listeners",new Map)}on(i,e){this.listeners.has(i)||this.listeners.set(i,new Set),this.listeners.get(i).add(e)}off(i,e){var t;(t=this.listeners.get(i))==null||t.delete(e)}emit(i,e){var t;(t=this.listeners.get(i))==null||t.forEach(n=>n(e))}}const P=new ko,O={FILE_NEW:"file:new",FILE_OPENED:"file:opened",FILE_SAVED:"file:saved",FILE_DIRTY:"file:dirty",AUTOSAVE_SAVED:"autosave:saved",AUTOSAVE_RESTORED:"autosave:restored",MENUBAR_CHANGE:"menubar:change",VIEW_CHANGE:"view:change"};function Tn(l){return te.sanitize(l,{USE_PROFILES:{html:!0}})}function Pi(l){return new DOMParser().parseFromString(l,"text/html").body.textContent??""}function Co(l){return l.split(`
`).map(i=>{const e=i.trim();return e===""?"<br>":`<p>${Lo(e)}</p>`}).join("")}function Lo(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function To(l){return l.nodeType===Node.ELEMENT_NODE}const So=new Set(["P","DIV","H1","H2","H3","H4","H5","H6","LI","BLOCKQUOTE","PRE","FIGURE","TD","TH"]);function rt(l){return To(l)&&So.has(l.tagName)}function _t(l,i){let e=l;for(;e&&e!==i;){if(rt(e))return e;e=e.parentNode}return null}function Io(l,i){if(i.collapsed){const o=_t(i.startContainer,l);if(o)return[o];if(i.startContainer===l){const s=l.childNodes[i.startOffset],a=l.childNodes[i.startOffset-1];if(s&&rt(s))return[s];if(a&&rt(a))return[a]}return[]}const e=i.commonAncestorContainer;if(e!==l&&!e.contains(l)){const o=_t(e,l);if(o)return[o]}const t=[];for(const o of Array.from(l.childNodes))rt(o)&&i.intersectsNode(o)&&t.push(o);if(t.length>0)return t;const n=_t(i.startContainer,l);return n?[n]:[]}function Ao(l){const i=l.style.float||getComputedStyle(l).float;if(i==="left")return"left";if(i==="right")return"right";const e=l.style.marginLeft||getComputedStyle(l).marginLeft,t=l.style.marginRight||getComputedStyle(l).marginRight;return e==="auto"&&t==="auto"?"center":"left"}function Mo(l){const i=l.style.marginLeft||getComputedStyle(l).marginLeft,e=l.style.marginRight||getComputedStyle(l).marginRight;return i==="auto"&&e==="auto"?"center":i==="auto"&&e!=="auto"?"right":"left"}const Bo=new Set(["image/png","image/jpeg","image/gif","image/webp","image/bmp"]);function Do(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function _o(l){return l.split(`
`).map(i=>{const e=i.trim();return e===""?"<br>":`<p>${Do(e)}</p>`}).join("")}function Ro(l){const i=new DOMParser().parseFromString(l,"text/html");return i.querySelectorAll("table").forEach(e=>{e.style.borderCollapse="collapse",e.style.width||(e.style.width="100%"),!e.style.border&&!e.getAttribute("border")&&(e.style.border="1px solid #000000")}),i.querySelectorAll("td, th").forEach(e=>{!e.style.border&&!e.style.borderTop&&(e.style.border="1px solid #000000"),e.style.padding||(e.style.padding="4px 8px")}),i.body.innerHTML}function Fo(l){return te.sanitize(l,{USE_PROFILES:{html:!0},ADD_ATTR:["style","border","width","height","colspan","rowspan","cellpadding","cellspacing"],ADD_TAGS:["table","tr","td","th","thead","tbody","tfoot","colgroup","col"]})}class Ho{constructor(i,e={}){c(this,"root");c(this,"options");c(this,"pasteHandler",i=>{var s,a,r,d,p;const e=(s=i.clipboardData)==null?void 0:s.items;if(e){for(const h of Array.from(e))if(Bo.has(h.type)){i.preventDefault();const g=h.getAsFile();if(!g)continue;const f=new FileReader;f.onload=m=>{var C,L,D;const b=(C=m.target)==null?void 0:C.result;if(!b)return;const w=this.root.ownerDocument,v=w.createElement("img");v.src=b,v.style.maxWidth="100%",v.alt="붙여넣기 이미지";const y=w.getSelection();if(y&&y.rangeCount>0){const _=y.getRangeAt(0);_.deleteContents(),_.insertNode(v),_.setStartAfter(v),_.collapse(!0),y.removeAllRanges(),y.addRange(_)}else this.root.appendChild(v);(D=(L=this.options).onPasteImage)==null||D.call(L)},f.readAsDataURL(g);return}}i.preventDefault();const t=((a=i.clipboardData)==null?void 0:a.getData("text/html"))??"",n=((r=i.clipboardData)==null?void 0:r.getData("text/plain"))??"";if(!t&&!n)return;let o;t?o=t.includes("<table")?Fo(Ro(t)):Tn(t):o=_o(n),o&&(this.insertAtCursor(o),(p=(d=this.options).onPaste)==null||p.call(d,o))});this.root=i,this.options=e}register(){this.root.addEventListener("paste",this.pasteHandler)}unregister(){this.root.removeEventListener("paste",this.pasteHandler)}insertAtCursor(i){const t=this.root.ownerDocument.getSelection();if(!t||t.rangeCount===0)return;const n=t.getRangeAt(0);n.deleteContents();const o=n.createContextualFragment(i),s=o.lastChild;n.insertNode(o),s&&(n.setStartAfter(s),n.collapse(!0),t.removeAllRanges(),t.addRange(n))}}class $o{constructor(i){c(this,"root");c(this,"marks",[]);c(this,"currentIndex",-1);this.root=i}find(i,e={}){if(this.clearMarks(),!i.trim())return{count:0,current:-1};const t=this.buildRegex(i,e),n=this.collectTextNodes();for(let o=n.length-1;o>=0;o--){const s=n[o],a=s.nodeValue??"",r=[];let d;for(;(d=t.exec(a))!==null;)r.push([d.index,d.index+d[0].length]);for(let p=r.length-1;p>=0;p--){const h=this.wrapRange(s,r[p][0],r[p][1]);h&&this.marks.unshift(h)}}return this.marks.length>0&&(this.currentIndex=0,this.applyHighlight()),{count:this.marks.length,current:this.marks.length>0?0:-1}}next(){return this.marks.length===0?{count:0,current:-1}:(this.currentIndex=(this.currentIndex+1)%this.marks.length,this.applyHighlight(),{count:this.marks.length,current:this.currentIndex})}prev(){return this.marks.length===0?{count:0,current:-1}:(this.currentIndex=(this.currentIndex-1+this.marks.length)%this.marks.length,this.applyHighlight(),{count:this.marks.length,current:this.currentIndex})}replaceCurrent(i){return this.marks.length===0||this.currentIndex<0?{count:0,current:-1}:(this.marks[this.currentIndex].replaceWith(this.root.ownerDocument.createTextNode(i)),this.marks.splice(this.currentIndex,1),this.marks.length===0?(this.currentIndex=-1,{count:0,current:-1,replaced:!0}):(this.currentIndex=Math.min(this.currentIndex,this.marks.length-1),this.applyHighlight(),{count:this.marks.length,current:this.currentIndex,replaced:!0}))}replaceAll(i,e,t={}){this.find(i,t);const n=this.marks.length,o=this.root.ownerDocument;for(const s of this.marks)s.replaceWith(o.createTextNode(e));return this.marks=[],this.currentIndex=-1,n}clearMarks(){for(const i of this.marks){if(!i.parentNode)continue;const e=i.ownerDocument.createDocumentFragment();for(;i.firstChild;)e.appendChild(i.firstChild);i.parentNode.replaceChild(e,i)}this.marks=[],this.currentIndex=-1}buildRegex(i,e){const t=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),n=e.wholeWord?`\\b${t}\\b`:t;return new RegExp(n,e.caseSensitive?"g":"gi")}collectTextNodes(){var n;const i=[],e=this.root.ownerDocument.createTreeWalker(this.root,NodeFilter.SHOW_TEXT);let t;for(;(t=e.nextNode())!==null;)(n=t.nodeValue)!=null&&n.trim()&&i.push(t);return i}wrapRange(i,e,t){try{const n=i.ownerDocument,o=n.createRange();o.setStart(i,e),o.setEnd(i,t);const s=n.createElement("mark");return s.dataset.poaMark="true",o.surroundContents(s),s}catch{return null}}applyHighlight(){var i,e;this.marks.forEach((t,n)=>{const o=n===this.currentIndex;t.style.background=o?"#F59E0B":"#FEF3C7",t.style.color=o?"#FFFFFF":"",t.style.outline=""}),(e=(i=this.marks[this.currentIndex])==null?void 0:i.scrollIntoView)==null||e.call(i,{block:"nearest",behavior:"smooth"})}}const Oi=new Set(["jpg","jpeg","png","gif","webp","svg"]);class zo{constructor(i){c(this,"root");c(this,"savedRange",null);this.root=i}saveSelection(){const i=this.root.ownerDocument.getSelection();i&&i.rangeCount>0&&(this.savedRange=i.getRangeAt(0).cloneRange())}insertFromUrl(i){if(!i.alt.trim())throw new Error("alt 텍스트는 필수입니다. 접근성을 위해 이미지 설명을 입력하세요.");const e=this.buildImg(i);this.insertNode(e)}async uploadAndInsert(i,e,t){this.validateExtension(i.name);const n=await this.doUpload(i,t);this.insertFromUrl({...e,src:n})}validateExtension(i){var t;const e=((t=i.split(".").pop())==null?void 0:t.toLowerCase())??"";if(!Oi.has(e))throw new Error(`지원하지 않는 파일 형식입니다. (허용: ${[...Oi].join(", ")})`)}async doUpload(i,e){const t=new FormData;t.append(e.fieldName??"file",i);const n=await fetch(e.uploadUrl,{method:"POST",headers:e.headers,body:t});if(!n.ok)throw new Error(`업로드 실패: HTTP ${n.status}`);const o=await n.json();if(!o.url)throw new Error("서버에서 URL을 반환하지 않았습니다.");return o.url}buildImg(i){const t=this.root.ownerDocument.createElement("img");return t.src=i.src,t.alt=i.alt,i.title&&(t.title=i.title),i.width&&(t.style.width=i.width),i.height&&(t.style.height=i.height),i.border&&(t.style.border=i.border),(i.align==="left"||i.align==="right")&&(t.style.float=i.align),i.id&&(t.id=i.id),i.className&&(t.className=i.className),t}insertNode(i){const e=this.root.ownerDocument,t=e.getSelection();let n;this.savedRange?(n=this.savedRange.cloneRange(),this.savedRange=null):t&&t.rangeCount>0?n=t.getRangeAt(0):(n=e.createRange(),n.selectNodeContents(this.root),n.collapse(!1)),n.deleteContents(),n.insertNode(i),n.setStartAfter(i),n.collapse(!0),t==null||t.removeAllRanges(),t==null||t.addRange(n)}}const No=[{description:"HTML 파일",accept:{"text/html":[".html",".htm"]}}],Po=[{description:"HTML 파일",accept:{"text/html":[".html",".htm"]}},{description:"텍스트 파일",accept:{"text/plain":[".txt"]}}];class Oo{constructor(){c(this,"fileHandle",null);c(this,"dirty",!1);c(this,"currentName","새 문서");c(this,"beforeUnloadHandler",i=>{this.dirty&&(i.preventDefault(),i.returnValue="")});window.addEventListener("beforeunload",this.beforeUnloadHandler)}destroy(){window.removeEventListener("beforeunload",this.beforeUnloadHandler)}isDirty(){return this.dirty}markDirty(){this.dirty=!0,P.emit(O.FILE_DIRTY,!0)}markClean(){this.dirty=!1,P.emit(O.FILE_DIRTY,!1)}getCurrentName(){return this.currentName}hasFileSystemAccess(){return typeof window<"u"&&"showOpenFilePicker"in window}newDocument(){this.fileHandle=null,this.currentName="새 문서",this.markClean(),P.emit(O.FILE_NEW,void 0)}async openFile(){return this.hasFileSystemAccess()?this.openWithFSA():this.openWithInput()}async openWithFSA(){try{const[i]=await window.showOpenFilePicker({types:Po,multiple:!1}),e=await i.getFile(),t=await e.text(),n=this.toHtml(e.name,t);this.fileHandle=i,this.currentName=e.name,this.markClean();const o={name:e.name,html:n};return P.emit(O.FILE_OPENED,o),o}catch(i){if(i.name!=="AbortError")throw i;return null}}openWithInput(){return new Promise(i=>{const e=document.createElement("input");e.type="file",e.accept=".html,.htm,.txt",e.onchange=async()=>{var a;const t=(a=e.files)==null?void 0:a[0];if(!t){i(null);return}const n=await t.text(),o=this.toHtml(t.name,n);this.fileHandle=null,this.currentName=t.name,this.markClean();const s={name:t.name,html:o};P.emit(O.FILE_OPENED,s),i(s)},e.addEventListener("cancel",()=>i(null)),e.click()})}async saveFile(i){return this.fileHandle?this.writeToHandle(this.fileHandle,i,this.currentName):this.saveAsFile(i)}async saveAsFile(i,e="document.html"){return this.hasFileSystemAccess()?this.saveWithFSA(i,e):this.saveWithDownload(i,e)}async saveWithFSA(i,e){try{const t=await window.showSaveFilePicker({suggestedName:e,types:No});return this.writeToHandle(t,i,t.name)}catch(t){if(t.name!=="AbortError")throw t;return!1}}async writeToHandle(i,e,t){const n=await i.createWritable();return await n.write(e),await n.close(),this.fileHandle=i,this.currentName=t,this.markClean(),P.emit(O.FILE_SAVED,{name:t}),!0}saveWithDownload(i,e){const t=e.endsWith(".txt"),n=t?Pi(i):i,o=t?"text/plain":"text/html",s=new Blob([n],{type:`${o};charset=utf-8`}),a=URL.createObjectURL(s),r=document.createElement("a");return r.href=a,r.download=e,r.click(),URL.revokeObjectURL(a),this.markClean(),P.emit(O.FILE_SAVED,{name:e}),!0}htmlToPlainText(i){return Pi(i)}toHtml(i,e){return i.endsWith(".txt")?Co(e):Tn(e)}}const Xt=(l,i)=>i.some(e=>l instanceof e);let ji,Wi;function jo(){return ji||(ji=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Wo(){return Wi||(Wi=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Kt=new WeakMap,Rt=new WeakMap,ht=new WeakMap;function Uo(l){const i=new Promise((e,t)=>{const n=()=>{l.removeEventListener("success",o),l.removeEventListener("error",s)},o=()=>{e(Me(l.result)),n()},s=()=>{t(l.error),n()};l.addEventListener("success",o),l.addEventListener("error",s)});return ht.set(i,l),i}function qo(l){if(Kt.has(l))return;const i=new Promise((e,t)=>{const n=()=>{l.removeEventListener("complete",o),l.removeEventListener("error",s),l.removeEventListener("abort",s)},o=()=>{e(),n()},s=()=>{t(l.error||new DOMException("AbortError","AbortError")),n()};l.addEventListener("complete",o),l.addEventListener("error",s),l.addEventListener("abort",s)});Kt.set(l,i)}let Jt={get(l,i,e){if(l instanceof IDBTransaction){if(i==="done")return Kt.get(l);if(i==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Me(l[i])},set(l,i,e){return l[i]=e,!0},has(l,i){return l instanceof IDBTransaction&&(i==="done"||i==="store")?!0:i in l}};function Sn(l){Jt=l(Jt)}function Vo(l){return Wo().includes(l)?function(...i){return l.apply(Zt(this),i),Me(this.request)}:function(...i){return Me(l.apply(Zt(this),i))}}function Go(l){return typeof l=="function"?Vo(l):(l instanceof IDBTransaction&&qo(l),Xt(l,jo())?new Proxy(l,Jt):l)}function Me(l){if(l instanceof IDBRequest)return Uo(l);if(Rt.has(l))return Rt.get(l);const i=Go(l);return i!==l&&(Rt.set(l,i),ht.set(i,l)),i}const Zt=l=>ht.get(l);function Yo(l,i,{blocked:e,upgrade:t,blocking:n,terminated:o}={}){const s=indexedDB.open(l,i),a=Me(s);return t&&s.addEventListener("upgradeneeded",r=>{t(Me(s.result),r.oldVersion,r.newVersion,Me(s.transaction),r)}),e&&s.addEventListener("blocked",r=>e(r.oldVersion,r.newVersion,r)),a.then(r=>{o&&r.addEventListener("close",()=>o()),n&&r.addEventListener("versionchange",d=>n(d.oldVersion,d.newVersion,d))}).catch(()=>{}),a}const Xo=["get","getKey","getAll","getAllKeys","count"],Ko=["put","add","delete","clear"],Ft=new Map;function Ui(l,i){if(!(l instanceof IDBDatabase&&!(i in l)&&typeof i=="string"))return;if(Ft.get(i))return Ft.get(i);const e=i.replace(/FromIndex$/,""),t=i!==e,n=Ko.includes(e);if(!(e in(t?IDBIndex:IDBObjectStore).prototype)||!(n||Xo.includes(e)))return;const o=async function(s,...a){const r=this.transaction(s,n?"readwrite":"readonly");let d=r.store;return t&&(d=d.index(a.shift())),(await Promise.all([d[e](...a),n&&r.done]))[0]};return Ft.set(i,o),o}Sn(l=>({...l,get:(i,e,t)=>Ui(i,e)||l.get(i,e,t),has:(i,e)=>!!Ui(i,e)||l.has(i,e)}));const Jo=["continue","continuePrimaryKey","advance"],qi={},Qt=new WeakMap,In=new WeakMap,Zo={get(l,i){if(!Jo.includes(i))return l[i];let e=qi[i];return e||(e=qi[i]=function(...t){Qt.set(this,In.get(this)[i](...t))}),e}};async function*Qo(...l){let i=this;if(i instanceof IDBCursor||(i=await i.openCursor(...l)),!i)return;i=i;const e=new Proxy(i,Zo);for(In.set(e,i),ht.set(e,Zt(i));i;)yield e,i=await(Qt.get(e)||i.continue()),Qt.delete(e)}function Vi(l,i){return i===Symbol.asyncIterator&&Xt(l,[IDBIndex,IDBObjectStore,IDBCursor])||i==="iterate"&&Xt(l,[IDBIndex,IDBObjectStore])}Sn(l=>({...l,get(i,e,t){return Vi(i,e)?Qo:l.get(i,e,t)},has(i,e){return Vi(i,e)||l.has(i,e)}}));const es="poa-editor-autosave",Ie="snapshots",ts=10,is=5*60*1e3;class ns{constructor(i=is){c(this,"timer",null);c(this,"intervalMs");this.intervalMs=i}start(i){this.stop(),this.timer=setInterval(()=>{this.saveNow(i())},this.intervalMs)}stop(){this.timer!==null&&(clearInterval(this.timer),this.timer=null)}isRunning(){return this.timer!==null}async saveNow(i){const t=(await this.openDB()).transaction(Ie,"readwrite");await t.store.put({html:i,savedAt:Date.now()});const n=await t.store.getAllKeys();n.length>ts&&await t.store.delete(n[0]),await t.done,P.emit(O.AUTOSAVE_SAVED,{savedAt:Date.now()})}async listSnapshots(){const i=await this.openDB(),[e,t]=await Promise.all([i.getAllKeys(Ie),i.getAll(Ie)]);return t.map((n,o)=>({id:e[o],html:n.html,savedAt:n.savedAt})).reverse()}async restoreSnapshot(i){const t=await(await this.openDB()).get(Ie,i);return(t==null?void 0:t.html)??null}async clearAll(){await(await this.openDB()).clear(Ie)}async openDB(){return Yo(es,1,{upgrade(i){i.objectStoreNames.contains(Ie)||i.createObjectStore(Ie,{autoIncrement:!0})}})}}const os=new Set(["p","div","h1","h2","h3","h4","h5","h6","li","blockquote","pre"]);class Xe{static build(i,e=document){const{rows:t,cols:n,width:o,height:s,border:a=1,marginLeft:r=0,align:d="left",headerPosition:p="none",borderColor:h="#000000",bgColor:g,id:f,className:m,caption:b,captionVisible:w=!0,summary:v}=i,y=e.createElement("table"),C={"border-collapse":"collapse","max-width":"100%","table-layout":"fixed","word-break":"break-word"};o&&(C.width=o),s&&(C.height=s),g&&(C["background-color"]=g),d==="center"?(C["margin-left"]="auto",C["margin-right"]="auto"):d==="right"?(C["margin-left"]="auto",C["margin-right"]="0"):r>0&&(C["margin-left"]=`${r}px`),y.style.cssText=Object.entries(C).map(([I,T])=>`${I}:${T}`).join(";");const L=e.createElement("colgroup"),D=(100/n).toFixed(4);for(let I=0;I<n;I++){const T=e.createElement("col");T.style.width=`${D}%`,L.appendChild(T)}if(y.appendChild(L),a>0&&y.setAttribute("border",String(a)),y.setAttribute("cellpadding","4"),y.setAttribute("cellspacing","0"),v!=null&&v.trim()&&y.setAttribute("summary",v.trim()),f&&(y.id=f),m&&(y.className=m),b!=null&&b.trim()){const I=e.createElement("caption");I.textContent=b.trim(),w||(I.style.display="none"),y.appendChild(I)}const _=a>0?`border:${a}px solid ${h};padding:4px;overflow:hidden;word-break:break-word;`:"border:none;padding:4px;overflow:hidden;word-break:break-word;",ie=_+"background:#f5f5f5;font-weight:bold;";if(p==="top"&&t>0){const I=e.createElement("thead"),T=e.createElement("tr");for(let B=0;B<n;B++){const U=e.createElement("th");U.setAttribute("scope","col"),U.style.cssText=ie,U.innerHTML="&nbsp;",T.appendChild(U)}I.appendChild(T),y.appendChild(I)}const M=e.createElement("tbody"),R=p==="top"&&t>0?t-1:t;for(let I=0;I<R;I++){const T=e.createElement("tr");for(let B=0;B<n;B++)if(p==="left"&&B===0){const Q=e.createElement("th");Q.setAttribute("scope","row"),Q.style.cssText=ie,Q.innerHTML="&nbsp;",T.appendChild(Q)}else{const Q=e.createElement("td");Q.style.cssText=_,Q.innerHTML="&nbsp;",T.appendChild(Q)}M.appendChild(T)}return y.appendChild(M),y}static applyOptions(i,e){const{width:t,height:n,border:o,marginLeft:s,align:a,borderColor:r,bgColor:d,id:p,className:h,caption:g,captionVisible:f,summary:m}=e;if(i.style.tableLayout="fixed",i.style.wordBreak="break-word",t!==void 0&&(i.style.width=t),n!==void 0&&(i.style.height=n||""),d!==void 0&&(i.style.backgroundColor=d||""),p!==void 0&&(i.id=p||""),h!==void 0&&(i.className=h||""),a!==void 0?(i.style.marginLeft="",i.style.marginRight="",a==="center"?(i.style.marginLeft="auto",i.style.marginRight="auto"):a==="right"?(i.style.marginLeft="auto",i.style.marginRight="0"):(s??0)>0&&(i.style.marginLeft=`${s}px`)):s!==void 0&&(i.style.marginLeft=s>0?`${s}px`:""),o!==void 0&&(o>0?i.setAttribute("border",String(o)):i.removeAttribute("border")),r!==void 0){const b=o??(parseInt(i.getAttribute("border")||"1",10)||1),w=b>0?`${b}px solid ${r}`:"none";for(const v of Array.from(i.querySelectorAll("td, th")))v.style.border=w}if(m!==void 0&&(m.trim()?i.setAttribute("summary",m.trim()):i.removeAttribute("summary")),g!==void 0||f!==void 0){let b=i.querySelector("caption");const w=g??(b==null?void 0:b.textContent)??"",v=b?b.style.display==="none":!1,y=f??!v;w.trim()?(b||(b=i.ownerDocument.createElement("caption"),i.insertBefore(b,i.firstChild)),b.textContent=w.trim(),b.style.display=y?"":"none"):b&&b.remove()}}static readOptions(i){var d;const e=parseInt(i.getAttribute("border")??"1",10);let t="left";i.style.marginLeft==="auto"&&i.style.marginRight==="auto"?t="center":i.style.marginLeft==="auto"&&(t="right");const n=i.querySelector("caption"),o=i.querySelector("td, th");let s="#000000";if(o){const p=o.style.border.match(/solid\s+(#[\da-fA-F]{3,6}|[a-z]+)/i);p&&(s=p[1])}let a="none";i.querySelector("thead")?a="top":i.querySelector("tbody tr:first-child th")&&(a="left");const r=parseFloat(i.style.marginLeft)||0;return{width:i.style.width||i.getAttribute("width")||"",height:i.style.height||"",border:isNaN(e)?1:e,marginLeft:t==="left"?r:0,align:t,headerPosition:a,borderColor:s,bgColor:i.style.backgroundColor||"",id:i.id||"",className:i.className||"",caption:((d=n==null?void 0:n.textContent)==null?void 0:d.trim())||"",captionVisible:n?n.style.display!=="none":!0,summary:i.getAttribute("summary")||""}}static insert(i,e){const t=e.ownerDocument,n=t.getSelection(),o=t.createElement("p");if(o.innerHTML="&nbsp;",n&&n.rangeCount>0){const s=n.getRangeAt(0);if(e.contains(s.startContainer)){const a=Xe.findBlockAncestor(s.startContainer,e);a&&a!==e?a.insertAdjacentElement("afterend",i):(s.deleteContents(),s.insertNode(i)),i.insertAdjacentElement("afterend",o);try{const r=t.createRange();r.setStart(o.firstChild,0),r.collapse(!0),n.removeAllRanges(),n.addRange(r)}catch{}return}}e.appendChild(i),e.appendChild(o)}static findBlockAncestor(i,e){let t=i;for(;t&&t!==e;){if(t.nodeType===Node.ELEMENT_NODE&&os.has(t.tagName.toLowerCase()))return t;t=t.parentNode}return null}}function de(l){const i=Array.from(l.rows),e=i.map(()=>[]);for(let t=0;t<i.length;t++){let n=0;for(const o of Array.from(i[t].cells)){const s=o;for(;e[t][n]!==void 0&&e[t][n]!==null;)n++;const a=Math.max(s.rowSpan,1),r=Math.max(s.colSpan,1),d={cell:s,row:t,col:n};for(let p=0;p<a&&t+p<i.length;p++){e[t+p]||(e[t+p]=[]);for(let h=0;h<r;h++)e[t+p][n+h]=d}n+=r}}return e}const V=class V{constructor(){c(this,"contentEl",null);c(this,"selectedCells",new Set);c(this,"anchorCell",null);c(this,"currentTable",null);c(this,"clickHandler",i=>{var n,o;const e=this.findCell(i.target);if(!e){(o=(n=i.target).closest)!=null&&o.call(n,"table")||this.clearSelection();return}const t=e.closest("table");i.shiftKey&&this.anchorCell&&t===this.currentTable?(i.preventDefault(),this.selectRange(this.anchorCell,e)):(this.clearSelection(),this.currentTable=t,this.anchorCell=e,this.selectCell(e))})}attach(i){this.detach(),this.contentEl=i,i.addEventListener("click",this.clickHandler),V.injectStyles(i.ownerDocument)}detach(){this.contentEl&&(this.contentEl.removeEventListener("click",this.clickHandler),this.contentEl=null),this.clearSelection(),this.anchorCell=null,this.currentTable=null}getSelectedCells(){return Array.from(this.selectedCells)}getSelectedTable(){return this.currentTable}selectTo(i){this.anchorCell?this.selectRange(this.anchorCell,i):(this.clearSelection(),this.anchorCell=i,this.currentTable=i.closest("table"),this.selectCell(i))}setAnchor(i){this.clearSelection(),this.currentTable=i.closest("table"),this.anchorCell=i,this.selectCell(i)}clearSelection(){for(const i of this.selectedCells)i.classList.remove("poa-cell-selected","poa-cell-sel-ok","poa-cell-sel-bad");this.selectedCells.clear()}merge(){if(!this.currentTable)return{success:!1,message:"선택된 표가 없습니다."};if(this.selectedCells.size<2)return{success:!1,message:"병합할 셀을 2개 이상 선택하세요."};const i=V.mergeCells(Array.from(this.selectedCells),this.currentTable);return i.success&&this.clearSelection(),i}static mergeCells(i,e){var g,f,m,b,w,v;if(i.length<2)return{success:!1,message:"병합할 셀을 2개 이상 선택하세요."};const t=de(e),n=new Set(i);let o=1/0,s=-1/0,a=1/0,r=-1/0;for(let y=0;y<t.length;y++)for(let C=0;C<(((g=t[y])==null?void 0:g.length)??0);C++){const L=(f=t[y])==null?void 0:f[C];L&&n.has(L.cell)&&(y<o&&(o=y),y>s&&(s=y),C<a&&(a=C),C>r&&(r=C))}for(let y=o;y<=s;y++)for(let C=a;C<=r;C++){const L=(m=t[y])==null?void 0:m[C];if(!L||!n.has(L.cell))return{success:!1,message:"병합 불가: 선택 영역이 직사각형이 아닙니다."}}const d=(w=(b=t[o])==null?void 0:b[a])==null?void 0:w.cell;if(!d)return{success:!1};const p=[],h=new Set;for(let y=o;y<=s;y++)for(let C=a;C<=r;C++){const L=(v=t[y])==null?void 0:v[C];if(!L||L.row!==y||L.col!==C||L.cell===d)continue;const D=L.cell.innerHTML.replace(/^(\s|&nbsp;)*$/i,"").trim();D&&p.push(D),h.add(L.cell)}if(p.length>0){const y=d.innerHTML.replace(/^(\s|&nbsp;)*$/i,"").trim();d.innerHTML=[y,...p].filter(Boolean).join(" ")||"&nbsp;"}d.colSpan=r-a+1,d.rowSpan=s-o+1;for(const y of h)y.remove();return{success:!0}}static splitCellHorizontal(i,e){var h,g;const t=Math.max(i.colSpan,1);if(t===1)return;const n=de(e),o=i.ownerDocument,s=i.tagName.toLowerCase();let a=-1,r=-1;e:for(let f=0;f<n.length;f++)for(let m=0;m<(((h=n[f])==null?void 0:h.length)??0);m++){const b=(g=n[f])==null?void 0:g[m];if((b==null?void 0:b.cell)===i&&b.row===f&&b.col===m){a=f,r=m;break e}}if(a===-1)return;const d=Math.max(i.rowSpan,1);i.colSpan=1;let p=i;for(let f=1;f<t;f++){const m=V.makeEmptyCell(o,s,i.style.cssText);m.rowSpan=d,p.insertAdjacentElement("afterend",m),p=m}if(d>1){const f=Array.from(e.rows);for(let m=1;m<d;m++){const b=f[a+m];if(!b)continue;const w=V.findInsertBefore(n,a+m,r+t-1,b);for(let v=0;v<t;v++){const y=V.makeEmptyCell(o,s,i.style.cssText);w?b.insertBefore(y,w):b.appendChild(y)}}i.rowSpan=1}}static splitCellVertical(i,e){var h,g;const t=Math.max(i.rowSpan,1);if(t===1)return;const n=de(e),o=Array.from(e.rows),s=i.ownerDocument,a=i.tagName.toLowerCase();let r=-1,d=-1;e:for(let f=0;f<n.length;f++)for(let m=0;m<(((h=n[f])==null?void 0:h.length)??0);m++){const b=(g=n[f])==null?void 0:g[m];if((b==null?void 0:b.cell)===i&&b.row===f&&b.col===m){r=f,d=m;break e}}if(r===-1)return;const p=Math.max(i.colSpan,1);i.rowSpan=1;for(let f=1;f<t;f++){const m=o[r+f];if(!m)continue;const b=V.findInsertBefore(n,r+f,d+p-1,m);for(let w=0;w<p;w++){const v=V.makeEmptyCell(s,a,i.style.cssText);b?m.insertBefore(v,b):m.appendChild(v)}}}static applyCellProperties(i,e){const{borderStyle:t,borderWidth:n,borderColor:o,indent:s,bgColor:a,fontSize:r,id:d,className:p}=e;if(t!==void 0||n!==void 0||o!==void 0){const h=t??"solid",g=n??1,f=o??"#000000";i.style.border=h==="none"?"none":`${g}px ${h} ${f}`}if(s!==void 0&&(i.style.paddingLeft=s>0?`${s}px`:""),a!==void 0&&(i.style.backgroundColor=a),r!==void 0){const h=r>0?`${r}px`:"";i.style.fontSize=h,i.querySelectorAll('[style*="font-size"]').forEach(g=>{g.style.fontSize=h})}d!==void 0&&(i.id=d),p!==void 0&&(i.className=p)}static readCellProperties(i){const e=i.style.border.match(/^(\d+)px\s+(\S+)\s+(.+)$/);return{borderStyle:(e==null?void 0:e[2])??"solid",borderWidth:e?parseInt(e[1],10):1,borderColor:(e==null?void 0:e[3])??"#000000",indent:parseFloat(i.style.paddingLeft)||0,bgColor:i.style.backgroundColor||"",fontSize:parseFloat(i.style.fontSize)||0,id:i.id||"",className:i.className||""}}findCell(i){let e=i;for(;e;){if(e.nodeType===Node.ELEMENT_NODE){const t=e.tagName.toLowerCase();if(t==="td"||t==="th")return e;if(t==="table")break}e=e.parentNode}return null}selectCell(i){this.selectedCells.add(i),i.classList.add("poa-cell-selected")}selectRange(i,e){var g,f,m;const t=i.closest("table");if(!t||e.closest("table")!==t)return;const n=de(t),o=new Map;for(let b=0;b<n.length;b++)for(let w=0;w<(((g=n[b])==null?void 0:g.length)??0);w++){const v=(f=n[b])==null?void 0:f[w];v&&v.row===b&&v.col===w&&o.set(v.cell,{r:b,c:w})}const s=o.get(i),a=o.get(e);if(!s||!a)return;const r=Math.min(s.r,a.r),d=Math.max(s.r,a.r),p=Math.min(s.c,a.c),h=Math.max(s.c,a.c);this.clearSelection();for(let b=r;b<=d;b++)for(let w=p;w<=h;w++){const v=(m=n[b])==null?void 0:m[w];v&&v.row===b&&v.col===w&&this.selectCell(v.cell)}}static splitCell(i,e,t,n){var h,g,f,m,b,w,v;const o=Math.max(t,1),s=Math.max(n,1);if(o<=1&&s<=1)return;const a=i.ownerDocument,r=i.tagName.toLowerCase();let d=1,p=[Math.max(i.colSpan,1)];if(o>1){const y=de(e),C=Array.from(e.rows),L=Math.max(i.colSpan,1),D=Math.max(i.rowSpan,1);let _=-1,ie=-1;e:for(let M=0;M<y.length;M++)for(let R=0;R<(((h=y[M])==null?void 0:h.length)??0);R++){const I=(g=y[M])==null?void 0:g[R];if((I==null?void 0:I.cell)===i&&I.row===M&&I.col===R){_=M,ie=R;break e}}if(_!==-1)if(o<=L){const M=V.distribute(L,o);d=o,p=M,i.colSpan=M[0];let R=i;for(let I=1;I<o;I++){const T=V.makeEmptyCell(a,r,i.style.cssText);T.colSpan=M[I],T.rowSpan=D,R.insertAdjacentElement("afterend",T),R=T}}else{const M=o-1;d=o,p=new Array(o).fill(1);let R=i;for(let T=0;T<M;T++){const B=V.makeEmptyCell(a,r,i.style.cssText);R.insertAdjacentElement("afterend",B),R=B}const I=new Set;for(let T=0;T<C.length;T++){if(T>=_&&T<_+D)continue;const B=(f=y[T])==null?void 0:f[ie];!B||B.cell===i||I.has(B.cell)||(I.add(B.cell),B.cell.colSpan+=M)}}}if(s>1){const y=de(e),C=Array.from(e.rows),L=Math.max(i.colSpan,1),D=Math.max(i.rowSpan,1);let _=-1,ie=-1;e:for(let M=0;M<y.length;M++)for(let R=0;R<(((m=y[M])==null?void 0:m.length)??0);R++){const I=(b=y[M])==null?void 0:b[R];if((I==null?void 0:I.cell)===i&&I.row===M&&I.col===R){_=M,ie=R;break e}}if(_===-1)return;if(s<=D){const M=V.distribute(D,s);i.rowSpan=M[0];let R=M[0];for(let I=1;I<s;I++){const T=C[_+R];if(T){const B=V.findInsertBefore(y,_+R,ie+L-1,T),U=V.makeEmptyCell(a,r,i.style.cssText);U.colSpan=L,U.rowSpan=M[I],B?T.insertBefore(U,B):T.appendChild(U)}R+=M[I]}}else{const M=s-1;let R=C[_];for(let T=0;T<M;T++){const B=a.createElement("tr");for(let U=0;U<d;U++){const Q=V.makeEmptyCell(a,r,i.style.cssText);Q.colSpan=p[U]??1,B.appendChild(Q)}R.insertAdjacentElement("afterend",B),R=B}const I=new Set;for(let T=0;T<(((w=y[_])==null?void 0:w.length)??0);T++){if(T>=ie&&T<ie+L)continue;const B=(v=y[_])==null?void 0:v[T];!B||B.cell===i||I.has(B.cell)||(I.add(B.cell),B.cell.rowSpan+=M)}}}}static distribute(i,e){if(e<=0)return[i];const t=Math.floor(i/e),n=i%e;return Array.from({length:e},(o,s)=>t+(s<n?1:0))}static findInsertBefore(i,e,t,n){const o=i[e];if(!o)return null;for(let s=t+1;s<o.length;s++){const a=o[s];if(a&&a.row===e&&a.col===s&&a.cell.parentElement===n)return a.cell}return null}static makeEmptyCell(i,e,t){const n=i.createElement(e);return n.style.cssText=t,n.innerHTML="&nbsp;",n}static injectStyles(i){if(V._stylesInjected)return;V._stylesInjected=!0;const e=i.createElement("style");e.id="poa-cell-merger-styles",e.textContent=[".poa-cell-selected{outline:2px solid rgba(0,120,215,0.8)!important;outline-offset:-2px!important;background:rgba(0,120,215,0.15)!important;}",".poa-cell-sel-ok{outline:2px solid rgba(0,120,215,0.8)!important;outline-offset:-2px!important;background:rgba(0,120,215,0.15)!important;}",".poa-cell-sel-bad{outline:2px solid #c62828!important;outline-offset:-2px!important;background:rgba(198,40,40,0.12)!important;}"].join(""),i.head.appendChild(e)}};c(V,"_stylesInjected",!1);let ce=V;class ss{constructor(i={},e={}){c(this,"contentEl",null);c(this,"menuEl",null);c(this,"cb");c(this,"noMenu");c(this,"keydownHandler",i=>{if(i.key!=="Tab")return;const e=this.findCell(i.target);e&&(i.preventDefault(),i.shiftKey?this.navigatePrev(e):this.navigateNext(e))});c(this,"contextmenuHandler",i=>{if(this.noMenu)return;const e=this.findCell(i.target);e&&(i.preventDefault(),this.showContextMenu(i.clientX,i.clientY,e))});c(this,"dismissMenu",i=>{this.menuEl&&!this.menuEl.contains(i.target)&&this.hideContextMenu()});this.cb=i,this.noMenu=e.noMenu??!1}attach(i){this.detach(),this.contentEl=i,i.addEventListener("keydown",this.keydownHandler),i.addEventListener("contextmenu",this.contextmenuHandler)}detach(){this.contentEl&&(this.contentEl.removeEventListener("keydown",this.keydownHandler),this.contentEl.removeEventListener("contextmenu",this.contextmenuHandler),this.contentEl=null),this.hideContextMenu()}navigateNext(i){var o,s;const e=i.closest("table"),t=this.getAllCells(e),n=t.indexOf(i);if(n<t.length-1)this.focusCell(t[n+1]);else{this.appendRow(e);const a=this.getAllCells(e);this.focusCell(a[n+1]??a[a.length-1]),(s=(o=this.cb).onModified)==null||s.call(o)}}navigatePrev(i){const e=i.closest("table"),t=this.getAllCells(e),n=t.indexOf(i);n>0&&this.focusCell(t[n-1])}focusCell(i){i.focus();const e=i.ownerDocument,t=e.createRange();t.selectNodeContents(i),t.collapse(!1);const n=e.getSelection();n&&(n.removeAllRanges(),n.addRange(t))}getAllCells(i){return Array.from(i.querySelectorAll("td, th"))}appendRow(i){const e=i.querySelector("tbody")??i,t=e.querySelector("tr:last-child");if(!t)return;const n=i.ownerDocument,o=n.createElement("tr"),s=Array.from(t.cells).reduce((r,d)=>r+Math.max(d.colSpan,1),0),a=t.cells[0].style.cssText;for(let r=0;r<s;r++){const d=n.createElement("td");d.style.cssText=a,d.innerHTML="&nbsp;",o.appendChild(d)}e.appendChild(o)}showContextMenu(i,e,t){this.hideContextMenu();const n=t.closest("table"),o=t.ownerDocument,a=n.querySelectorAll(".poa-cell-selected").length>=2,r=t.colSpan>1,d=t.rowSpan>1,p=de(n),h=Math.max(...p.map(b=>b.length)),g=n.rows.length,f=[{label:"위에 행 삽입",action:()=>this.insertRowAbove(t,n)},{label:"아래에 행 삽입",action:()=>this.insertRowBelow(t,n)},{label:"왼쪽에 열 삽입",action:()=>this.insertColLeft(t,n)},{label:"오른쪽에 열 삽입",action:()=>this.insertColRight(t,n)},"---",{label:"행 삭제",action:()=>this.deleteRow(t,n),disabled:g<=1},{label:"열 삭제",action:()=>this.deleteCol(t,n),disabled:h<=1},{label:"표 삭제",action:()=>this.deleteTable(n)},"---",{label:"셀 병합",action:()=>this.doMerge(),disabled:!a},{label:"수평 분할",action:()=>this.doSplitH(t,n),disabled:!r},{label:"수직 분할",action:()=>this.doSplitV(t,n),disabled:!d},"---",{label:"셀 속성",action:()=>this.showCellPropsModal(t)},{label:"표 속성",action:()=>{var b,w;return(w=(b=this.cb).onOpenTableProps)==null?void 0:w.call(b,n)}}],m=o.createElement("div");m.style.cssText=["position:fixed",`left:${i}px`,`top:${e}px`,"background:#fff","border:1px solid #ccc","border-radius:4px","box-shadow:0 4px 12px rgba(0,0,0,0.15)","z-index:9999","font-size:13px","user-select:none","min-width:160px","padding:4px 0"].join(";");for(const b of f){if(b==="---"){const v=o.createElement("hr");v.style.cssText="border:none;border-top:1px solid #eee;margin:4px 0;",m.appendChild(v);continue}const w=o.createElement("div");w.textContent=b.label,b.disabled?w.style.cssText="padding:6px 16px;color:#aaa;cursor:default;":(w.style.cssText="padding:6px 16px;cursor:pointer;",w.addEventListener("mouseenter",()=>{w.style.background="#f0f4ff"}),w.addEventListener("mouseleave",()=>{w.style.background=""}),w.addEventListener("mousedown",v=>{v.preventDefault(),this.hideContextMenu(),b.action()})),m.appendChild(w)}o.body.appendChild(m),this.menuEl=m,requestAnimationFrame(()=>{var y,C;if(!this.menuEl)return;const b=this.menuEl.getBoundingClientRect(),w=((y=o.defaultView)==null?void 0:y.innerWidth)??0,v=((C=o.defaultView)==null?void 0:C.innerHeight)??0;b.right>w&&(this.menuEl.style.left=`${i-b.width}px`),b.bottom>v&&(this.menuEl.style.top=`${e-b.height}px`)}),o.addEventListener("mousedown",this.dismissMenu)}hideContextMenu(){var i;this.menuEl&&(this.menuEl.remove(),this.menuEl=null,(i=this.contentEl)==null||i.ownerDocument.removeEventListener("mousedown",this.dismissMenu))}doMerge(){var e,t,n,o;if(!this.cb.onMerge)return;const i=this.cb.onMerge();!i.success&&i.message?(t=(e=this.cb).onError)==null||t.call(e,i.message):i.success&&((o=(n=this.cb).onModified)==null||o.call(n))}doSplitH(i,e){var t,n;this.cb.onSplitH?this.cb.onSplitH(i,e):ce.splitCellHorizontal(i,e),(n=(t=this.cb).onModified)==null||n.call(t)}doSplitV(i,e){var t,n;this.cb.onSplitV?this.cb.onSplitV(i,e):ce.splitCellVertical(i,e),(n=(t=this.cb).onModified)==null||n.call(t)}insertRowAbove(i,e){var n,o;const t=i.closest("tr");t&&(t.insertAdjacentElement("beforebegin",this.makeEmptyRow(t,e)),(o=(n=this.cb).onModified)==null||o.call(n))}insertRowBelow(i,e){var n,o;const t=i.closest("tr");t&&(t.insertAdjacentElement("afterend",this.makeEmptyRow(t,e)),(o=(n=this.cb).onModified)==null||o.call(n))}makeEmptyRow(i,e){var p,h;const t=e.ownerDocument,n=de(e),s=Array.from(e.rows).indexOf(i),a=Math.max(...n.map(g=>g.length)),r=((p=i.cells[0])==null?void 0:p.style.cssText)??"",d=t.createElement("tr");for(let g=0;g<a;g++){const f=(h=n[s])==null?void 0:h[g];if(f&&f.row!==s)continue;const m=t.createElement("td");m.style.cssText=r,m.innerHTML="&nbsp;",d.appendChild(m)}return d}insertColLeft(i,e){var o,s;const t=de(e),n=this.findCellCol(t,i);n!==-1&&this.insertColAt(e,t,n,i),(s=(o=this.cb).onModified)==null||s.call(o)}insertColRight(i,e){var o,s;const t=de(e),n=this.findCellCol(t,i);n!==-1&&this.insertColAt(e,t,n+Math.max(i.colSpan,1),i),(s=(o=this.cb).onModified)==null||s.call(o)}insertColAt(i,e,t,n){var a,r;const o=Array.from(i.rows),s=i.ownerDocument;for(let d=0;d<o.length;d++){const p=s.createElement("td");p.style.cssText=n.style.cssText,p.innerHTML="&nbsp;";let h=null;for(let g=t;g<(((a=e[d])==null?void 0:a.length)??0);g++){const f=(r=e[d])==null?void 0:r[g];if(f&&f.row===d&&f.col===g&&f.cell.parentElement===o[d]){h=f.cell;break}}h?o[d].insertBefore(p,h):o[d].appendChild(p)}}deleteRow(i,e){var t,n,o;e.rows.length<=1||((t=i.closest("tr"))==null||t.remove(),(o=(n=this.cb).onModified)==null||o.call(n))}deleteCol(i,e){var a,r,d;const t=de(e),n=this.findCellCol(t,i),o=Math.max(...t.map(p=>p.length));if(n===-1||o<=1)return;const s=Array.from(e.rows);for(let p=0;p<s.length;p++){const h=(a=t[p])==null?void 0:a[n];!h||h.row!==p||h.col!==n||h.cell.parentElement===s[p]&&(h.cell.colSpan>1?h.cell.colSpan-=1:h.cell.remove())}(d=(r=this.cb).onModified)==null||d.call(r)}deleteTable(i){var e,t;i.remove(),(t=(e=this.cb).onModified)==null||t.call(e)}showCellPropsModal(i){var a,r;const e=i.ownerDocument,t=ce.readCellProperties(i),n=e.createElement("div");n.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:10000;";const o=e.createElement("div");o.style.cssText="background:#fff;border-radius:6px;box-shadow:0 4px 24px rgba(0,0,0,0.2);padding:20px 24px;min-width:280px;font-size:13px;",o.innerHTML=`
<h4 style="margin:0 0 14px;font-size:14px;">셀 속성</h4>
<div style="display:grid;grid-template-columns:80px 1fr;gap:8px 10px;align-items:center;margin-bottom:14px;">
  <label>테두리 종류</label>
  <select id="cp-bstyle" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 4px;">
    <option value="solid">실선 (solid)</option>
    <option value="dashed">파선 (dashed)</option>
    <option value="dotted">점선 (dotted)</option>
    <option value="double">이중선 (double)</option>
    <option value="none">없음 (none)</option>
  </select>
  <label>테두리 두께</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-bwidth" type="number" value="${t.borderWidth??1}" min="0" max="20" style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span>
  </div>
  <label>테두리 색</label>
  <input id="cp-bcolor" type="color" value="${t.borderColor??"#000000"}" style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;cursor:pointer;">
  <label>들여쓰기</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-indent" type="number" value="${t.indent??0}" min="0" max="100" style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span>
  </div>
  <label>배경색</label>
  <input id="cp-bg" type="color" value="${t.bgColor||"#ffffff"}" style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;cursor:pointer;">
  <label>ID</label>
  <input id="cp-id" type="text" value="${t.id??""}" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
  <label>Class</label>
  <input id="cp-class" type="text" value="${t.className??""}" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
</div>
<div style="display:flex;justify-content:flex-end;gap:8px;">
  <button id="cp-cancel" style="height:28px;padding:0 14px;border:1px solid #ccc;border-radius:3px;background:#fff;cursor:pointer;font-size:13px;">취소</button>
  <button id="cp-ok" style="height:28px;padding:0 14px;border:1px solid #1565c0;border-radius:3px;background:#1565c0;color:#fff;cursor:pointer;font-size:13px;">적용</button>
</div>`,n.appendChild(o),e.body.appendChild(n),o.querySelector("#cp-bstyle").value=t.borderStyle??"solid";const s=()=>n.remove();(a=o.querySelector("#cp-cancel"))==null||a.addEventListener("click",s),n.addEventListener("click",d=>{d.target===n&&s()}),(r=o.querySelector("#cp-ok"))==null||r.addEventListener("click",()=>{var p,h;const d={borderStyle:o.querySelector("#cp-bstyle").value,borderWidth:parseInt(o.querySelector("#cp-bwidth").value,10)||0,borderColor:o.querySelector("#cp-bcolor").value,indent:parseInt(o.querySelector("#cp-indent").value,10)||0,bgColor:o.querySelector("#cp-bg").value,id:o.querySelector("#cp-id").value.trim(),className:o.querySelector("#cp-class").value.trim()};ce.applyCellProperties(i,d),(h=(p=this.cb).onModified)==null||h.call(p),s()})}executeAction(i,e,t){var n,o;switch(i){case"table:row-above":this.insertRowAbove(e,t);break;case"table:row-below":this.insertRowBelow(e,t);break;case"table:col-left":this.insertColLeft(e,t);break;case"table:col-right":this.insertColRight(e,t);break;case"table:row-delete":this.deleteRow(e,t);break;case"table:col-delete":this.deleteCol(e,t);break;case"table:delete":this.deleteTable(t);break;case"table:merge":this.doMerge();break;case"table:split-h":this.doSplitH(e,t);break;case"table:split-v":this.doSplitV(e,t);break;case"table:cell-props":this.showCellPropsModal(e);break;case"table:table-props":(o=(n=this.cb).onOpenTableProps)==null||o.call(n,t);break}}findCell(i){let e=i;for(;e;){if(e.nodeType===Node.ELEMENT_NODE){const t=e.tagName.toLowerCase();if(t==="td"||t==="th")return e;if(t==="table")break}e=e.parentNode}return null}findCellCol(i,e){var t,n;for(let o=0;o<i.length;o++)for(let s=0;s<(((t=i[o])==null?void 0:t.length)??0);s++){const a=(n=i[o])==null?void 0:n[s];if((a==null?void 0:a.cell)===e&&a.row===o&&a.col===s)return s}return-1}}const Gi=5,Yi=5,rs=30,as=20,Xi=300,Ht={type:null,cell:null,row:null,startX:0,startY:0,startW:0,startH:0};class ls{constructor(i=()=>{}){c(this,"contentEl",null);c(this,"onModified",()=>{});c(this,"state",{...Ht});c(this,"lastCursorCell",null);c(this,"onContentMouseMove",i=>{if(this.state.type)return;const e=this.findCell(i.target);if(!e){this.resetCursor();return}const t=e.getBoundingClientRect();i.clientX>=t.right-Gi?(e.style.cursor="col-resize",this.lastCursorCell=e):i.clientY>=t.bottom-Yi?(e.style.cursor="row-resize",this.lastCursorCell=e):this.lastCursorCell===e?this.resetCursor():e.style.cursor=""});c(this,"onContentMouseDown",i=>{if(i.button!==0)return;const e=this.findCell(i.target);if(!e)return;const t=e.getBoundingClientRect();if(i.clientX>=t.right-Gi)i.preventDefault(),this.state={type:"col",cell:e,row:null,startX:i.clientX,startY:0,startW:e.offsetWidth,startH:0},document.body.style.cursor="col-resize",document.body.style.userSelect="none",console.log("[TableResizer] col resize 시작",{cellIndex:e.cellIndex,startW:e.offsetWidth,startX:i.clientX});else if(i.clientY>=t.bottom-Yi){i.preventDefault();const n=e.closest("tr");if(!n)return;this.state={type:"row",cell:null,row:n,startX:0,startY:i.clientY,startW:0,startH:n.offsetHeight},document.body.style.cursor="row-resize",document.body.style.userSelect="none",console.log("[TableResizer] row resize 시작",{startH:n.offsetHeight,startY:i.clientY})}});c(this,"onDocMouseMove",i=>{if(this.state.type){if(this.state.type==="col"&&this.state.cell){const e=i.clientX-this.state.startX;if(Math.abs(e)>Xi)return;const t=Math.max(rs,this.state.startW+e);this.state.cell.style.width=`${t}px`,this.state.cell.style.minWidth=`${t}px`}if(this.state.type==="row"&&this.state.row){const e=i.clientY-this.state.startY;if(Math.abs(e)>Xi)return;const t=Math.max(as,this.state.startH+e);this.state.row.style.height=`${t}px`;for(const n of Array.from(this.state.row.cells))n.style.height=`${t}px`}}});c(this,"onDocMouseUp",()=>{this.state.type&&(this.onModified(),this.state={...Ht},document.body.style.cursor="",document.body.style.userSelect="")});this.onModified=i}attach(i){this.detach(),this.contentEl=i,i.addEventListener("mousemove",this.onContentMouseMove),i.addEventListener("mousedown",this.onContentMouseDown),document.addEventListener("mousemove",this.onDocMouseMove),document.addEventListener("mouseup",this.onDocMouseUp)}detach(){this.contentEl&&(this.contentEl.removeEventListener("mousemove",this.onContentMouseMove),this.contentEl.removeEventListener("mousedown",this.onContentMouseDown),this.contentEl=null),document.removeEventListener("mousemove",this.onDocMouseMove),document.removeEventListener("mouseup",this.onDocMouseUp),this.resetCursor(),this.state={...Ht}}resetCursor(){this.lastCursorCell&&(this.lastCursorCell.style.cursor="",this.lastCursorCell=null)}findCell(i){const e=i.nodeType===Node.ELEMENT_NODE?i:i.parentElement;return e?e.closest("td, th"):null}}class ds{constructor(i){c(this,"contentEl",null);c(this,"merger");c(this,"anchor",null);c(this,"isDragging",!1);c(this,"justDragged",!1);c(this,"mdownHandler",i=>{var t,n,o,s;const e=this.findCell(i.target);e&&i.button===0&&((n=(t=i.target.style)==null?void 0:t.cursor)!=null&&n.includes("resize")||(s=(o=e.style)==null?void 0:o.cursor)!=null&&s.includes("resize")||(this.anchor=e,this.isDragging=!1,this.justDragged=!1,this.merger.setAnchor(e),this.applyFeedback("drag")))});c(this,"mmoveHandler",i=>{if(!this.anchor||i.buttons!==1)return;const e=this.findCellAt(i.clientX,i.clientY);if(!e)return;const t=this.anchor.closest("table");if(!t||e.closest("table")!==t||(!this.isDragging&&e!==this.anchor&&(this.isDragging=!0),!this.isDragging))return;this.merger.selectTo(e);const n=this.isRectangular()?"ok":"bad";this.applyFeedback(n)});c(this,"mupHandler",()=>{if(!this.isDragging){this.anchor=null;return}this.isDragging=!1,this.justDragged=!0;const i=this.isRectangular()?"ok":"bad";this.applyFeedback(i),this.anchor=null});c(this,"clickGuard",i=>{if(!this.justDragged)return;this.justDragged=!1,this.findCell(i.target)&&i.stopPropagation()});this.merger=i}attach(i){this.detach(),this.contentEl=i,i.addEventListener("mousedown",this.mdownHandler),i.addEventListener("click",this.clickGuard,!0),document.addEventListener("mousemove",this.mmoveHandler),document.addEventListener("mouseup",this.mupHandler)}detach(){this.contentEl&&(this.contentEl.removeEventListener("mousedown",this.mdownHandler),this.contentEl.removeEventListener("click",this.clickGuard,!0),this.contentEl=null),document.removeEventListener("mousemove",this.mmoveHandler),document.removeEventListener("mouseup",this.mupHandler),this.anchor=null,this.isDragging=!1,this.justDragged=!1}isRectangular(){var d,p,h;const i=this.merger.getSelectedCells(),e=this.merger.getSelectedTable();if(!e||i.length<2)return!0;const t=de(e),n=new Set(i);let o=1/0,s=-1/0,a=1/0,r=-1/0;for(let g=0;g<t.length;g++)for(let f=0;f<(((d=t[g])==null?void 0:d.length)??0);f++){const m=(p=t[g])==null?void 0:p[f];m&&n.has(m.cell)&&(g<o&&(o=g),g>s&&(s=g),f<a&&(a=f),f>r&&(r=f))}for(let g=o;g<=s;g++)for(let f=a;f<=r;f++){const m=(h=t[g])==null?void 0:h[f];if(!m||!n.has(m.cell))return!1}return!0}applyFeedback(i){const e=this.merger.getSelectedCells();for(const t of e)t.classList.remove("poa-cell-selected","poa-cell-sel-ok","poa-cell-sel-bad"),i==="drag"&&t.classList.add("poa-cell-selected"),i==="ok"&&t.classList.add("poa-cell-sel-ok"),i==="bad"&&t.classList.add("poa-cell-sel-bad")}get canMerge(){return this.merger.getSelectedCells().length>=2&&this.isRectangular()}getCellSelection(){return this.merger.getSelectedCells()}findCell(i){let e=i;for(;e;){if(e.nodeType===Node.ELEMENT_NODE){const t=e.tagName.toLowerCase();if(t==="td"||t==="th")return e;if(t==="table")break}e=e.parentNode}return null}findCellAt(i,e){const t=document.elementFromPoint(i,e);return t?this.findCell(t):null}}class cs{constructor(i){c(this,"contentEl",null);c(this,"handle",null);c(this,"currentTable",null);c(this,"hideTimer",0);c(this,"onSelectAll",null);c(this,"overHandler",i=>{const e=this.findTable(i.target);e&&(clearTimeout(this.hideTimer),this.currentTable=e,this.positionHandle(e),this.showHandle())});c(this,"outHandler",i=>{var t,n;const e=i.relatedTarget;e&&((t=this.handle)!=null&&t.contains(e)||(n=this.currentTable)!=null&&n.contains(e))||(this.hideTimer=window.setTimeout(()=>this.hideHandle(),200))});this.onSelectAll=i??null}attach(i){this.detach(),this.contentEl=i,i.addEventListener("mouseover",this.overHandler),i.addEventListener("mouseout",this.outHandler),this.createHandle(i.ownerDocument)}detach(){var i;this.contentEl&&(this.contentEl.removeEventListener("mouseover",this.overHandler),this.contentEl.removeEventListener("mouseout",this.outHandler),this.contentEl=null),(i=this.handle)==null||i.remove(),this.handle=null,this.currentTable=null,clearTimeout(this.hideTimer)}createHandle(i){const e=i.createElement("div");e.title="표 전체 선택",e.style.cssText=["position:fixed","width:20px","height:20px","background:#1565c0","color:#fff","border-radius:3px","cursor:pointer","display:none","align-items:center","justify-content:center","font-size:14px","line-height:1","z-index:8000","box-shadow:0 1px 4px rgba(0,0,0,0.3)","user-select:none","-webkit-user-select:none"].join(";"),e.textContent="⊕",e.addEventListener("mousedown",t=>{t.preventDefault(),t.stopPropagation()}),e.addEventListener("click",()=>{this.currentTable&&this.onSelectAll&&this.onSelectAll(this.currentTable)}),e.addEventListener("mouseenter",()=>{clearTimeout(this.hideTimer)}),e.addEventListener("mouseleave",()=>{this.hideTimer=window.setTimeout(()=>this.hideHandle(),200)}),i.body.appendChild(e),this.handle=e}positionHandle(i){if(!this.handle)return;const e=i.getBoundingClientRect();this.handle.style.left=`${e.left-2}px`,this.handle.style.top=`${e.top-2}px`}showHandle(){this.handle&&(this.handle.style.display="flex")}hideHandle(){this.handle&&(this.handle.style.display="none"),this.currentTable=null}findTable(i){let e=i;for(;e;){if(e.nodeType===Node.ELEMENT_NODE&&e.tagName.toLowerCase()==="table")return e;e=e.parentNode}return null}}class ps{constructor(i,e={}){c(this,"contentEl",null);c(this,"menuEl",null);c(this,"navigator");c(this,"cb");c(this,"cmHandler",i=>{const e=this.findCell(i.target);e&&(i.preventDefault(),this.show(i.clientX,i.clientY,e))});c(this,"dismissHandler",i=>{this.menuEl&&!this.menuEl.contains(i.target)&&this.hide()});this.navigator=i,this.cb=e}attach(i){this.detach(),this.contentEl=i,i.addEventListener("contextmenu",this.cmHandler)}detach(){this.contentEl&&(this.contentEl.removeEventListener("contextmenu",this.cmHandler),this.contentEl=null),this.hide()}show(i,e,t){var b,w;this.hide();const n=t.closest("table");if(!n)return;const o=t.ownerDocument,s=de(n),a=Math.max(...s.map(v=>v.length)),r=n.rows.length,d=n.querySelectorAll(".poa-cell-selected, .poa-cell-sel-ok").length,p=((w=(b=this.cb).canMerge)==null?void 0:w.call(b))??d>=2,h=t.colSpan>1||t.rowSpan>1,g=this.navigator,f=[{label:"셀 병합",action:()=>this.doMerge(),disabled:!p},{label:"셀 나누기",action:()=>{var v,y;return(y=(v=this.cb).onSplitCell)==null?void 0:y.call(v,t)},disabled:!h},"---",{label:"위에 행 삽입",action:()=>g.executeAction("table:row-above",t,n)},{label:"아래에 행 삽입",action:()=>g.executeAction("table:row-below",t,n)},{label:"왼쪽에 열 삽입",action:()=>g.executeAction("table:col-left",t,n)},{label:"오른쪽에 열 삽입",action:()=>g.executeAction("table:col-right",t,n)},"---",{label:"행 삭제",action:()=>g.executeAction("table:row-delete",t,n),disabled:r<=1},{label:"열 삭제",action:()=>g.executeAction("table:col-delete",t,n),disabled:a<=1},{label:"표 삭제",action:()=>g.executeAction("table:delete",t,n)},"---",{label:"셀 속성",action:()=>this.showCellProps(t)},{label:"표 속성",action:()=>{var v,y;return(y=(v=this.cb).onOpenTableProps)==null?void 0:y.call(v,n)}}],m=o.createElement("div");m.style.cssText=["position:fixed",`left:${i}px`,`top:${e}px`,"background:#fff","border:1px solid #ccc","border-radius:5px","box-shadow:0 4px 14px rgba(0,0,0,0.18)","z-index:9999","font-size:13px","min-width:170px","padding:5px 0","user-select:none"].join(";");for(const v of f){if(v==="---"){const C=o.createElement("div");C.style.cssText="border-top:1px solid #eee;margin:4px 6px;",m.appendChild(C);continue}const y=o.createElement("div");y.textContent=v.label,v.disabled?y.style.cssText="padding:6px 18px;color:#bbb;cursor:default;":(y.style.cssText="padding:6px 18px;cursor:pointer;color:#222;",y.addEventListener("mouseenter",()=>{y.style.background="#eef3ff"}),y.addEventListener("mouseleave",()=>{y.style.background=""}),y.addEventListener("mousedown",C=>{C.preventDefault(),this.hide(),v.action()})),m.appendChild(y)}o.body.appendChild(m),this.menuEl=m,requestAnimationFrame(()=>{var L,D;if(!this.menuEl)return;const v=this.menuEl.getBoundingClientRect(),y=((L=o.defaultView)==null?void 0:L.innerWidth)??0,C=((D=o.defaultView)==null?void 0:D.innerHeight)??0;v.right>y&&(this.menuEl.style.left=`${i-v.width}px`),v.bottom>C&&(this.menuEl.style.top=`${e-v.height}px`)}),o.addEventListener("mousedown",this.dismissHandler)}hide(){var i;this.menuEl&&(this.menuEl.remove(),this.menuEl=null,(i=this.contentEl)==null||i.ownerDocument.removeEventListener("mousedown",this.dismissHandler))}doMerge(){var e,t,n,o;if(!this.cb.onMerge)return;const i=this.cb.onMerge();!i.success&&i.message&&((t=(e=this.cb).onError)==null||t.call(e,i.message)),i.success&&((o=(n=this.cb).onModified)==null||o.call(n))}showCellProps(i){var p,h;const e=i.ownerDocument,t=((h=(p=this.cb).getSelectedCells)==null?void 0:h.call(p))??[],n=t.includes(i)&&t.length>0?t:[i],o=ce.readCellProperties(n[0]),s=e.createElement("div");s.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.38);display:flex;align-items:center;justify-content:center;z-index:10000;";const a=e.createElement("div");a.style.cssText="background:#fff;border-radius:6px;box-shadow:0 4px 24px rgba(0,0,0,0.2);padding:20px 24px;min-width:280px;font-size:13px;";const r=n.length>1?`<p style="margin:0 0 10px;font-size:11px;color:#1565c0;">선택된 ${n.length}개 셀에 일괄 적용됩니다.</p>`:"";a.innerHTML=`
<h4 style="margin:0 0 10px;font-size:14px;font-weight:600;">셀 속성</h4>
${r}
<div style="display:grid;grid-template-columns:80px 1fr;gap:8px 12px;align-items:center;">
  <label>테두리 종류</label>
  <select id="cp-bs" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;">
    ${["solid","dashed","dotted","double","none"].map(g=>`<option value="${g}">${g}</option>`).join("")}
  </select>
  <label>테두리 두께</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-bw" type="number" value="${o.borderWidth??1}" min="0" max="20"
      style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span>
  </div>
  <label>테두리 색</label>
  <input id="cp-bc" type="color" value="${o.borderColor??"#000000"}"
    style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;">
  <label>들여쓰기</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-ind" type="number" value="${o.indent??0}" min="0"
      style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span>
  </div>
  <label>배경색</label>
  <input id="cp-bg" type="color" value="${o.bgColor||"#ffffff"}"
    style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;">
  <label>글자 크기</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-fs" type="number" value="${o.fontSize??0}" min="0" max="100"
      style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;"
      placeholder="0=상속">
    <span>px</span>
  </div>
  <label>ID</label>
  <input id="cp-id" type="text" value="${o.id??""}"
    style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
  <label>Class</label>
  <input id="cp-cls" type="text" value="${o.className??""}"
    style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
</div>
<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">
  <button id="cp-cancel" style="height:28px;padding:0 14px;border:1px solid #ccc;border-radius:3px;background:#fff;cursor:pointer;">취소</button>
  <button id="cp-ok" style="height:28px;padding:0 14px;border:1px solid #1565c0;border-radius:3px;background:#1565c0;color:#fff;cursor:pointer;">적용</button>
</div>`,s.appendChild(a),e.body.appendChild(s),a.querySelector("#cp-bs").value=o.borderStyle??"solid";const d=()=>s.remove();a.querySelector("#cp-cancel").addEventListener("click",d),s.addEventListener("click",g=>{g.target===s&&d()}),a.querySelector("#cp-ok").addEventListener("click",()=>{var f,m;const g={borderStyle:a.querySelector("#cp-bs").value,borderWidth:parseInt(a.querySelector("#cp-bw").value,10)||0,borderColor:a.querySelector("#cp-bc").value,indent:parseInt(a.querySelector("#cp-ind").value,10)||0,bgColor:a.querySelector("#cp-bg").value,fontSize:parseInt(a.querySelector("#cp-fs").value,10)||0,id:a.querySelector("#cp-id").value.trim(),className:a.querySelector("#cp-cls").value.trim()};for(const b of n)ce.applyCellProperties(b,g);(m=(f=this.cb).onModified)==null||m.call(f),d()})}findCell(i){let e=i;for(;e;){if(e.nodeType===Node.ELEMENT_NODE){const t=e.tagName.toLowerCase();if(t==="td"||t==="th")return e;if(t==="table")break}e=e.parentNode}return null}}const xe="padding:6px 8px;overflow:hidden;word-break:break-word;";function Ee(l){return Array.from(l.querySelectorAll("td,th"))}function Ki(l){return Array.from(l.querySelectorAll("thead td,thead th"))}function Ji(l){return Array.from(l.querySelectorAll("tbody tr"))}function ke(l){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">${l}</svg>`}const Ce={"border-all":ke(`
    <rect x="3" y="3" width="34" height="34" fill="#fff" stroke="#bbb" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#bbb" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#bbb" stroke-width="1"/>
    <line x1="3"  y1="14" x2="37" y2="14" stroke="#bbb" stroke-width="1"/>
    <line x1="3"  y1="25" x2="37" y2="25" stroke="#bbb" stroke-width="1"/>`),"border-thick":ke(`
    <rect x="2" y="2" width="36" height="36" fill="#fff" stroke="#444" stroke-width="2"/>
    <line x1="14" y1="2" x2="14" y2="38" stroke="#aaa" stroke-width="1"/>
    <line x1="26" y1="2" x2="26" y2="38" stroke="#aaa" stroke-width="1"/>
    <line x1="2"  y1="13" x2="38" y2="13" stroke="#aaa" stroke-width="1"/>
    <line x1="2"  y1="25" x2="38" y2="25" stroke="#aaa" stroke-width="1"/>`),"header-light":ke(`
    <rect x="3" y="3"  width="34" height="11" fill="#f0f0f0" stroke="#ccc" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff"    stroke="#ccc" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#fff"    stroke="#ccc" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#ccc" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#ccc" stroke-width="1"/>`),"header-dark":ke(`
    <rect x="3" y="3"  width="34" height="11" fill="#333" stroke="#333" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff" stroke="#aaa" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#fff" stroke="#aaa" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#888" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#888" stroke-width="1"/>`),"stripe-light":ke(`
    <rect x="3" y="3"  width="34" height="11" fill="#f9f9f9" stroke="#ddd" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff"    stroke="#ddd" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#f9f9f9" stroke="#ddd" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#ddd" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#ddd" stroke-width="1"/>`),"stripe-dark":ke(`
    <rect x="3" y="3"  width="34" height="11" fill="#e0e0e0" stroke="#bbb" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff"    stroke="#bbb" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#e0e0e0" stroke="#bbb" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#bbb" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#bbb" stroke-width="1"/>`),borderless:ke(`
    <rect x="3" y="3" width="34" height="34" fill="#fafafa" stroke="#e0e0e0"
          stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="3"  y1="14" x2="37" y2="14" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="3"  y1="25" x2="37" y2="25" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>`),dashed:ke(`
    <rect x="3" y="3" width="34" height="34" fill="#fff" stroke="#999"
          stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="3"  y1="14" x2="37" y2="14" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="3"  y1="25" x2="37" y2="25" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>`)},at=[{id:"border-all",label:"전체 테두리",icon:Ce["border-all"],baseOptions:{width:"100%",border:1,borderColor:"#cccccc",headerPosition:"none"},apply:l=>{for(const i of Ee(l))i.style.cssText=`border:1px solid #ccc;${xe}`}},{id:"border-thick",label:"굵은 외부",icon:Ce["border-thick"],baseOptions:{width:"100%",border:1,borderColor:"#aaaaaa",headerPosition:"none"},apply:l=>{for(const i of Ee(l))i.style.cssText=`border:1px solid #aaa;${xe}`;l.style.boxShadow="0 0 0 2px #333333"}},{id:"header-light",label:"헤더 강조",icon:Ce["header-light"],baseOptions:{width:"100%",border:1,borderColor:"#cccccc",headerPosition:"top"},apply:l=>{for(const i of Ee(l))i.style.cssText=`border:1px solid #ccc;${xe}`;for(const i of Ki(l))i.style.cssText=`border:1px solid #ccc;${xe}background:#f0f0f0;font-weight:bold;`}},{id:"header-dark",label:"헤더 진한",icon:Ce["header-dark"],baseOptions:{width:"100%",border:1,borderColor:"#aaaaaa",headerPosition:"top"},apply:l=>{for(const i of Ee(l))i.style.cssText=`border:1px solid #aaa;${xe}`;for(const i of Ki(l))i.style.cssText=`border:1px solid #555;${xe}background:#333333;color:#ffffff;font-weight:bold;`}},{id:"stripe-light",label:"줄무늬",icon:Ce["stripe-light"],baseOptions:{width:"100%",border:1,borderColor:"#dddddd",headerPosition:"none"},apply:l=>{for(const i of Ee(l))i.style.cssText=`border:1px solid #ddd;${xe}`;Ji(l).forEach((i,e)=>{const t=e%2===0?"#f9f9f9":"";for(const n of Array.from(i.querySelectorAll("td,th")))n.style.backgroundColor=t})}},{id:"stripe-dark",label:"진한 줄무늬",icon:Ce["stripe-dark"],baseOptions:{width:"100%",border:1,borderColor:"#bbbbbb",headerPosition:"none"},apply:l=>{for(const i of Ee(l))i.style.cssText=`border:1px solid #bbb;${xe}`;Ji(l).forEach((i,e)=>{const t=e%2===0?"#e0e0e0":"";for(const n of Array.from(i.querySelectorAll("td,th")))n.style.backgroundColor=t})}},{id:"borderless",label:"테두리 없음",icon:Ce.borderless,baseOptions:{width:"100%",border:0,headerPosition:"none"},apply:l=>{for(const i of Ee(l))i.style.cssText=`border:none;${xe}`;l.removeAttribute("border")}},{id:"dashed",label:"점선 테두리",icon:Ce.dashed,baseOptions:{width:"100%",border:1,borderColor:"#999999",headerPosition:"none"},apply:l=>{for(const i of Ee(l))i.style.cssText=`border:1px dashed #999;${xe}`}}];function hs(l,i){var e;(e=at.find(t=>t.id===l))==null||e.apply(i)}function Zi(l){if(l.startsWith("#"))return l.length>1;try{return new URL(l),!0}catch{return!1}}class us{constructor(i){c(this,"root");c(this,"savedRange",null);this.root=i}saveSelection(){const i=this.root.ownerDocument.getSelection();i&&i.rangeCount>0&&(this.savedRange=i.getRangeAt(0).cloneRange())}insertLink(i){var o;if(!Zi(i.href))throw new Error("유효하지 않은 URL입니다.");const t=this.root.ownerDocument.createElement("a");t.href=i.href,i.title&&(t.title=i.title),i.target==="_blank"&&(t.target="_blank",t.rel="noopener noreferrer");const n=(o=this.savedRange)==null?void 0:o.toString().trim();t.textContent=n||i.text.trim()||i.href,i.target==="_self"&&(t.target="_self"),this.insertNode(t)}updateLink(i,e){if(e.href!==void 0){if(!Zi(e.href))throw new Error("유효하지 않은 URL입니다.");i.href=e.href}e.text!==void 0&&(i.textContent=e.text),e.title!==void 0&&(i.title=e.title),e.target!==void 0&&(e.target==="_blank"?(i.target="_blank",i.rel="noopener noreferrer"):(i.target="_self",i.removeAttribute("rel")))}removeLink(i){const e=i.parentNode;if(e){for(;i.firstChild;)e.insertBefore(i.firstChild,i);e.removeChild(i)}}getFocusedAnchor(){const i=this.root.ownerDocument.getSelection();if(!i||i.rangeCount===0)return null;let e=i.getRangeAt(0).startContainer;for(;e&&e!==this.root;){if(e.nodeType===Node.ELEMENT_NODE&&e.tagName==="A")return e;e=e.parentNode}return null}insertNode(i){const e=this.root.ownerDocument,t=e.getSelection();let n;this.savedRange?(n=this.savedRange.cloneRange(),this.savedRange=null):t&&t.rangeCount>0?n=t.getRangeAt(0):(n=e.createRange(),n.selectNodeContents(this.root),n.collapse(!1)),n.deleteContents(),n.insertNode(i),n.setStartAfter(i),n.collapse(!0),t==null||t.removeAllRanges(),t==null||t.addRange(n)}}function gs(){const l=new Uint8Array(6);return crypto.getRandomValues(l),Array.from(l,i=>i.toString(16).padStart(2,"0")).join("")}class fs{constructor(i){c(this,"root");c(this,"savedRange",null);this.root=i}saveSelection(){const i=this.root.ownerDocument.getSelection();i&&i.rangeCount>0&&(this.savedRange=i.getRangeAt(0).cloneRange())}insert(i){const e=`bm-${gs()}`,n=this.root.ownerDocument.createElement("a");return n.id=e,n.setAttribute("name",e),n.className="poa-bookmark",n.setAttribute("data-label",i),n.title=i||e,n.textContent=`[${i||e}]`,n.contentEditable="false",this.insertAtRange(n),e}getAll(){return Array.from(this.root.querySelectorAll('a.poa-bookmark[id^="bm-"]')).map(i=>({id:i.id,label:i.getAttribute("data-label")??i.id,element:i}))}update(i,e){const t=this.root.querySelector(`a[id="${i}"]`);if(!t)throw new Error(`책갈피 '${i}'를 찾을 수 없습니다.`);t.setAttribute("data-label",e),t.title=e,t.textContent=`[${e||i}]`}remove(i){var e;(e=this.root.querySelector(`a[id="${i}"]`))==null||e.remove()}insertAtRange(i){const e=this.root.ownerDocument,t=e.getSelection();let n;this.savedRange?(n=this.savedRange.cloneRange(),this.savedRange=null):t&&t.rangeCount>0?n=t.getRangeAt(0):(n=e.createRange(),n.selectNodeContents(this.root),n.collapse(!1)),n.collapse(!0),n.insertNode(i),n.setStartAfter(i),n.collapse(!0),t==null||t.removeAllRanges(),t==null||t.addRange(n)}}const ms=[{dir:"nw",cursor:"nw-resize",top:"0",left:"0"},{dir:"n",cursor:"n-resize",top:"0",left:"50%"},{dir:"ne",cursor:"ne-resize",top:"0",left:"100%"},{dir:"e",cursor:"e-resize",top:"50%",left:"100%"},{dir:"se",cursor:"se-resize",top:"100%",left:"100%"},{dir:"s",cursor:"s-resize",top:"100%",left:"50%"},{dir:"sw",cursor:"sw-resize",top:"100%",left:"0"},{dir:"w",cursor:"w-resize",top:"50%",left:"0"}],Qi=20;class bs{constructor(i,e={}){c(this,"root");c(this,"cb");c(this,"overlay",null);c(this,"activeImg",null);c(this,"dragging",!1);c(this,"dragDir","se");c(this,"dragStartX",0);c(this,"dragStartY",0);c(this,"dragStartW",0);c(this,"dragStartH",0);c(this,"onRootClick",i=>{var t;const e=i.target;(t=this.overlay)!=null&&t.contains(e)||(e.tagName==="IMG"?this.activate(e):this.deactivate())});c(this,"onContextMenu",i=>{var n,o;const e=i.target;if(e.tagName!=="IMG")return;i.preventDefault();const t=e;this.activate(t),(o=(n=this.cb).onContextMenu)==null||o.call(n,t,i.clientX,i.clientY)});c(this,"onContentInput",()=>{this.activeImg&&!this.root.contains(this.activeImg)&&this.deactivate()});c(this,"onHandleMouseDown",i=>{if(!this.activeImg)return;const e=i.currentTarget.dataset.dir;i.preventDefault(),i.stopPropagation();const t=this.activeImg.getBoundingClientRect();this.dragging=!0,this.dragDir=e,this.dragStartX=i.clientX,this.dragStartY=i.clientY,this.dragStartW=t.width,this.dragStartH=t.height,document.body.style.cursor=i.currentTarget.style.cursor,document.body.style.userSelect="none"});c(this,"onMouseMove",i=>{var d,p;if(!this.dragging||!this.activeImg)return;const e=i.clientX-this.dragStartX,t=i.clientY-this.dragStartY,n=this.dragDir,o=this.root.clientWidth;let s=this.dragStartW,a=this.dragStartH;(n==="e"||n==="ne"||n==="se")&&(s=this.dragStartW+e),(n==="w"||n==="nw"||n==="sw")&&(s=this.dragStartW-e),(n==="s"||n==="se"||n==="sw")&&(a=this.dragStartH+t),(n==="n"||n==="ne"||n==="nw")&&(a=this.dragStartH-t);const r=n==="nw"||n==="ne"||n==="sw"||n==="se";if(i.shiftKey&&r&&this.dragStartH>0){const h=this.dragStartW/this.dragStartH;Math.abs(e)>=Math.abs(t)?a=s/h:s=a*h}s=Math.max(Qi,Math.min(o,s)),a=Math.max(Qi,a),this.activeImg.style.width=`${Math.round(s)}px`,this.activeImg.style.height=`${Math.round(a)}px`,this.updatePos(),(p=(d=this.cb).onResize)==null||p.call(d,this.activeImg)});c(this,"onMouseUp",()=>{var i,e;this.dragging&&(this.dragging=!1,document.body.style.cursor="",document.body.style.userSelect="",this.activeImg&&(this.updatePos(),(e=(i=this.cb).onResizeEnd)==null||e.call(i)))});this.root=i,this.cb=e}attach(){this.root.style.position||(this.root.style.position="relative"),this.root.addEventListener("click",this.onRootClick,!0),this.root.addEventListener("contextmenu",this.onContextMenu),this.root.addEventListener("input",this.onContentInput),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp)}detach(){this.deactivate(),this.root.removeEventListener("click",this.onRootClick,!0),this.root.removeEventListener("contextmenu",this.onContextMenu),this.root.removeEventListener("input",this.onContentInput),document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mouseup",this.onMouseUp)}getActiveImage(){return this.activeImg}syncOverlay(){this.updatePos()}deactivate(){var i,e,t;(i=this.overlay)==null||i.remove(),this.overlay=null,this.activeImg&&(this.activeImg=null,(t=(e=this.cb).onDeactivate)==null||t.call(e))}activate(i){var e,t,n;this.activeImg!==i&&((e=this.overlay)==null||e.remove(),this.activeImg=i,this.createOverlay(),(n=(t=this.cb).onActivate)==null||n.call(t,i))}createOverlay(){if(!this.activeImg)return;const i=document.createElement("div");i.className="poa-img-resize-overlay",i.dataset.poaTemp="true",i.style.cssText="position:absolute;border:2px solid #0078d7;pointer-events:none;z-index:10;box-sizing:border-box;";for(const e of ms){const t=document.createElement("div");t.dataset.dir=e.dir,t.style.cssText=`position:absolute;width:8px;height:8px;background:#0078d7;border:1px solid #fff;border-radius:1px;box-sizing:border-box;cursor:${e.cursor};top:${e.top};left:${e.left};transform:translate(-50%,-50%);pointer-events:all;z-index:11;`,t.addEventListener("mousedown",this.onHandleMouseDown),i.appendChild(t)}this.root.appendChild(i),this.overlay=i,this.updatePos()}updatePos(){if(!this.overlay||!this.activeImg)return;const i=this.activeImg.getBoundingClientRect(),e=this.root.getBoundingClientRect(),t=i.top-e.top+this.root.scrollTop,n=i.left-e.left+this.root.scrollLeft;Object.assign(this.overlay.style,{top:`${t}px`,left:`${n}px`,width:`${i.width}px`,height:`${i.height}px`})}}const xs="modulepreload",vs=function(l){return"/poa-editor/"+l},en={},tn=function(i,e,t){let n=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),a=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));n=Promise.allSettled(e.map(r=>{if(r=vs(r),r in en)return;en[r]=!0;const d=r.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${p}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":xs,d||(h.as="script"),h.crossOrigin="",h.href=r,a&&h.setAttribute("nonce",a),document.head.appendChild(h),d)return new Promise((g,f)=>{h.addEventListener("load",g),h.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${r}`)))})}))}function o(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return n.then(s=>{for(const a of s||[])a.status==="rejected"&&o(a.reason);return i().catch(o)})},ys=794,ws=1123,Es={top:60,right:80,bottom:60,left:80},$t="poa-print-styles";class ks{constructor(){c(this,"container",null)}mount(i,e,t=[],n=Es){this.container=i,i.innerHTML="";const o=document.createElement("div");o.className="poa-page-main",o.style.cssText="flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;align-items:center;background:#e8e8e8;",this.injectPrintStyles(n);const s=this.splitByPageBreaks(e);for(const a of s)o.appendChild(this.buildPage(a,n));i.appendChild(o),t.length>0&&i.appendChild(this.buildSidebar(t))}unmount(){var i;this.container&&(this.container.innerHTML="",this.container=null),(i=document.getElementById($t))==null||i.remove()}getPageCount(i){return this.splitByPageBreaks(i).length}buildPage(i,e){const t=document.createElement("div");return t.className="poa-a4-page",t.style.cssText=[`width:${ys}px`,`min-height:${ws}px`,"background:#fff","box-shadow:0 2px 8px rgba(0,0,0,.2)",`padding:${e.top}px ${e.right}px ${e.bottom}px ${e.left}px`,"box-sizing:border-box","margin-bottom:20px","position:relative","font-size:14px","line-height:1.6"].join(";"),t.innerHTML=i,t}buildSidebar(i){const e=document.createElement("div");e.className="poa-page-sidebar",e.style.cssText=["width:180px","flex-shrink:0","overflow-y:auto","background:#fafafa","border-left:1px solid #ddd","padding:12px"].join(";");const t=document.createElement("div");t.style.cssText="font-size:12px;font-weight:600;color:#555;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #eee;",t.textContent="책갈피",e.appendChild(t);for(const n of i){const o=document.createElement("a");o.href=`#${n.id}`,o.textContent=n.label,o.style.cssText="display:block;font-size:12px;color:#1976d2;text-decoration:none;padding:5px 0;border-bottom:1px solid #f0f0f0;",o.addEventListener("mouseenter",()=>{o.style.textDecoration="underline"}),o.addEventListener("mouseleave",()=>{o.style.textDecoration="none"}),e.appendChild(o)}return e}splitByPageBreaks(i){const e=i.split(/<hr[^>]*class="[^"]*poa-page-break[^"]*"[^>]*\/?>/i);return e.length>0?e:[i]}injectPrintStyles(i){if(document.getElementById($t))return;const e=document.createElement("style");e.id=$t,e.textContent=`
@media print {
  body > *:not(poa-editor) { display: none !important; }
  poa-editor { all: unset; display: block; }
  .poa-page-sidebar { display: none; }
  .poa-a4-page {
    page-break-after: always;
    box-shadow: none !important;
    margin: 0 !important;
    padding: ${i.top}px ${i.right}px ${i.bottom}px ${i.left}px !important;
  }
  hr.poa-page-break { display: none; }
}
`,document.head.appendChild(e)}}class Cs{constructor(i,e={}){c(this,"mode","design");c(this,"rulerVisible",!1);c(this,"gridVisible",!1);c(this,"hiddenBorderVisible",!1);c(this,"wrapper",null);c(this,"contentRow",null);c(this,"rulerH",null);c(this,"rulerV",null);c(this,"gridOverlay",null);c(this,"htmlPanel",null);c(this,"previewPanel",null);c(this,"textPanel",null);c(this,"pagePanel",null);c(this,"pageViewInstance",null);c(this,"cmGetContent",null);c(this,"cmDestroy",null);this.contentEl=i,this.callbacks=e}attach(){const i=this.contentEl.parentElement;if(!i)return;const e=document.createElement("div");e.className="poa-view-wrapper";const t=this.contentEl.getAttribute("slot")??"";t&&(e.setAttribute("slot",t),this.contentEl.removeAttribute("slot")),e.style.cssText="display:flex;flex-direction:column;flex:1;overflow:hidden;position:relative;min-height:0;",i.insertBefore(e,this.contentEl);const n=document.createElement("div");n.className="poa-view-content-row",n.style.cssText="display:flex;flex:1;overflow:hidden;min-height:0;",e.appendChild(n),n.appendChild(this.contentEl),this.contentEl.style.flex="1",this.contentEl.style.minHeight="0",this.htmlPanel=this.createPanel("poa-html-panel"),this.previewPanel=this.createPanel("poa-preview-panel"),this.textPanel=this.createPanel("poa-text-panel"),this.pagePanel=this.createPanel("poa-page-panel"),n.appendChild(this.htmlPanel),n.appendChild(this.previewPanel),n.appendChild(this.textPanel),n.appendChild(this.pagePanel),this.wrapper=e,this.contentRow=n}detach(){var i,e;if((i=this.cmDestroy)==null||i.call(this),this.cmDestroy=null,this.cmGetContent=null,(e=this.pageViewInstance)==null||e.unmount(),this.pageViewInstance=null,this.wrapper&&this.contentEl){const t=this.wrapper.parentElement;if(t){const n=this.wrapper.getAttribute("slot")??"";n&&this.contentEl.setAttribute("slot",n),t.insertBefore(this.contentEl,this.wrapper),this.wrapper.remove()}}this.contentEl.style.display="",this.wrapper=null,this.contentRow=null,this.rulerH=null,this.rulerV=null,this.gridOverlay=null,this.htmlPanel=null,this.previewPanel=null,this.textPanel=null,this.pagePanel=null}getMode(){return this.mode}isRulerVisible(){return this.rulerVisible}isGridVisible(){return this.gridVisible}async switchTo(i){var e,t,n,o;if(this.mode!==i){switch(this.mode==="html"&&(this.syncFromHtml(),(e=this.cmDestroy)==null||e.call(this),this.cmDestroy=null,this.cmGetContent=null,this.htmlPanel&&(this.htmlPanel.innerHTML="")),this.mode==="page"&&((t=this.pageViewInstance)==null||t.unmount(),this.pageViewInstance=null),this.mode=i,this.contentEl.style.display=i==="design"?"":"none",this.htmlPanel&&(this.htmlPanel.style.display=i==="html"?"flex":"none"),this.previewPanel&&(this.previewPanel.style.display=i==="preview"?"block":"none"),this.textPanel&&(this.textPanel.style.display=i==="text"?"block":"none"),this.pagePanel&&(this.pagePanel.style.display=i==="page"?"flex":"none"),i){case"html":await this.initHtmlView();break;case"preview":this.initPreviewView();break;case"text":this.initTextView();break;case"page":this.initPageView();break;case"design":this.contentEl.focus();break}(o=(n=this.callbacks).onViewChange)==null||o.call(n,i)}}toggleRuler(){return this.rulerVisible=!this.rulerVisible,this.applyRuler(),this.rulerVisible}toggleGrid(){return this.gridVisible=!this.gridVisible,this.applyGrid(),this.gridVisible}toggleHiddenBorder(){return this.hiddenBorderVisible=!this.hiddenBorderVisible,this.contentEl.classList.toggle("poa-show-hidden-borders",this.hiddenBorderVisible),this.hiddenBorderVisible}toggleFullscreen(i){var e,t;document.fullscreenElement?(t=document.exitFullscreen)==null||t.call(document):(e=i.requestFullscreen)==null||e.call(i)}createPanel(i){const e=document.createElement("div");return e.className=i,e.style.cssText="display:none;flex:1;overflow-y:auto;box-sizing:border-box;min-height:0;",e}async initHtmlView(){if(!this.htmlPanel)return;const i=this.prettyHtml(this.contentEl.innerHTML);try{const[{EditorView:e,basicSetup:t},{html:n}]=await Promise.all([tn(()=>import("./index-C7NBGF--.js"),__vite__mapDeps([0,1])),tn(()=>import("./index-B4ZUyHfc.js"),__vite__mapDeps([2,1]))]);this.htmlPanel.innerHTML="",this.htmlPanel.style.cssText="display:flex;flex:1;overflow:hidden;box-sizing:border-box;";const o=document.createElement("div");o.style.cssText="flex:1;overflow:auto;",this.htmlPanel.appendChild(o);const s=new e({doc:i,extensions:[t,n()],parent:o});this.cmGetContent=()=>s.state.doc.toString(),this.cmDestroy=()=>s.destroy()}catch{this.htmlPanel.innerHTML="",this.htmlPanel.style.cssText="display:flex;flex:1;overflow:hidden;box-sizing:border-box;";const e=document.createElement("textarea");e.value=i,e.id="poa-html-fallback-ta",e.style.cssText="flex:1;font-family:monospace;font-size:13px;border:none;outline:none;padding:12px;resize:none;box-sizing:border-box;",this.htmlPanel.appendChild(e),this.cmGetContent=()=>e.value,this.cmDestroy=()=>{}}}syncFromHtml(){var e;const i=((e=this.cmGetContent)==null?void 0:e.call(this))??"";i.trim()&&(this.contentEl.innerHTML=te.sanitize(i))}initPreviewView(){if(!this.previewPanel)return;const i=te.sanitize(this.contentEl.innerHTML);this.previewPanel.style.cssText="display:block;flex:1;overflow-y:auto;padding:20px;font-size:14px;line-height:1.6;box-sizing:border-box;",this.previewPanel.innerHTML=i}initTextView(){if(!this.textPanel)return;const i=this.contentEl.innerText??this.contentEl.textContent??"";this.textPanel.innerHTML="",this.textPanel.style.cssText="display:block;flex:1;overflow-y:auto;box-sizing:border-box;";const e=document.createElement("pre");e.style.cssText="padding:20px;white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0;font-family:inherit;",e.textContent=i,this.textPanel.appendChild(e)}initPageView(){var t,n;if(!this.pagePanel)return;const i=te.sanitize(this.contentEl.innerHTML),e=((n=(t=this.callbacks).getBookmarks)==null?void 0:n.call(t))??[];this.pagePanel.innerHTML="",this.pagePanel.style.cssText="display:flex;flex:1;overflow:hidden;box-sizing:border-box;",this.pageViewInstance=new ks,this.pageViewInstance.mount(this.pagePanel,i,e)}applyRuler(){!this.wrapper||!this.contentRow||(this.rulerVisible?(this.rulerH||(this.rulerH=this.buildHRuler(),this.wrapper.insertBefore(this.rulerH,this.contentRow)),this.rulerH.style.display="block",this.rulerV||(this.rulerV=this.buildVRuler(),this.contentRow.insertBefore(this.rulerV,this.contentRow.firstChild)),this.rulerV.style.display="block"):(this.rulerH&&(this.rulerH.style.display="none"),this.rulerV&&(this.rulerV.style.display="none")))}applyGrid(){if(this.wrapper)if(this.gridVisible){if(!this.gridOverlay){const i=document.createElement("div");i.className="poa-grid-overlay",i.style.cssText="position:absolute;inset:0;pointer-events:none;z-index:5;background-image:repeating-linear-gradient(transparent,transparent 19px,rgba(0,120,212,.12) 19px,rgba(0,120,212,.12) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(0,120,212,.12) 19px,rgba(0,120,212,.12) 20px);",this.wrapper.appendChild(i),this.gridOverlay=i}this.gridOverlay.style.display=""}else this.gridOverlay&&(this.gridOverlay.style.display="none")}buildHRuler(){const i=document.createElement("div");i.className="poa-ruler-h",i.style.cssText="height:20px;flex-shrink:0;background:#f0f0f0;border-bottom:1px solid #ddd;overflow:hidden;";const e=document.createElement("canvas");return e.height=20,i.appendChild(e),requestAnimationFrame(()=>{try{this.drawHRuler(e)}catch{}}),i}buildVRuler(){const i=document.createElement("div");i.className="poa-ruler-v",i.style.cssText="width:20px;flex-shrink:0;background:#f0f0f0;border-right:1px solid #ddd;overflow:hidden;";const e=document.createElement("canvas");return e.width=20,i.appendChild(e),requestAnimationFrame(()=>{try{this.drawVRuler(e)}catch{}}),i}drawHRuler(i){var n;const e=(((n=this.wrapper)==null?void 0:n.clientWidth)??0)||800;i.width=e;const t=i.getContext("2d");if(t){t.clearRect(0,0,e,20),t.strokeStyle="#bbb",t.fillStyle="#777",t.font="8px sans-serif",t.lineWidth=1;for(let o=0;o<=e;o+=10){const s=o%100===0,a=s?12:o%50===0?8:4;t.beginPath(),t.moveTo(o+.5,20-a),t.lineTo(o+.5,20),t.stroke(),s&&o>0&&(t.textAlign="center",t.fillText(String(o),o,7))}}}drawVRuler(i){var n;const e=(((n=this.wrapper)==null?void 0:n.clientHeight)??0)||600;i.height=e;const t=i.getContext("2d");if(t){t.clearRect(0,0,20,e),t.strokeStyle="#bbb",t.fillStyle="#777",t.font="8px sans-serif",t.lineWidth=1;for(let o=0;o<=e;o+=10){const s=o%100===0,a=s?12:o%50===0?8:4;t.beginPath(),t.moveTo(20-a,o+.5),t.lineTo(20,o+.5),t.stroke(),s&&o>0&&(t.save(),t.translate(6,o),t.rotate(-Math.PI/2),t.textAlign="center",t.fillText(String(o),0,0),t.restore())}}}prettyHtml(i){return i.replace(/(<\/(?:div|p|br|h[1-6]|li|ul|ol|table|tr|td|th|thead|tbody|tfoot)>)/gi,`$1
`).replace(/(<(?:div|p|h[1-6]|li|ul|ol|table|tr|td|th|thead|tbody|tfoot)[^>]*>)/gi,`
$1`).replace(/\n{3,}/g,`

`).trim()}}const Ls=100,nn=8,Ts=[{dir:"e",cursor:"e-resize",top:"50%",left:"100%"},{dir:"s",cursor:"s-resize",top:"100%",left:"50%"},{dir:"se",cursor:"se-resize",top:"100%",left:"100%"}];class Ss{constructor(i,e={}){c(this,"contentEl");c(this,"cb");c(this,"table",null);c(this,"overlay",null);c(this,"preview",null);c(this,"tooltip",null);c(this,"dragging",!1);c(this,"dragDir","se");c(this,"dragStartX",0);c(this,"dragStartY",0);c(this,"dragStartW",0);c(this,"dragStartH",0);c(this,"syncHandles",()=>{this.updateOverlayPos()});c(this,"onHandleMouseDown",i=>{if(!this.table)return;const e=i.currentTarget.dataset.dir;i.preventDefault(),i.stopPropagation();const t=this.table.getBoundingClientRect();this.dragging=!0,this.dragDir=e,this.dragStartX=i.clientX,this.dragStartY=i.clientY,this.dragStartW=t.width,this.dragStartH=t.height,document.body.style.cursor=i.currentTarget.style.cursor,document.body.style.userSelect="none",this.createPreview(t.width,t.height)});c(this,"onMouseMove",i=>{if(!this.dragging||!this.table)return;const{w:e,h:t}=this.computeSize(i);this.updatePreview(e,t),this.showTooltip(e,t,i.clientX,i.clientY)});c(this,"onMouseUp",i=>{var o;if(!this.dragging||!this.table)return;this.dragging=!1;const{w:e,h:t}=this.computeSize(i),n=this.dragDir;(n==="e"||n==="se")&&(this.table.style.width=`${Math.round(e)}px`),(n==="s"||n==="se")&&(this.table.style.minHeight=`${Math.round(t)}px`),(o=this.preview)==null||o.remove(),this.preview=null,this.destroyTooltip(),document.body.style.cursor="",document.body.style.userSelect="",requestAnimationFrame(()=>{var s,a;this.updateOverlayPos(),this.table&&((a=(s=this.cb).onResizeEnd)==null||a.call(s,this.table))})});c(this,"onContentInput",()=>{this.table&&!this.contentEl.contains(this.table)&&this.detach()});this.contentEl=i,this.cb=e}attach(i){this.detach(),this.table=i,this.createOverlay(),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp),this.contentEl.addEventListener("scroll",this.syncHandles),window.addEventListener("scroll",this.syncHandles,!0),this.contentEl.addEventListener("input",this.onContentInput)}detach(){var i,e;(i=this.overlay)==null||i.remove(),(e=this.preview)==null||e.remove(),this.destroyTooltip(),this.overlay=null,this.preview=null,this.table=null,this.dragging=!1,document.removeEventListener("mousemove",this.onMouseMove),document.removeEventListener("mouseup",this.onMouseUp),this.contentEl.removeEventListener("scroll",this.syncHandles),window.removeEventListener("scroll",this.syncHandles,!0),this.contentEl.removeEventListener("input",this.onContentInput)}createOverlay(){if(!this.table)return;const i=document.createElement("div");i.dataset.poaTemp="true",i.style.cssText="position:fixed;pointer-events:none;z-index:10;box-sizing:border-box;";for(const e of Ts){const t=document.createElement("div");t.dataset.dir=e.dir,t.dataset.poaTemp="true",t.style.cssText=`position:absolute;width:${nn}px;height:${nn}px;background:#0078d7;border:1px solid #fff;border-radius:1px;box-sizing:border-box;cursor:${e.cursor};top:${e.top};left:${e.left};transform:translate(-50%,-50%);pointer-events:all;z-index:11;`,t.addEventListener("mousedown",this.onHandleMouseDown),i.appendChild(t)}document.body.appendChild(i),this.overlay=i,this.updateOverlayPos()}updateOverlayPos(){if(!this.overlay||!this.table)return;const i=this.table.getBoundingClientRect();Object.assign(this.overlay.style,{top:`${i.top}px`,left:`${i.left}px`,width:`${i.width}px`,height:`${i.height}px`})}computeSize(i){var d;const e=i.clientX-this.dragStartX,t=i.clientY-this.dragStartY,n=this.dragDir,o=this.contentEl.clientWidth,s=Math.max(30,(((d=this.table)==null?void 0:d.rows.length)??1)*30);let a=this.dragStartW,r=this.dragStartH;return(n==="e"||n==="se")&&(a=this.dragStartW+e),(n==="s"||n==="se")&&(r=this.dragStartH+t),i.shiftKey&&n==="se"&&this.dragStartH>0&&(r=a/(this.dragStartW/this.dragStartH)),{w:Math.max(Ls,Math.min(o,a)),h:Math.max(s,r)}}createPreview(i,e){if(!this.table)return;const t=document.createElement("div");t.dataset.poaTemp="true",t.style.cssText="position:fixed;border:1px dashed #0078d7;background:rgba(0,120,215,0.05);pointer-events:none;z-index:9;box-sizing:border-box;",document.body.appendChild(t),this.preview=t,this.updatePreview(i,e)}updatePreview(i,e){if(!this.preview||!this.table)return;const t=this.table.getBoundingClientRect();Object.assign(this.preview.style,{top:`${t.top}px`,left:`${t.left}px`,width:`${Math.round(i)}px`,height:`${Math.round(e)}px`})}showTooltip(i,e,t,n){if(!this.tooltip){const o=document.createElement("div");o.dataset.poaTemp="true",o.style.cssText="position:fixed;background:#222;color:#fff;font-size:11px;padding:3px 7px;border-radius:3px;pointer-events:none;z-index:9999;white-space:nowrap;",document.body.appendChild(o),this.tooltip=o}this.tooltip.textContent=`${Math.round(i)}px × ${Math.round(e)}px`,this.tooltip.style.left=`${t+14}px`,this.tooltip.style.top=`${n+14}px`}destroyTooltip(){var i;(i=this.tooltip)==null||i.remove(),this.tooltip=null}}class Is{constructor(i={}){c(this,"cb");c(this,"toolbar",null);c(this,"table",null);c(this,"contentEl",null);c(this,"wInput",null);c(this,"hInput",null);c(this,"wSelect",null);c(this,"isDragging",!1);c(this,"dragOffsetX",0);c(this,"dragOffsetY",0);c(this,"onScroll",()=>{this.isDragging||this.updatePosition()});c(this,"onDragMove",i=>{if(!this.isDragging||!this.toolbar)return;const e=this.toolbar.offsetHeight||32,t=this.toolbar.offsetWidth||300;let n=i.clientX-this.dragOffsetX,o=i.clientY-this.dragOffsetY;n=Math.max(0,Math.min(window.innerWidth-t-4,n)),o=Math.max(0,Math.min(window.innerHeight-e-4,o)),this.toolbar.style.left=`${n}px`,this.toolbar.style.top=`${o}px`});c(this,"onDragUp",()=>{this.stopDrag()});this.cb=i}show(i,e){this.hide(),this.table=i,this.contentEl=e,this.createToolbar(),e.addEventListener("scroll",this.onScroll),window.addEventListener("scroll",this.onScroll,!0)}hide(){var i,e;(i=this.toolbar)==null||i.remove(),(e=this.contentEl)==null||e.removeEventListener("scroll",this.onScroll),window.removeEventListener("scroll",this.onScroll,!0),this.stopDrag(),this.toolbar=null,this.table=null,this.contentEl=null,this.wInput=null,this.hInput=null,this.wSelect=null}syncPosition(){this.isDragging||this.updatePosition(),this.syncValues()}createToolbar(){if(!this.table||!this.contentEl)return;const i=document.createElement("div");i.dataset.poaTemp="true",i.style.cssText="position:fixed;display:flex;align-items:center;gap:6px;height:32px;background:rgba(255,255,255,0.95);border:1px solid #E5E7EB;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.12);padding:0 8px;font-size:12px;white-space:nowrap;z-index:100;box-sizing:border-box;",i.addEventListener("mousedown",a=>a.stopPropagation());const e=document.createElement("span");e.textContent="⠿",e.title="드래그하여 이동",e.style.cssText="cursor:grab;color:#9CA3AF;font-size:14px;line-height:1;padding:0 4px 0 0;flex-shrink:0;user-select:none;-webkit-user-select:none;",e.addEventListener("mousedown",a=>this.onHandleMouseDown(a)),i.appendChild(e),i.appendChild(this.makeSep()),i.appendChild(this.makeLabel("너비"));const t=this.makeInput("w",this.readWidthPx());this.wInput=t,i.appendChild(t);const n=this.makeUnitSelect(this.readWidthUnit());this.wSelect=n,i.appendChild(n),i.appendChild(this.makeSep()),i.appendChild(this.makeLabel("높이"));const o=this.makeInput("h",this.readHeightPx());this.hInput=o,i.appendChild(o),i.appendChild(this.makeLabel("px")),i.appendChild(this.makeSep());const s=document.createElement("button");s.textContent="원본",s.style.cssText="border:1px solid #D1D5DB;border-radius:4px;background:#F9FAFB;padding:2px 8px;cursor:pointer;font-size:11px;color:#374151;line-height:1.4;flex-shrink:0;",s.addEventListener("click",()=>this.applyReset()),i.appendChild(s),this.toolbar=i,document.body.appendChild(i),this.updatePosition(),t.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),this.applyWidth())}),t.addEventListener("blur",()=>this.applyWidth()),n.addEventListener("change",()=>this.applyWidth()),o.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),this.applyHeight())}),o.addEventListener("blur",()=>this.applyHeight())}makeLabel(i){const e=document.createElement("span");return e.textContent=i,e.style.cssText="color:#6B7280;flex-shrink:0;",e}makeInput(i,e){const t=document.createElement("input");return t.type="number",t.value=e,t.min="1",t.id=`poa-tbl-tb-${i}`,t.style.cssText="width:52px;height:22px;padding:0 4px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px;box-sizing:border-box;text-align:right;",t}makeUnitSelect(i){const e=document.createElement("select");e.style.cssText="height:22px;padding:0 2px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px;";for(const t of["px","%"]){const n=document.createElement("option");n.value=t,n.textContent=t,t===i&&(n.selected=!0),e.appendChild(n)}return e}makeSep(){const i=document.createElement("div");return i.style.cssText="width:1px;height:16px;background:#E5E7EB;margin:0 2px;flex-shrink:0;",i}readWidthUnit(){var i;return(((i=this.table)==null?void 0:i.style.width)??"").endsWith("%")?"%":"px"}readWidthPx(){if(!this.table)return"100";const i=this.table.style.width;return i.endsWith("%")||i.endsWith("px")?String(Math.round(parseFloat(i))):String(Math.round(this.table.getBoundingClientRect().width||100))}readHeightPx(){if(!this.table)return"";const i=this.table.style.minHeight;return i.endsWith("px")?String(Math.round(parseFloat(i))):String(Math.round(this.table.getBoundingClientRect().height||0))}applyWidth(){var t,n;if(!this.table||!this.wInput||!this.wSelect)return;const i=this.wSelect.value,e=Math.max(1,parseFloat(this.wInput.value)||100);this.wInput.value=String(Math.round(e)),this.table.style.width=`${Math.round(e)}${i}`,this.isDragging||this.updatePosition(),(n=(t=this.cb).onApply)==null||n.call(t,this.table)}applyHeight(){var e,t;if(!this.table||!this.hInput)return;const i=Math.max(1,parseFloat(this.hInput.value)||0);this.hInput.value=String(Math.round(i)),this.table.style.minHeight=i>0?`${Math.round(i)}px`:"",(t=(e=this.cb).onApply)==null||t.call(e,this.table)}applyReset(){var i,e;this.table&&(this.table.style.width="100%",this.table.style.minHeight="",this.syncValues(),this.isDragging||this.updatePosition(),(e=(i=this.cb).onApply)==null||e.call(i,this.table))}syncValues(){!this.wInput||!this.hInput||!this.wSelect||!this.table||(this.wSelect.value=this.readWidthUnit(),this.wInput.value=this.readWidthPx(),this.hInput.value=this.readHeightPx())}updatePosition(){if(!this.toolbar||!this.table||!this.contentEl||this.isDragging)return;const i=this.table.getBoundingClientRect(),e=this.contentEl.getBoundingClientRect(),t=this.toolbar.offsetHeight||32,n=this.toolbar.offsetWidth||300,o=e.top;let s=i.top-t-4,a=i.left;s<o+4&&(s=i.bottom+4,s+t>window.innerHeight-8&&(s=o+4));const r=e.right-n-4;a=Math.min(a,r),a=Math.max(e.left,a),this.toolbar.style.top=`${s}px`,this.toolbar.style.left=`${a}px`}onHandleMouseDown(i){this.toolbar&&(i.preventDefault(),i.stopPropagation(),this.isDragging=!0,this.dragOffsetX=i.clientX-this.toolbar.offsetLeft,this.dragOffsetY=i.clientY-this.toolbar.offsetTop,document.addEventListener("mousemove",this.onDragMove),document.addEventListener("mouseup",this.onDragUp),this.toolbar&&(this.toolbar.style.cursor="grabbing"))}stopDrag(){this.isDragging&&(this.isDragging=!1,document.removeEventListener("mousemove",this.onDragMove),document.removeEventListener("mouseup",this.onDragUp),this.toolbar&&(this.toolbar.style.cursor=""))}}const As=["font-family","font-size","font-weight","font-style","text-decoration","color","background-color","letter-spacing","line-height"],Ms=new Set(["strong","em","u","s","sup","sub","span"]);class Bs{constructor(i,e={}){c(this,"contentEl");c(this,"cb");c(this,"savedStyles",new Map);c(this,"_active",!1);c(this,"_continuous",!1);this.contentEl=i,this.cb=e}get isActive(){return this._active}get hasSavedStyles(){return this.savedStyles.size>0}copy(i=!1){var n,o;const e=this.contentEl.ownerDocument.getSelection();if(!e||e.rangeCount===0)return;const t=e.getRangeAt(0);this.collectStyles(t.startContainer),this._active=!0,this._continuous=i,this.contentEl.style.cursor="crosshair",(o=(n=this.cb).onModeChange)==null||o.call(n,!0)}paste(i){if(this.savedStyles.size===0)return;const e=this.contentEl.ownerDocument.getSelection(),t=i??(e!=null&&e.rangeCount?e.getRangeAt(0):null);if(!t||t.collapsed)return;const n=this.contentEl.ownerDocument,o=n.createElement("span");this.savedStyles.forEach((a,r)=>o.style.setProperty(r,a));const s=t.extractContents();if(o.appendChild(s),t.insertNode(o),e){e.removeAllRanges();const a=n.createRange();a.selectNodeContents(o),e.addRange(a)}this._continuous||this.deactivate()}clear(i){const e=this.contentEl.ownerDocument.getSelection(),t=i??(e!=null&&e.rangeCount?e.getRangeAt(0):null);if(!t||t.collapsed)return;const n=t.cloneContents();this.flattenInlineElements(n);const o=n.textContent??t.toString();if(t.deleteContents(),t.insertNode(this.contentEl.ownerDocument.createTextNode(o)),e){e.removeAllRanges();const s=this.contentEl.ownerDocument.createRange();s.setStart(t.startContainer,t.startOffset),s.collapse(!0),e.addRange(s)}}deactivate(){var i,e;this._active&&(this._active=!1,this._continuous=!1,this.contentEl.style.cursor="",(e=(i=this.cb).onModeChange)==null||e.call(i,!1))}handleMouseUp(){if(!this._active)return;const i=this.contentEl.ownerDocument.getSelection();i&&!i.isCollapsed&&this.paste()}handleKeydown(i){i.key==="Escape"&&this._active&&(i.preventDefault(),this.deactivate())}collectStyles(i){this.savedStyles.clear();let e=i.nodeType===Node.TEXT_NODE?i.parentNode:i;for(;e&&e!==this.contentEl;){if(e.nodeType===Node.ELEMENT_NODE){const t=e;for(const n of As)if(!this.savedStyles.has(n)){const o=t.style.getPropertyValue(n);o&&this.savedStyles.set(n,o)}}e=e.parentNode}}flattenInlineElements(i){const e=Array.from(i.childNodes);for(const t of e)if(t.nodeType===Node.ELEMENT_NODE){const n=t;if(Ms.has(n.tagName.toLowerCase())){for(this.flattenInlineElements(n);n.firstChild;)i.insertBefore(n.firstChild,n);i.removeChild(n)}else this.flattenInlineElements(n)}}}const Ds=new Set(["ul","ol"]);function _s(l,i){const e=[],t=Array.from(l.children),n=o=>Ds.has(o.tagName.toLowerCase())?Array.from(o.children):[o];if(i.collapsed){const o=i.startContainer.nodeType===Node.TEXT_NODE?i.startContainer.parentElement:i.startContainer,s=t.find(a=>a===o||a.contains(o));return s&&e.push(...n(s)),e}for(const o of t)i.intersectsNode(o)&&e.push(...n(o));return e}function on(l){return l.tagName==="LI"}class Rs{constructor(i){c(this,"contentEl");this.contentEl=i}toggleList(i){const e=this.contentEl.ownerDocument.getSelection();if(!e||e.rangeCount===0)return;const t=e.getRangeAt(0),n=_s(this.contentEl,t);if(n.length===0)return;n.every(s=>{var a;return on(s)?((a=s.parentElement)==null?void 0:a.tagName.toLowerCase())===i:!1})?this.unlistBlocks(n):this.listifyBlocks(n,i)}toggleSuperSub(i){const e=this.contentEl.ownerDocument.getSelection();if(!e||e.rangeCount===0)return;const t=e.getRangeAt(0);if(t.collapsed)return;const n=this.contentEl.ownerDocument,o=i==="sup"?"sub":"sup",s=this.findAncestorTag(t.commonAncestorContainer,i),a=this.findAncestorTag(t.commonAncestorContainer,o);if(s!==null||this.isWrappedWith(t.cloneContents(),i)){const d=s??(()=>{const p=t.extractContents();return this.unwrapTag(p,i),t.insertNode(p),null})();if(d){const p=d.parentNode;for(;d.firstChild;)p.insertBefore(d.firstChild,d);p.removeChild(d)}}else if(a){const d=n.createElement(i);for(;a.firstChild;)d.appendChild(a.firstChild);a.parentNode.replaceChild(d,a),e.removeAllRanges();const p=n.createRange();p.selectNodeContents(d),e.addRange(p)}else{const d=e.rangeCount?e.getRangeAt(0):t;if(d.collapsed)return;const p=d.extractContents();this.unwrapTag(p,o);const h=n.createElement(i);h.appendChild(p),d.insertNode(h),e.removeAllRanges();const g=n.createRange();g.selectNodeContents(h),e.addRange(g)}}handleTab(i){const e=this.contentEl.ownerDocument.getSelection();if(!e||e.rangeCount===0)return!1;let n=e.getRangeAt(0).startContainer,o=null;for(;n&&n!==this.contentEl;){if(n.nodeType===Node.ELEMENT_NODE&&n.tagName==="LI"){o=n;break}n=n.parentNode}return o?(i.preventDefault(),i.shiftKey?this.outdentListItem(o):this.indentListItem(o),!0):!1}listifyBlocks(i,e){const t=this.contentEl.ownerDocument,n=i[0],o=n.parentElement;if(on(n)&&o&&["ul","ol"].includes(o.tagName.toLowerCase())){const r=t.createElement(e);r.innerHTML=o.innerHTML,o.replaceWith(r);return}const s=t.createElement(e),a=n.parentElement;for(const r of i){const d=t.createElement("li");for(;r.firstChild;)d.appendChild(r.firstChild);s.appendChild(d)}a==null||a.insertBefore(s,n);for(const r of i)r.remove()}unlistBlocks(i){var t;const e=this.contentEl.ownerDocument;for(const n of i){const o=n.parentElement;if(!o)continue;const s=e.createElement("p");for(;n.firstChild;)s.appendChild(n.firstChild);(t=o.parentElement)==null||t.insertBefore(s,o),n.remove(),o.children.length===0&&o.remove()}}indentListItem(i){var s;const e=i.previousElementSibling;if(!e)return;const t=this.contentEl.ownerDocument,n=((s=i.parentElement)==null?void 0:s.tagName.toLowerCase())??"ul",o=e.lastElementChild;if(o&&["ul","ol"].includes(o.tagName.toLowerCase()))o.appendChild(i);else{const a=t.createElement(n);a.appendChild(i),e.appendChild(a)}}outdentListItem(i){const e=i.parentElement;if(!e)return;const t=e.parentElement;if(!t||t.tagName!=="LI")return;const n=t.parentElement;n&&(n.insertBefore(i,t.nextSibling),e.children.length===0&&e.remove())}findAncestorTag(i,e){let t=i.nodeType===Node.TEXT_NODE?i.parentNode:i;for(;t&&t!==this.contentEl;){if(t.nodeType===Node.ELEMENT_NODE&&t.tagName.toLowerCase()===e)return t;t=t.parentNode}return null}isWrappedWith(i,e){var s;if(!(i.textContent??"").trim())return!1;const n=this.contentEl.ownerDocument.createTreeWalker(i,NodeFilter.SHOW_TEXT);let o=n.nextNode();for(;o;){let a=o.parentNode,r=!1;for(;a&&a!==i;){if(((s=a.tagName)==null?void 0:s.toLowerCase())===e){r=!0;break}a=a.parentNode}if(!r)return!1;o=n.nextNode()}return!0}unwrapTag(i,e){var t,n;if(i.nodeType===Node.ELEMENT_NODE){const o=i;if(o.tagName.toLowerCase()===e){for(;o.firstChild;)(t=o.parentNode)==null||t.insertBefore(o.firstChild,o);(n=o.parentNode)==null||n.removeChild(o);return}}Array.from(i.childNodes).forEach(o=>this.unwrapTag(o,e))}}const Fs={success:{color:"#16A34A",icon:"✓"},error:{color:"#EF4444",icon:"✕"},info:{color:"#3B82F6",icon:"ℹ"}};class Hs{constructor(){c(this,"container");this.container=document.createElement("div");const i=this.container.style;i.position="fixed",i.bottom="16px",i.right="16px",i.zIndex="99999",i.display="flex",i.flexDirection="column",i.gap="8px",i.pointerEvents="none",i.fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",document.body.appendChild(this.container)}show(i,e="info",t=2e3){const{color:n,icon:o}=Fs[e],s=document.createElement("div"),a=s.style;a.background="#1F2937",a.color="#FFFFFF",a.borderRadius="8px",a.padding="10px 16px",a.fontSize="13px",a.minWidth="200px",a.display="flex",a.alignItems="center",a.gap="8px",a.boxShadow="0 4px 12px rgba(0,0,0,0.15)",a.borderLeft=`4px solid ${n}`,a.opacity="0",a.transform="translateY(20px)",a.transition="opacity 0.2s ease, transform 0.2s ease",a.pointerEvents="auto";const r=document.createElement("span");r.textContent=o,r.style.color=n,r.style.fontWeight="600",r.style.flexShrink="0",r.style.fontSize="14px";const d=document.createElement("span");d.textContent=i,s.appendChild(r),s.appendChild(d),this.container.appendChild(s),requestAnimationFrame(()=>{requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="translateY(0)"})}),setTimeout(()=>{s.style.transition="opacity 0.3s ease, transform 0.3s ease",s.style.opacity="0",s.style.transform="translateY(20px)",setTimeout(()=>s.remove(),300)},t)}destroy(){this.container.remove()}}function X(l){const i=l.tagName.toLowerCase(),e=l.id?`#${l.id}`:"",t=l.getAttribute("src")?`[src="${l.getAttribute("src").slice(0,30)}"]`:"";return`${i}${e}${t}`||i}function sn(l){const i=l.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/);return!i||(i[4]!==void 0?parseFloat(i[4]):1)===0?null:[parseInt(i[1]),parseInt(i[2]),parseInt(i[3])]}function zt(l){const i=l/255;return i<=.04045?i/12.92:Math.pow((i+.055)/1.055,2.4)}function rn(l,i,e){return .2126*zt(l)+.7152*zt(i)+.0722*zt(e)}function $s(l,i){const e=Math.max(l,i),t=Math.min(l,i);return(e+.05)/(t+.05)}class zs{constructor(i){c(this,"root");this.root=i}run(){const i=[...this.checkImageAlt(),...this.checkTable(),...this.checkLinkText(),...this.checkFormLabels(),...this.checkVideoTrack(),...this.checkDuplicateIds(),...this.checkColorContrast(),...this.checkHeadingHierarchy()];return{issues:i,errorCount:i.filter(e=>e.level==="error").length,warningCount:i.filter(e=>e.level==="warning").length,infoCount:i.filter(e=>e.level==="info").length}}checkImageAlt(){const i=[];return this.root.querySelectorAll("img").forEach(e=>{e.hasAttribute("alt")?e.alt===""&&i.push({id:"img-alt-empty",level:"warning",title:"이미지 alt 속성 빈값",message:`${X(e)} — alt가 빈 문자열입니다. 장식용 이미지가 맞는지 확인하세요.`,element:e,selector:X(e)}):i.push({id:"img-alt-missing",level:"error",title:"이미지 alt 속성 누락",message:`${X(e)} — alt 속성이 없습니다.`,element:e,selector:X(e),autoFix:()=>{e.alt="이미지"}})}),i}checkTable(){const i=[];return this.root.querySelectorAll("table").forEach(e=>{e.querySelector("caption")||i.push({id:"table-caption-missing",level:"warning",title:"표 캡션 누락",message:`${X(e)} — caption 요소가 없습니다.`,element:e,selector:X(e),autoFix:()=>{const t=e.ownerDocument.createElement("caption");t.textContent="표",e.prepend(t)}}),e.hasAttribute("summary")||i.push({id:"table-summary-missing",level:"info",title:"표 summary 속성 없음",message:`${X(e)} — summary 속성을 추가하면 스크린 리더에 도움이 됩니다.`,element:e,selector:X(e)}),e.querySelectorAll("th").forEach(t=>{t.hasAttribute("scope")||i.push({id:"th-scope-missing",level:"warning",title:"표 헤더 scope 누락",message:"th 요소에 scope 속성이 없습니다.",element:t,selector:X(t),autoFix:()=>{t.scope="col"}})})}),i}checkLinkText(){const i=new Set(["여기","클릭","링크","더보기","바로가기","here","click","link","more"]),e=[];return this.root.querySelectorAll("a").forEach(t=>{const n=(t.textContent??"").trim(),o=t.querySelector("img[alt]")!==null;!n&&!o?e.push({id:"link-no-text",level:"error",title:"링크 텍스트 없음",message:`${X(t)} — 링크에 텍스트가 없습니다.`,element:t,selector:X(t)}):n&&i.has(n.toLowerCase())&&e.push({id:"link-vague-text",level:"warning",title:"링크 텍스트 불명확",message:`<a>${n}</a> — 링크 목적을 알 수 없는 텍스트입니다.`,element:t,selector:X(t)})}),e}checkFormLabels(){const i=[],e=this.root.ownerDocument;return this.root.querySelectorAll("input, select").forEach(t=>{const n=t.hasAttribute("aria-label")||t.hasAttribute("aria-labelledby");if(!(t.id?e.querySelector(`label[for="${t.id}"]`)!==null:!1)&&!n){const s=t.tagName.toLowerCase();i.push({id:`${s}-label-missing`,level:"error",title:`${s==="input"?"입력 필드":"선택 상자"} 레이블 없음`,message:`${X(t)} — label 연결이 없습니다.`,element:t,selector:X(t)})}}),i}checkVideoTrack(){const i=[];return this.root.querySelectorAll("video").forEach(e=>{e.querySelector("track")||i.push({id:"video-track-missing",level:"warning",title:"비디오 자막 트랙 없음",message:`${X(e)} — track 요소가 없습니다.`,element:e,selector:X(e)})}),i}checkDuplicateIds(){const i=[],e=new Map;return this.root.querySelectorAll("[id]").forEach(t=>{e.has(t.id)||e.set(t.id,[]),e.get(t.id).push(t)}),e.forEach((t,n)=>{t.length>1&&i.push({id:"duplicate-id",level:"error",title:"중복 ID",message:`id="${n}" 가 ${t.length}개 요소에서 사용됩니다.`,element:t[0],selector:`[id="${n}"]`})}),i}checkColorContrast(){const i=[];if(typeof window>"u")return i;const e=new Set;return this.root.querySelectorAll("p, li, span, td, th, h1, h2, h3, h4, h5, h6, a").forEach(n=>{try{const o=window.getComputedStyle(n),s=sn(o.color),a=sn(o.backgroundColor);if(!s||!a)return;const r=`${s.join(",")}-${a.join(",")}`;if(e.has(r))return;e.add(r);const d=$s(rn(...s),rn(...a));d<4.5&&i.push({id:"color-contrast",level:"warning",title:"색상 대비 부족",message:`대비율 ${d.toFixed(2)}:1 — WCAG AA 기준(4.5:1) 미만입니다.`,element:n,selector:X(n)})}catch{}}),i}checkHeadingHierarchy(){const i=[],e=Array.from(this.root.querySelectorAll("h1, h2, h3, h4, h5, h6"));if(e.length===0)return i;e.some(o=>o.tagName==="H1")||i.push({id:"heading-no-h1",level:"warning",title:"h1 제목 없음",message:"문서에 h1 제목이 없습니다.",element:e[0],selector:"heading"});let n=0;for(const o of e){const s=parseInt(o.tagName[1]);n>0&&s-n>1&&i.push({id:"heading-skip",level:"warning",title:"제목 레벨 건너뜀",message:`h${n} 다음에 h${s}로 ${s-n-1}단계 건너뛰었습니다.`,element:o,selector:X(o)}),n=s}return i}}const Ns=["계좌","통장","입금","출금","계좌번호","이체","송금","은행"];function Ps(l,i,e=100){const t=Math.max(0,i-e),n=Math.min(l.length,i+e),o=l.slice(t,n);return Ns.some(s=>o.includes(s))}function Os(l){return l.replace(/(01\d[-\s]?)(\d{3,4})([-\s]?\d{4})/,(i,e,t,n)=>`${e}****${n}`)}function js(l){return l.replace(/(0\d{1,2}[-\s]?)(\d{3,4})([-\s]?\d{4})/,(i,e,t,n)=>`${e}****${n}`)}function Ws(l){const i=l.indexOf("@");return i<=1?l:l[0]+"***"+l.slice(i)}function Us(l){return l.indexOf("-")===6||l.length>=13?l.slice(0,7)+"*******":l.slice(0,6)+"-*******"}function qs(l){const e=l.replace(/[-\s]/g,"").slice(-4),t=l.includes("-")?"-":l.includes(" ")?" ":"";return t?`****${t}****${t}****${t}${e}`:`************${e}`}function Vs(l){return l.length<=4?l:l.slice(0,2)+"*".repeat(l.length-4)+l.slice(-2)}function Gs(l){return l.replace(/\.\d+$/,".***.***")}function Ys(l){return l.slice(0,2)+"*".repeat(l.length-2)}const Xs=[{type:"resident-id",label:"주민등록번호",riskLevel:"very-high",pattern:/\d{6}-?[1-4]\d{6}/g,mask:Us},{type:"credit-card",label:"신용카드 번호",riskLevel:"very-high",pattern:/\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/g,mask:qs},{type:"phone-mobile",label:"휴대폰 번호",riskLevel:"high",pattern:/01[0-9][-\s]?\d{3,4}[-\s]?\d{4}/g,mask:Os},{type:"phone-general",label:"일반 전화번호",riskLevel:"high",pattern:/0[2-9]\d?[-\s]?\d{3,4}[-\s]?\d{4}/g,mask:js},{type:"email",label:"이메일 주소",riskLevel:"high",pattern:/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,mask:Ws},{type:"bank-account",label:"계좌번호",riskLevel:"high",pattern:/\d{10,14}/g,contextGuard:Ps,mask:Vs},{type:"passport",label:"여권번호",riskLevel:"high",pattern:/[A-Z]{1,2}\d{7,9}/g,mask:Ys},{type:"ip-address",label:"IP 주소",riskLevel:"medium",pattern:/\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g,mask:Gs}];function Ks(l,i){const e=new Set(["p","div","h1","h2","h3","h4","h5","h6","li","td","th","blockquote","pre"]);let t=null,n=i.parentNode;for(;n&&n!==l;){if(n.nodeType===Node.ELEMENT_NODE&&e.has(n.tagName.toLowerCase())){t=n;break}n=n.parentNode}if(!t)return"문서";const o=t.tagName.toLowerCase(),a=Array.from(l.querySelectorAll(o)).indexOf(t);return a>=0?`${a+1}번째 ${Js(o)}`:o}function Js(l){return{p:"단락",div:"단락",li:"목록 항목",td:"표 셀",th:"표 헤더",blockquote:"인용문",pre:"코드 블록",h1:"제목",h2:"제목",h3:"제목",h4:"제목",h5:"제목",h6:"제목"}[l]??l}class fe{constructor(i){c(this,"root");c(this,"idSeq",0);this.root=i}run(){const i=[],e=document.createTreeWalker(this.root,NodeFilter.SHOW_TEXT);let t=e.nextNode();for(;t;){const o=t.nodeValue??"";if(o.trim())for(const s of Xs){s.pattern.lastIndex=0;let a;for(;(a=s.pattern.exec(o))!==null;){const r=a[0];s.contextGuard&&!s.contextGuard(o,a.index)||i.push({id:`pii-${++this.idSeq}`,type:s.type,riskLevel:s.riskLevel,label:s.label,raw:r,masked:s.mask(r),textNode:t,nodeOffset:a.index,locationLabel:Ks(this.root,t),highlightEl:null})}}t=e.nextNode()}const n={"very-high":0,high:1,medium:2};return i.sort((o,s)=>n[o.riskLevel]-n[s.riskLevel]),i}static highlight(i){const e=[...i].sort((t,n)=>t.textNode===n.textNode?n.nodeOffset-t.nodeOffset:0);for(const t of e)try{const n=t.textNode;if(!n.parentNode||!n.nodeValue)continue;const o=n.nodeValue.slice(0,t.nodeOffset),s=n.nodeValue.slice(t.nodeOffset,t.nodeOffset+t.raw.length),a=n.nodeValue.slice(t.nodeOffset+t.raw.length),r=n.ownerDocument,d=r.createElement("span");d.dataset.privacyId=t.id,d.dataset.privacyType=t.type,t.riskLevel==="very-high"?(d.style.background="#DC2626",d.style.color="#FFFFFF"):d.style.background="#FEE2E2",d.style.borderRadius="2px",d.style.padding="0 1px",d.textContent=s;const p=n.parentNode;o&&p.insertBefore(r.createTextNode(o),n),p.insertBefore(d,n),a&&p.insertBefore(r.createTextNode(a),n),p.removeChild(n),t.highlightEl=d,t.textNode=d.firstChild,t.nodeOffset=0}catch{}}static removeHighlights(i){i.querySelectorAll("[data-privacy-id]").forEach(e=>{const t=e.textContent??"";e.replaceWith(e.ownerDocument.createTextNode(t))}),i.normalize()}static deleteMatch(i){const e=i.highlightEl;e!=null&&e.parentNode&&(e.remove(),i.highlightEl=null)}static maskMatch(i){const e=i.highlightEl;e&&(e.textContent=i.masked,e.style.background="",e.style.color="",e.removeAttribute("data-privacy-id"),e.removeAttribute("data-privacy-type"),i.highlightEl=null)}static deleteAll(i){for(const e of i)fe.deleteMatch(e)}static maskAll(i){for(const e of i)fe.maskMatch(e)}}let Zs=0;function Nt(l){return l.dataset.formulaTableId||(l.dataset.formulaTableId=`ftbl-${++Zs}`),l.dataset.formulaTableId}function An(l,i,e){const t=Array.from(l.querySelectorAll("tr"));if(i<1||i>t.length)return null;const n=Array.from(t[i-1].querySelectorAll("td, th"));return e<1||e>n.length?null:n[e-1]}function an(l,i){const e=Array.from(l.querySelectorAll("tr"));for(let t=0;t<e.length;t++){const o=Array.from(e[t].querySelectorAll("td, th")).indexOf(i);if(o!==-1)return{row:t+1,col:o+1}}return null}function Qs(l){var t;const i=((t=l.textContent)==null?void 0:t.trim())??"",e=parseFloat(i.replace(/[₩%,\s]/g,""));return isNaN(e)?0:e}function ln(l,i,e,t,n,o){const s=[],a=Math.min(i,t),r=Math.max(i,t),d=Math.min(e,n),p=Math.max(e,n);for(let h=a;h<=r;h++)for(let g=d;g<=p;g++){const f=An(l,h,g);!f||f===o||s.push(Qs(f))}return s}function dn(l){const[i,e,t,n]=l.range,{targetRow:o,targetCol:s}=l;return o>=Math.min(i,t)&&o<=Math.max(i,t)&&s>=Math.min(e,n)&&s<=Math.max(e,n)}function cn(l,i){if(i.length===0)return 0;switch(l){case"SUM":return i.reduce((e,t)=>e+t,0);case"AVERAGE":return i.reduce((e,t)=>e+t,0)/i.length;case"PRODUCT":return i.reduce((e,t)=>e*t,1);case"SUBTRACT":return i.slice(1).reduce((e,t)=>e-t,i[0])}}function pn(l,i,e=2){switch(i){case"integer":return String(Math.round(l));case"decimal":return l.toFixed(e);case"currency":return"₩"+Math.round(l).toLocaleString("ko-KR");case"percent":return l.toFixed(1)+"%"}}const Ae=class Ae{constructor(){c(this,"observers",new Map)}attach(i){const e=Nt(i);if(this.observers.has(e))return;const t=new MutationObserver(()=>this.recalculateTable(i));t.observe(i,Ae.OBS_CONFIG),this.observers.set(e,t)}detach(i){var t;const e=i.dataset.formulaTableId;e&&((t=this.observers.get(e))==null||t.disconnect(),this.observers.delete(e))}detachAll(){this.observers.forEach(i=>i.disconnect()),this.observers.clear()}applyFormula(i,e){var f,m;this.attach(i);const t=An(i,e.targetRow,e.targetCol);if(!t)return"invalid";const n=this.observers.get(Nt(i));if(dn(e))return n==null||n.disconnect(),t.textContent="#REF!",t.style.color="#DC2626",t.dataset.formula=JSON.stringify(e),n==null||n.observe(i,Ae.OBS_CONFIG),"circular";const[o,s,a,r]=e.range,d=i.querySelectorAll("tr");if(o<1||a>d.length||s<1)return"invalid";const p=ln(i,o,s,a,r,t),h=cn(e.fn,p),g=pn(h,e.format,e.decimalPlaces);n==null||n.disconnect();try{t.textContent=g,t.dataset.formula=JSON.stringify(e),(f=e.style)!=null&&f.backgroundColor&&(t.style.backgroundColor=e.style.backgroundColor),(m=e.style)!=null&&m.color&&(t.style.color=e.style.color)}finally{n==null||n.observe(i,Ae.OBS_CONFIG)}return"ok"}recalculateTable(i){const e=Nt(i),t=this.observers.get(e);t==null||t.disconnect();try{i.querySelectorAll("[data-formula]").forEach(n=>{try{const o=JSON.parse(n.dataset.formula),s=an(i,n);if(!s)return;if(o.targetRow=s.row,o.targetCol=s.col,dn(o)){n.textContent="#REF!",n.style.color="#DC2626";return}const[a,r,d,p]=o.range;n.textContent=pn(cn(o.fn,ln(i,a,r,d,p,n)),o.format,o.decimalPlaces),n.style.color==="rgb(220, 38, 38)"&&(n.style.color="")}catch{}})}finally{t==null||t.observe(i,Ae.OBS_CONFIG)}}static getSelectionBounds(i,e){if(e.length===0)return null;let t=1/0,n=1/0,o=-1/0,s=-1/0;for(const a of e){const r=an(i,a);r&&(t=Math.min(t,r.row),n=Math.min(n,r.col),o=Math.max(o,r.row),s=Math.max(s,r.col))}return t===1/0?null:[t,n,o,s]}};c(Ae,"OBS_CONFIG",{subtree:!0,characterData:!0,childList:!0});let Ke=Ae;const er={ADD_TAGS:["iframe","video","source","track","figure"],ADD_ATTR:["controls","autoplay","loop","muted","poster","type","srclang","kind","label","frameborder","allowfullscreen","sandbox","width","height"]},tr={ko:"한국어",en:"English",ja:"日本語",zh:"中文",fr:"Français",de:"Deutsch",es:"Español"};function hn(l){const i=l.trim();let e=i.match(/(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);if(e){const t=e[1];return{embedUrl:`https://www.youtube.com/embed/${t}`,provider:"youtube",thumbnailUrl:`https://img.youtube.com/vi/${t}/0.jpg`}}return e=i.match(/vimeo\.com\/(\d+)/),e?{embedUrl:`https://player.vimeo.com/video/${e[1]}`,provider:"vimeo"}:(e=i.match(/dailymotion\.com\/video\/([A-Za-z0-9]+)/),e?{embedUrl:`https://www.dailymotion.com/embed/video/${e[1]}`,provider:"dailymotion"}:null)}function ir(l){const i=l.width??640,e=l.height??360,t=l.muted??l.autoplay??!1,n=l.controls??!0,o=l.autoplay??!1,s=l.loop??!1,a=[n?"controls":"",o?"autoplay":"",s?"loop":"",t?"muted":""].filter(Boolean).join(" "),r=l.poster?` poster="${l.poster}"`:"",d=l.trackSrclang??"ko",p=tr[d]??d,h=l.trackSrc?`
    <track kind="captions" src="${l.trackSrc}" srclang="${d}" label="${p}">`:"";return`<figure class="poa-media">
  <video width="${i}" height="${e}"${r} ${a}>
    <source src="${l.src}" type="${l.type}">${h}
    브라우저가 video 태그를 지원하지 않습니다.
  </video>
</figure>`}function nr(l){const i=l.width??640,e=l.height??360;return`<figure class="poa-media">
  <iframe
    width="${i}" height="${e}"
    src="${l.embedUrl}"
    frameborder="0"
    allowfullscreen
    sandbox="allow-scripts allow-same-origin allow-presentation"
  ></iframe>
</figure>`}class or{constructor(i){this.contentEl=i}insert(i){const e=String(te.sanitize(i,er)),t=window.getSelection();if(!(t!=null&&t.rangeCount)||!this.contentEl.contains(t.getRangeAt(0).commonAncestorContainer)){this.contentEl.insertAdjacentHTML("beforeend",e);return}const n=t.getRangeAt(0);n.deleteContents();const o=n.createContextualFragment(e);n.insertNode(o),n.collapse(!1)}}function K(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let sr=0;function Mn(l){return`poa-${l}-${(++sr).toString(36)}`}function rr(l){return[l.disabled?"disabled":"",l.readonly?"readonly":"",l.ariaRequired?'aria-required="true"':"",l.ariaDescribedBy?`aria-describedby="${K(l.ariaDescribedBy)}"`:""].filter(Boolean).join(" ")}function Bn(l){const i=l.autoLabel!==!1,e=l.id||Mn(l.type),t=l.label?K(l.label):"",n=rr(l),o=l.name?` name="${K(l.name)}"`:"",s=l.class?` ${K(l.class)}`:"";function a(d){return t?i?`<label for="${d}">${t}</label>`:`<label>${t}</label>`:""}const r=d=>`<div class="poa-form-group">
  ${d}
</div>`;switch(l.type){case"text":{const d=l.placeholder?` placeholder="${K(l.placeholder)}"`:"",p=l.maxlength?` maxlength="${l.maxlength}"`:"",h=l.value?` value="${K(l.value)}"`:"";return r(`${a(e)}
  <input type="text" id="${e}"${o} class="poa-input${s}"${d}${p}${h}${n?" "+n:""}>`)}case"textarea":{const d=l.rows??4,p=l.cols??40,h=l.resize??"both",g=l.placeholder?` placeholder="${K(l.placeholder)}"`:"";return r(`${a(e)}
  <textarea id="${e}"${o} class="poa-textarea${s}" rows="${d}" cols="${p}" style="resize:${h}"${g}${n?" "+n:""}></textarea>`)}case"checkbox":{const d=l.checkLabel?K(l.checkLabel):t,p=l.checked?" checked":"",h=l.value?` value="${K(l.value)}"`:"";return r(`<label class="poa-checkbox-label">
    <input type="checkbox" id="${e}"${o}${h}${p}${n?" "+n:""}>
    ${d}
  </label>`)}case"radio":{const d=l.groupName??l.name??e,p=l.options??[],h=t?`<label>${t}</label>`:"",g=p.map(f=>`    <label>
      <input type="radio" name="${K(d)}" value="${K(f.value)}"${f.defaultChecked?" checked":""}> ${K(f.label)}
    </label>`).join(`
`);return r(`${h}
  <div class="poa-radio-group">
${g}
  </div>`)}case"select":{const d=l.multiple?" multiple":"",h=(l.options??[]).map(g=>`    <option value="${K(g.value)}"${g.selected?" selected":""}>${K(g.label)}</option>`).join(`
`);return r(`${a(e)}
  <select id="${e}"${o} class="poa-select${s}"${d}${n?" "+n:""}>
${h}
  </select>`)}case"button":{const d=l.text?K(l.text):"버튼",p=l.btnType??"button",g={default:"poa-btn",primary:"poa-btn poa-btn-primary",danger:"poa-btn poa-btn-danger"}[l.btnStyle??"default"]+s,f=l.id?` id="${e}"`:"";return r(`<button type="${p}"${f}${o} class="${g}"${n?" "+n:""}>${d}</button>`)}case"date":{const d=l.min?` min="${K(l.min)}"`:"",p=l.max?` max="${K(l.max)}"`:"",h=l.value?` value="${K(l.value)}"`:"";return r(`${a(e)}
  <input type="date" id="${e}"${o} class="poa-input${s}"${d}${p}${h}${n?" "+n:""}>`)}}}const ar={ADD_ATTR:["disabled","readonly","checked","selected","multiple","required","placeholder","maxlength","rows","cols","min","max","for","aria-required","aria-describedby","style"]};class lr{constructor(i){this.contentEl=i}buildElement(i){const e=Bn(i),t=String(te.sanitize(e,ar)),n=document.createElement("div");n.innerHTML=t;const o=n.firstElementChild;return o&&(o.dataset.poaForm=JSON.stringify(i)),o}insert(i){var a,r,d,p;const e=this.buildElement(i);if(!e)return;const t=window.getSelection(),n=t!=null&&t.rangeCount?t.getRangeAt(0):null,o=n&&this.contentEl.contains(n.commonAncestorContainer),s=(n==null?void 0:n.commonAncestorContainer)instanceof Element?n.commonAncestorContainer.closest("td, th"):(r=(a=n==null?void 0:n.commonAncestorContainer)==null?void 0:a.parentElement)==null?void 0:r.closest("td, th");if(s&&o&&n){const h=e.querySelector("input, textarea, select, button")??e;h.dataset.poaForm=JSON.stringify(i),h.style.maxWidth="100%",h.style.boxSizing="border-box",n.deleteContents(),n.insertNode(h),n.collapse(!1),h.parentNode!==s&&s.appendChild(h);for(const g of Array.from(s.childNodes))if(g!==h)if(g.nodeType===Node.ELEMENT_NODE){const f=g;(f.tagName==="P"||f.tagName==="BR")&&!((d=f.textContent)!=null&&d.trim())&&!f.contains(h)&&s.removeChild(f)}else g.nodeType===Node.TEXT_NODE&&!((p=g.textContent)!=null&&p.trim())&&s.removeChild(g)}else o&&n?(n.deleteContents(),n.insertNode(e),n.collapse(!1)):this.contentEl.appendChild(e)}}class dr{constructor(){c(this,"input",null);c(this,"handle",null);c(this,"observer",null);c(this,"onResized",null);c(this,"contentEl",null);c(this,"_dragStart",0);c(this,"_dragInitW",0);c(this,"scrollHandler",()=>this.syncHandle())}attach(i,e,t){this.detach(),this.input=i,this.onResized=e??null,this.contentEl=t??null,i.style.resize="horizontal",i.style.overflow="hidden",i.style.minWidth="60px",i.style.boxSizing="border-box",!!i.closest("td, th")?i.style.maxWidth="100%":t?i.style.maxWidth=`${t.clientWidth-32}px`:i.style.maxWidth="100%",typeof ResizeObserver<"u"&&(this.observer=new ResizeObserver(()=>{var o;this.syncHandle(),(o=this.onResized)==null||o.call(this)}),this.observer.observe(i)),this._showHandle(i),window.addEventListener("scroll",this.scrollHandler,!0)}detach(){var i;this.input&&(this.input.style.resize="none",this.input.style.maxWidth="",this.input=null),(i=this.observer)==null||i.disconnect(),this.observer=null,this.contentEl=null,this._hideHandle(),this.onResized=null,window.removeEventListener("scroll",this.scrollHandler,!0)}syncHandle(){const i=this.handle,e=this.input;if(!i||!e)return;const t=e.getBoundingClientRect();i.style.left=`${t.right-4}px`,i.style.top=`${t.top+(t.height-24)/2}px`}_showHandle(i){this._hideHandle();const e=document.createElement("div");e.dataset.poaResizeHandle="true",e.title="좌우로 드래그하여 너비 조절",e.style.cssText=["position:fixed","width:8px","height:24px","background:#2563EB","border-radius:3px","cursor:ew-resize","z-index:99999","display:flex","align-items:center","justify-content:center","user-select:none","-webkit-user-select:none"].join(";"),e.innerHTML=`<svg width="6" height="14" viewBox="0 0 6 14" fill="none">
      <line x1="2" y1="2" x2="2" y2="12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="4" y1="2" x2="4" y2="12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,document.body.appendChild(e),this.handle=e,this.syncHandle(),e.addEventListener("mousedown",t=>{t.preventDefault(),t.stopPropagation(),this._dragStart=t.clientX,this._dragInitW=i.getBoundingClientRect().width;const n=i.closest("td, th"),o=n?n.getBoundingClientRect().width-4:this.contentEl?this.contentEl.clientWidth-32:9999,s=r=>{const d=Math.max(60,Math.min(o,this._dragInitW+(r.clientX-this._dragStart)));i.style.width=`${d}px`,this.syncHandle()},a=()=>{var r;document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",a),(r=this.onResized)==null||r.call(this)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",a)})}_hideHandle(){var i;(i=this.handle)==null||i.remove(),this.handle=null}}class cr{constructor(i={}){c(this,"cb");c(this,"toolbar",null);c(this,"input",null);c(this,"contentEl",null);c(this,"wInput",null);c(this,"alignSel",null);c(this,"onScroll",()=>{this._updatePosition()});this.cb=i}show(i,e){this.hide(),this.input=i,this.contentEl=e,this._createToolbar(),e.addEventListener("scroll",this.onScroll),window.addEventListener("scroll",this.onScroll,!0)}hide(){var i,e;(i=this.toolbar)==null||i.remove(),(e=this.contentEl)==null||e.removeEventListener("scroll",this.onScroll),window.removeEventListener("scroll",this.onScroll,!0),this.toolbar=null,this.input=null,this.contentEl=null,this.wInput=null,this.alignSel=null}syncPosition(){this._updatePosition(),this._syncValues()}_createToolbar(){if(!this.input||!this.contentEl)return;const i=!!this.input.closest("td, th"),e=document.createElement("div");e.dataset.poaTemp="true",e.style.cssText="position:fixed;display:flex;align-items:center;gap:6px;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.15);padding:4px 8px;font-size:12px;white-space:nowrap;z-index:99998;",e.addEventListener("mousedown",d=>d.stopPropagation()),e.appendChild(this._makeLabel("너비"));const t=document.createElement("input");t.type="number",t.min="60",t.max="9999",t.style.cssText="width:60px;padding:1px 4px;border:1px solid #ccc;border-radius:3px;font-size:12px;";const n=Math.round(this.input.getBoundingClientRect().width)||100;if(t.value=String(n),this.wInput=t,e.appendChild(t),e.appendChild(this._makeLabel("px")),t.addEventListener("keydown",d=>{d.key==="Enter"&&(d.preventDefault(),this._applyWidth())}),t.addEventListener("blur",()=>this._applyWidth()),e.appendChild(this._makeSep()),i){const d=document.createElement("button");d.textContent="셀에 맞춤",d.style.cssText=this._btnStyle(),d.addEventListener("click",()=>this._applyCellFit()),e.appendChild(d)}const o=document.createElement("button");o.textContent="에디터 너비에 맞춤",o.style.cssText=this._btnStyle(),o.addEventListener("click",()=>this._applyEditorFit()),e.appendChild(o),e.appendChild(this._makeSep()),e.appendChild(this._makeLabel("정렬"));const s=document.createElement("select");s.style.cssText="padding:1px;border:1px solid #ccc;border-radius:3px;font-size:12px;";const a=document.createElement("optgroup");a.label="글자 정렬";for(const[d,p]of[["text-left","왼쪽"],["text-center","가운데"],["text-right","오른쪽"]]){const h=document.createElement("option");h.value=d,h.textContent=p,a.appendChild(h)}s.appendChild(a);const r=document.createElement("optgroup");r.label="위치 정렬";for(const[d,p]of[["pos-left","왼쪽 배치"],["pos-center","가운데 배치"],["pos-right","오른쪽 배치"]]){const h=document.createElement("option");h.value=d,h.textContent=p,r.appendChild(h)}s.appendChild(r),s.value=this._getCurrentAlignValue(),s.addEventListener("change",()=>this._applyAlign(s.value)),this.alignSel=s,e.appendChild(s),this.toolbar=e,document.body.appendChild(e),this._updatePosition()}_applyWidth(){var s,a;if(!this.input||!this.wInput||!this.contentEl)return;const i=Math.max(60,parseFloat(this.wInput.value)||60),e=this.input.closest("td, th"),t=e?e.offsetWidth:this.contentEl.clientWidth,n=t>0?t-16:9999,o=Math.min(i,Math.max(60,n));this.wInput.value=String(Math.round(o)),this.input.style.width=`${Math.round(o)}px`,this._updatePosition(),(a=(s=this.cb).onResized)==null||a.call(s)}_applyCellFit(){var i,e;this.input&&(this.input.style.width="100%",this.input.style.maxWidth="100%",this._syncValues(),this._updatePosition(),(e=(i=this.cb).onResized)==null||e.call(i))}_applyEditorFit(){var e,t;if(!this.input||!this.contentEl)return;const i=this.contentEl.clientWidth>0?this.contentEl.clientWidth-32:200;this.input.style.width=`${i}px`,this.input.style.maxWidth=`${i}px`,this._syncValues(),this._updatePosition(),(t=(e=this.cb).onResized)==null||t.call(e)}_applyAlign(i){var o,s;if(!this.input)return;const[e,t]=i.split("-"),n=this.input;if(e==="text")n.style.textAlign=t==="left"?"":t;else if(e==="pos"){const a=n.closest("td, th");a?a.style.textAlign=t==="left"?"":t==="center"?"center":"right":(n.style.display="block",t==="left"?(n.style.marginLeft="0",n.style.marginRight="auto"):t==="center"?(n.style.marginLeft="auto",n.style.marginRight="auto"):(n.style.marginLeft="auto",n.style.marginRight="0"))}(s=(o=this.cb).onResized)==null||s.call(o)}_syncValues(){if(!this.input||!this.wInput||!this.alignSel)return;const i=Math.round(this.input.getBoundingClientRect().width)||100;this.wInput.value=String(i),this.alignSel.value=this._getCurrentAlignValue()}_getCurrentAlignValue(){if(!this.input)return"text-left";const i=this.input,e=i.style.textAlign;if(e==="center")return"text-center";if(e==="right")return"text-right";const t=i.closest("td, th");if(t&&t.style.textAlign){const s=t.style.textAlign;return s==="center"?"pos-center":s==="right"?"pos-right":"pos-left"}const n=i.style.marginLeft,o=i.style.marginRight;return n==="auto"&&o==="auto"?"pos-center":n==="auto"?"pos-right":o==="auto"?"pos-left":"text-left"}_updatePosition(){const i=this.toolbar,e=this.input;if(!i||!e)return;const t=e.getBoundingClientRect(),n=i.offsetHeight||32,o=i.offsetWidth||200;let s=t.top-n-4;s<4&&(s=t.bottom+4);let a=t.left;const r=window.innerWidth-o-4;a>r&&(a=r),a<4&&(a=4),i.style.top=`${s}px`,i.style.left=`${a}px`}_makeLabel(i){const e=document.createElement("span");return e.textContent=i,e.style.color="#555",e}_makeSep(){const i=document.createElement("div");return i.style.cssText="width:1px;height:16px;background:#ddd;margin:0 2px;flex-shrink:0;",i}_btnStyle(){return"border:1px solid #ccc;border-radius:3px;background:#f5f5f5;padding:1px 8px;cursor:pointer;font-size:12px;color:#333;white-space:nowrap;"}}class pr{constructor(i){c(this,"selectedEl",null);c(this,"selectedInput",null);c(this,"ctxMenu",null);c(this,"inputResizer",new dr);c(this,"inputToolbar");c(this,"clickHandler",i=>this._onClick(i));c(this,"ctxHandler",i=>this._onContextMenu(i));c(this,"docClickHandler",i=>this._onDocClick(i));this.contentEl=i,this.inputToolbar=new cr({onResized:()=>this._dispatchResized()})}attach(){this.contentEl.addEventListener("click",this.clickHandler),this.contentEl.addEventListener("contextmenu",this.ctxHandler),document.addEventListener("click",this.docClickHandler)}detach(){this.contentEl.removeEventListener("click",this.clickHandler),this.contentEl.removeEventListener("contextmenu",this.ctxHandler),document.removeEventListener("click",this.docClickHandler),this.deselectAll()}getSelected(){return this.selectedEl}getSelectedInput(){return this.selectedInput}getConfig(i){const t=i.closest(".poa-form-group")??(i.dataset.poaForm?i:null);if(!(t!=null&&t.dataset.poaForm))return null;try{return JSON.parse(t.dataset.poaForm)}catch{return null}}deselectAll(){var i;(i=this.selectedEl)==null||i.classList.remove("poa-form-selected"),this.selectedEl=null,this.selectedInput&&(this.selectedInput.classList.remove("poa-input-selected"),this.selectedInput=null),this.inputResizer.detach(),this.inputToolbar.hide(),this._hideCtxMenu()}deselect(){this.deselectAll()}_onClick(i){const e=i.target,t=e.closest(".poa-form-group"),n=this._findResizableInput(e);if(n)i.stopPropagation(),this.deselectAll(),t&&(this.selectedEl=t,t.classList.add("poa-form-selected")),this.selectedInput=n,n.classList.add("poa-input-selected"),this.inputResizer.attach(n,()=>this._dispatchResized(),this.contentEl),this.inputToolbar.show(n,this.contentEl),this.contentEl.dispatchEvent(new CustomEvent("poa-input-select",{bubbles:!0,detail:{el:n}}));else if(t)i.stopPropagation(),this.deselectAll(),this.selectedEl=t,t.classList.add("poa-form-selected");else{const o=this._findCellInput(e);o?(i.stopPropagation(),this.deselectAll(),this.selectedInput=o,o.classList.add("poa-input-selected"),this.contentEl.dispatchEvent(new CustomEvent("poa-input-select",{bubbles:!0,detail:{el:o}}))):this.deselectAll()}}_onContextMenu(i){const e=i.target,t=e.closest(".poa-form-group"),n=this._findResizableInput(e);if(n)i.preventDefault(),i.stopPropagation(),this.deselectAll(),t&&(this.selectedEl=t,t.classList.add("poa-form-selected")),this.selectedInput=n,n.classList.add("poa-input-selected"),this.inputResizer.attach(n,()=>this._dispatchResized(),this.contentEl),this.inputToolbar.show(n,this.contentEl),this._showCtxMenu(n,i.clientX,i.clientY);else if(t)i.preventDefault(),i.stopPropagation(),this.deselectAll(),this.selectedEl=t,t.classList.add("poa-form-selected"),this.contentEl.dispatchEvent(new CustomEvent("poa-form-contextmenu",{bubbles:!0,detail:{el:t,x:i.clientX,y:i.clientY}}));else{const o=this._findCellInput(e);o&&(i.preventDefault(),i.stopPropagation(),this.deselectAll(),this.selectedInput=o,o.classList.add("poa-input-selected"),this._showCtxMenu(o,i.clientX,i.clientY))}}_onDocClick(i){const e=i.target;e.closest("[data-poa-resize-handle]")||e.closest("[data-poa-input-menu]")||this.deselectAll()}_findResizableInput(i){const e=i.closest("input[data-poa-form], textarea[data-poa-form]");if(e)return e;const t=i.closest(".poa-form-group");return t?t.querySelector("input, textarea")??null:null}_findCellInput(i){return i.closest("input[data-poa-form], textarea[data-poa-form], select[data-poa-form], button[data-poa-form]")}_dispatchResized(){this.contentEl.dispatchEvent(new CustomEvent("poa-input-resized",{bubbles:!0})),this.inputResizer.syncHandle(),this.inputToolbar.syncPosition()}_showCtxMenu(i,e,t){this._hideCtxMenu();const n=i.closest("td, th"),o=document.createElement("div");o.dataset.poaInputMenu="true",o.style.cssText=`position:fixed;top:${t}px;left:${e}px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.15);z-index:99999;padding:4px 0;min-width:190px;font-size:13px;`;const s=(h,g,f=!1)=>{const m=document.createElement("button");m.style.cssText=`display:block;width:100%;padding:7px 14px;border:none;background:transparent;cursor:pointer;text-align:left;font-size:13px;color:${f?"#d32f2f":"#222"};`,m.textContent=h,m.addEventListener("mouseenter",()=>{m.style.background="#f5f5f5"}),m.addEventListener("mouseleave",()=>{m.style.background="transparent"}),m.addEventListener("mousedown",b=>{b.stopPropagation(),g(),this._hideCtxMenu()}),o.appendChild(m)},a=()=>{const h=document.createElement("div");h.style.cssText="height:1px;background:#f3f4f6;margin:4px 0;",o.appendChild(h)},r=h=>{const g=document.createElement("div");g.style.cssText="padding:5px 14px 2px;font-size:11px;font-weight:600;color:#9ca3af;letter-spacing:.04em;",g.textContent=h,o.appendChild(g)},d=(h,g={})=>{this.contentEl.dispatchEvent(new CustomEvent(h,{bubbles:!0,detail:g}))};if(r("너비"),s("  셀에 맞춤 (100%)",()=>{i.style.width="100%",i.style.maxWidth="100%",this._dispatchResized()}),s("  절반 (50%)",()=>{i.style.width="50%",this._dispatchResized()}),n){const h=Math.floor(n.getBoundingClientRect().width);s(`  현재 셀 전체 (${h}px)`,()=>{i.style.width=`${h}px`,i.style.maxWidth="100%",this._dispatchResized()})}a(),r("텍스트 정렬"),s("  왼쪽",()=>{i.style.textAlign="",this._dispatchResized()}),s("  가운데",()=>{i.style.textAlign="center",this._dispatchResized()}),s("  오른쪽",()=>{i.style.textAlign="right",this._dispatchResized()}),a(),s("입력 요소 속성",()=>{d("poa-input-contextmenu",{el:i,x:e,y:t})}),s("입력 요소 삭제",()=>{var h;((h=i.closest(".poa-form-group"))==null?void 0:h.remove())??i.remove(),this.deselectAll(),d("poa-input-resized")},!0),document.body.appendChild(o),this.ctxMenu=o;const p=o.getBoundingClientRect();p.bottom>window.innerHeight-8&&(o.style.top=`${t-p.height}px`),p.right>window.innerWidth-8&&(o.style.left=`${e-p.width}px`)}_hideCtxMenu(){var i;(i=this.ctxMenu)==null||i.remove(),this.ctxMenu=null}}const un="poa-emoji-recent",gn=16,hr=[["smileys","스마일리/감정","😀","😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 😎 🤩 🥳 😏 🤐"],["sad","슬픔/공감","😢","😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 😈 👿 💀 ☠️ 💩 🤡 👹 👺 👻 👽 👾 🤖"],["gestures","제스처/손","👍","👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 🤙 👈 👉 👆 👇 ☝️ 👏 🙌 🤲 🤝 🙏 ✋ 🤚 🖐️ 💪 🦾 🖖 🤌 🫶 🫵"],["animals","동물/자연","🐶","🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊 🐔 🐧 🐦 🐤 🦅 🦆 🦉 🦇 🐺 🐗 🐴 🦄"],["food","음식/음료","🍕","🍕 🍔 🌭 🍟 🌮 🌯 🥗 🍲 🍛 🍜 🍝 🍣 🍤 🍡 🥟 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🍫 🍬 🍭 🍷 🍸 🍺 ☕"],["sports","활동/스포츠","⚽","⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🎱 🏓 🏸 🥊 🥋 🎽 🛹 🛷 🏊 🏄 🏋️ 🤸 🏇 🏂 🚴 🏆 🥇 🥈 🥉 🎯 🎿 🤺 🎻"],["travel","여행/장소","🌍","🌍 🌎 🌏 🌐 🗺️ 🧭 🏔️ ⛰️ 🌋 🗻 🏕️ 🏖️ 🏜️ 🏝️ 🏞️ 🏟️ 🏛️ 🏗️ 🏘️ 🏠 🏡 🏢 🏣 🏤 🏥 🏦 🏨 🗼 🗽 ✈️"],["objects","사물/기호","💡","💡 🔦 🕯️ 💰 💳 💎 🔑 🗝️ 🔓 🔒 🛡️ 🔧 🔨 ⚙️ 🔩 ⚖️ 🔗 📱 💻 🖥️ 🖨️ 📷 📸 📹 🎥 📞 ☎️ 📺 📻 🎙️"],["symbols","기호/특수","❤️","❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 ✨ ⭐ 🌟 💫 🌈 ☀️ ⛅ 🌦️ ❄️ 🌊 🌸 🌺"]],Pt=hr.map(([l,i,e,t])=>({id:l,label:i,icon:e,emojis:t.split(" ").filter(Boolean)})),ur=[["😀",["웃음","기쁨","smile","happy","grin"]],["😂",["웃음","눈물","laugh","funny","tears"]],["🤣",["웃음","롤","rofl","laugh"]],["😍",["사랑","눈하트","love","heart eyes"]],["🥰",["사랑","행복","love","happy"]],["😘",["뽀뽀","키스","kiss","love"]],["😎",["쿨","선글라스","cool","sunglasses"]],["🤩",["신남","스타","star struck","excited"]],["🥳",["파티","신남","party","celebrate"]],["😢",["슬픔","눈물","sad","cry"]],["😭",["슬픔","통곡","sob","cry","weep"]],["😠",["화남","분노","angry","mad"]],["😡",["화남","분노","rage","angry"]],["👍",["좋아요","엄지","like","thumbs up","good"]],["👎",["싫어요","dislike","thumbs down","bad"]],["👏",["박수","칭찬","clap","applause"]],["🙏",["감사","기도","pray","thanks","please"]],["💪",["힘","근육","strong","muscle","flex"]],["❤️",["하트","사랑","heart","love","red"]],["💔",["실연","하트깨짐","broken heart","sad"]],["🔥",["불","핫","인기","fire","hot"]],["✨",["반짝","빛","sparkle","shine","stars"]],["🎉",["파티","축하","party","celebrate","congratulations"]],["🎊",["파티","축하","party","confetti"]],["🐶",["강아지","개","dog","puppy"]],["🐱",["고양이","cat","kitty"]],["🍕",["피자","pizza"]],["🍔",["버거","햄버거","burger","hamburger"]],["☕",["커피","coffee","cafe"]],["⚽",["축구","soccer","football"]],["🏀",["농구","basketball"]],["🌍",["지구","세계","earth","world","globe"]],["💡",["전구","아이디어","idea","light","bulb"]],["🔧",["렌치","수리","wrench","fix","repair","tool"]],["📱",["폰","스마트폰","phone","smartphone","mobile"]],["💻",["컴퓨터","노트북","computer","laptop"]],["🎵",["음악","노래","music","song","note"]],["🌸",["벚꽃","꽃","cherry blossom","flower","spring"]],["⭐",["별","스타","star","rating"]],["🌈",["무지개","rainbow","colorful"]]],gr=new Map(ur);function fr(l){const i=l.toLowerCase().trim();if(!i)return[];const e=new Set;for(const[t,n]of gr)n.some(o=>o.includes(i))&&e.add(t);return Array.from(e)}class Dn{getRecent(){try{const i=localStorage.getItem(un);return i?JSON.parse(i):[]}catch{return[]}}addRecent(i){const e=this.getRecent().filter(t=>t!==i);e.unshift(i),e.length>gn&&(e.length=gn);try{localStorage.setItem(un,JSON.stringify(e))}catch{}}insert(i,e){this.addRecent(i);const t=e.ownerDocument,n=t.getSelection();if(!n||n.rangeCount===0||!e.contains(n.getRangeAt(0).startContainer)){e.insertAdjacentText("beforeend",i);return}const o=n.getRangeAt(0);o.deleteContents();const s=t.createTextNode(i);o.insertNode(s),o.setStartAfter(s),o.collapse(!0),n.removeAllRanges(),n.addRange(o)}}function mr(){return`tt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,5)}`}class Ot{constructor(i){this.container=i}insert(i,e,t){const o=this.container.ownerDocument.createElement("span");return o.className="poa-tooltip",o.dataset.tooltipId=mr(),o.dataset.tooltipTitle=i,o.dataset.tooltipContent=e,o.appendChild(t.extractContents()),t.insertNode(o),o}getAll(){return Array.from(this.container.querySelectorAll(".poa-tooltip[data-tooltip-id]")).map(i=>({id:i.dataset.tooltipId??"",el:i,title:i.dataset.tooltipTitle??"",content:i.dataset.tooltipContent??"",anchorText:i.textContent??""}))}update(i,e,t){const n=this._findById(i);return n?(n.dataset.tooltipTitle=e,n.dataset.tooltipContent=t,!0):!1}remove(i){const e=this._findById(i);if(!(e!=null&&e.parentNode))return!1;const t=e.ownerDocument.createDocumentFragment();for(;e.firstChild;)t.appendChild(e.firstChild);return e.parentNode.replaceChild(t,e),!0}removeAll(){for(const i of this.getAll())this.remove(i.id)}_findById(i){return Array.from(this.container.querySelectorAll(".poa-tooltip[data-tooltip-id]")).find(e=>e.dataset.tooltipId===i)??null}static injectStyles(){if(document.getElementById("poa-tooltip-styles"))return;const i=document.createElement("style");i.id="poa-tooltip-styles",i.textContent=[".poa-tooltip {","  cursor: help;","  border-bottom: 1.5px dotted #6b7280;","}",".poa-tooltip-popup {","  position: fixed;","  background: #1F2937;","  color: #fff;","  border-radius: 6px;","  padding: 8px 12px;","  font-size: 13px;","  max-width: 240px;","  line-height: 1.5;","  pointer-events: none;","  z-index: 99999;","  box-shadow: 0 4px 12px rgba(0,0,0,.3);","  word-break: break-word;","  white-space: pre-wrap;","}",".poa-tooltip-popup-title {","  font-weight: 500;","  margin-bottom: 4px;","}",".poa-tooltip-popup-body {","  color: #D1D5DB;","}"].join(`
`),document.head.appendChild(i)}static attachHoverPopup(i){let e=null;i.addEventListener("mouseover",t=>{const n=t.target.closest(".poa-tooltip");if(!n)return;e==null||e.remove();const o=n.dataset.tooltipTitle??"",s=n.dataset.tooltipContent??"";if(!s)return;if(e=document.createElement("div"),e.className="poa-tooltip-popup",o){const f=document.createElement("div");f.className="poa-tooltip-popup-title",f.textContent=o,e.appendChild(f)}const a=document.createElement("div");a.className="poa-tooltip-popup-body",a.textContent=s,e.appendChild(a),e.style.visibility="hidden",document.body.appendChild(e);const r=n.getBoundingClientRect(),d=e.offsetWidth,p=e.offsetHeight;let h=r.left+r.width/2-d/2,g=r.top-p-8;h=Math.max(8,Math.min(h,window.innerWidth-d-8)),g<0&&(g=r.bottom+8),e.style.left=`${h}px`,e.style.top=`${g}px`,e.style.visibility=""}),i.addEventListener("mouseout",t=>{t.target.closest(".poa-tooltip")&&(e==null||e.remove(),e=null)})}}const br=2,xr=new Set(["p","div","h1","h2","h3","h4","h5","h6","li","blockquote","pre"]);function vr(l){return!l||l==="inherit"?l:l.split(",").map(i=>{const e=i.trim().replace(/^['"](.*)['"]\s*$/,"$1");return/\s/.test(e)?`"${e}"`:e}).join(", ")}const ze=class ze extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"core");c(this,"contentEl");c(this,"toolbar");c(this,"statusBar");c(this,"savedRange",null);c(this,"clipboardHandler");c(this,"findReplace");c(this,"imageInserter");c(this,"fileManager");c(this,"autoSave");c(this,"findDialog");c(this,"imageDialog");c(this,"imageInsertDialog");c(this,"settingsDialog");c(this,"tableDialog");c(this,"cellSplitDialog");c(this,"cellMerger");c(this,"tableNavigator");c(this,"tableResizer");c(this,"tableSelector");c(this,"tableHandle");c(this,"tableContextMenu");c(this,"linkInserter");c(this,"bookmarkManager");c(this,"linkDialog");c(this,"imageResizer");c(this,"imageToolbar");c(this,"imgContextMenu",null);c(this,"linkContextMenu",null);c(this,"viewManager");c(this,"tableWholeResizer");c(this,"tableInlineToolbar");c(this,"formatPainter");c(this,"listManager");c(this,"toast");c(this,"confirmDialog");c(this,"accessibilityDialog");c(this,"privacyDialog");c(this,"formulaDialog");c(this,"formulaManager");c(this,"formulaPickMode",!1);c(this,"videoDialog");c(this,"videoInserter");c(this,"formControlDialog");c(this,"formControlInserter");c(this,"formControlEditor");c(this,"templateDialog");c(this,"signatureDialog");c(this,"emojiDialog");c(this,"tooltipDialog");c(this,"inputPropertyDialog");c(this,"emojiInserter");c(this,"tooltipManager");c(this,"selectedTable",null);c(this,"previousMenuTab","edit");c(this,"inTableContext",!1);c(this,"pendingStyles",new Map);c(this,"pendingStylesJustSet",!1);c(this,"selectionHandler",()=>{this.pendingStyles.size>0&&(this.pendingStylesJustSet?this.pendingStylesJustSet=!1:this.pendingStyles.clear()),this.syncToolbar()});this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`
<style>
:host {
  display: flex; flex-direction: column; box-sizing: border-box;
  border: 1px solid var(--poa-editor-border, #ccc);
  border-radius: 4px; overflow: hidden;
}
slot[name="content"] { display: contents; }
</style>
<poa-menubar></poa-menubar>
<poa-context-toolbar></poa-context-toolbar>
<poa-toolbar></poa-toolbar>
<poa-find-replace-dialog></poa-find-replace-dialog>
<slot name="content"></slot>
<poa-status-bar></poa-status-bar>
<poa-image-edit-dialog></poa-image-edit-dialog>
<poa-image-dialog></poa-image-dialog>
<poa-settings-dialog></poa-settings-dialog>
<poa-table-dialog></poa-table-dialog>
<poa-cell-split-dialog></poa-cell-split-dialog>
<poa-link-dialog></poa-link-dialog>
<poa-image-toolbar></poa-image-toolbar>
<poa-confirm-dialog></poa-confirm-dialog>
<poa-accessibility-dialog></poa-accessibility-dialog>
<poa-privacy-dialog></poa-privacy-dialog>
<poa-formula-dialog></poa-formula-dialog>
<poa-video-dialog></poa-video-dialog>
<poa-form-control-dialog></poa-form-control-dialog>
<poa-template-dialog></poa-template-dialog>
<poa-signature-dialog></poa-signature-dialog>
<poa-emoji-dialog></poa-emoji-dialog>
<poa-tooltip-dialog></poa-tooltip-dialog>
<poa-input-property-dialog></poa-input-property-dialog>`,this.contentEl=this.querySelector(".poa-editor-content")??document.createElement("div"),this.contentEl.className="poa-editor-content",this.contentEl.setAttribute("slot","content"),this.contentEl.setAttribute("role","textbox"),this.contentEl.setAttribute("aria-multiline","true"),this.contentEl.setAttribute("spellcheck","true"),this.contentEl.style.cssText=["flex: 1","overflow-y: auto","overflow-x: hidden","padding: 16px 20px","outline: none","line-height: 1.6","min-height: 200px","box-sizing: border-box","position: relative","color: var(--poa-editor-color, #222)","background: var(--poa-editor-bg, #fff)","font-size: 14px","font-family: var(--poa-editor-font, '맑은 고딕', 'Malgun Gothic', sans-serif)"].join("; "),this.contentEl.parentElement||this.appendChild(this.contentEl),ze.injectContentStyles(),this.toolbar=this.shadow.querySelector("poa-toolbar"),this.statusBar=this.shadow.querySelector("poa-status-bar"),this.findDialog=this.shadow.querySelector("poa-find-replace-dialog"),this.imageDialog=this.shadow.querySelector("poa-image-edit-dialog"),this.imageInsertDialog=this.shadow.querySelector("poa-image-dialog"),this.settingsDialog=this.shadow.querySelector("poa-settings-dialog"),this.tableDialog=this.shadow.querySelector("poa-table-dialog"),this.cellSplitDialog=this.shadow.querySelector("poa-cell-split-dialog"),this.linkDialog=this.shadow.querySelector("poa-link-dialog"),this.imageToolbar=this.shadow.querySelector("poa-image-toolbar"),this.confirmDialog=this.shadow.querySelector("poa-confirm-dialog"),this.accessibilityDialog=this.shadow.querySelector("poa-accessibility-dialog"),this.accessibilityDialog.setup(this.contentEl,()=>this.runAccessibilityCheck()),this.privacyDialog=this.shadow.querySelector("poa-privacy-dialog"),this.privacyDialog.setup(()=>{this.core.captureHistory("privacyEdit"),this.statusBar.update(this.contentEl.innerHTML)},r=>this.confirmDialog.show(r)),this.formulaManager=new Ke,this.formulaDialog=this.shadow.querySelector("poa-formula-dialog"),this.videoInserter=new or(this.contentEl),this.videoDialog=this.shadow.querySelector("poa-video-dialog"),this.formControlInserter=new lr(this.contentEl),this.formControlEditor=new pr(this.contentEl),this.formControlEditor.attach(),this.formControlDialog=this.shadow.querySelector("poa-form-control-dialog"),this.templateDialog=this.shadow.querySelector("poa-template-dialog"),this.templateDialog.setup(()=>this.getHTML()),this.signatureDialog=this.shadow.querySelector("poa-signature-dialog"),this.emojiDialog=this.shadow.querySelector("poa-emoji-dialog"),this.tooltipDialog=this.shadow.querySelector("poa-tooltip-dialog"),this.emojiInserter=new Dn,this.inputPropertyDialog=this.shadow.querySelector("poa-input-property-dialog"),this.tooltipManager=new Ot(this.contentEl),Ot.injectStyles(),Ot.attachHoverPopup(this.contentEl),this.toast=new Hs,this.imageInsertDialog.setOnError(r=>this.toast.show(r,"error"));const e=this.getAttribute("placeholder")??"";e&&(this.contentEl.dataset.placeholder=e);const t=this.hasAttribute("readonly");this.core=new wo({placeholder:e,readonly:t,onHistoryPush:()=>this.syncToolbar()}),this.core.mount(this.contentEl),this.imageInserter=new zo(this.contentEl),this.linkInserter=new us(this.contentEl),this.bookmarkManager=new fs(this.contentEl),this.imageResizer=new bs(this.contentEl,{onActivate:r=>{this.deselectTable(),this.imageToolbar.show(r)},onResize:r=>{this.imageToolbar.update(r)},onResizeEnd:()=>{this.core.captureHistory("imageResize"),this.statusBar.update(this.contentEl.innerHTML)},onDeactivate:()=>{this.imageToolbar.hide(),this.hideImgContextMenu()},onContextMenu:(r,d,p)=>{this.showImgContextMenu(r,d,p)}}),this.imageResizer.attach(),this.viewManager=new Cs(this.contentEl,{onViewChange:r=>{P.emit(O.VIEW_CHANGE,{mode:r})},getBookmarks:()=>this.bookmarkManager.getAll()}),this.viewManager.attach(),this.tableWholeResizer=new Ss(this.contentEl,{onResizeEnd:()=>{this.core.captureHistory("tableWholeResize"),this.statusBar.update(this.contentEl.innerHTML),this.tableInlineToolbar.syncPosition()}}),this.tableInlineToolbar=new Is({onApply:()=>{this.core.captureHistory("tableResize"),this.statusBar.update(this.contentEl.innerHTML),this.tableWholeResizer.syncHandles()}}),this.formatPainter=new Bs(this.contentEl,{onModeChange:r=>{this.contentEl.style.cursor=r?"crosshair":""}}),this.listManager=new Rs(this.contentEl),this.fileManager=new Oo,this.autoSave=new ns,this.settingsDialog.setAutoSave(this.autoSave),this.settingsDialog.setFileManager(this.fileManager),this.autoSave.start(()=>this.contentEl.innerHTML),this.cellMerger=new ce,this.cellMerger.attach(this.contentEl),this.tableSelector=new ds(this.cellMerger),this.tableSelector.attach(this.contentEl);const n=()=>{this.core.captureHistory("tableModified"),this.statusBar.update(this.contentEl.innerHTML)},o={onMerge:()=>{const r=this.cellMerger.getSelectedCells(),d=this.cellMerger.getSelectedTable();if(!r.length||!d)return{success:!1,message:"선택된 셀이 없습니다."};const p=ce.mergeCells(r,d);return p.success&&this.cellMerger.clearSelection(),p},onSplitH:(r,d)=>ce.splitCellHorizontal(r,d),onSplitV:(r,d)=>ce.splitCellVertical(r,d),onOpenTableProps:r=>this.tableDialog.open(r),onModified:n,onError:r=>this.toast.show(r,"error")};this.tableNavigator=new ss(o,{noMenu:!0}),this.tableNavigator.attach(this.contentEl);const s={onMerge:o.onMerge,onSplitCell:r=>this.cellSplitDialog.open(r),onOpenTableProps:o.onOpenTableProps,onModified:n,canMerge:()=>this.tableSelector.canMerge,getSelectedCells:()=>this.tableSelector.getCellSelection(),onError:r=>this.toast.show(r,"error")};this.tableContextMenu=new ps(this.tableNavigator,s),this.tableContextMenu.attach(this.contentEl),this.tableResizer=new ls(n),this.tableResizer.attach(this.contentEl),this.tableHandle=new cs(r=>{this.cellMerger.clearSelection();for(const d of Array.from(r.querySelectorAll("td, th")))d.classList.add("poa-cell-selected")}),this.tableHandle.attach(this.contentEl),this.clipboardHandler=new Ho(this.contentEl,{onPaste:()=>{this.core.captureHistory("paste"),this.statusBar.update(this.contentEl.innerHTML)},onPasteImage:()=>{this.core.captureHistory("pasteImage"),this.statusBar.update(this.contentEl.innerHTML)}}),this.clipboardHandler.register(),this.findReplace=new $o(this.contentEl),this.shadow.addEventListener("poa-formula-apply",r=>{const{formula:d,table:p}=r.detail,h=this.formulaManager.applyFormula(p,d);h==="circular"?this.toast.show("순환 참조가 발견됐습니다. (#REF!)","error"):h==="invalid"?this.toast.show("대상 셀을 찾을 수 없습니다.","error"):(this.core.captureHistory("formulaApply"),this.statusBar.update(this.contentEl.innerHTML))}),this.shadow.addEventListener("poa-formula-start-pick",()=>{this.formulaPickMode=!0;const r=()=>{var h;if(!this.formulaPickMode)return;this.formulaPickMode=!1;const d=this.tableSelector.getCellSelection(),p=(h=d[0])==null?void 0:h.closest("table");if(p&&d.length>0){const g=Ke.getSelectionBounds(p,d);g&&this.formulaDialog.applyRange(...g)}};this.contentEl.addEventListener("mouseup",r,{once:!0})}),this.shadow.addEventListener("poa-action",r=>{this.handleAction(r).catch(d=>{console.error("[poa-editor] handleAction 오류:",d)})}),this.shadow.addEventListener("poa-find-search",r=>{const{query:d,caseSensitive:p,wholeWord:h}=r.detail,g=this.findReplace.find(d,{caseSensitive:p,wholeWord:h});this.findDialog.updateResult(g.count,g.current)}),this.shadow.addEventListener("poa-find-next",()=>{const r=this.findReplace.next();this.findDialog.updateResult(r.count,r.current)}),this.shadow.addEventListener("poa-find-prev",()=>{const r=this.findReplace.prev();this.findDialog.updateResult(r.count,r.current)}),this.shadow.addEventListener("poa-find-replace",r=>{const{replacement:d}=r.detail,p=this.findReplace.replaceCurrent(d);this.core.captureHistory("replace"),this.findDialog.updateResult(p.count,p.current),p.replaced&&this.toast.show("바꿨습니다.","success",1500)}),this.shadow.addEventListener("poa-find-replace-all",r=>{const{query:d,replacement:p,caseSensitive:h,wholeWord:g}=r.detail,f=this.findReplace.replaceAll(d,p,{caseSensitive:h,wholeWord:g});this.core.captureHistory("replaceAll"),this.findDialog.updateResult(0,-1),this.statusBar.update(this.contentEl.innerHTML),f>0?this.toast.show(`${f}개 항목을 바꿨습니다.`,"success"):this.toast.show("바꿀 항목이 없습니다.","info")}),this.shadow.addEventListener("poa-find-clear",()=>{this.findReplace.clearMarks()}),this.shadow.addEventListener("poa-video-insert",r=>{const{html:d}=r.detail;this.videoInserter.insert(d),this.core.captureHistory("videoInsert"),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener("poa-form-insert",r=>{const{config:d}=r.detail,p=this.formControlEditor.getSelected();if(p){const h=this.formControlInserter.buildElement(d);h&&p.replaceWith(h),this.formControlEditor.deselect()}else this.restoreSelection(),this.formControlInserter.insert(d);this.core.captureHistory("formControlInsert"),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener("poa-signature-insert",r=>{const{html:d}=r.detail;this.restoreSelection();const h=this.contentEl.ownerDocument.getSelection();if(h&&h.rangeCount>0){const g=h.getRangeAt(0);g.deleteContents();const f=g.createContextualFragment(d);g.insertNode(f),g.collapse(!1)}else this.contentEl.insertAdjacentHTML("beforeend",d);this.core.captureHistory("signatureInsert"),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener("poa-emoji-insert",r=>{const{emoji:d}=r.detail;this.emojiInserter.insert(d,this.contentEl),this.core.captureHistory("emojiInsert"),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener("poa-tooltip-insert",r=>{const{title:d,content:p}=r.detail;!this.savedRange||!this.contentEl.contains(this.savedRange.startContainer)||(this.tooltipManager.insert(d,p,this.savedRange.cloneRange()),this.savedRange=null,this.core.captureHistory("tooltipInsert"),this.statusBar.update(this.contentEl.innerHTML))}),this.shadow.addEventListener("poa-tooltip-update",r=>{const{id:d,title:p,content:h}=r.detail;this.tooltipManager.update(d,p,h),this.core.captureHistory("tooltipUpdate")}),this.shadow.addEventListener("poa-tooltip-remove",r=>{const{id:d}=r.detail;this.tooltipManager.remove(d),this.core.captureHistory("tooltipRemove"),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener("poa-tooltip-remove-all",()=>{this.tooltipManager.removeAll(),this.core.captureHistory("tooltipRemoveAll"),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener("poa-tmpl-insert",r=>{const{html:d,mode:p}=r.detail;if(p==="replace")this.confirmDialog.show("현재 내용이 모두 교체됩니다. 계속할까요?").then(h=>{h&&(this.setHTML(d),this.core.captureHistory("templateReplace"),this.templateDialog.close())});else{this.restoreSelection();const g=this.contentEl.ownerDocument.getSelection();if(g&&g.rangeCount>0){const f=g.getRangeAt(0);f.deleteContents();const m=f.createContextualFragment(d);f.insertNode(m),f.collapse(!1)}else this.contentEl.insertAdjacentHTML("beforeend",d);this.core.captureHistory("templateAppend"),this.statusBar.update(this.contentEl.innerHTML)}}),this.contentEl.addEventListener("poa-form-contextmenu",r=>{const{el:d}=r.detail,p=this.formControlEditor.getConfig(d);p&&this.formControlDialog.open(p)}),this.contentEl.addEventListener("poa-input-contextmenu",r=>{const{el:d}=r.detail;this.inputPropertyDialog.open(d)}),this.addEventListener("poa-input-props-apply",()=>{this.core.captureHistory("inputPropsEdit"),this.statusBar.update(this.contentEl.innerHTML)}),this.contentEl.addEventListener("poa-input-resized",()=>{this.core.captureHistory("inputResize"),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener("poa-image-insert",r=>{const{attrs:d}=r.detail;try{this.imageInserter.insertFromUrl(d),this.core.captureHistory("insertImage"),this.statusBar.update(this.contentEl.innerHTML),this.checkAltWarning()}catch{}}),this.shadow.addEventListener("poa-img-size-change",r=>{const{width:d,height:p}=r.detail,h=this.imageResizer.getActiveImage();h&&(h.style.width=`${d}px`,h.style.height=`${p}px`,this.imageResizer.syncOverlay(),this.core.captureHistory("imageResize"),this.statusBar.update(this.contentEl.innerHTML))}),this.shadow.addEventListener("poa-img-reset-size",()=>{const r=this.imageResizer.getActiveImage();r&&(r.style.width=r.naturalWidth?`${r.naturalWidth}px`:"",r.style.height=r.naturalHeight?`${r.naturalHeight}px`:"",this.imageResizer.syncOverlay(),this.imageToolbar.update(r),this.core.captureHistory("imageResize"),this.statusBar.update(this.contentEl.innerHTML))}),this.shadow.addEventListener("poa-link-insert",r=>{const{attrs:d}=r.detail;try{this.linkInserter.insertLink(d),this.core.captureHistory("insertLink"),this.statusBar.update(this.contentEl.innerHTML)}catch{}}),this.shadow.addEventListener("poa-link-update",r=>{const{anchor:d,attrs:p}=r.detail;try{this.linkInserter.updateLink(d,p),this.core.captureHistory("updateLink"),this.statusBar.update(this.contentEl.innerHTML)}catch{}}),this.shadow.addEventListener("poa-bookmark-link-insert",r=>{const{bookmarkId:d,text:p}=r.detail;try{this.linkInserter.insertLink({href:`#${d}`,text:p,target:"_self"}),this.core.captureHistory("insertBookmarkLink"),this.statusBar.update(this.contentEl.innerHTML)}catch{}}),this.shadow.addEventListener("poa-bookmark-create",r=>{const{label:d}=r.detail;this.bookmarkManager.insert(d),this.core.captureHistory("insertBookmark"),this.statusBar.update(this.contentEl.innerHTML),this.linkDialog.setBookmarks(this.bookmarkManager.getAll())}),this.shadow.addEventListener("poa-bookmark-update",r=>{const{id:d,label:p}=r.detail;try{this.bookmarkManager.update(d,p),this.core.captureHistory("updateBookmark"),this.linkDialog.setBookmarks(this.bookmarkManager.getAll())}catch{}}),this.shadow.addEventListener("poa-bookmark-delete",r=>{const{id:d}=r.detail;this.bookmarkManager.remove(d),this.core.captureHistory("deleteBookmark"),this.statusBar.update(this.contentEl.innerHTML),this.linkDialog.setBookmarks(this.bookmarkManager.getAll())}),this.shadow.addEventListener("poa-datetime-insert",r=>{const{text:d}=r.detail,p=this.contentEl.ownerDocument,h=p.getSelection();if(!h||h.rangeCount===0)return;const g=h.getRangeAt(0);g.deleteContents(),g.insertNode(p.createTextNode(d)),g.collapse(!1),h.removeAllRanges(),h.addRange(g),this.core.captureHistory("insertDatetime"),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener("poa-image-edit-confirm",r=>{const{original:d,edited:p,attrs:h}=r.detail;this.contentEl.querySelectorAll("img").forEach(f=>{(f.src===d||f.getAttribute("src")===d)&&(p!==d&&(f.src=p),h&&(h.alt!==void 0&&(f.alt=h.alt),h.title!==void 0&&(f.title=h.title),h.width&&(f.style.width=h.width),h.height&&(f.style.height=h.height),h.border&&(f.style.border=h.border),(h.align==="left"||h.align==="right")&&(f.style.float=h.align),h.id&&(f.id=h.id),h.className&&(f.className=h.className)))}),this.core.captureHistory("imageEdit"),this.checkAltWarning()}),this.shadow.addEventListener("poa-table-insert",r=>{const{options:d,presetId:p}=r.detail,h=Xe.build(d,this.contentEl.ownerDocument);p&&hs(p,h),this.restoreSelection(),Xe.insert(h,this.contentEl),this.core.captureHistory("insertTable"),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener("poa-cell-split",r=>{const{cell:d,cols:p,rows:h}=r.detail,g=d.closest("table");g&&(ce.splitCell(d,g,p,h),n())}),this.shadow.addEventListener("poa-table-update",r=>{const{options:d,table:p}=r.detail;Xe.applyOptions(p,d),this.core.captureHistory("tableUpdate"),this.statusBar.update(this.contentEl.innerHTML)}),this.contentEl.addEventListener("mousedown",r=>{const d=this.findTableNode(r.target);d?(this.selectTable(d),this.imageResizer.getActiveImage()&&this.imageResizer.deactivate()):this.deselectTable();const p=d!==null;p&&!this.inTableContext?(this.inTableContext=!0,P.emit(O.MENUBAR_CHANGE,{tab:"table"})):!p&&this.inTableContext&&(this.inTableContext=!1,P.emit(O.MENUBAR_CHANGE,{tab:this.previousMenuTab}))}),this.contentEl.addEventListener("dblclick",r=>{const d=r.target;if(d.tagName==="IMG"&&!d.dataset.dir){const p=d;this.imageDialog.open(p.src,{alt:p.alt,title:p.title||void 0,width:p.style.width||void 0,height:p.style.height||void 0,border:p.style.border||void 0,align:p.style.float||void 0,id:p.id||void 0,className:p.className||void 0})}}),this.contentEl.addEventListener("click",r=>{const d=r.target.closest("a[href]:not(.poa-bookmark)");d&&(r.preventDefault(),this.linkInserter.saveSelection(),this.bookmarkManager.saveSelection(),this.linkDialog.setBookmarks(this.bookmarkManager.getAll()),this.linkDialog.open("link",d))}),this.contentEl.addEventListener("contextmenu",r=>{const d=r.target.closest("a[href]:not(.poa-bookmark)");d&&(r.preventDefault(),r.stopPropagation(),this.showLinkContextMenu(d,r.clientX,r.clientY))}),this.contentEl.addEventListener("keydown",r=>{if((r.ctrlKey||r.metaKey)&&r.key==="f"){r.preventDefault(),this.findDialog.open("find");return}if((r.ctrlKey||r.metaKey)&&r.key==="h"){r.preventDefault(),this.findDialog.open("replace");return}this.formatPainter.handleKeydown(r),r.key==="Tab"&&this.listManager.handleTab(r)}),document.addEventListener("selectionchange",this.selectionHandler),this.contentEl.addEventListener("blur",()=>{const r=this.getActualRange();r&&this.contentEl.contains(r.startContainer)&&(this.savedRange=r)}),this.shadow.addEventListener("mousedown",r=>{if(this.contentEl.contains(r.target))return;const d=this.getActualRange();d&&this.contentEl.contains(d.startContainer)&&(this.savedRange=d.cloneRange())},!0);const a=()=>{const r=this.getActualRange();r&&this.contentEl.contains(r.startContainer)&&(this.savedRange=r)};this.contentEl.addEventListener("mouseup",a),this.contentEl.addEventListener("mouseup",()=>this.formatPainter.handleMouseUp()),this.contentEl.addEventListener("keyup",a),this.contentEl.addEventListener("input",()=>{this.statusBar.update(this.contentEl.innerHTML),this.fileManager.markDirty()}),this.contentEl.addEventListener("beforeinput",r=>{if(this.pendingStyles.size===0||r.inputType!=="insertText"||!r.data)return;r.preventDefault();const d=this.contentEl.ownerDocument,p=d.getSelection();if(!p||p.rangeCount===0){this.pendingStyles.clear();return}const h=p.getRangeAt(0);h.deleteContents();const g=d.createElement("span");this.pendingStyles.forEach((f,m)=>g.style.setProperty(m,f)),g.textContent=r.data,h.insertNode(g),h.setStart(g.firstChild,r.data.length),h.collapse(!0),p.removeAllRanges(),p.addRange(h),this.pendingStyles.clear(),this.statusBar.update(this.contentEl.innerHTML),this.fileManager.markDirty(),this.contentEl.dispatchEvent(new InputEvent("input",{bubbles:!0}))}),this.shadow.addEventListener("poa-file-new",()=>{(async()=>this.fileManager.isDirty()&&!await this.confirmDialog.show("저장되지 않은 변경사항이 있습니다. 계속할까요?")||(this.fileManager.newDocument(),this.setHTML(""),this.core.captureHistory("fileNew")))()}),this.shadow.addEventListener("poa-file-open",()=>{this.fileManager.openFile().then(r=>{r&&(this.setHTML(r.html),this.core.captureHistory("fileOpen"))})}),this.shadow.addEventListener("poa-file-save",()=>{this.fileManager.saveFile(this.getHTML())}),this.shadow.addEventListener("poa-file-saveas",()=>{this.fileManager.saveAsFile(this.getHTML())}),this.shadow.addEventListener("poa-autosave-restore",r=>{const{html:d}=r.detail;this.setHTML(d),this.core.captureHistory("autoSaveRestore")}),P.on(O.MENUBAR_CHANGE,({tab:r})=>{r!=="table"&&(this.previousMenuTab=r)}),this.statusBar.update(this.contentEl.innerHTML),this.syncToolbar()}disconnectedCallback(){document.removeEventListener("selectionchange",this.selectionHandler),this.clipboardHandler.unregister(),this.findReplace.clearMarks(),this.autoSave.stop(),this.fileManager.destroy(),this.cellMerger.detach(),this.tableSelector.detach(),this.tableNavigator.detach(),this.tableContextMenu.detach(),this.tableResizer.detach(),this.tableHandle.detach(),this.imageResizer.detach(),this.viewManager.detach(),this.tableWholeResizer.detach(),this.tableInlineToolbar.hide(),this.deselectTable(),this.hideImgContextMenu(),this.hideLinkContextMenu(),fe.removeHighlights(this.contentEl),this.formulaManager.detachAll(),this.formControlEditor.detach(),this.core.unmount()}getHTML(){const e=this.contentEl.cloneNode(!0);return e.querySelectorAll("[data-poa-temp]").forEach(t=>t.remove()),te.sanitize(e.innerHTML)}setHTML(e){this.contentEl.innerHTML=te.sanitize(e),this.savedRange=null,this.statusBar.update(this.contentEl.innerHTML)}restoreSelection(){const e=this.contentEl.ownerDocument,t=this.getActualRange();if(t&&this.contentEl.contains(t.startContainer))return;if(!this.savedRange){this.contentEl.focus();return}const n=this.savedRange.cloneRange();this.contentEl.focus();try{const o=e.getSelection();if(!o)return;o.removeAllRanges(),o.addRange(n)}catch{this.savedRange=null}}async handleAction(e){const{type:t,value:n}=e.detail;switch(t!=="format"&&this.restoreSelection(),t){case"format":{const o=n?Eo[n]:void 0;o&&this.savedRange&&!this.savedRange.collapsed&&await this.core.applyFormatWithRange(o,this.savedRange);break}case"undo":await this.core.undo(),this.savedRange=null;break;case"redo":await this.core.redo(),this.savedRange=null;break;case"align":{const o=n??"left",s=this.imageResizer.getActiveImage(),a=this.formControlEditor.getSelectedInput();s?this.applyImageAlign(s,o):a?a.style.textAlign=o==="left"?"":o:this.getFocusedCell()?this.applyTextAlign(o):this.selectedTable?this.applyTableAlign(this.selectedTable,o):this.applyTextAlign(o),await this.core.captureHistory(`align:${o}`);break}case"indent":this.applyIndent(1),await this.core.captureHistory("indent");break;case"outdent":this.applyIndent(-1),await this.core.captureHistory("outdent");break;case"fontFamily":this.applyInlineStyle("font-family",vr(n??"")),await this.core.captureHistory("fontFamily");break;case"fontSize":this.applyInlineStyle("font-size",n??""),await this.core.captureHistory("fontSize");break;case"lineHeight":this.applyBlockStyle("line-height",n??""),await this.core.captureHistory("lineHeight");break;case"letterSpacing":this.applyInlineStyle("letter-spacing",n??""),await this.core.captureHistory("letterSpacing");break;case"foreColor":this.applyInlineStyle("color",n??""),await this.core.captureHistory("foreColor");break;case"backColor":this.applyInlineStyle("background-color",n??""),await this.core.captureHistory("backColor");break;case"find-replace":this.findDialog.open("find");return;case"image":this.imageInserter.saveSelection(),this.imageInsertDialog.open();return;case"table":this.tableDialog.open();return;case"settings":this.settingsDialog.show();return;case"file:new":if(this.fileManager.isDirty()&&!await this.confirmDialog.show("저장되지 않은 변경사항이 있습니다. 계속할까요?"))return;this.fileManager.newDocument(),this.setHTML(""),this.core.captureHistory("fileNew");return;case"file:open":this.fileManager.openFile().then(o=>{o&&(this.setHTML(o.html),this.core.captureHistory("fileOpen"))});return;case"file:save":this.fileManager.saveFile(this.getHTML());return;case"file:saveas":this.fileManager.saveAsFile(this.getHTML());return;case"file:print":window.print();return;case"edit:cut":{const o=this.contentEl.ownerDocument,s=o.getSelection();if(!s||s.rangeCount===0)return;const a=s.getRangeAt(0);if(a.collapsed)return;const r=a.toString(),d=o.createElement("div");d.appendChild(a.cloneContents());const p=d.innerHTML;navigator.clipboard.write([new ClipboardItem({"text/plain":new Blob([r],{type:"text/plain"}),"text/html":new Blob([p],{type:"text/html"})})]).then(()=>{a.deleteContents(),this.core.captureHistory("cut")});return}case"edit:copy":{const o=this.contentEl.ownerDocument,s=o.getSelection();if(!s||s.rangeCount===0)return;const a=s.getRangeAt(0);if(a.collapsed)return;const r=a.toString(),d=o.createElement("div");d.appendChild(a.cloneContents());const p=d.innerHTML;navigator.clipboard.write([new ClipboardItem({"text/plain":new Blob([r],{type:"text/plain"}),"text/html":new Blob([p],{type:"text/html"})})]);return}case"edit:paste":navigator.clipboard.readText().then(o=>{this.restoreSelection(),this.insertPlainText(o),this.core.captureHistory("paste"),this.statusBar.update(this.contentEl.innerHTML)});return;case"edit:paste-plain":{navigator.clipboard.readText().then(o=>{this.restoreSelection(),this.insertPlainText(o),this.core.captureHistory("paste"),this.statusBar.update(this.contentEl.innerHTML)});return}case"edit:select-all":{this.contentEl.focus();const o=this.contentEl.ownerDocument,s=o.createRange();s.selectNodeContents(this.contentEl);const a=o.getSelection();a==null||a.removeAllRanges(),a==null||a.addRange(s);return}case"table:table-props":{const o=this.getFocusedTable();o&&this.tableDialog.open(o);return}case"table:split-cell":case"table:split-h":case"table:split-v":{const o=this.getFocusedCell();o&&this.cellSplitDialog.open(o);return}case"table:cell-props":case"table:merge":case"table:row-above":case"table:row-below":case"table:col-left":case"table:col-right":case"table:row-delete":case"table:col-delete":case"table:delete":{const o=this.getFocusedCell(),s=o==null?void 0:o.closest("table");o&&s&&this.tableNavigator.executeAction(t,o,s);return}case"format:clear":this.formatPainter.clear(),await this.core.captureHistory("formatClear");break;case"insert:link":this.linkInserter.saveSelection(),this.bookmarkManager.saveSelection(),this.linkDialog.setBookmarks(this.bookmarkManager.getAll()),this.linkDialog.open("link");return;case"insert:bookmark":this.linkInserter.saveSelection(),this.bookmarkManager.saveSelection(),this.linkDialog.setBookmarks(this.bookmarkManager.getAll()),this.linkDialog.open("bookmark");return;case"insert:datetime":this.linkDialog.open("datetime");return;case"view:design":case"view:html":case"view:preview":case"view:text":case"view:page":{const o=t.replace("view:","");this.viewManager.switchTo(o);return}case"view:fullscreen":this.viewManager.toggleFullscreen(this);return;case"view:ruler":this.viewManager.toggleRuler();return;case"view:grid":this.viewManager.toggleGrid();return;case"view:hidden-border":this.viewManager.toggleHiddenBorder();return;case"format:painter-copy":this.formatPainter.copy(!1);return;case"format:painter-paste":this.formatPainter.paste(),await this.core.captureHistory("formatPainterPaste");break;case"format:ul":this.listManager.toggleList("ul"),await this.core.captureHistory("formatUl");break;case"format:ol":this.listManager.toggleList("ol"),await this.core.captureHistory("formatOl");break;case"format:sup":this.listManager.toggleSuperSub("sup"),await this.core.captureHistory("formatSup");break;case"format:sub":this.listManager.toggleSuperSub("sub"),await this.core.captureHistory("formatSub");break;case"misc:a11y":this.runAccessibilityCheck();return;case"misc:privacy":this.runPrivacyCheck();return;case"misc:calc":this.openFormulaDialog();return;case"insert:video":this.restoreSelection(),this.videoDialog.open("video");return;case"insert:embed":this.restoreSelection(),this.videoDialog.open("embed");return;case"misc:form":this.restoreSelection(),this.formControlDialog.open();return;case"misc:template":this.templateDialog.open();return;case"insert:signature":this.signatureDialog.open();return;case"insert:emoji":this.emojiDialog.open();return;case"insert:tooltip":{const o=this.contentEl.ownerDocument.getSelection();if(!o||o.rangeCount===0||o.toString().trim()===""){this.toast.show("툴팁을 추가할 텍스트를 선택하세요.","info");return}this.savedRange=o.getRangeAt(0).cloneRange(),this.tooltipDialog.openAdd(o.toString());return}case"insert:tooltip-list":this.tooltipDialog.openList(this.tooltipManager.getAll());return;case"insert:hr":case"insert:symbol":case"insert:multi-image":case"help:shortcuts":case"help:guide":case"help:about":this.toast.show(`'${t}' 기능은 준비 중입니다.`,"info");return}this.syncToolbar(),this.statusBar.update(this.contentEl.innerHTML)}insertPlainText(e){const t=this.contentEl.ownerDocument,n=t.getSelection();if(!n||n.rangeCount===0)return;const o=n.getRangeAt(0);o.deleteContents();const s=t.createTextNode(e);o.insertNode(s),o.setStartAfter(s),o.collapse(!0),n.removeAllRanges(),n.addRange(o),this.fileManager.markDirty()}applyInlineStyle(e,t){const n=this.contentEl.ownerDocument,o=n.getSelection();if(!o||o.rangeCount===0)return;const s=o.getRangeAt(0);if(s.collapsed){this.pendingStyles.set(e,t),this.pendingStylesJustSet=!0;return}this.pendingStyles.clear(),this.pendingStylesJustSet=!1;const a=n.createElement("span");a.style.setProperty(e,t);const r=s.extractContents();a.appendChild(r),s.insertNode(a),s.selectNodeContents(a),o.removeAllRanges(),o.addRange(s)}applyBlockStyle(e,t){const n=this.contentEl.ownerDocument.getSelection();if(!n||n.rangeCount===0)return;this.findBlockAncestor(n.getRangeAt(0).commonAncestorContainer).style.setProperty(e,t)}applyTextAlign(e){const t=this.contentEl.ownerDocument.getSelection();if(!t||t.rangeCount===0)return;const n=Io(this.contentEl,t.getRangeAt(0));for(const o of n)o.style.textAlign=e==="left"?"":e}applyImageAlign(e,t){e.style.float="",e.style.display="",e.style.marginLeft="",e.style.marginRight="",t==="left"?(e.style.float="left",e.style.marginRight="8px"):t==="right"?(e.style.float="right",e.style.marginLeft="8px"):t==="center"&&(e.style.display="block",e.style.marginLeft="auto",e.style.marginRight="auto"),requestAnimationFrame(()=>this.imageResizer.syncOverlay())}applyTableAlign(e,t){e.style.marginLeft="",e.style.marginRight="",t==="center"?(e.style.marginLeft="auto",e.style.marginRight="auto"):t==="right"&&(e.style.marginLeft="auto",e.style.marginRight="0")}applyIndent(e){const t=this.contentEl.ownerDocument.getSelection();if(!t||t.rangeCount===0)return;const n=this.findBlockAncestor(t.getRangeAt(0).commonAncestorContainer),o=parseFloat(n.style.paddingLeft)||0,s=Math.max(0,o+e*br);n.style.paddingLeft=s===0?"":`${s}em`}checkAltWarning(){const e=this.contentEl.querySelectorAll('img:not([alt]), img[alt=""]').length>0;let t=this.shadow.getElementById("alt-warning-banner");e&&!t?(t=document.createElement("div"),t.id="alt-warning-banner",t.style.cssText="background:#fff3cd;color:#856404;padding:5px 12px;font-size:12px;border-top:1px solid #ffc107;",t.textContent="⚠ alt 텍스트가 없는 이미지가 있습니다. 접근성을 위해 설명을 추가하세요.",this.contentEl.insertAdjacentElement("afterend",t)):!e&&t&&t.remove()}runAccessibilityCheck(){this.accessibilityDialog.startLoading(),setTimeout(()=>{const e=new zs(this.contentEl).run();this.accessibilityDialog.show(e)},50)}runPrivacyCheck(){fe.removeHighlights(this.contentEl),this.privacyDialog.startLoading(),setTimeout(()=>{const t=new fe(this.contentEl).run();t.length>0&&fe.highlight(t),this.privacyDialog.show(t)},50)}openFormulaDialog(){const e=this.getFocusedCell();if(!e){this.toast.show("표 안에 커서를 놓고 계산식을 설정하세요.","info");return}const t=e.closest("table");if(!t)return;const n=e.dataset.formula?(()=>{try{return JSON.parse(e.dataset.formula)}catch{return null}})():null,o=Array.from(t.querySelectorAll("tr"));let s=1,a=1;o.forEach((p,h)=>{const f=Array.from(p.querySelectorAll("td, th")).indexOf(e);f!==-1&&(s=h+1,a=f+1)});const r=this.tableSelector.getCellSelection(),d=r.length>1?Ke.getSelectionBounds(t,r)??void 0:void 0;this.formulaDialog.open({table:t,cell:e,cellRow:s,cellCol:a,existingFormula:n??void 0,initialRange:d})}findBlockAncestor(e){let t=e;for(;t&&t!==this.contentEl;){if(t.nodeType===1&&xr.has(t.tagName.toLowerCase()))return t;t=t.parentNode}return this.contentEl}syncToolbar(){const e=this.core.canUndo(),t=this.core.canRedo(),n=this.getActualRange();if(!n||!this.contentEl.contains(n.startContainer)){this.toolbar.setHistoryState(e,t);return}const o=this.getFocusedCell()!==null||this.selectedTable!==null;o&&!this.inTableContext?(this.inTableContext=!0,P.emit(O.MENUBAR_CHANGE,{tab:"table"})):!o&&this.inTableContext&&(this.inTableContext=!1,P.emit(O.MENUBAR_CHANGE,{tab:this.previousMenuTab})),this.savedRange=n;const s=n.startContainer,a={bold:this.hasAncestorTag(s,"strong"),italic:this.hasAncestorTag(s,"em"),underline:this.hasAncestorTag(s,"u"),strike:this.hasAncestorTag(s,"s"),align:(()=>{const r=this.imageResizer.getActiveImage();return r?Ao(r):this.selectedTable?Mo(this.selectedTable):this.getInlineStyle(s,"text-align")||"left"})(),canUndo:e,canRedo:t,fontSize:this.getInlineStyle(s,"font-size")||"12pt",fontFamily:this.getInlineStyle(s,"font-family")||"inherit",lineHeight:this.getInlineStyle(s,"line-height")||"1.5",letterSpacing:this.getInlineStyle(s,"letter-spacing")||"0px",foreColor:this.rgbToHex(this.getComputedStyle(s,"color"))||"#000000",backColor:"#ffff00",inTable:o};this.toolbar.setState(a)}hasAncestorTag(e,t){let n=e;for(;n&&n!==this.contentEl;){if(n.nodeType===1&&n.tagName.toLowerCase()===t)return!0;n=n.parentNode}return!1}getInlineStyle(e,t){let n=e;for(;n&&n!==this.contentEl;){if(n.nodeType===1){const o=n.style.getPropertyValue(t);if(o)return o}n=n.parentNode}return""}getComputedStyle(e,t){const n=(e==null?void 0:e.nodeType)===1?e:(e==null?void 0:e.parentElement)??null;return n?window.getComputedStyle(n).getPropertyValue(t):""}rgbToHex(e){const t=e.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);return t?"#"+[t[1],t[2],t[3]].map(n=>parseInt(n).toString(16).padStart(2,"0")).join(""):e.startsWith("#")?e:""}getActualRange(){const e=this.contentEl.ownerDocument.getSelection();return!e||e.rangeCount===0?null:e.getRangeAt(0)}getFocusedCell(){const e=this.getActualRange();if(!e)return null;let t=e.startContainer;for(;t&&t!==this.contentEl;){if(t.nodeType===Node.ELEMENT_NODE){const n=t.tagName.toLowerCase();if(n==="td"||n==="th")return t;if(n==="table")break}t=t.parentNode}return null}getFocusedTable(){var e;return((e=this.getFocusedCell())==null?void 0:e.closest("table"))??null}findTableNode(e){let t=e;for(;t&&t!==this.contentEl;){if(t.nodeType===Node.ELEMENT_NODE&&t.tagName==="TABLE")return t;t=t.parentNode}return null}selectTable(e){this.selectedTable!==e&&(this.deselectTable(),this.selectedTable=e,e.classList.add("poa-table-selected"),this.tableWholeResizer.attach(e),this.tableInlineToolbar.show(e,this.contentEl))}deselectTable(){var e;(e=this.selectedTable)==null||e.classList.remove("poa-table-selected"),this.selectedTable=null,this.tableWholeResizer.detach(),this.tableInlineToolbar.hide()}static injectContentStyles(){if(ze._stylesInjected)return;ze._stylesInjected=!0;const e=document.createElement("style");e.id="poa-editor-content-styles",e.textContent=[".poa-editor-content:empty::before {","  content: attr(data-placeholder);","  color: #aaa;","  pointer-events: none;","  display: block;","}",".poa-editor-content a[href]:not(.poa-bookmark) {","  position: relative;","}",".poa-editor-content a[href]:not(.poa-bookmark)::after {","  content: attr(href);","  position: absolute;","  top: 100%;","  left: 0;","  margin-top: 3px;","  background: #1a1a1a;","  color: #fff;","  padding: 3px 8px;","  border-radius: 3px;","  font-size: 11px;","  font-style: normal;","  text-decoration: none;","  white-space: nowrap;","  max-width: 320px;","  overflow: hidden;","  text-overflow: ellipsis;","  opacity: 0;","  pointer-events: none;","  transition: opacity 0.15s;","  z-index: 9999;","}",".poa-editor-content a[href]:not(.poa-bookmark):hover::after {","  opacity: 1;","}",".poa-editor-content a.poa-bookmark {","  color: #9e9e9e;","  font-size: 12px;","  border: 1px dashed #bdbdbd;","  border-radius: 2px;","  padding: 0 3px;","  cursor: default;","  user-select: none;","  -webkit-user-select: none;","}",".poa-editor-content table.poa-table-selected {","  outline: 2px solid #0078d7;","  outline-offset: -2px;","}",".poa-editor-content.poa-show-hidden-borders table,",".poa-editor-content.poa-show-hidden-borders td,",".poa-editor-content.poa-show-hidden-borders th {","  border: 1px dashed #bbb !important;","}",".poa-editor-content.poa-show-hidden-borders div,",".poa-editor-content.poa-show-hidden-borders p {","  outline: 1px dashed rgba(0,120,212,.25);","}",".poa-editor-content table {","  max-width: 100%;","  box-sizing: border-box;","}",".poa-editor-content td input, .poa-editor-content th input,",".poa-editor-content td textarea, .poa-editor-content th textarea,",".poa-editor-content td select, .poa-editor-content th select {","  max-width: 100%;","  box-sizing: border-box;","}",".poa-editor-content .poa-input-selected {","  outline: 2px solid #2563EB !important;","  outline-offset: 1px;","}"].join(`
`),document.head.appendChild(e)}showImgContextMenu(e,t,n){this.hideImgContextMenu();const o=document.createElement("div");o.dataset.poaImgMenu="true",o.style.cssText=`position:fixed;top:${n}px;left:${t}px;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:9999;padding:4px 0;min-width:150px;font-size:13px;`;const s=[{label:"이미지 속성",action:()=>{this.imageDialog.open(e.src,{alt:e.alt,title:e.title||void 0,width:e.style.width||void 0,height:e.style.height||void 0,border:e.style.border||void 0,align:e.style.float||void 0,id:e.id||void 0,className:e.className||void 0})}},{label:"이미지 편집",action:()=>{this.imageDialog.open(e.src,{})}},{label:"원본 크기로",action:()=>{e.style.width=e.naturalWidth?`${e.naturalWidth}px`:"",e.style.height=e.naturalHeight?`${e.naturalHeight}px`:"",this.imageResizer.syncOverlay(),this.imageToolbar.update(e),this.core.captureHistory("imageResize")}},{label:"너비 맞춤 (100%)",action:()=>{const r=this.contentEl.clientWidth;e.style.width=`${r}px`,e.style.height="",this.imageResizer.syncOverlay(),this.imageToolbar.update(e),this.core.captureHistory("imageResize")}},{label:"이미지 삭제",danger:!0,action:()=>{this.imageResizer.deactivate(),e.remove(),this.core.captureHistory("imageDelete"),this.statusBar.update(this.contentEl.innerHTML),this.checkAltWarning()}}];for(const r of s){const d=document.createElement("button");d.textContent=r.label,d.style.cssText=`display:block;width:100%;padding:6px 14px;border:none;background:transparent;cursor:pointer;text-align:left;font-size:13px;color:${r.danger?"#d32f2f":"#222"};`,d.addEventListener("mouseenter",()=>{d.style.background="#f5f5f5"}),d.addEventListener("mouseleave",()=>{d.style.background="transparent"}),d.addEventListener("click",()=>{r.action(),this.hideImgContextMenu()}),o.appendChild(d)}document.body.appendChild(o),this.imgContextMenu=o;const a=()=>{this.hideImgContextMenu(),document.removeEventListener("mousedown",a,{capture:!0})};setTimeout(()=>document.addEventListener("mousedown",a,{capture:!0,once:!0}),0)}hideImgContextMenu(){var e;(e=this.imgContextMenu)==null||e.remove(),this.imgContextMenu=null}showLinkContextMenu(e,t,n){this.hideLinkContextMenu();const o=document.createElement("div");o.dataset.poaLinkMenu="true",o.style.cssText=`position:fixed;top:${n}px;left:${t}px;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:9999;padding:4px 0;min-width:140px;font-size:13px;`;const s=[{label:"링크 수정",action:()=>{this.linkInserter.saveSelection(),this.bookmarkManager.saveSelection(),this.linkDialog.setBookmarks(this.bookmarkManager.getAll()),this.linkDialog.open("link",e)}},{label:"링크 제거",danger:!0,action:()=>{this.linkInserter.removeLink(e),this.core.captureHistory("removeLink"),this.statusBar.update(this.contentEl.innerHTML)}},{label:"링크 열기",action:()=>{window.open(e.href,e.target||"_blank","noopener,noreferrer")}}];for(const a of s){const r=document.createElement("button");r.textContent=a.label,r.style.cssText=`display:block;width:100%;padding:6px 14px;border:none;background:transparent;cursor:pointer;text-align:left;font-size:13px;color:${a.danger?"#d32f2f":"#222"};`,r.addEventListener("mouseenter",()=>{r.style.background="#f5f5f5"}),r.addEventListener("mouseleave",()=>{r.style.background="transparent"}),r.addEventListener("click",()=>{a.action(),this.hideLinkContextMenu()}),o.appendChild(r)}document.body.appendChild(o),this.linkContextMenu=o,setTimeout(()=>document.addEventListener("mousedown",()=>this.hideLinkContextMenu(),{capture:!0,once:!0}),0)}hideLinkContextMenu(){var e;(e=this.linkContextMenu)==null||e.remove(),this.linkContextMenu=null}};c(ze,"_stylesInjected",!1);let ei=ze;class yr{async rotate(i,e){const t=await this.loadImage(i),n=e===90||e===270,o=n?t.naturalHeight:t.naturalWidth,s=n?t.naturalWidth:t.naturalHeight,a=this.createCanvas(o,s),r=a.getContext("2d");if(!r)throw new Error("Canvas 2D context를 가져올 수 없습니다.");return r.translate(o/2,s/2),r.rotate(e*Math.PI/180),r.drawImage(t,-t.naturalWidth/2,-t.naturalHeight/2),a.toDataURL("image/png")}async flip(i,e){const t=await this.loadImage(i),n=this.createCanvas(t.naturalWidth,t.naturalHeight),o=n.getContext("2d");if(!o)throw new Error("Canvas 2D context를 가져올 수 없습니다.");return e==="horizontal"?(o.translate(t.naturalWidth,0),o.scale(-1,1)):(o.translate(0,t.naturalHeight),o.scale(1,-1)),o.drawImage(t,0,0),n.toDataURL("image/png")}async crop(i,e){const t=await this.loadImage(i),n=this.createCanvas(e.width,e.height),o=n.getContext("2d");if(!o)throw new Error("Canvas 2D context를 가져올 수 없습니다.");return o.drawImage(t,e.x,e.y,e.width,e.height,0,0,e.width,e.height),n.toDataURL("image/png")}createCanvas(i,e){const t=document.createElement("canvas");return t.width=i,t.height=e,t}loadImage(i){return new Promise((e,t)=>{const n=new Image;n.onload=()=>e(n),n.onerror=()=>t(new Error("이미지 로드 실패")),n.src=i})}}const wr=new Set(["jpg","jpeg","png","gif","webp","svg"]),Er=20*1024*1024;class kr{constructor(){c(this,"items",[])}validateFiles(i,e=Er){var s;const t=[],n=[];let o=0;for(const a of i){const r=((s=a.name.split(".").pop())==null?void 0:s.toLowerCase())??"";if(!wr.has(r)){n.push(`${a.name}: 지원하지 않는 형식 (허용: jpg/jpeg/png/gif/webp/svg)`);continue}if(o+a.size>e){const d=Math.round(e/1024/1024);n.push(`총 업로드 용량이 ${d}MB를 초과합니다. (${a.name} 이후 파일 제외)`);break}o+=a.size,t.push(a)}return{valid:t,errors:n}}async upload(i,e){var n,o;return this.items=i.map(s=>({file:s,status:"pending",progress:0})),(n=e.onProgress)==null||n.call(e,this.snapshot()),(await Promise.allSettled(i.map((s,a)=>this.uploadOne(s,a,e)))).forEach((s,a)=>{s.status==="fulfilled"?(this.items[a].status="done",this.items[a].url=s.value,this.items[a].progress=100):(this.items[a].status="error",this.items[a].error=s.reason instanceof Error?s.reason.message:"업로드 실패")}),(o=e.onProgress)==null||o.call(e,this.snapshot()),this.snapshot()}async uploadOne(i,e,t){var a,r;this.items[e].status="uploading",(a=t.onProgress)==null||a.call(t,this.snapshot());const n=new FormData;n.append(t.fieldName??"file",i);const o=await fetch(t.uploadUrl,{method:"POST",headers:t.headers,body:n});if(!o.ok)throw new Error(`HTTP ${o.status}`);const s=await o.json();if(!s.url)throw new Error("서버에서 URL을 반환하지 않았습니다.");return this.items[e].progress=100,(r=t.onProgress)==null||r.call(t,this.snapshot()),s.url}snapshot(){return this.items.map(i=>({...i}))}}const Cr=`
:host { display: none; }
:host(.open) { display: block; }

.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 9500;
}
.dialog {
  background: #fff; border-radius: 6px;
  box-shadow: 0 4px 28px rgba(0,0,0,.22);
  width: 220px; overflow: hidden;
  font-size: 13px; color: #333;
  user-select: none;
}
.dlg-hd {
  display: flex; align-items: center; justify-content: space-between;
  padding: 9px 12px; border-bottom: 1px solid #eee;
  font-size: 14px; font-weight: 600;
}
.dlg-close {
  border: none; background: transparent;
  font-size: 16px; cursor: pointer; color: #999;
  line-height: 1; padding: 0 2px;
}
.dlg-close:hover { color: #333; }
.dlg-body { padding: 14px 16px 16px; }
.form {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 8px 10px; align-items: center;
}
.form label { font-size: 12px; color: #666; }
.form input[type=number] {
  height: 28px; padding: 0 8px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; width: 100%; box-sizing: border-box;
}
.actions {
  display: flex; justify-content: flex-end;
  gap: 8px; margin-top: 14px;
}
.btn {
  height: 28px; padding: 0 14px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; cursor: pointer; background: #fff;
}
.btn-primary { background: #1565c0; color: #fff; border-color: #1565c0; }
.btn-primary:hover:not(:disabled) { background: #1251a3; }
.btn-primary:disabled { opacity: 0.4; cursor: default; }
.btn:not(.btn-primary):hover { background: #f5f5f5; }
`;class Lr extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"targetCell",null);this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>${Cr}</style>
<div class="overlay" id="overlay">
  <div class="dialog" role="dialog" aria-modal="true">
    <div class="dlg-hd">
      <span>셀 나누기</span>
      <button class="dlg-close" id="btn-close" title="닫기">✕</button>
    </div>
    <div class="dlg-body">
      <div class="form">
        <label for="cs-cols">열 개수</label>
        <input type="number" id="cs-cols" min="1" max="10" value="1">
        <label for="cs-rows">행 개수</label>
        <input type="number" id="cs-rows" min="1" max="10" value="1">
      </div>
      <div class="actions">
        <button class="btn btn-primary" id="btn-ok" disabled>확인</button>
        <button class="btn" id="btn-cancel">취소</button>
      </div>
    </div>
  </div>
</div>`;const e=this.shadow.getElementById("cs-cols"),t=this.shadow.getElementById("cs-rows"),n=this.shadow.getElementById("btn-ok"),o=()=>{const s=parseInt(e.value,10)||1,a=parseInt(t.value,10)||1;n.disabled=s<=1&&a<=1};e.addEventListener("input",o),t.addEventListener("input",o),this.shadow.getElementById("btn-close").addEventListener("click",()=>this.close()),this.shadow.getElementById("btn-cancel").addEventListener("click",()=>this.close()),this.shadow.getElementById("overlay").addEventListener("click",s=>{s.target.id==="overlay"&&this.close()}),n.addEventListener("click",()=>this.confirm())}open(e){this.targetCell=e;const t=this.shadow.getElementById("cs-cols"),n=this.shadow.getElementById("cs-rows"),o=this.shadow.getElementById("btn-ok");t.value="1",n.value="1",o.disabled=!0,this.classList.add("open"),t.focus(),t.select()}close(){this.classList.remove("open"),this.targetCell=null}confirm(){if(!this.targetCell)return;const e=Math.max(1,parseInt(this.shadow.getElementById("cs-cols").value,10)||1),t=Math.max(1,parseInt(this.shadow.getElementById("cs-rows").value,10)||1);e<=1&&t<=1||(this.dispatchEvent(new CustomEvent("poa-cell-split",{bubbles:!0,composed:!0,detail:{cell:this.targetCell,cols:e,rows:t}})),this.close())}}const fn=`
:host { display: none; }
:host([open]) { display: block; }
* { box-sizing: border-box; margin: 0; padding: 0; }

.overlay {
  position: fixed; inset: 0; z-index: 99990;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.dialog {
  background: #fff; border-radius: 8px;
  width: 480px; max-width: 96vw; max-height: 90vh;
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.25); overflow: hidden;
}
.header {
  background: #1F2937; color: #fff;
  padding: 13px 18px;
  display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
}
.header h2 { font-size: 14px; font-weight: 600; }
.header button {
  background: transparent; border: none; color: #9CA3AF;
  font-size: 18px; cursor: pointer; padding: 2px 6px; line-height: 1;
}
.header button:hover { color: #fff; }

.tabs {
  display: flex; border-bottom: 1px solid #E5E7EB; flex-shrink: 0;
}
.tab-btn {
  flex: 1; padding: 10px; border: none; background: #F9FAFB;
  font-size: 13px; cursor: pointer; color: #6B7280; border-bottom: 2px solid transparent;
  transition: background .15s;
}
.tab-btn:hover { background: #F3F4F6; }
.tab-btn.active { background: #fff; color: #1F2937; font-weight: 600; border-bottom-color: #3B82F6; }

.body { overflow-y: auto; flex: 1; padding: 16px 18px 8px; }
.body::-webkit-scrollbar { width: 5px; }
.body::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }

.tab-panel { display: none; }
.tab-panel.active { display: block; }

.section { margin-bottom: 14px; }
.label { font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 5px; }
input[type="text"], input[type="url"], input[type="number"], select {
  width: 100%; padding: 7px 10px;
  border: 1px solid #D1D5DB; border-radius: 4px;
  font-size: 13px; color: #111; background: #fff;
}
input:focus, select:focus { outline: none; border-color: #3B82F6; }

.radio-row { display: flex; gap: 16px; flex-wrap: wrap; }
.radio-row label { display: flex; align-items: center; gap: 5px; font-size: 13px; cursor: pointer; }
.checkbox-row { display: flex; flex-direction: column; gap: 6px; }
.checkbox-row label { display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; }

.size-row { display: flex; align-items: center; gap: 8px; }
.size-row input { width: 72px; }
.size-row span { font-size: 12px; color: #6B7280; }

.a11y-hint {
  font-size: 11px; color: #F59E0B; margin-top: 4px;
  display: flex; align-items: center; gap: 4px;
}

.preview-box {
  width: 100%; aspect-ratio: 16/9; background: #F3F4F6;
  border: 1px dashed #D1D5DB; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; margin-top: 6px;
}
.preview-box img { width: 100%; height: 100%; object-fit: cover; }
.preview-box .empty-msg { font-size: 12px; color: #9CA3AF; }

.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.footer {
  padding: 12px 18px; border-top: 1px solid #E5E7EB;
  display: flex; justify-content: flex-end; gap: 8px; flex-shrink: 0;
}
.btn {
  padding: 6px 16px; border-radius: 4px; font-size: 13px; cursor: pointer;
  border: 1px solid #D1D5DB; background: #fff; color: #374151;
}
.btn:hover { background: #F3F4F6; }
.btn.primary { background: #1F2937; color: #fff; border-color: #1F2937; }
.btn.primary:hover { background: #374151; }
`;class Tr extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"activeTab","video");this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`<style>${fn}</style>`}open(e="video"){this.activeTab=e,this.setAttribute("open",""),this.render()}close(){this.removeAttribute("open")}render(){this.shadow.innerHTML=`<style>${fn}</style>
<div class="overlay" id="overlay">
  <div class="dialog" id="dialog">
    <div class="header">
      <h2>미디어 삽입</h2>
      <button id="btn-close">✕</button>
    </div>

    <div class="tabs">
      <button class="tab-btn${this.activeTab==="video"?" active":""}" data-tab="video">비디오 태그</button>
      <button class="tab-btn${this.activeTab==="embed"?" active":""}" data-tab="embed">외부 동영상</button>
    </div>

    <div class="body">
      <!-- ── 비디오 태그 탭 ── -->
      <div class="tab-panel${this.activeTab==="video"?" active":""}" id="panel-video">
        <div class="section">
          <div class="label">소스 URL</div>
          <input id="v-src" type="url" placeholder="https://example.com/video.mp4">
        </div>
        <div class="section">
          <div class="label">파일 형식</div>
          <div class="radio-row">
            <label><input type="radio" name="v-type" value="video/mp4" checked> mp4</label>
            <label><input type="radio" name="v-type" value="video/webm"> webm</label>
            <label><input type="radio" name="v-type" value="video/ogg"> ogg</label>
          </div>
        </div>
        <div class="section">
          <div class="label">포스터 URL <span style="font-weight:400;color:#9CA3AF">(선택)</span></div>
          <input id="v-poster" type="url" placeholder="https://example.com/poster.jpg">
        </div>
        <div class="section">
          <div class="label">옵션</div>
          <div class="checkbox-row">
            <label><input type="checkbox" id="v-controls" checked> controls (재생 컨트롤 표시)</label>
            <label><input type="checkbox" id="v-autoplay"> autoplay (자동 재생 — muted 강제)</label>
            <label><input type="checkbox" id="v-loop"> loop (반복 재생)</label>
            <label><input type="checkbox" id="v-muted"> muted (음소거)</label>
          </div>
        </div>
        <div class="section">
          <div class="label">크기</div>
          <div class="size-row">
            너비 <input id="v-width" type="number" min="100" max="1920" value="640">
            <span>px</span>
            높이 <input id="v-height" type="number" min="50" max="1080" value="360">
            <span>px</span>
          </div>
        </div>
        <div class="section">
          <div class="label">접근성 — 자막</div>
          <input id="v-track-src" type="url" placeholder="https://example.com/captions.vtt">
          <div class="a11y-hint" id="a11y-hint">⚠ 접근성을 위해 자막을 추가하세요.</div>
          <div style="margin-top:6px">
            <select id="v-track-lang">
              <option value="ko">ko — 한국어</option>
              <option value="en">en — English</option>
              <option value="ja">ja — 日本語</option>
              <option value="zh">zh — 中文</option>
              <option value="fr">fr — Français</option>
              <option value="de">de — Deutsch</option>
              <option value="es">es — Español</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ── 외부 동영상 탭 ── -->
      <div class="tab-panel${this.activeTab==="embed"?" active":""}" id="panel-embed">
        <div class="section">
          <div class="label">공유 URL</div>
          <input id="e-url" type="url" placeholder="https://youtube.com/watch?v=...">
          <div style="font-size:11px;color:#9CA3AF;margin-top:4px">
            지원: YouTube, Vimeo, Dailymotion
          </div>
        </div>
        <div class="section">
          <div class="label">미리보기</div>
          <div class="preview-box" id="preview-box">
            <span class="empty-msg">URL을 입력하면 미리보기가 표시됩니다.</span>
          </div>
        </div>
        <div class="section">
          <div class="label">크기</div>
          <div class="size-row">
            너비 <input id="e-width" type="number" min="100" max="1920" value="640">
            <span>px</span>
            높이 <input id="e-height" type="number" min="50" max="1080" value="360">
            <span>px</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <button class="btn" id="btn-cancel">취소</button>
      <button class="btn primary" id="btn-confirm">삽입</button>
    </div>
  </div>
</div>`,this.bindEvents()}bindEvents(){var t,n,o,s,a,r,d,p;const e=this.shadow;(t=e.getElementById("btn-close"))==null||t.addEventListener("click",()=>this.close()),(n=e.getElementById("btn-cancel"))==null||n.addEventListener("click",()=>this.close()),(o=e.getElementById("overlay"))==null||o.addEventListener("click",()=>this.close()),(s=e.getElementById("dialog"))==null||s.addEventListener("click",h=>h.stopPropagation()),e.querySelectorAll(".tab-btn").forEach(h=>{h.addEventListener("click",()=>{var g;this.activeTab=h.dataset.tab,e.querySelectorAll(".tab-btn").forEach(f=>f.classList.remove("active")),e.querySelectorAll(".tab-panel").forEach(f=>f.classList.remove("active")),h.classList.add("active"),(g=e.getElementById(`panel-${this.activeTab}`))==null||g.classList.add("active")})}),(a=e.getElementById("v-autoplay"))==null||a.addEventListener("change",h=>{const g=h.target.checked,f=e.getElementById("v-muted");f&&g&&(f.checked=!0)}),(r=e.getElementById("v-track-src"))==null||r.addEventListener("input",h=>{const g=e.getElementById("a11y-hint");g&&(g.style.display=h.target.value?"none":"flex")}),(d=e.getElementById("e-url"))==null||d.addEventListener("input",h=>{this.updatePreview(h.target.value)}),(p=e.getElementById("btn-confirm"))==null||p.addEventListener("click",()=>this.confirm())}updatePreview(e){const t=this.shadow.getElementById("preview-box");if(!t)return;const n=hn(e);n!=null&&n.thumbnailUrl?t.innerHTML=`<img src="${n.thumbnailUrl}" alt="미리보기">`:n?t.innerHTML=`<span class="empty-msg">${n.provider} 동영상 (미리보기 없음)</span>`:t.innerHTML='<span class="empty-msg">URL을 입력하면 미리보기가 표시됩니다.</span>'}confirm(){const e=this.activeTab==="video"?this.buildVideoHtml():this.buildEmbedHtml();e&&(this.dispatchEvent(new CustomEvent("poa-video-insert",{bubbles:!0,composed:!1,detail:{html:e}})),this.close())}buildVideoHtml(){var m,b,w,v,y,C,L,D,_,ie,M;const e=this.shadow,t=((m=e.getElementById("v-src"))==null?void 0:m.value.trim())??"";if(!t)return alert("소스 URL을 입력하세요."),null;const n=((b=e.querySelector('input[name="v-type"]:checked'))==null?void 0:b.value)??"video/mp4",o=(w=e.getElementById("v-poster"))==null?void 0:w.value.trim(),s=parseInt(((v=e.getElementById("v-width"))==null?void 0:v.value)??"640",10),a=parseInt(((y=e.getElementById("v-height"))==null?void 0:y.value)??"360",10),r=((C=e.getElementById("v-controls"))==null?void 0:C.checked)??!0,d=((L=e.getElementById("v-autoplay"))==null?void 0:L.checked)??!1,p=((D=e.getElementById("v-loop"))==null?void 0:D.checked)??!1,h=((_=e.getElementById("v-muted"))==null?void 0:_.checked)??!1,g=(ie=e.getElementById("v-track-src"))==null?void 0:ie.value.trim(),f=((M=e.getElementById("v-track-lang"))==null?void 0:M.value)??"ko";return ir({src:t,type:n,poster:o||void 0,width:s,height:a,controls:r,autoplay:d,loop:p,muted:h,trackSrc:g||void 0,trackSrclang:f})}buildEmbedHtml(){var a,r,d;const e=this.shadow,t=((a=e.getElementById("e-url"))==null?void 0:a.value.trim())??"",n=hn(t);if(!n)return alert("지원하지 않는 URL입니다. YouTube, Vimeo, Dailymotion URL을 입력하세요."),null;const o=parseInt(((r=e.getElementById("e-width"))==null?void 0:r.value)??"640",10),s=parseInt(((d=e.getElementById("e-height"))==null?void 0:d.value)??"360",10);return nr({embedUrl:n.embedUrl,width:o,height:s})}}const Sr={text:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="3" y="9" width="18" height="6" rx="2"/>
    <line x1="7" y1="12" x2="10" y2="12"/>
  </svg>`,textarea:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="15" x2="13" y2="15"/>
  </svg>`,checkbox:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="4" y="4" width="16" height="16" rx="3"/>
    <polyline points="7,12 10.5,15.5 17,8"/>
  </svg>`,radio:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>
  </svg>`,select:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="3" y="8" width="18" height="8" rx="2"/>
    <polyline points="15,11 18,11 16.5,13.5"/>
  </svg>`,button:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="3" y="8" width="18" height="8" rx="4"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
  </svg>`,date:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="3" y="5" width="18" height="16" rx="2"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>
    <rect x="7" y="13" width="4" height="4" rx="1" fill="currentColor" stroke="none"/>
  </svg>`},Ir={text:"텍스트",textarea:"여러 줄",checkbox:"체크박스",radio:"라디오",select:"목록 선택",button:"버튼",date:"날짜 선택"},Ar=["text","textarea","checkbox","radio","select","button","date"],Mr=`
*, *::before, *::after { box-sizing: border-box; }

:host { display:none; position:fixed; inset:0; z-index:9999; align-items:center; justify-content:center; }
:host([open]) { display:flex; background:rgba(0,0,0,.45); }
.dlg { background:#fff; border-radius:12px; width:min(560px,90vw); max-height:92vh;
       overflow-x:hidden; overflow-y:auto; box-shadow:0 8px 32px rgba(0,0,0,.28);
       display:flex; flex-direction:column; }

/* 헤더 */
.hdr { display:flex; align-items:center; justify-content:space-between;
       padding:18px 20px 14px; border-bottom:1px solid #f3f4f6; }
.hdr h3 { margin:0; font-size:16px; font-weight:700; color:#111827; }
.x-btn { background:none; border:none; font-size:22px; cursor:pointer; color:#9ca3af;
          line-height:1; padding:0 4px; border-radius:4px; }
.x-btn:hover { color:#374151; background:#f3f4f6; }

/* 타입 카드 그리드 */
.type-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px;
             padding:16px 20px 12px; width:100%; border-bottom:1px solid #f3f4f6; }
.type-card { display:flex; flex-direction:column; align-items:center; justify-content:center;
             gap:6px; height:72px; border:1.5px solid #e5e7eb; border-radius:8px;
             background:#fff; cursor:pointer; color:#6b7280; font-size:12px; font-weight:500;
             transition:all .15s; user-select:none; min-width:0; }
.type-card:hover { background:#f9fafb; border-color:#d1d5db; color:#374151; }
.type-card.active { border:2px solid #2563eb; background:#eff6ff; color:#2563eb; }
.type-card svg { flex-shrink:0; }

/* 폼 바디 */
.body { padding:16px 20px 0; flex:1; width:100%; }
.field { margin-bottom:14px; }
.field > label { display:block; font-size:13px; font-weight:600; color:#374151; margin-bottom:5px; }
.field .hint { font-size:11px; color:#9ca3af; margin-top:4px; }
input[type=text], input[type=number], select, textarea {
  width:100%; border:1.5px solid #e5e7eb; border-radius:8px;
  padding:8px 12px; font-size:14px; color:#111827; outline:none; transition:border-color .15s;
  font-family:inherit; }
input[type=text]:focus, input[type=number]:focus, select:focus, textarea:focus {
  border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
textarea { resize:vertical; min-height:72px; }
.row2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.row3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; }

/* 체크 */
.chk-row { display:flex; align-items:center; gap:8px; }
.chk-row input[type=checkbox] { width:16px; height:16px; accent-color:#2563eb; cursor:pointer; flex-shrink:0; }
.chk-row label { font-size:13px; color:#374151; cursor:pointer; user-select:none; }

/* 옵션 리스트 (radio/select) */
.opt-list { display:flex; flex-direction:column; gap:6px; margin-bottom:8px; }
.opt-row { display:flex; gap:6px; align-items:center; min-width:0; }
.opt-row input[type=text] { flex:1; min-width:0; padding:6px 10px; }
.opt-row .del-btn { flex:none; width:28px; height:28px; border:1px solid #fca5a5;
                    border-radius:6px; background:none; color:#ef4444; cursor:pointer;
                    font-size:14px; display:flex; align-items:center; justify-content:center; }
.opt-row .del-btn:hover { background:#fee2e2; }
.add-opt { width:100%; padding:7px; border:1.5px dashed #d1d5db; border-radius:8px;
           background:none; cursor:pointer; color:#6b7280; font-size:13px; margin-bottom:4px; }
.add-opt:hover { background:#f9fafb; border-color:#9ca3af; }

/* 버튼 역할 라디오 */
.btn-role { display:flex; gap:12px; flex-wrap:wrap; }
.btn-role label { display:flex; align-items:center; gap:5px; font-size:13px;
                  color:#374151; cursor:pointer; }
.btn-role input[type=radio] { accent-color:#2563eb; }

/* 추가 설정 접기/펼치기 */
.adv-toggle { width:100%; background:none; border:none; text-align:left; cursor:pointer;
              font-size:13px; color:#6b7280; padding:8px 0; display:flex; align-items:center; gap:6px; }
.adv-toggle:hover { color:#374151; }
.adv-toggle .arrow { transition:transform .2s; display:inline-block; }
.adv-toggle.open .arrow { transform:rotate(180deg); }
.adv-body { display:none; border:1.5px solid #f3f4f6; border-radius:8px; padding:12px 14px;
            margin-bottom:12px; background:#fafafa; width:100%; }
.adv-body.show { display:block; }

/* 미리보기 — 음수 마진 제거, 너비 overflow 방지 */
.preview-wrap { padding:12px 20px; background:#f9fafb; width:100%;
                border-top:1px solid #f3f4f6; border-bottom:1px solid #f3f4f6;
                overflow:hidden; }
.preview-label { font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase;
                 letter-spacing:.06em; margin-bottom:8px; }
.preview-box { min-height:60px; display:flex; align-items:flex-start; width:100%; overflow:hidden; }
.preview-box .poa-form-group { border:none !important; padding:0 !important; margin:0 !important; width:100%; }
.preview-box label { display:block; font-size:13px; color:#374151; margin-bottom:4px; font-weight:500; }
.preview-box input[type=text],.preview-box input[type=date],
.preview-box textarea,.preview-box select {
  border:1.5px solid #e5e7eb; border-radius:6px; padding:6px 10px; font-size:13px;
  color:#374151; width:100%; max-width:320px; outline:none; box-shadow:none; }
.preview-box .poa-checkbox-label { font-size:13px; color:#374151; display:flex; align-items:center; gap:6px; }
.preview-box .poa-radio-group { display:flex; flex-direction:column; gap:4px; }
.preview-box .poa-radio-group label { font-size:13px; color:#374151; margin:0; font-weight:normal; display:flex; align-items:center; gap:5px; }
.preview-box .poa-btn { padding:6px 16px; border:1.5px solid #d1d5db; border-radius:6px;
                        background:#f9fafb; font-size:13px; color:#374151; cursor:default; }
.preview-box .poa-btn-primary { background:#2563eb; border-color:#2563eb; color:#fff; }
.preview-box .poa-btn-danger  { background:#ef4444; border-color:#ef4444; color:#fff; }

/* 푸터 */
.ftr { display:flex; justify-content:flex-end; gap:8px; padding:14px 20px; }
.btn-cancel  { padding:8px 20px; border:1.5px solid #e5e7eb; border-radius:8px; background:#fff;
               cursor:pointer; font-size:14px; color:#374151; font-weight:500; }
.btn-cancel:hover  { background:#f9fafb; }
.btn-confirm { padding:8px 24px; border:none; border-radius:8px; background:#2563eb;
               cursor:pointer; font-size:14px; color:#fff; font-weight:600; }
.btn-confirm:hover { background:#1d4ed8; }
`;function H(l,i,e=""){return`<div class="field">
    <label>${l}</label>${i}${e?`<div class="hint">${e}</div>`:""}
  </div>`}function N(l,i="",e="text"){return`<input type="${e}" id="${l}" placeholder="${i}">`}function Br(l,i){return`<select id="${l}">${i.map(([e,t])=>`<option value="${e}">${t}</option>`).join("")}</select>`}class Dr extends HTMLElement{constructor(){super(...arguments);c(this,"shadow");c(this,"activeType","text")}connectedCallback(){this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`<style>${Mr}</style>${this._tpl()}`,this._buildTypeCards(),this._bindEvents(),this._setType("text")}open(e){var o;const t=this.shadow.getElementById("dlg-title"),n=this.shadow.getElementById("btn-confirm");t.textContent=e?"입력 요소 편집":"입력 요소 추가",n.textContent=e?"수정하기":"추가하기",e?(this._setType(e.type),this._fillFields(e)):(this._setType("text"),this._clearFields()),this.setAttribute("open",""),(o=this.shadow.getElementById("f-label"))==null||o.focus()}close(){this.removeAttribute("open")}_tpl(){return`<div class="dlg">
  <div class="hdr">
    <h3 id="dlg-title">입력 요소 추가</h3>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>

  <div id="type-grid" class="type-grid"></div>

  <div class="body">
    ${this._secText()}
    ${this._secTextarea()}
    ${this._secCheckbox()}
    ${this._secRadio()}
    ${this._secSelect()}
    ${this._secButton()}
    ${this._secDate()}
  </div>

  <div class="preview-wrap">
    <div class="preview-label">미리보기</div>
    <div class="preview-box" id="preview-box"></div>
  </div>

  <div class="ftr">
    <button class="btn-cancel" id="btn-cancel">취소</button>
    <button class="btn-confirm" id="btn-confirm">추가하기</button>
  </div>
</div>`}_adv(e){return`
    <button type="button" class="adv-toggle" data-adv>
      <span class="arrow">▼</span> 추가 설정
    </button>
    <div class="adv-body" data-adv-body>${e}</div>`}_secText(){return`<div class="specific-section" id="sec-text">
      ${H("항목 이름",N("f-label","예) 이름, 이메일 주소…"),"사용자에게 보여지는 항목 설명입니다")}
      ${H("안내 문구",N("f-text-ph","예) 홍길동"),"입력창 안에 표시되는 도움말입니다")}
      ${this._adv(`
        <div class="chk-row" style="margin-bottom:10px">
          <input type="checkbox" id="f-aria-req"><label for="f-aria-req">필수 입력 항목으로 표시</label>
        </div>
        ${H("최대 글자 수",N("f-text-ml","제한 없음","number"))}
        ${H("기본값",N("f-text-val","미리 채울 내용"))}
        ${H("name 속성",N("f-name","자동 생성"))}
      `)}
    </div>`}_secTextarea(){return`<div class="specific-section" id="sec-textarea">
      ${H("항목 이름",N("f-ta-label","예) 내용, 자기소개…"))}
      ${H("안내 문구",N("f-ta-ph","예) 간단하게 소개해 주세요"))}
      ${H("줄 수",'<input type="number" id="f-ta-rows" value="4" min="2" max="20" style="width:80px">',"입력창의 기본 높이를 줄 수로 조정합니다")}
      ${this._adv(`
        <div class="chk-row" style="margin-bottom:10px">
          <input type="checkbox" id="f-ta-req"><label for="f-ta-req">필수 입력 항목으로 표시</label>
        </div>
        ${H("name 속성",N("f-ta-name","자동 생성"))}
      `)}
    </div>`}_secCheckbox(){return`<div class="specific-section" id="sec-checkbox">
      ${H("체크박스 텍스트",N("f-cb-lbl","예) 개인정보 수집에 동의합니다"),"체크박스 옆에 표시되는 설명입니다")}
      <div class="field">
        <div class="chk-row">
          <input type="checkbox" id="f-cb-checked"><label for="f-cb-checked">처음부터 체크된 상태로 표시</label>
        </div>
      </div>
      ${this._adv(`
        <div class="chk-row" style="margin-bottom:10px">
          <input type="checkbox" id="f-cb-req"><label for="f-cb-req">필수 체크 항목으로 표시</label>
        </div>
        ${H("name 속성",N("f-cb-name","자동 생성"))}
      `)}
    </div>`}_secRadio(){return`<div class="specific-section" id="sec-radio">
      ${H("그룹 제목",N("f-radio-label","예) 성별, 선호 연락 방법…"),"라디오 버튼 그룹 위에 표시되는 제목입니다")}
      <div class="field">
        <label>선택지 목록</label>
        <div class="opt-list" id="radio-opts"></div>
        <button type="button" class="add-opt" id="add-radio-opt">+ 선택지 추가</button>
      </div>
      ${this._adv(`
        <div class="hint" style="margin-bottom:8px">기본 선택값은 각 선택지 행 오른쪽 ★ 버튼으로 지정하세요.</div>
        ${H("그룹 name 속성",N("f-radio-gn","자동 생성"))}
      `)}
    </div>`}_secSelect(){return`<div class="specific-section" id="sec-select">
      ${H("항목 이름",N("f-sel-label","예) 지역, 직군…"))}
      <div class="field">
        <label>선택지 목록</label>
        <div class="opt-list" id="select-opts"></div>
        <button type="button" class="add-opt" id="add-select-opt">+ 항목 추가</button>
      </div>
      <div class="field">
        <div class="chk-row">
          <input type="checkbox" id="f-sel-multi"><label for="f-sel-multi">여러 개 동시 선택 가능</label>
        </div>
      </div>
      ${this._adv(`
        <div class="hint" style="margin-bottom:8px">기본 선택값은 각 항목 행 오른쪽 ★ 버튼으로 지정하세요.</div>
        ${H("name 속성",N("f-sel-name","자동 생성"))}
      `)}
    </div>`}_secButton(){return`<div class="specific-section" id="sec-button">
      ${H("버튼 텍스트",N("f-btn-text","예) 제출, 확인, 다음"))}
      <div class="field">
        <label>버튼 역할</label>
        <div class="btn-role">
          <label><input type="radio" name="btn-type" value="submit"> 양식 제출</label>
          <label><input type="radio" name="btn-type" value="reset">  내용 초기화</label>
          <label><input type="radio" name="btn-type" value="button" checked> 일반 버튼</label>
        </div>
      </div>
      ${this._adv(`
        <div class="field">
          <label>버튼 색상 스타일</label>
          ${Br("f-btn-style",[["default","기본 (회색)"],["primary","강조 (파랑)"],["danger","경고 (빨강)"]])}
        </div>
        ${H("name 속성",N("f-btn-name","자동 생성"))}
      `)}
    </div>`}_secDate(){return`<div class="specific-section" id="sec-date">
      ${H("항목 이름",N("f-date-label","예) 생년월일, 예약일…"))}
      <div class="field">
        <div class="chk-row">
          <input type="checkbox" id="f-date-req"><label for="f-date-req">필수 입력 항목으로 표시</label>
        </div>
      </div>
      ${this._adv(`
        ${H("선택 가능한 시작일",N("f-date-min","YYYY-MM-DD"))}
        ${H("선택 가능한 종료일",N("f-date-max","YYYY-MM-DD"))}
        ${H("기본 날짜",N("f-date-val","YYYY-MM-DD"))}
        ${H("name 속성",N("f-date-name","자동 생성"))}
      `)}
    </div>`}_buildTypeCards(){const e=this.shadow.getElementById("type-grid");for(const t of Ar){const n=document.createElement("button");n.type="button",n.className="type-card",n.dataset.type=t,n.innerHTML=`${Sr[t]}<span>${Ir[t]}</span>`,n.addEventListener("click",o=>{o.stopPropagation(),this._setType(t)}),e.appendChild(n)}}_bindEvents(){this.shadow.querySelector(".x-btn").addEventListener("click",()=>this.close()),this.shadow.getElementById("btn-cancel").addEventListener("click",()=>this.close()),this.shadow.getElementById("btn-confirm").addEventListener("click",()=>this._confirm()),this.shadow.getElementById("add-radio-opt").addEventListener("click",()=>{this._addRadioRow(),this._updatePreview()}),this.shadow.getElementById("add-select-opt").addEventListener("click",()=>{this._addSelectRow(),this._updatePreview()}),this.shadow.addEventListener("click",e=>{const t=e.target.closest("[data-adv]");if(!t)return;t.classList.toggle("open");const n=t.nextElementSibling;n==null||n.classList.toggle("show")}),this.addEventListener("click",e=>{e.composedPath()[0]===this&&this.close()}),this.shadow.addEventListener("input",()=>this._updatePreview()),this.shadow.addEventListener("change",()=>this._updatePreview())}_setType(e){this.activeType=e,this.shadow.querySelectorAll(".type-card").forEach(t=>{t.classList.toggle("active",t.dataset.type===e)}),this.shadow.querySelectorAll(".specific-section").forEach(t=>{t.style.display=t.id===`sec-${e}`?"block":"none"}),this._updatePreview()}_addRadioRow(e){const t=this.shadow.getElementById("radio-opts"),n=document.createElement("div");n.className="opt-row";const o=document.createElement("input");o.type="text",o.className="opt-label",o.placeholder="선택지 텍스트",o.value=(e==null?void 0:e.label)??"",o.addEventListener("input",()=>this._updatePreview());const s=document.createElement("button");s.type="button",s.title="기본 선택",s.style.cssText="flex:none;width:28px;height:28px;border:1px solid #e5e7eb;border-radius:6px;background:none;cursor:pointer;font-size:14px;color:#d1d5db;",s.textContent="★",e!=null&&e.defaultChecked&&(s.style.color="#f59e0b",s.dataset.default="1"),s.addEventListener("click",()=>{t.querySelectorAll('button[title="기본 선택"]').forEach(r=>{r.style.color="#d1d5db",delete r.dataset.default}),s.style.color="#f59e0b",s.dataset.default="1",this._updatePreview()});const a=document.createElement("button");a.type="button",a.className="del-btn",a.title="삭제",a.textContent="✕",a.addEventListener("click",()=>{n.remove(),this._updatePreview()}),n.appendChild(o),n.appendChild(s),n.appendChild(a),t.appendChild(n)}_addSelectRow(e){const t=this.shadow.getElementById("select-opts"),n=document.createElement("div");n.className="opt-row";const o=document.createElement("input");o.type="text",o.className="opt-label",o.placeholder="항목 텍스트",o.value=(e==null?void 0:e.label)??"",o.addEventListener("input",()=>this._updatePreview());const s=document.createElement("button");s.type="button",s.title="기본 선택",s.style.cssText="flex:none;width:28px;height:28px;border:1px solid #e5e7eb;border-radius:6px;background:none;cursor:pointer;font-size:14px;color:#d1d5db;",s.textContent="★",e!=null&&e.selected&&(s.style.color="#f59e0b",s.dataset.default="1"),s.addEventListener("click",()=>{t.querySelectorAll('button[title="기본 선택"]').forEach(r=>{r.style.color="#d1d5db",delete r.dataset.default}),s.style.color="#f59e0b",s.dataset.default="1",this._updatePreview()});const a=document.createElement("button");a.type="button",a.className="del-btn",a.title="삭제",a.textContent="✕",a.addEventListener("click",()=>{n.remove(),this._updatePreview()}),n.appendChild(o),n.appendChild(s),n.appendChild(a),t.appendChild(n)}_clearFields(){const e=(s,a)=>{const r=this.shadow.getElementById(s);r&&(r.value=a)},t=(s,a)=>{const r=this.shadow.getElementById(s);r&&(r.checked=a)};e("f-label",""),e("f-text-ph",""),e("f-text-ml",""),e("f-text-val",""),e("f-name",""),e("f-ta-label",""),e("f-ta-ph",""),e("f-ta-rows","4"),e("f-ta-name",""),e("f-cb-lbl",""),e("f-cb-name",""),e("f-radio-label",""),e("f-radio-gn",""),e("f-sel-label",""),e("f-sel-name",""),e("f-btn-text",""),e("f-btn-name",""),e("f-date-label",""),e("f-date-min",""),e("f-date-max",""),e("f-date-val",""),e("f-date-name",""),t("f-aria-req",!1),t("f-ta-req",!1),t("f-cb-checked",!1),t("f-cb-req",!1),t("f-sel-multi",!1),t("f-date-req",!1);const n=this.shadow.querySelector('input[name="btn-type"][value="button"]');n&&(n.checked=!0);const o=this.shadow.getElementById("f-btn-style");o&&(o.value="default"),this.shadow.getElementById("radio-opts").innerHTML="",this._addRadioRow(),this._addRadioRow(),this.shadow.getElementById("select-opts").innerHTML="",this._addSelectRow(),this._addSelectRow(),this.shadow.querySelectorAll("[data-adv]").forEach(s=>{s.classList.remove("open");const a=s.nextElementSibling;a==null||a.classList.remove("show")})}_fillFields(e){var t,n;switch(this._clearFields(),e.type){case"text":this._sv("f-label",e.label),this._sv("f-text-ph",e.placeholder),this._sv("f-text-ml",e.maxlength!=null?String(e.maxlength):""),this._sv("f-text-val",e.value),this._sv("f-name",e.name),this._sc("f-aria-req",e.ariaRequired);break;case"textarea":this._sv("f-ta-label",e.label),this._sv("f-ta-ph",e.placeholder),this._sv("f-ta-rows",String(e.rows??4)),this._sv("f-ta-name",e.name),this._sc("f-ta-req",e.ariaRequired);break;case"checkbox":this._sv("f-cb-lbl",e.checkLabel??e.label),this._sv("f-cb-name",e.name),this._sc("f-cb-checked",e.checked),this._sc("f-cb-req",e.ariaRequired);break;case"radio":this._sv("f-radio-label",e.label),this._sv("f-radio-gn",e.groupName),this.shadow.getElementById("radio-opts").innerHTML="",(e.options??[]).forEach(a=>this._addRadioRow(a)),(t=e.options)!=null&&t.length||(this._addRadioRow(),this._addRadioRow());break;case"select":this._sv("f-sel-label",e.label),this._sv("f-sel-name",e.name),this._sc("f-sel-multi",e.multiple),this.shadow.getElementById("select-opts").innerHTML="",(e.options??[]).forEach(a=>this._addSelectRow(a)),(n=e.options)!=null&&n.length||(this._addSelectRow(),this._addSelectRow());break;case"button":this._sv("f-btn-text",e.text),this._sv("f-btn-name",e.name);const o=this.shadow.querySelector(`input[name="btn-type"][value="${e.btnType??"button"}"]`);o&&(o.checked=!0);const s=this.shadow.getElementById("f-btn-style");s&&(s.value=e.btnStyle??"default");break;case"date":this._sv("f-date-label",e.label),this._sv("f-date-min",e.min),this._sv("f-date-max",e.max),this._sv("f-date-val",e.value),this._sv("f-date-name",e.name),this._sc("f-date-req",e.ariaRequired);break}}_sv(e,t){const n=this.shadow.getElementById(e);n&&t!=null&&(n.value=t)}_sc(e,t){const n=this.shadow.getElementById(e);n&&(n.checked=t??!1)}_v(e){var t;return(((t=this.shadow.getElementById(e))==null?void 0:t.value)??"").trim()}_c(e){var t;return((t=this.shadow.getElementById(e))==null?void 0:t.checked)??!1}_buildConfig(){var t,n;const e=Mn(this.activeType);switch(this.activeType){case"text":return{type:"text",label:this._v("f-label")||void 0,name:this._v("f-name")||void 0,id:e,placeholder:this._v("f-text-ph")||void 0,maxlength:Number(this._v("f-text-ml"))||void 0,value:this._v("f-text-val")||void 0,ariaRequired:this._c("f-aria-req")||void 0,autoLabel:!0};case"textarea":return{type:"textarea",label:this._v("f-ta-label")||void 0,name:this._v("f-ta-name")||void 0,id:e,placeholder:this._v("f-ta-ph")||void 0,rows:Number(this._v("f-ta-rows"))||4,ariaRequired:this._c("f-ta-req")||void 0,autoLabel:!0};case"checkbox":return{type:"checkbox",checkLabel:this._v("f-cb-lbl")||void 0,name:this._v("f-cb-name")||void 0,id:e,checked:this._c("f-cb-checked")||void 0,ariaRequired:this._c("f-cb-req")||void 0};case"radio":{const o=[];this.shadow.getElementById("radio-opts").querySelectorAll(".opt-row").forEach(a=>{const r=a.querySelector(".opt-label").value.trim(),d=a.querySelector('button[title="기본 선택"]'),p=!!(d!=null&&d.dataset.default);r&&o.push({label:r,value:r,defaultChecked:p||void 0})});const s=this._v("f-radio-gn")||e;return{type:"radio",label:this._v("f-radio-label")||void 0,name:s,groupName:s,id:e,options:o,autoLabel:!0}}case"select":{const o=[];return this.shadow.getElementById("select-opts").querySelectorAll(".opt-row").forEach(s=>{const a=s.querySelector(".opt-label").value.trim(),r=s.querySelector('button[title="기본 선택"]'),d=!!(r!=null&&r.dataset.default);a&&o.push({label:a,value:a,selected:d||void 0})}),{type:"select",label:this._v("f-sel-label")||void 0,name:this._v("f-sel-name")||void 0,id:e,multiple:this._c("f-sel-multi")||void 0,options:o,autoLabel:!0}}case"button":{const o=((t=this.shadow.querySelector('input[name="btn-type"]:checked'))==null?void 0:t.value)??"button",s=((n=this.shadow.getElementById("f-btn-style"))==null?void 0:n.value)??"default";return{type:"button",text:this._v("f-btn-text")||"버튼",name:this._v("f-btn-name")||void 0,id:e,btnType:o,btnStyle:s}}case"date":return{type:"date",label:this._v("f-date-label")||void 0,name:this._v("f-date-name")||void 0,id:e,min:this._v("f-date-min")||void 0,max:this._v("f-date-max")||void 0,value:this._v("f-date-val")||void 0,ariaRequired:this._c("f-date-req")||void 0,autoLabel:!0}}}_updatePreview(){const e=this.shadow.getElementById("preview-box");if(e)try{const t=this._buildConfig(),n=Bn(t);e.innerHTML=n}catch{e.innerHTML=""}}_confirm(){const e=this._buildConfig();this.dispatchEvent(new CustomEvent("poa-form-insert",{bubbles:!0,composed:!0,detail:{config:e}})),this.close()}}const jt="poa-templates";function Ge(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`}const _r=[{name:"공지사항 기본 양식",content:"<h2>공지사항</h2><p><strong>제목:</strong>&nbsp;</p><p><strong>내용:</strong>&nbsp;</p><p><strong>담당자:</strong>&nbsp;</p><p><strong>날짜:</strong>&nbsp;</p>"},{name:"회의록 양식",content:"<h2>회의록</h2><p><strong>일시:</strong>&nbsp;</p><p><strong>장소:</strong>&nbsp;</p><p><strong>참석자:</strong>&nbsp;</p><hr><h3>안건</h3><ol><li></li></ol><h3>결정사항</h3><ol><li></li></ol><h3>다음 회의</h3><p>&nbsp;</p>"},{name:"주간 보고서 양식",content:"<h2>주간 보고서</h2><p><strong>기간:</strong>&nbsp;</p><p><strong>작성자:</strong>&nbsp;</p><hr><h3>이번 주 완료 업무</h3><ul><li></li></ul><h3>다음 주 계획</h3><ul><li></li></ul><h3>이슈 및 건의사항</h3><p>&nbsp;</p>"}];class Rr{constructor(){c(this,"nodes",[]);this._load(),this.nodes.length===0&&this._seed()}_load(){try{const i=localStorage.getItem(jt);this.nodes=i?JSON.parse(i):[]}catch{this.nodes=[]}}_persist(){try{localStorage.setItem(jt,JSON.stringify(this.nodes))}catch{this._evict();try{localStorage.setItem(jt,JSON.stringify(this.nodes))}catch{}}}_evict(){const i=this.nodes.filter(e=>e.type==="template").sort((e,t)=>e.updatedAt-t.updatedAt)[0];i&&(this.nodes=this.nodes.filter(e=>e.id!==i.id))}_seed(){const i={id:Ge(),type:"folder",name:"공용 템플릿",parentId:null,isPublic:!0,createdAt:Date.now(),updatedAt:Date.now(),order:0},e={id:Ge(),type:"folder",name:"내 템플릿",parentId:null,isPublic:!1,createdAt:Date.now(),updatedAt:Date.now(),order:1};this.nodes.push(i,e),_r.forEach((t,n)=>{const o=String(te.sanitize(t.content,{USE_PROFILES:{html:!0}}));this.nodes.push({id:Ge(),type:"template",name:t.name,parentId:i.id,content:o,isPublic:!0,createdAt:Date.now(),updatedAt:Date.now(),order:n})}),this._persist()}getAll(){return[...this.nodes]}getById(i){return this.nodes.find(e=>e.id===i)??null}getChildren(i){return this.nodes.filter(e=>e.parentId===i).sort((e,t)=>e.order-t.order||e.name.localeCompare(t.name))}getRoots(){return this.getChildren(null)}getFolders(){return this.nodes.filter(i=>i.type==="folder")}addFolder(i,e,t=!1){const n={id:Ge(),type:"folder",name:i,parentId:e,isPublic:t,createdAt:Date.now(),updatedAt:Date.now(),order:this.getChildren(e).length};return this.nodes.push(n),this._persist(),n}addTemplate(i,e,t,n=!1){const o=String(te.sanitize(e,{USE_PROFILES:{html:!0}})),s={id:Ge(),type:"template",name:i,parentId:t,content:o,isPublic:n,createdAt:Date.now(),updatedAt:Date.now(),order:this.getChildren(t).length};return this.nodes.push(s),this._persist(),s}rename(i,e){const t=this.nodes.find(n=>n.id===i);return!t||!e.trim()?!1:(t.name=e.trim(),t.updatedAt=Date.now(),this._persist(),!0)}delete(i){for(const e of this.getChildren(i))this.delete(e.id);this.nodes=this.nodes.filter(e=>e.id!==i),this._persist()}move(i,e){const t=this.nodes.find(n=>n.id===i);return!t||this._isDescendant(e,i)?!1:(t.parentId=e,t.order=this.getChildren(e).filter(n=>n.id!==i).length,t.updatedAt=Date.now(),this._persist(),!0)}_isDescendant(i,e){if(i===null)return!1;if(i===e)return!0;const t=this.nodes.find(n=>n.id===i);return t?this._isDescendant(t.parentId,e):!1}}const Fr=`
*, *::before, *::after { box-sizing: border-box; }
:host { display: block; height: 100%; overflow-y: auto; }
.tree  { padding: 6px 0; }
.node-row {
  display: flex; align-items: center; gap: 4px;
  height: 32px; padding: 0 8px;
  cursor: pointer; font-size: 13px; color: #374151;
  border-radius: 4px; user-select: none;
  white-space: nowrap; overflow: hidden;
}
.node-row:hover   { background: #f3f4f6; }
.node-row.selected { background: #eff6ff; color: #2563eb; }
.arrow       { width: 14px; font-size: 9px; flex-shrink: 0; color: #9ca3af; }
.arrow-spacer { width: 14px; flex-shrink: 0; }
.icon  { flex-shrink: 0; font-size: 14px; }
.label { flex: 1; overflow: hidden; text-overflow: ellipsis; }
.inline-input {
  flex: 1; min-width: 0; border: 1.5px solid #2563eb; border-radius: 4px;
  padding: 1px 6px; font-size: 13px; outline: none; background: #fff;
}
.add-btn {
  display: block; width: calc(100% - 16px); margin: 6px 8px 2px;
  padding: 5px 10px; border: 1.5px dashed #d1d5db; border-radius: 6px;
  background: none; cursor: pointer; font-size: 12px; color: #6b7280; text-align: left;
}
.add-btn:hover { background: #f9fafb; border-color: #9ca3af; }
.ctx-menu {
  position: fixed; background: #fff; border: 1px solid #e5e7eb;
  border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,.15);
  padding: 4px; z-index: 10001; min-width: 120px;
}
.ctx-menu button {
  display: block; width: 100%; text-align: left;
  padding: 7px 12px; border: none; background: none;
  cursor: pointer; font-size: 13px; color: #374151; border-radius: 4px;
}
.ctx-menu button:hover  { background: #f3f4f6; }
.ctx-menu button.danger { color: #ef4444; }
.ctx-menu button.danger:hover { background: #fee2e2; }
`;class Hr extends HTMLElement{constructor(){super(...arguments);c(this,"shadow");c(this,"mgr");c(this,"expanded",new Set);c(this,"selectedId",null);c(this,"editingId",null);c(this,"ctxMenu",null)}connectedCallback(){this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`<style>${Fr}</style><div class="tree" id="tree"></div>`}setManager(e){this.mgr=e,e.getRoots().filter(t=>t.type==="folder").forEach(t=>this.expanded.add(t.id)),this.render()}render(){if(!this.mgr)return;const e=this.shadow.getElementById("tree");e.innerHTML="",this.mgr.getRoots().forEach(n=>e.appendChild(this._renderNode(n,0)));const t=document.createElement("button");t.className="add-btn",t.textContent="📁 폴더 추가",t.addEventListener("click",()=>this.addFolder(null)),e.appendChild(t)}getSelected(){return this.selectedId?this.mgr.getById(this.selectedId):null}addFolder(e){e&&this.expanded.add(e);const t=this.mgr.addFolder("새 폴더",e);this.editingId=t.id,this.render()}_renderNode(e,t){const n=document.createElement("div"),o=document.createElement("div");o.className=`node-row${this.selectedId===e.id?" selected":""}`,o.style.paddingLeft=`${8+t*16}px`;const s=document.createElement("span");e.type==="folder"?(s.className="arrow",s.textContent=this.expanded.has(e.id)?"▼":"▶"):s.className="arrow-spacer";const a=document.createElement("span");if(a.className="icon",a.textContent=e.type==="folder"?"📁":"📄",o.appendChild(s),o.appendChild(a),this.editingId===e.id){const r=document.createElement("input");r.type="text",r.className="inline-input",r.value=e.name,r.addEventListener("keydown",d=>{d.key==="Enter"&&this._commitEdit(e.id,r.value),d.key==="Escape"&&(this.editingId=null,this.render()),d.stopPropagation()}),r.addEventListener("blur",()=>this._commitEdit(e.id,r.value)),o.appendChild(r),requestAnimationFrame(()=>{r.focus(),r.select()})}else{const r=document.createElement("span");r.className="label",r.textContent=e.name,o.appendChild(r)}return o.addEventListener("click",r=>{r.stopPropagation(),this._select(e)}),o.addEventListener("dblclick",r=>{r.stopPropagation(),e.type==="template"&&this._emit("poa-tmpl-dblclick",{node:e})}),o.addEventListener("contextmenu",r=>{r.preventDefault(),r.stopPropagation(),this._showCtx(e,r.clientX,r.clientY)}),n.appendChild(o),e.type==="folder"&&this.expanded.has(e.id)&&this.mgr.getChildren(e.id).forEach(r=>n.appendChild(this._renderNode(r,t+1))),n}_select(e){e.type==="folder"&&(this.expanded.has(e.id)?this.expanded.delete(e.id):this.expanded.add(e.id)),this.selectedId=e.id,this.render(),this._emit("poa-tmpl-select",{node:e})}_commitEdit(e,t){t.trim()&&this.mgr.rename(e,t.trim()),this.editingId=null,this.render()}_showCtx(e,t,n){this._hideCtx();const o=document.createElement("div");o.className="ctx-menu",o.style.left=`${t}px`,o.style.top=`${n}px`;const s=document.createElement("button");s.textContent="이름 변경",s.addEventListener("click",()=>{this._hideCtx(),this.editingId=e.id,this.render()});const a=document.createElement("button");a.textContent="삭제",a.className="danger",a.addEventListener("click",()=>{this._hideCtx(),this.mgr.delete(e.id),this.expanded.delete(e.id),this.selectedId===e.id&&(this.selectedId=null),this.render(),this._emit("poa-tmpl-delete",{id:e.id})}),o.appendChild(s),o.appendChild(a),this.shadow.appendChild(o),this.ctxMenu=o,setTimeout(()=>document.addEventListener("click",()=>this._hideCtx(),{once:!0}),0)}_hideCtx(){var e;(e=this.ctxMenu)==null||e.remove(),this.ctxMenu=null}_emit(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}}const $r=`
*, *::before, *::after { box-sizing: border-box; }
:host { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
:host([open]) { display: flex; background: rgba(0,0,0,.45); }

.dlg {
  position: relative; background: #fff; border-radius: 12px;
  width: min(820px, 95vw); height: min(600px, 90vh);
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.28); overflow: hidden;
}
.hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;
}
.hdr h3 { margin: 0; font-size: 16px; font-weight: 700; color: #111827; }
.x-btn {
  background: none; border: none; font-size: 22px; cursor: pointer;
  color: #9ca3af; padding: 0 4px; border-radius: 4px; line-height: 1;
}
.x-btn:hover { color: #374151; background: #f3f4f6; }

.body { display: flex; flex: 1; overflow: hidden; }

/* 좌측 트리 패널 */
.left {
  width: 220px; flex-shrink: 0; border-right: 1px solid #f3f4f6;
  display: flex; flex-direction: column; overflow: hidden;
}
.tree-wrap { flex: 1; overflow-y: auto; }
.left-btns {
  padding: 8px; border-top: 1px solid #f3f4f6;
  display: flex; flex-direction: column; gap: 4px; flex-shrink: 0;
}
.left-btn {
  width: 100%; padding: 6px 10px; border: 1px solid #e5e7eb; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 12px; color: #374151; text-align: left;
}
.left-btn:hover { background: #f9fafb; }

/* 우측 미리보기 패널 */
.right {
  flex: 1; display: flex; flex-direction: column;
  padding: 16px; overflow: hidden; min-width: 0;
}
.preview-label {
  font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase;
  letter-spacing: .06em; margin-bottom: 8px; flex-shrink: 0;
}
.preview-empty {
  flex: 1; border: 1.5px dashed #e5e7eb; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: #d1d5db; text-align: center;
}
.preview-frame {
  flex: 1; border: 1px solid #e5e7eb; border-radius: 8px;
  background: #fff; min-height: 0;
}
.apply-btns { display: flex; gap: 8px; margin-top: 12px; flex-shrink: 0; }
.btn-append {
  flex: 1; padding: 8px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 13px; color: #374151; font-weight: 500;
}
.btn-append:hover { background: #f9fafb; }
.btn-replace {
  flex: 1; padding: 8px; border: none; border-radius: 8px;
  background: #2563eb; cursor: pointer; font-size: 13px; color: #fff; font-weight: 600;
}
.btn-replace:hover { background: #1d4ed8; }
.btn-append:disabled, .btn-replace:disabled { opacity: .4; cursor: default; pointer-events: none; }

/* 저장 오버레이 */
.save-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 100; border-radius: 12px;
}
.save-box {
  background: #fff; border-radius: 12px; padding: 24px; width: min(360px, 90%);
  box-shadow: 0 8px 24px rgba(0,0,0,.2);
}
.save-box h4 { margin: 0 0 16px; font-size: 15px; font-weight: 700; color: #111827; }
.save-field { margin-bottom: 12px; }
.save-field > label { display: block; font-size: 12px; font-weight: 600; color: #6b7280; margin-bottom: 4px; }
.save-field input[type=text], .save-field select {
  width: 100%; padding: 8px 10px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  font-size: 14px; outline: none; font-family: inherit;
}
.save-field input[type=text]:focus, .save-field select:focus { border-color: #2563eb; }
.save-chk { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151; cursor: pointer; }
.save-chk input { accent-color: #2563eb; }
.save-btns { display: flex; gap: 8px; margin-top: 16px; justify-content: flex-end; }
.save-cancel {
  padding: 7px 18px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 14px; color: #374151;
}
.save-ok {
  padding: 7px 18px; border: none; border-radius: 8px;
  background: #2563eb; cursor: pointer; font-size: 14px; color: #fff; font-weight: 600;
}
.save-ok:hover { background: #1d4ed8; }
.hidden { display: none !important; }
`,zr=`
<div class="dlg">
  <div class="hdr">
    <h3>템플릿</h3>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>
  <div class="body">
    <div class="left">
      <div class="tree-wrap"><poa-template-tree></poa-template-tree></div>
      <div class="left-btns">
        <button class="left-btn" id="btn-add-folder">📁 폴더 추가</button>
        <button class="left-btn" id="btn-save-tmpl">💾 템플릿 저장</button>
      </div>
    </div>
    <div class="right">
      <div class="preview-label">미리보기</div>
      <div class="preview-empty" id="preview-empty">템플릿을 선택하면<br>미리보기가 표시됩니다</div>
      <iframe class="preview-frame hidden" id="preview-frame"
              sandbox="allow-same-origin" frameborder="0"></iframe>
      <div class="apply-btns">
        <button class="btn-append"  id="btn-append"  disabled>현재 내용에 추가</button>
        <button class="btn-replace" id="btn-replace" disabled>내용 교체하여 적용</button>
      </div>
    </div>
  </div>

  <!-- 저장 오버레이 -->
  <div class="save-overlay hidden" id="save-overlay">
    <div class="save-box">
      <h4>현재 내용을 템플릿으로 저장</h4>
      <div class="save-field">
        <label>템플릿 이름</label>
        <input type="text" id="save-name" placeholder="이름을 입력하세요">
      </div>
      <div class="save-field">
        <label>저장 위치</label>
        <select id="save-folder"></select>
      </div>
      <div class="save-field">
        <label class="save-chk">
          <input type="checkbox" id="save-public"> 공용으로 공유
        </label>
      </div>
      <div class="save-btns">
        <button class="save-cancel" id="save-cancel">취소</button>
        <button class="save-ok"     id="save-ok">저장</button>
      </div>
    </div>
  </div>
</div>
`;class Nr extends HTMLElement{constructor(){super(...arguments);c(this,"shadow");c(this,"mgr");c(this,"tree");c(this,"selected",null);c(this,"_getEditorHTML",null)}connectedCallback(){this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`<style>${$r}</style>${zr}`,this.mgr=new Rr,this.tree=this.shadow.querySelector("poa-template-tree"),this.tree.setManager(this.mgr),this._bind()}setup(e){this._getEditorHTML=e}open(){this.selected=null,this._refreshPreview(),this._fillFolderSelect(),this.tree.render(),this.setAttribute("open","")}close(){this.removeAttribute("open")}_bind(){this.shadow.querySelector(".x-btn").addEventListener("click",()=>this.close()),this.addEventListener("click",e=>{e.composedPath()[0]===this&&this.close()}),this.shadow.getElementById("btn-add-folder").addEventListener("click",()=>{const e=this.tree.getSelected(),t=(e==null?void 0:e.type)==="folder"?e.id:null;this.tree.addFolder(t)}),this.shadow.getElementById("btn-save-tmpl").addEventListener("click",()=>{this._fillFolderSelect(),this.shadow.getElementById("save-name").value="",this.shadow.getElementById("save-overlay").classList.remove("hidden"),setTimeout(()=>this.shadow.getElementById("save-name").focus(),50)}),this.shadow.getElementById("save-cancel").addEventListener("click",()=>{this.shadow.getElementById("save-overlay").classList.add("hidden")}),this.shadow.getElementById("save-ok").addEventListener("click",()=>this._doSave()),this.shadow.getElementById("save-name").addEventListener("keydown",e=>{e.key==="Enter"&&this._doSave()}),this.shadow.getElementById("btn-append").addEventListener("click",()=>this._apply("append")),this.shadow.getElementById("btn-replace").addEventListener("click",()=>this._apply("replace")),this.shadow.addEventListener("poa-tmpl-select",e=>{const{node:t}=e.detail;this.selected=t.type==="template"?t:null,this._refreshPreview()}),this.shadow.addEventListener("poa-tmpl-dblclick",e=>{const{node:t}=e.detail;this.selected=t,this._apply("replace")})}_refreshPreview(){const e=this.shadow.getElementById("preview-frame"),t=this.shadow.getElementById("preview-empty"),n=this.shadow.getElementById("btn-append"),o=this.shadow.getElementById("btn-replace");if(!this.selected||this.selected.type!=="template"){e.classList.add("hidden"),t.classList.remove("hidden"),n.disabled=!0,o.disabled=!0;return}const s=String(te.sanitize(this.selected.content??"",{USE_PROFILES:{html:!0}}));e.srcdoc=`<!doctype html><html><head><style>
       body{font-family:'맑은 고딕','Malgun Gothic',sans-serif;font-size:14px;
            padding:12px;margin:0;color:#222;line-height:1.6;}
       h1,h2,h3{margin:.5em 0;}p{margin:.4em 0;}
       ul,ol{margin:.4em 0;padding-left:1.5em;}hr{border:none;border-top:1px solid #e5e7eb;}
       </style></head><body>${s}</body></html>`,e.classList.remove("hidden"),t.classList.add("hidden"),n.disabled=!1,o.disabled=!1}_apply(e){var n;if(!((n=this.selected)!=null&&n.content))return;const t=String(te.sanitize(this.selected.content,{USE_PROFILES:{html:!0}}));this.dispatchEvent(new CustomEvent("poa-tmpl-insert",{bubbles:!0,composed:!0,detail:{html:t,mode:e}})),e==="append"&&this.close()}_doSave(){var s;const e=this.shadow.getElementById("save-name").value.trim();if(!e){this.shadow.getElementById("save-name").focus();return}const t=this.shadow.getElementById("save-folder").value||null,n=this.shadow.getElementById("save-public").checked,o=((s=this._getEditorHTML)==null?void 0:s.call(this))??"";this.mgr.addTemplate(e,o,t,n),this.tree.render(),this.shadow.getElementById("save-overlay").classList.add("hidden")}_fillFolderSelect(){const e=this.shadow.getElementById("save-folder");e.innerHTML="";const t=this.mgr.getFolders().find(n=>!n.isPublic);for(const n of this.mgr.getFolders()){const o=document.createElement("option");o.value=n.id,o.textContent=n.name,n===t&&(o.selected=!0),e.appendChild(o)}}}const Pr=200*1024,mn="poa-signatures",Wt=10;function Or(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`}function ae(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function dt(l){const{layout:i,fields:e,logo:t,headerColor:n="#2563eb"}=l,o=e.displayName?`<strong style="font-size:15px;color:#111;">${ae(e.displayName)}</strong>`:"",s=[e.title,e.department].filter(Boolean).map(ae).join(" | "),a=e.company?`<span style="color:#555;">${ae(e.company)}</span>`:"",r=e.phone?`<span style="color:#888;font-size:12px;">T.</span>&nbsp;${ae(e.phone)}`:"",d=e.email?`<span style="color:#888;font-size:12px;">E.</span>&nbsp;${ae(e.email)}`:"",p=e.website?`<span style="color:#888;font-size:12px;">W.</span>&nbsp;${ae(e.website)}`:"",h=[s?`<span style="color:#555;">${s}</span>`:"",a,r,d,p].filter(Boolean),g=t?`<img src="${ae(t)}" alt="" style="max-width:80px;max-height:60px;display:block;">`:"",f="font-size:14px;line-height:1.6;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;",m=()=>[o,...h].filter(Boolean).join("<br>");switch(i){case 1:return`<table class="poa-signature" style="${f}"><tbody><tr><td style="padding:8px 0;vertical-align:top;">${m()}</td></tr></tbody></table>`;case 2:return t?`<table class="poa-signature" style="${f}"><tbody><tr><td style="padding:0 14px 0 0;vertical-align:middle;border-right:2px solid #e5e7eb;">${g}</td><td style="padding:0 0 0 14px;vertical-align:middle;">${m()}</td></tr></tbody></table>`:dt({...l,layout:1});case 3:return t?`<table class="poa-signature" style="${f}"><tbody><tr><td style="text-align:center;padding-bottom:6px;">${g}</td></tr><tr><td style="padding:4px 0;">${m()}</td></tr></tbody></table>`:dt({...l,layout:1});case 4:return`<table class="poa-signature" style="${f}"><tbody><tr><td style="padding:8px 0;vertical-align:top;">${o?o+"<br>":""}<hr style="border:none;border-top:1px solid #aaa;margin:4px 0;">${h.join("<br>")}</td></tr></tbody></table>`;case 5:{const b=[o,e.department?`<span style="color:#555;">${ae(e.department)}</span>`:""].filter(Boolean).join("<br>"),w=[e.title?`<span style="color:#555;">${ae(e.title)}</span>`:"",a].filter(Boolean).join("<br>"),v=[r,d].filter(Boolean).join("&nbsp;|&nbsp;");return`<table class="poa-signature" style="${f}"><tbody><tr><td style="padding:4px 14px 4px 0;border-right:1px solid #ddd;vertical-align:top;">${b||"&nbsp;"}</td><td style="padding:4px 0 4px 14px;vertical-align:top;">${w||"&nbsp;"}</td></tr>`+(v?`<tr><td colspan="2" style="padding:6px 0 4px;border-top:1px solid #eee;font-size:13px;">${v}</td></tr>`:"")+"</tbody></table>"}case 6:{const b=[e.displayName?`<strong style="color:#fff;">${ae(e.displayName)}</strong>`:"",e.title?`<span style="color:rgba(255,255,255,.85);">${ae(e.title)}</span>`:""].filter(Boolean).join("&nbsp;&nbsp;"),w=[e.department?`<span style="color:#555;">${ae(e.department)}</span>`:"",a,r,d,p].filter(Boolean);return`<table class="poa-signature" style="${f}border:1px solid ${ae(n)};"><tbody><tr><td style="background:${ae(n)};padding:8px 16px;">${b||"&nbsp;"}</td></tr><tr><td style="padding:8px 16px;">${w.join("<br>")||"&nbsp;"}</td></tr></tbody></table>`}default:return""}}class bn{constructor(){c(this,"sigs",[]);this._load()}_load(){try{const i=localStorage.getItem(mn);this.sigs=i?JSON.parse(i):[]}catch{this.sigs=[]}}_persist(){try{localStorage.setItem(mn,JSON.stringify(this.sigs))}catch{}}getAll(){return[...this.sigs]}getById(i){return this.sigs.find(e=>e.id===i)??null}add(i){if(this.sigs.length>=Wt)throw new Error(`최대 ${Wt}개까지 저장할 수 있습니다.`);const e={...i,id:Or(),createdAt:Date.now(),updatedAt:Date.now()};return this.sigs.push(e),this._persist(),e}update(i,e){const t=this.sigs.find(n=>n.id===i);return t?(Object.assign(t,e,{updatedAt:Date.now()}),this._persist(),!0):!1}delete(i){const e=this.sigs.findIndex(t=>t.id===i);return e<0?!1:(this.sigs.splice(e,1),this._persist(),!0)}isFull(){return this.sigs.length>=Wt}}const jr={1:"기본형",2:"로고(좌)",3:"로고(상)",4:"구분선형",5:"2단형",6:"컬러헤더"},Wr=`
*, *::before, *::after { box-sizing: border-box; }
:host { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
:host([open]) { display: flex; background: rgba(0,0,0,.45); }

.dlg {
  position: relative; background: #fff; border-radius: 12px;
  width: min(880px, 96vw); height: min(680px, 92vh);
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.28); overflow: hidden;
}
.hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;
}
.hdr h3 { margin: 0; font-size: 16px; font-weight: 700; color: #111827; }
.x-btn {
  background: none; border: none; font-size: 22px; cursor: pointer;
  color: #9ca3af; padding: 0 4px; border-radius: 4px; line-height: 1;
}
.x-btn:hover { color: #374151; background: #f3f4f6; }

.body { display: flex; flex: 1; overflow: hidden; }

.left {
  width: 200px; flex-shrink: 0; border-right: 1px solid #f3f4f6;
  display: flex; flex-direction: column; overflow: hidden;
}
.sig-list { flex: 1; overflow-y: auto; padding: 6px 0; }
.sig-item {
  padding: 8px 12px; cursor: pointer; font-size: 13px; color: #374151;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  border-radius: 4px; margin: 0 6px 2px;
}
.sig-item:hover   { background: #f3f4f6; }
.sig-item.selected { background: #eff6ff; color: #2563eb; font-weight: 600; }
.left-btns { padding: 8px; border-top: 1px solid #f3f4f6; display: flex; flex-direction: column; gap: 4px; }
.left-btn {
  width: 100%; padding: 6px 10px; border: 1px solid #e5e7eb; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 12px; color: #374151; text-align: left;
}
.left-btn:hover { background: #f9fafb; }
.left-btn.danger { color: #ef4444; border-color: #fecaca; }
.left-btn.danger:hover { background: #fee2e2; }

.right { flex: 1; display: flex; flex-direction: column; overflow-y: auto; padding: 14px 16px; gap: 12px; min-width: 0; }

.section-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; }

.layout-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.layout-card {
  border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 8px 4px;
  cursor: pointer; text-align: center; font-size: 11px; color: #6b7280;
  background: #fff; user-select: none;
}
.layout-card:hover  { border-color: #9ca3af; }
.layout-card.active { border-color: #2563eb; background: #eff6ff; color: #2563eb; font-weight: 600; }
.layout-num { font-size: 16px; font-weight: 700; display: block; margin-bottom: 2px; }

.color-row { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #374151; }
.color-row input[type=color] { width: 40px; height: 26px; border: 1px solid #e5e7eb; border-radius: 4px; padding: 2px; cursor: pointer; }

.fields { display: flex; flex-direction: column; gap: 6px; }
.field-row { display: flex; align-items: center; gap: 8px; }
.field-row label { width: 62px; font-size: 12px; color: #6b7280; flex-shrink: 0; text-align: right; }
.field-row input {
  flex: 1; padding: 6px 8px; border: 1.5px solid #e5e7eb; border-radius: 6px;
  font-size: 13px; outline: none; font-family: inherit; min-width: 0;
}
.field-row input:focus { border-color: #2563eb; }

.logo-area { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.logo-btn {
  padding: 5px 12px; border: 1px solid #e5e7eb; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 12px; color: #374151;
}
.logo-btn:hover { background: #f9fafb; }
.logo-hint { font-size: 11px; color: #9ca3af; flex-basis: 100%; }
.logo-error { font-size: 11px; color: #ef4444; flex-basis: 100%; }
.logo-preview img { max-width: 80px; max-height: 60px; border: 1px solid #e5e7eb; border-radius: 4px; margin-top: 4px; }

.preview-box {
  border: 1px solid #e5e7eb; border-radius: 8px;
  padding: 12px; background: #fafafa; min-height: 80px; font-size: 14px;
}
.preview-empty { color: #d1d5db; font-size: 13px; text-align: center; padding: 20px 0; }

.action-row { display: flex; gap: 8px; padding-top: 4px; flex-shrink: 0; }
.btn-save {
  flex: 1; padding: 8px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 13px; color: #374151; font-weight: 500;
}
.btn-save:hover { background: #f9fafb; }
.btn-insert {
  flex: 1; padding: 8px; border: none; border-radius: 8px;
  background: #2563eb; cursor: pointer; font-size: 13px; color: #fff; font-weight: 600;
}
.btn-insert:hover { background: #1d4ed8; }
.hidden { display: none !important; }
`,Ur=`
<div class="dlg">
  <div class="hdr">
    <h3>서명 템플릿</h3>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>
  <div class="body">
    <div class="left">
      <div class="sig-list" id="sig-list"></div>
      <div class="left-btns">
        <button class="left-btn" id="btn-new">+ 새 서명</button>
        <button class="left-btn danger" id="btn-delete">삭제</button>
      </div>
    </div>
    <div class="right">
      <div class="section-label">레이아웃 선택</div>
      <div class="layout-grid" id="layout-grid"></div>

      <div class="color-row hidden" id="color-row">
        <label>헤더 색상</label>
        <input type="color" id="f-hdr-color" value="#2563eb">
      </div>

      <div class="section-label">입력 정보</div>
      <div class="fields">
        <div class="field-row"><label>서명 이름</label><input type="text" id="f-signame" placeholder="서명 이름 (필수)"></div>
        <div class="field-row"><label>이름</label>    <input type="text" id="f-name"></div>
        <div class="field-row"><label>직책</label>    <input type="text" id="f-title"></div>
        <div class="field-row"><label>부서</label>    <input type="text" id="f-dept"></div>
        <div class="field-row"><label>회사</label>    <input type="text" id="f-company"></div>
        <div class="field-row"><label>전화</label>    <input type="text" id="f-phone"></div>
        <div class="field-row"><label>이메일</label>  <input type="text" id="f-email"></div>
        <div class="field-row"><label>웹사이트</label><input type="text" id="f-website"></div>
      </div>

      <div class="section-label">로고 이미지</div>
      <div class="logo-area">
        <button class="logo-btn" id="btn-logo">이미지 업로드</button>
        <button class="logo-btn" id="btn-logo-rm">제거</button>
        <input type="file" id="logo-input" accept="image/png,image/svg+xml,image/jpeg" style="display:none;">
        <div class="logo-hint">PNG / SVG / JPG, 최대 200KB</div>
        <div class="logo-error hidden" id="logo-error"></div>
        <div class="logo-preview hidden" id="logo-preview"></div>
      </div>

      <div class="section-label">미리보기</div>
      <div class="preview-box" id="preview-box">
        <div class="preview-empty">정보를 입력하면 미리보기가 표시됩니다</div>
      </div>

      <div class="action-row">
        <button class="btn-save"   id="btn-save">저장</button>
        <button class="btn-insert" id="btn-insert">에디터에 삽입</button>
      </div>
    </div>
  </div>
</div>
`;class qr extends HTMLElement{constructor(){super(...arguments);c(this,"shadow");c(this,"mgr");c(this,"selectedId",null);c(this,"currentLayout",1);c(this,"currentLogo");c(this,"currentHeaderColor","#2563eb")}connectedCallback(){this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`<style>${Wr}</style>${Ur}`,this.mgr=new bn,this._buildLayoutGrid(),this._bind()}open(){this.mgr=new bn,this._renderList();const e=this.mgr.getAll();e.length>0?this._loadSignature(e[0].id):this._newSignature(),this.setAttribute("open","")}close(){this.removeAttribute("open")}_buildLayoutGrid(){const e=this.shadow.getElementById("layout-grid");e.innerHTML="",[1,2,3,4,5,6].forEach(t=>{const n=document.createElement("button");n.className=`layout-card${t===this.currentLayout?" active":""}`,n.dataset.layout=String(t),n.innerHTML=`<span class="layout-num">${t}</span>${jr[t]}`,n.addEventListener("click",()=>this._setLayout(t)),e.appendChild(n)})}_bind(){this.shadow.querySelector(".x-btn").addEventListener("click",()=>this.close()),this.addEventListener("click",t=>{t.composedPath()[0]===this&&this.close()}),this.shadow.getElementById("btn-new").addEventListener("click",()=>this._newSignature()),this.shadow.getElementById("btn-delete").addEventListener("click",()=>{if(!this.selectedId)return;this.mgr.delete(this.selectedId),this.selectedId=null,this._renderList();const t=this.mgr.getAll();t.length>0?this._loadSignature(t[0].id):this._newSignature()}),this.shadow.getElementById("f-hdr-color").addEventListener("input",t=>{this.currentHeaderColor=t.target.value,this._refreshPreview()});const e=["f-name","f-title","f-dept","f-company","f-phone","f-email","f-website","f-signame"];for(const t of e)this.shadow.getElementById(t).addEventListener("input",()=>this._refreshPreview());this.shadow.getElementById("btn-logo").addEventListener("click",()=>{this.shadow.getElementById("logo-input").click()}),this.shadow.getElementById("btn-logo-rm").addEventListener("click",()=>{this.currentLogo=void 0,this.shadow.getElementById("logo-preview").classList.add("hidden"),this.shadow.getElementById("logo-preview").innerHTML="",this._refreshPreview()}),this.shadow.getElementById("logo-input").addEventListener("change",t=>{var o;const n=(o=t.target.files)==null?void 0:o[0];n&&this._handleLogoUpload(n)}),this.shadow.getElementById("btn-save").addEventListener("click",()=>this._doSave()),this.shadow.getElementById("btn-insert").addEventListener("click",()=>this._doInsert())}_renderList(){const e=this.shadow.getElementById("sig-list");e.innerHTML="";for(const t of this.mgr.getAll()){const n=document.createElement("div");n.className=`sig-item${t.id===this.selectedId?" selected":""}`,n.textContent=t.name||"(이름 없음)",n.dataset.id=t.id,n.addEventListener("click",()=>this._loadSignature(t.id)),e.appendChild(n)}}_loadSignature(e){const t=this.mgr.getById(e);t&&(this.selectedId=e,this.currentLayout=t.layout,this.currentLogo=t.logo,this.currentHeaderColor=t.headerColor??"#2563eb",this._val("f-signame",t.name),this._val("f-name",t.fields.displayName),this._val("f-title",t.fields.title),this._val("f-dept",t.fields.department),this._val("f-company",t.fields.company),this._val("f-phone",t.fields.phone),this._val("f-email",t.fields.email),this._val("f-website",t.fields.website),this.shadow.getElementById("f-hdr-color").value=this.currentHeaderColor,this._syncLayoutCards(),this._syncColorRow(),this._syncLogoPreview(),this._renderList(),this._refreshPreview())}_newSignature(){this.selectedId=null,this.currentLayout=1,this.currentLogo=void 0,this.currentHeaderColor="#2563eb",["f-signame","f-name","f-title","f-dept","f-company","f-phone","f-email","f-website"].forEach(e=>this._val(e,"")),this.shadow.getElementById("f-hdr-color").value="#2563eb",this._syncLayoutCards(),this._syncColorRow(),this.shadow.getElementById("logo-preview").classList.add("hidden"),this.shadow.getElementById("logo-preview").innerHTML="",this._renderList(),this._refreshPreview(),setTimeout(()=>this.shadow.getElementById("f-signame").focus(),50)}_setLayout(e){this.currentLayout=e,this._syncLayoutCards(),this._syncColorRow(),this._refreshPreview()}_syncLayoutCards(){this.shadow.querySelectorAll(".layout-card").forEach(e=>{e.classList.toggle("active",e.dataset.layout===String(this.currentLayout))})}_syncColorRow(){this.shadow.getElementById("color-row").classList.toggle("hidden",this.currentLayout!==6)}_refreshPreview(){const e=dt({layout:this.currentLayout,fields:this._collectFields(),logo:this.currentLogo,headerColor:this.currentHeaderColor}),t=te.sanitize(e,{FORCE_BODY:!1,ADD_DATA_URI_TAGS:["img"],ALLOWED_TAGS:["table","tbody","tr","td","strong","span","img","hr","br"],ALLOWED_ATTR:["style","class","alt","src","colspan"]}),n=this.shadow.getElementById("preview-box");n.innerHTML=t||'<div class="preview-empty">정보를 입력하면 미리보기가 표시됩니다</div>'}_handleLogoUpload(e){const t=this.shadow.getElementById("logo-error");if(e.size>Pr){t.textContent=`파일 크기가 200KB를 초과합니다. (${Math.round(e.size/1024)}KB)`,t.classList.remove("hidden");return}t.classList.add("hidden");const n=new FileReader;n.onload=()=>{this.currentLogo=n.result,this._syncLogoPreview(),this._refreshPreview()},n.readAsDataURL(e)}_syncLogoPreview(){const e=this.shadow.getElementById("logo-preview");this.currentLogo?(e.innerHTML=`<img src="${this.currentLogo}" alt="로고 미리보기">`,e.classList.remove("hidden")):(e.innerHTML="",e.classList.add("hidden"))}_doSave(){const e=this.shadow.getElementById("f-signame").value.trim();if(!e){this.shadow.getElementById("f-signame").focus();return}const t={name:e,layout:this.currentLayout,fields:this._collectFields(),logo:this.currentLogo,headerColor:this.currentHeaderColor};try{if(this.selectedId)this.mgr.update(this.selectedId,t);else{const n=this.mgr.add(t);this.selectedId=n.id}this._renderList()}catch(n){const o=this.shadow.getElementById("logo-error");o.textContent=n.message,o.classList.remove("hidden")}}_doInsert(){const e=dt({layout:this.currentLayout,fields:this._collectFields(),logo:this.currentLogo,headerColor:this.currentHeaderColor});e&&(this.dispatchEvent(new CustomEvent("poa-signature-insert",{bubbles:!0,composed:!0,detail:{html:e}})),this.close())}_val(e,t){this.shadow.getElementById(e).value=t}_collectFields(){return{displayName:this.shadow.getElementById("f-name").value.trim(),title:this.shadow.getElementById("f-title").value.trim(),department:this.shadow.getElementById("f-dept").value.trim(),company:this.shadow.getElementById("f-company").value.trim(),phone:this.shadow.getElementById("f-phone").value.trim(),email:this.shadow.getElementById("f-email").value.trim(),website:this.shadow.getElementById("f-website").value.trim()}}}const Vr=`
*, *::before, *::after { box-sizing: border-box; }
:host { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
:host([open]) { display: flex; background: rgba(0,0,0,.45); }

.dlg {
  background: #fff; border-radius: 12px;
  width: min(480px, 96vw); height: min(480px, 88vh);
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.28); overflow: hidden;
}
.hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;
}
.hdr h3 { margin: 0; font-size: 15px; font-weight: 700; color: #111827; }
.x-btn {
  background: none; border: none; font-size: 20px; cursor: pointer;
  color: #9ca3af; padding: 0 4px; border-radius: 4px; line-height: 1;
}
.x-btn:hover { color: #374151; background: #f3f4f6; }

.search-wrap { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0; }
.search-input {
  width: 100%; padding: 7px 10px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  font-size: 13px; outline: none; font-family: inherit;
}
.search-input:focus { border-color: #2563eb; }

.body { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

.emoji-area { flex: 1; overflow-y: auto; padding: 6px 8px; }

.section-label {
  font-size: 10px; font-weight: 600; color: #9ca3af; text-transform: uppercase;
  letter-spacing: .06em; padding: 4px 4px 2px; position: sticky; top: 0;
  background: #fff; z-index: 1;
}
.emoji-grid {
  display: flex; flex-wrap: wrap; gap: 1px;
}
.emoji-btn {
  width: 36px; height: 36px; border: none; background: none; cursor: pointer;
  font-size: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
  line-height: 1; padding: 0;
}
.emoji-btn:hover { background: #f3f4f6; }
.divider { border: none; border-top: 1px solid #f3f4f6; margin: 4px 0; flex-basis: 100%; }

.no-result { padding: 24px; text-align: center; color: #9ca3af; font-size: 13px; }

.cat-bar {
  display: flex; align-items: center; gap: 2px;
  padding: 6px 8px; border-top: 1px solid #f3f4f6;
  flex-shrink: 0; flex-wrap: wrap;
}
.cat-btn {
  width: 32px; height: 32px; border: none; background: none; cursor: pointer;
  font-size: 18px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
}
.cat-btn:hover   { background: #f3f4f6; }
.cat-btn.active  { background: #eff6ff; outline: 1.5px solid #2563eb; }
`;class Gr extends HTMLElement{constructor(){super(...arguments);c(this,"shadow");c(this,"inserter",new Dn);c(this,"activeCatId",Pt[0].id)}connectedCallback(){this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`<style>${Vr}</style>
<div class="dlg">
  <div class="hdr"><h3>이모지</h3><button class="x-btn" aria-label="닫기">✕</button></div>
  <div class="search-wrap"><input class="search-input" id="search" type="text" placeholder="🔍 이모지 검색…"></div>
  <div class="body">
    <div class="emoji-area" id="emoji-area"></div>
    <div class="cat-bar" id="cat-bar"></div>
  </div>
</div>`,this._buildCatBar(),this._bind()}open(){this._renderCategory(this.activeCatId),this.setAttribute("open",""),setTimeout(()=>this.shadow.getElementById("search").focus(),50)}close(){this.removeAttribute("open")}_buildCatBar(){const e=this.shadow.getElementById("cat-bar");e.innerHTML="";for(const t of Pt){const n=document.createElement("button");n.className=`cat-btn${t.id===this.activeCatId?" active":""}`,n.title=t.label,n.textContent=t.icon,n.dataset.catId=t.id,n.addEventListener("click",()=>{this.activeCatId=t.id,this._syncCatBar(),this._renderCategory(t.id),this.shadow.getElementById("search").value=""}),e.appendChild(n)}}_syncCatBar(){this.shadow.querySelectorAll(".cat-btn").forEach(e=>{e.classList.toggle("active",e.dataset.catId===this.activeCatId)})}_renderCategory(e){const t=this.shadow.getElementById("emoji-area");t.innerHTML="";const n=this.inserter.getRecent();if(n.length>0){this._appendSection(t,"최근 사용",n);const s=document.createElement("hr");s.className="divider",t.appendChild(s)}const o=Pt.find(s=>s.id===e);o&&this._appendSection(t,o.label,o.emojis)}_renderSearch(e){const t=this.shadow.getElementById("emoji-area");t.innerHTML="";const n=fr(e);if(n.length===0){const o=document.createElement("div");o.className="no-result",o.textContent=`"${e}"에 대한 결과가 없습니다`,t.appendChild(o)}else this._appendSection(t,`검색 결과 (${n.length})`,n)}_appendSection(e,t,n){const o=document.createElement("div");o.className="section-label",o.textContent=t,e.appendChild(o);const s=document.createElement("div");s.className="emoji-grid";for(const a of n){const r=document.createElement("button");r.className="emoji-btn",r.textContent=a,r.title=a,r.addEventListener("click",()=>this._pickEmoji(a)),s.appendChild(r)}e.appendChild(s)}_bind(){this.shadow.querySelector(".x-btn").addEventListener("click",()=>this.close()),this.addEventListener("click",t=>{t.composedPath()[0]===this&&this.close()});const e=this.shadow.getElementById("search");e.addEventListener("input",()=>{const t=e.value.trim();t?this._renderSearch(t):this._renderCategory(this.activeCatId)}),e.addEventListener("keydown",t=>{t.key==="Escape"&&(t.stopPropagation(),this.close())})}_pickEmoji(e){this.dispatchEvent(new CustomEvent("poa-emoji-insert",{bubbles:!0,composed:!0,detail:{emoji:e}})),this.shadow.getElementById("search").value.trim()||this._renderCategory(this.activeCatId)}}const Yr=`
*, *::before, *::after { box-sizing: border-box; }
:host { display: none; position: fixed; inset: 0; z-index: 9999; align-items: center; justify-content: center; }
:host([open]) { display: flex; background: rgba(0,0,0,.45); }

.dlg {
  background: #fff; border-radius: 12px;
  width: min(480px, 96vw); max-height: min(560px, 90vh);
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.28); overflow: hidden;
}
.hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-bottom: 1px solid #f3f4f6; flex-shrink: 0;
}
.hdr h3 { margin: 0; font-size: 15px; font-weight: 700; color: #111827; }
.x-btn {
  background: none; border: none; font-size: 20px; cursor: pointer;
  color: #9ca3af; padding: 0 4px; border-radius: 4px; line-height: 1;
}
.x-btn:hover { color: #374151; background: #f3f4f6; }

.body { flex: 1; overflow-y: auto; padding: 16px 20px; display: flex; flex-direction: column; gap: 12px; }

.anchor-box {
  background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;
  padding: 10px 12px; font-size: 13px; color: #374151;
}
.anchor-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }

.field-label { font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px; }
.field-input {
  width: 100%; padding: 8px 10px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  font-size: 13px; outline: none; font-family: inherit; resize: vertical;
}
.field-input:focus { border-color: #2563eb; }

.preview-label { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: .06em; }
.preview-tip {
  display: inline-block; background: #1F2937; color: #fff;
  border-radius: 6px; padding: 8px 12px; font-size: 13px; max-width: 240px;
  line-height: 1.5;
}
.preview-tip-title { font-weight: 500; margin-bottom: 4px; }
.preview-tip-body  { color: #D1D5DB; }

.footer { display: flex; gap: 8px; padding: 12px 20px; border-top: 1px solid #f3f4f6; flex-shrink: 0; justify-content: flex-end; }
.btn-cancel {
  padding: 8px 20px; border: 1.5px solid #e5e7eb; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 13px; color: #374151;
}
.btn-ok {
  padding: 8px 20px; border: none; border-radius: 8px;
  background: #2563eb; cursor: pointer; font-size: 13px; color: #fff; font-weight: 600;
}
.btn-ok:hover { background: #1d4ed8; }

/* 목록 모드 */
.list-summary { font-size: 13px; color: #6b7280; padding-bottom: 4px; }
.list-empty   { text-align: center; color: #d1d5db; font-size: 13px; padding: 24px 0; }
.tt-item {
  border: 1px solid #f3f4f6; border-radius: 8px; padding: 10px 12px;
  display: flex; flex-direction: column; gap: 4px;
}
.tt-anchor { font-size: 13px; font-weight: 600; color: #111827; }
.tt-content { font-size: 12px; color: #6b7280; }
.tt-actions { display: flex; gap: 6px; align-items: center; margin-top: 4px; }
.tt-edit-btn {
  padding: 4px 10px; border: 1px solid #e5e7eb; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 12px; color: #374151;
}
.tt-del-btn {
  padding: 4px 10px; border: 1px solid #fecaca; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 12px; color: #ef4444;
}
.btn-del-all {
  padding: 7px 16px; border: 1px solid #fecaca; border-radius: 8px;
  background: #fff; cursor: pointer; font-size: 13px; color: #ef4444;
}
.hidden { display: none !important; }
`;class Xr extends HTMLElement{constructor(){super(...arguments);c(this,"shadow");c(this,"mode","add");c(this,"editId",null);c(this,"entries",[])}connectedCallback(){this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`<style>${Yr}</style>
<div class="dlg">
  <div class="hdr">
    <h3 id="dlg-title">툴팁 추가</h3>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>

  <!-- 편집 패널 -->
  <div class="body" id="edit-panel">
    <div id="anchor-wrap">
      <div class="anchor-label">선택한 텍스트</div>
      <div class="anchor-box" id="anchor-text"></div>
    </div>
    <div>
      <div class="field-label">툴팁 제목 (선택)</div>
      <input class="field-input" id="f-title" type="text" placeholder="제목을 입력하세요">
    </div>
    <div>
      <div class="field-label">툴팁 내용 *</div>
      <textarea class="field-input" id="f-content" rows="3" placeholder="내용을 입력하세요"></textarea>
    </div>
    <div id="preview-wrap">
      <div class="preview-label">미리보기</div>
      <div class="preview-tip" id="preview-tip">
        <div class="preview-tip-title hidden" id="preview-title"></div>
        <div class="preview-tip-body" id="preview-body"></div>
      </div>
    </div>
  </div>

  <!-- 목록 패널 -->
  <div class="body hidden" id="list-panel">
    <div class="list-summary" id="list-summary"></div>
    <div id="list-items"></div>
  </div>

  <div class="footer" id="edit-footer">
    <button class="btn-cancel" id="btn-cancel">취소</button>
    <button class="btn-ok"     id="btn-ok">추가</button>
  </div>
  <div class="footer hidden" id="list-footer">
    <button class="btn-del-all" id="btn-del-all">전체 삭제</button>
    <button class="btn-cancel"  id="btn-close-list">닫기</button>
  </div>
</div>`,this._bind()}openAdd(e){this.mode="add",this.editId=null,this._val("f-title",""),this._val("f-content",""),this._showEditPanel("툴팁 추가","추가"),this.shadow.getElementById("anchor-wrap").classList.remove("hidden"),this.shadow.getElementById("anchor-text").textContent=`"${e}"`,this._updatePreview(),this.setAttribute("open",""),setTimeout(()=>this.shadow.getElementById("f-title").focus(),50)}openEdit(e){this.mode="edit",this.editId=e.id,this._val("f-title",e.title),this._val("f-content",e.content),this._showEditPanel("툴팁 수정","저장"),this.shadow.getElementById("anchor-wrap").classList.remove("hidden"),this.shadow.getElementById("anchor-text").textContent=`"${e.anchorText}"`,this._updatePreview(),this.setAttribute("open",""),setTimeout(()=>this.shadow.getElementById("f-content").focus(),50)}openList(e){this.mode="list",this.entries=e,this._showListPanel(),this._renderList(),this.setAttribute("open","")}close(){this.removeAttribute("open")}_showEditPanel(e,t){this.shadow.getElementById("dlg-title").textContent=e,this.shadow.getElementById("edit-panel").classList.remove("hidden"),this.shadow.getElementById("list-panel").classList.add("hidden"),this.shadow.getElementById("edit-footer").classList.remove("hidden"),this.shadow.getElementById("list-footer").classList.add("hidden"),this.shadow.getElementById("btn-ok").textContent=t}_showListPanel(){this.shadow.getElementById("dlg-title").textContent="툴팁 목록",this.shadow.getElementById("edit-panel").classList.add("hidden"),this.shadow.getElementById("list-panel").classList.remove("hidden"),this.shadow.getElementById("edit-footer").classList.add("hidden"),this.shadow.getElementById("list-footer").classList.remove("hidden")}_renderList(){const e=this.entries.length;this.shadow.getElementById("list-summary").textContent=`문서 내 툴팁 ${e}개`;const t=this.shadow.getElementById("list-items");if(t.innerHTML="",e===0){const n=document.createElement("div");n.className="list-empty",n.textContent="툴팁이 없습니다",t.appendChild(n);return}for(const n of this.entries){const o=document.createElement("div");o.className="tt-item",o.innerHTML=`<div class="tt-anchor">"${n.anchorText}"</div><div class="tt-content">→ ${n.content}</div><div class="tt-actions"><button class="tt-edit-btn" data-id="${n.id}">수정</button><button class="tt-del-btn"  data-id="${n.id}">삭제</button></div>`,o.querySelector(".tt-edit-btn").addEventListener("click",()=>this.openEdit(n)),o.querySelector(".tt-del-btn").addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poa-tooltip-remove",{bubbles:!0,composed:!0,detail:{id:n.id}})),this.entries=this.entries.filter(s=>s.id!==n.id),this._renderList()}),t.appendChild(o)}}_updatePreview(){const e=this.shadow.getElementById("f-title").value.trim(),t=this.shadow.getElementById("f-content").value.trim(),n=this.shadow.getElementById("preview-title"),o=this.shadow.getElementById("preview-body");n.textContent=e,n.classList.toggle("hidden",!e),o.textContent=t||"내용을 입력하세요"}_bind(){this.shadow.querySelector(".x-btn").addEventListener("click",()=>this.close()),this.addEventListener("click",t=>{t.composedPath()[0]===this&&this.close()}),this.shadow.getElementById("btn-cancel").addEventListener("click",()=>this.close()),this.shadow.getElementById("btn-close-list").addEventListener("click",()=>this.close()),this.shadow.getElementById("btn-del-all").addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poa-tooltip-remove-all",{bubbles:!0,composed:!0})),this.entries=[],this._renderList()}),this.shadow.getElementById("btn-ok").addEventListener("click",()=>this._doOk());const e=()=>this._updatePreview();this.shadow.getElementById("f-title").addEventListener("input",e),this.shadow.getElementById("f-content").addEventListener("input",e),this.shadow.getElementById("f-content").addEventListener("keydown",t=>{(t.ctrlKey||t.metaKey)&&t.key==="Enter"&&this._doOk(),t.key==="Escape"&&(t.stopPropagation(),this.close())})}_doOk(){const e=this.shadow.getElementById("f-title").value.trim(),t=this.shadow.getElementById("f-content").value.trim();if(!t){this.shadow.getElementById("f-content").focus();return}this.mode==="edit"&&this.editId?this.dispatchEvent(new CustomEvent("poa-tooltip-update",{bubbles:!0,composed:!0,detail:{id:this.editId,title:e,content:t}})):this.dispatchEvent(new CustomEvent("poa-tooltip-insert",{bubbles:!0,composed:!0,detail:{title:e,content:t}})),this.close()}_val(e,t){this.shadow.getElementById(e).value=t}}const Kr=`
*, *::before, *::after { box-sizing: border-box; }

:host { display:none; position:fixed; inset:0; z-index:10000; align-items:center; justify-content:center; }
:host([open]) { display:flex; background:rgba(0,0,0,.45); }

.dlg {
  background:#fff; border-radius:12px; width:min(380px,92vw);
  box-shadow:0 8px 32px rgba(0,0,0,.28);
  display:flex; flex-direction:column; overflow:hidden;
}

/* 헤더 */
.hdr {
  display:flex; align-items:center; justify-content:space-between;
  padding:16px 20px 12px; border-bottom:1px solid #f3f4f6;
}
.hdr h3 { margin:0; font-size:15px; font-weight:700; color:#111827; }
.x-btn {
  background:none; border:none; font-size:20px; cursor:pointer;
  color:#9ca3af; line-height:1; padding:0 4px; border-radius:4px;
}
.x-btn:hover { color:#374151; background:#f3f4f6; }

/* 바디 */
.body { padding:18px 20px 4px; }
.field { margin-bottom:16px; }
.field > label {
  display:block; font-size:13px; font-weight:600; color:#374151; margin-bottom:6px;
}
.hint { font-size:11px; color:#9ca3af; margin-top:3px; }

/* 너비 라디오 그룹 */
.w-group { display:flex; flex-direction:column; gap:8px; }
.w-row { display:flex; align-items:center; gap:8px; font-size:13px; color:#374151; }
.w-row input[type=radio] { accent-color:#2563eb; cursor:pointer; flex-shrink:0; }
.w-row input[type=number] {
  width:72px; border:1.5px solid #e5e7eb; border-radius:6px;
  padding:5px 8px; font-size:13px; color:#111827; outline:none;
}
.w-row input[type=number]:focus { border-color:#2563eb; }
.w-row input[type=number]:disabled { background:#f9fafb; color:#aaa; }

/* select */
select {
  width:100%; border:1.5px solid #e5e7eb; border-radius:8px;
  padding:7px 10px; font-size:13px; color:#111827; outline:none;
  background:#fff; cursor:pointer;
}
select:focus { border-color:#2563eb; }

/* text input */
input[type=text] {
  width:100%; border:1.5px solid #e5e7eb; border-radius:8px;
  padding:7px 12px; font-size:13px; color:#111827; outline:none;
}
input[type=text]:focus { border-color:#2563eb; }

/* 체크행 */
.chk-row { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
.chk-row input[type=checkbox] { width:15px; height:15px; accent-color:#2563eb; cursor:pointer; }
.chk-row label { font-size:13px; color:#374151; cursor:pointer; }

/* 푸터 */
.ftr {
  display:flex; justify-content:flex-end; gap:8px;
  padding:14px 20px; border-top:1px solid #f3f4f6;
}
.btn-cancel {
  padding:7px 18px; border:1.5px solid #e5e7eb; border-radius:8px;
  background:#fff; cursor:pointer; font-size:13px; color:#374151; font-weight:500;
}
.btn-cancel:hover { background:#f9fafb; }
.btn-apply {
  padding:7px 22px; border:none; border-radius:8px;
  background:#2563eb; cursor:pointer; font-size:13px; color:#fff; font-weight:600;
}
.btn-apply:hover { background:#1d4ed8; }
`;class Jr extends HTMLElement{constructor(){super(...arguments);c(this,"shadow");c(this,"targetInput",null)}connectedCallback(){this.shadow||(this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`<style>${Kr}</style>${this._tpl()}`,this._bindEvents())}open(e){this.shadow||this.connectedCallback(),this.targetInput=e,this._populate(e),this.setAttribute("open","")}close(){this.removeAttribute("open")}_tpl(){return`<div class="dlg">
  <div class="hdr">
    <h3>입력 요소 속성</h3>
    <button class="x-btn" aria-label="닫기">✕</button>
  </div>
  <div class="body">
    <div class="field">
      <label>너비</label>
      <div class="w-group">
        <label class="w-row">
          <input type="radio" name="w-mode" value="full"> 셀에 맞춤 (100%)
        </label>
        <label class="w-row">
          <input type="radio" name="w-mode" value="px">
          <input type="number" id="w-px" min="40" max="2000" placeholder="200"> px
        </label>
        <label class="w-row">
          <input type="radio" name="w-mode" value="pct">
          <input type="number" id="w-pct" min="10" max="100" placeholder="100"> %
        </label>
      </div>
    </div>

    <div class="field">
      <label>정렬 <span style="font-weight:400;color:#9ca3af">(셀 안 input 위치)</span></label>
      <select id="align">
        <option value="left">왼쪽</option>
        <option value="center">가운데</option>
        <option value="right">오른쪽</option>
      </select>
    </div>

    <div class="field">
      <label>텍스트 정렬</label>
      <select id="text-align">
        <option value="">왼쪽 (기본)</option>
        <option value="center">가운데</option>
        <option value="right">오른쪽</option>
      </select>
    </div>

    <div class="field">
      <label>안내 문구 (placeholder)</label>
      <input type="text" id="placeholder" placeholder="입력창 안에 표시되는 도움말">
    </div>

    <div class="chk-row">
      <input type="checkbox" id="required">
      <label for="required">필수 입력</label>
    </div>
    <div class="chk-row">
      <input type="checkbox" id="disabled">
      <label for="disabled">비활성화</label>
    </div>
  </div>
  <div class="ftr">
    <button class="btn-cancel" id="btn-cancel">취소</button>
    <button class="btn-apply"  id="btn-apply">적용</button>
  </div>
</div>`}_populate(e){const t=this.shadow,n=e.style.width,o=t.querySelectorAll('input[name="w-mode"]'),s=t.getElementById("w-px"),a=t.getElementById("w-pct");!n||n==="100%"?o[0].checked=!0:n.endsWith("px")?(o[1].checked=!0,s.value=parseFloat(n).toString()):n.endsWith("%")?(o[2].checked=!0,a.value=parseFloat(n).toString()):o[0].checked=!0,s.disabled=!o[1].checked,a.disabled=!o[2].checked;const r=e.style.marginLeft,d=e.style.marginRight,p=t.getElementById("align");r==="auto"&&d==="auto"?p.value="center":r==="auto"?p.value="right":p.value="left",t.getElementById("text-align").value=e.style.textAlign||"";const h=t.getElementById("placeholder");h.value=e.placeholder??"",t.getElementById("required").checked=e.required??!1,t.getElementById("disabled").checked=e.disabled??!1}_bindEvents(){this.shadow.querySelector(".x-btn").addEventListener("click",()=>this.close()),this.shadow.getElementById("btn-cancel").addEventListener("click",()=>this.close()),this.shadow.getElementById("btn-apply").addEventListener("click",()=>this._apply()),this.shadow.addEventListener("change",e=>{const t=e.target;if(t.name==="w-mode"){const n=t.value;this.shadow.getElementById("w-px").disabled=n!=="px",this.shadow.getElementById("w-pct").disabled=n!=="pct"}}),this.addEventListener("click",e=>{e.composedPath()[0]===this&&this.close()})}_apply(){var s;const e=this.targetInput;if(!e){this.close();return}const t=this.shadow,n=((s=t.querySelector('input[name="w-mode"]:checked'))==null?void 0:s.value)??"full";if(n==="full")e.style.width="100%",e.style.maxWidth="100%";else if(n==="px"){const a=parseFloat(t.getElementById("w-px").value);a>0&&(e.style.width=`${a}px`)}else{const a=parseFloat(t.getElementById("w-pct").value);a>0&&(e.style.width=`${a}%`)}const o=t.getElementById("align").value;e.style.display="block",e.style.marginLeft=o==="center"||o==="right"?"auto":"",e.style.marginRight=o==="center"||o==="left"?"auto":"",o==="left"&&(e.style.marginLeft="",e.style.marginRight="auto"),o==="right"&&(e.style.marginLeft="auto",e.style.marginRight=""),e.style.textAlign=t.getElementById("text-align").value,e.placeholder=t.getElementById("placeholder").value,e.required=t.getElementById("required").checked,e.disabled=t.getElementById("disabled").checked,this.dispatchEvent(new CustomEvent("poa-input-props-apply",{bubbles:!0,composed:!0,detail:{el:e}})),this.close()}}const Zr=[{id:"file",label:"파일"},{id:"edit",label:"편집"},{id:"insert",label:"삽입"},{id:"view",label:"보기"},{id:"table",label:"표"},{id:"format",label:"서식"},{id:"misc",label:"기타"},{id:"help",label:"도움말"}],Qr=`
:host { display: block; }
.menubar {
  display: flex; align-items: stretch;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  padding: 0 8px;
  user-select: none; -webkit-user-select: none;
}
.tab {
  padding: 6px 12px;
  font-size: 13px; font-weight: 500;
  color: #374151;
  cursor: pointer; border: none; background: transparent;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  white-space: nowrap;
  transition: color 0.12s, background 0.12s;
  border-radius: 4px 4px 0 0;
}
.tab:hover {
  color: #111827;
  background: #F9FAFB;
}
.tab.active {
  color: #2563EB;
  border-bottom-color: #2563EB;
  background: transparent;
}
`;class ea extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"_activeTab","edit");c(this,"busHandler",({tab:e})=>{this._activeTab=e,this.updateActive()});this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){const e=Zr.map(t=>`<button class="tab${t.id===this._activeTab?" active":""}" data-tab="${t.id}">${t.label}</button>`).join("");this.shadow.innerHTML=`<style>${Qr}</style><div class="menubar">${e}</div>`,this.shadow.querySelector(".menubar").addEventListener("mousedown",t=>{t.preventDefault();const n=t.target.dataset.tab;n&&P.emit(O.MENUBAR_CHANGE,{tab:n})}),P.on(O.MENUBAR_CHANGE,this.busHandler)}disconnectedCallback(){P.off(O.MENUBAR_CHANGE,this.busHandler)}updateActive(){this.shadow.querySelectorAll(".tab").forEach(e=>{e.classList.toggle("active",e.dataset.tab===this._activeTab)})}}/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ta=`
<svg
  class="lucide lucide-accessibility"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="16" cy="4" r="1" />
  <path d="m18 19 1-7-6 1" />
  <path d="m5 8 3-3 5.5 3-2.36 3.5" />
  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ia=`
<svg
  class="lucide lucide-arrow-down-from-line"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M19 3H5" />
  <path d="M12 21V7" />
  <path d="m6 15 6 6 6-6" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const na=`
<svg
  class="lucide lucide-arrow-left-from-line"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m9 6-6 6 6 6" />
  <path d="M3 12h14" />
  <path d="M21 19V5" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oa=`
<svg
  class="lucide lucide-arrow-right-from-line"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 5v14" />
  <path d="M21 12H7" />
  <path d="m15 18 6-6-6-6" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sa=`
<svg
  class="lucide lucide-arrow-up-from-line"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m18 9-6-6-6 6" />
  <path d="M12 3v14" />
  <path d="M5 21h14" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ra=`
<svg
  class="lucide lucide-baseline"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 20h16" />
  <path d="m6 16 6-12 6 12" />
  <path d="M8 12h8" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa=`
<svg
  class="lucide lucide-between-vertical-start"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="7" height="13" x="3" y="8" rx="1" />
  <path d="m15 2-3 3-3-3" />
  <rect width="7" height="13" x="14" y="8" rx="1" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la=`
<svg
  class="lucide lucide-bold"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const da=`
<svg
  class="lucide lucide-book-open"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 7v14" />
  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=`
<svg
  class="lucide lucide-bookmark"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=`
<svg
  class="lucide lucide-calendar"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 2v4" />
  <path d="M16 2v4" />
  <rect width="18" height="18" x="3" y="4" rx="2" />
  <path d="M3 10h18" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=`
<svg
  class="lucide lucide-clipboard-x"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  <path d="m15 11-6 6" />
  <path d="m9 11 6 6" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=`
<svg
  class="lucide lucide-clipboard"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ga=`
<svg
  class="lucide lucide-clock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=`
<svg
  class="lucide lucide-code-xml"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m18 16 4-4-4-4" />
  <path d="m6 8-4 4 4 4" />
  <path d="m14.5 4-5 16" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma=`
<svg
  class="lucide lucide-columns-3"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M9 3v18" />
  <path d="M15 3v18" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ba=`
<svg
  class="lucide lucide-copy"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xa=`
<svg
  class="lucide lucide-eye"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
  <circle cx="12" cy="12" r="3" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const va=`
<svg
  class="lucide lucide-file-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M9 15h6" />
  <path d="M12 18v-6" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ya=`
<svg
  class="lucide lucide-file-text"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M10 9H8" />
  <path d="M16 13H8" />
  <path d="M16 17H8" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wa=`
<svg
  class="lucide lucide-folder-open"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ea=`
<svg
  class="lucide lucide-grid-3x3"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M3 9h18" />
  <path d="M3 15h18" />
  <path d="M9 3v18" />
  <path d="M15 3v18" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ka=`
<svg
  class="lucide lucide-highlighter"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m9 11-6 6v3h9l3-3" />
  <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ca=`
<svg
  class="lucide lucide-image"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
  <circle cx="9" cy="9" r="2" />
  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const La=`
<svg
  class="lucide lucide-images"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16" />
  <path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2" />
  <circle cx="13" cy="7" r="1" fill="currentColor" />
  <rect x="8" y="2" width="14" height="14" rx="2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ta=`
<svg
  class="lucide lucide-info"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 16v-4" />
  <path d="M12 8h.01" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sa=`
<svg
  class="lucide lucide-italic"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="19" x2="10" y1="4" y2="4" />
  <line x1="14" x2="5" y1="20" y2="20" />
  <line x1="15" x2="9" y1="4" y2="20" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ia=`
<svg
  class="lucide lucide-keyboard"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 8h.01" />
  <path d="M12 12h.01" />
  <path d="M14 8h.01" />
  <path d="M16 12h.01" />
  <path d="M18 8h.01" />
  <path d="M6 8h.01" />
  <path d="M7 16h10" />
  <path d="M8 12h.01" />
  <rect width="20" height="16" x="2" y="4" rx="2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aa=`
<svg
  class="lucide lucide-layout-dashboard"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="7" height="9" x="3" y="3" rx="1" />
  <rect width="7" height="5" x="14" y="3" rx="1" />
  <rect width="7" height="9" x="14" y="12" rx="1" />
  <rect width="7" height="5" x="3" y="16" rx="1" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ma=`
<svg
  class="lucide lucide-layout-grid"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="7" height="7" x="3" y="3" rx="1" />
  <rect width="7" height="7" x="14" y="3" rx="1" />
  <rect width="7" height="7" x="14" y="14" rx="1" />
  <rect width="7" height="7" x="3" y="14" rx="1" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ba=`
<svg
  class="lucide lucide-link-2-off"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9 17H7A5 5 0 0 1 7 7" />
  <path d="M15 7h2a5 5 0 0 1 4 8" />
  <line x1="8" x2="12" y1="12" y2="12" />
  <line x1="2" x2="22" y1="2" y2="22" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Da=`
<svg
  class="lucide lucide-link"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _a=`
<svg
  class="lucide lucide-list-indent-decrease"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 5H11" />
  <path d="M21 12H11" />
  <path d="M21 19H11" />
  <path d="m7 8-4 4 4 4" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ra=`
<svg
  class="lucide lucide-list-indent-increase"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 5H11" />
  <path d="M21 12H11" />
  <path d="M21 19H11" />
  <path d="m3 8 4 4-4 4" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fa=`
<svg
  class="lucide lucide-list-ordered"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 5h10" />
  <path d="M11 12h10" />
  <path d="M11 19h10" />
  <path d="M4 4h1v5" />
  <path d="M4 9h2" />
  <path d="M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ha=`
<svg
  class="lucide lucide-list"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 5h.01" />
  <path d="M3 12h.01" />
  <path d="M3 19h.01" />
  <path d="M8 5h13" />
  <path d="M8 12h13" />
  <path d="M8 19h13" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $a=`
<svg
  class="lucide lucide-maximize-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 3h6v6" />
  <path d="m21 3-7 7" />
  <path d="m3 21 7-7" />
  <path d="M9 21H3v-6" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const za=`
<svg
  class="lucide lucide-minus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Na=`
<svg
  class="lucide lucide-monitor-play"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
  <path d="M12 17v4" />
  <path d="M8 21h8" />
  <rect x="2" y="3" width="20" height="14" rx="2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pa=`
<svg
  class="lucide lucide-move-horizontal"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m18 8 4 4-4 4" />
  <path d="M2 12h20" />
  <path d="m6 8-4 4 4 4" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oa=`
<svg
  class="lucide lucide-omega"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ja=`
<svg
  class="lucide lucide-paintbrush"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m14.622 17.897-10.68-2.913" />
  <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
  <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wa=`
<svg
  class="lucide lucide-paintbrush-vertical"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 2v2" />
  <path d="M14 2v4" />
  <path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z" />
  <path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ua=`
<svg
  class="lucide lucide-printer"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
  <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
  <rect x="6" y="14" width="12" height="8" rx="1" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qa=`
<svg
  class="lucide lucide-redo-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 14 5-5-5-5" />
  <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Va=`
<svg
  class="lucide lucide-remove-formatting"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 7V4h16v3" />
  <path d="M5 20h6" />
  <path d="M13 4 8 20" />
  <path d="m15 15 5 5" />
  <path d="m20 15-5 5" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ga=`
<svg
  class="lucide lucide-rows-3"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M21 9H3" />
  <path d="M21 15H3" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ya=`
<svg
  class="lucide lucide-ruler"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
  <path d="m14.5 12.5 2-2" />
  <path d="m11.5 9.5 2-2" />
  <path d="m8.5 6.5 2-2" />
  <path d="m17.5 15.5 2-2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xa=`
<svg
  class="lucide lucide-save"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
  <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
  <path d="M7 3v4a1 1 0 0 0 1 1h7" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ka=`
<svg
  class="lucide lucide-scissors"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="6" cy="6" r="3" />
  <path d="M8.12 8.12 12 12" />
  <path d="M20 4 8.12 15.88" />
  <circle cx="6" cy="18" r="3" />
  <path d="M14.8 14.8 20 20" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ja=`
<svg
  class="lucide lucide-search"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Za=`
<svg
  class="lucide lucide-settings"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
  <circle cx="12" cy="12" r="3" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qa=`
<svg
  class="lucide lucide-shield-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  <path d="m9 12 2 2 4-4" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const el=`
<svg
  class="lucide lucide-sigma"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tl=`
<svg
  class="lucide lucide-square-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="m9 12 2 2 4-4" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xn=`
<svg
  class="lucide lucide-square-dashed"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 3a2 2 0 0 0-2 2" />
  <path d="M19 3a2 2 0 0 1 2 2" />
  <path d="M21 19a2 2 0 0 1-2 2" />
  <path d="M5 21a2 2 0 0 1-2-2" />
  <path d="M9 3h1" />
  <path d="M9 21h1" />
  <path d="M14 3h1" />
  <path d="M14 21h1" />
  <path d="M3 9v1" />
  <path d="M21 9v1" />
  <path d="M3 14v1" />
  <path d="M21 14v1" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const il=`
<svg
  class="lucide lucide-strikethrough"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 4H9a3 3 0 0 0-2.83 4" />
  <path d="M14 12a4 4 0 0 1 0 8H6" />
  <line x1="4" x2="20" y1="12" y2="12" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nl=`
<svg
  class="lucide lucide-subscript"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m4 5 8 8" />
  <path d="m12 5-8 8" />
  <path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ol=`
<svg
  class="lucide lucide-superscript"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m4 19 8-8" />
  <path d="m12 19-8-8" />
  <path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sl=`
<svg
  class="lucide lucide-table-cells-merge"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 21v-6" />
  <path d="M12 9V3" />
  <path d="M3 15h18" />
  <path d="M3 9h18" />
  <rect width="18" height="18" x="3" y="3" rx="2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rl=`
<svg
  class="lucide lucide-table-cells-split"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 15V9" />
  <path d="M3 15h18" />
  <path d="M3 9h18" />
  <rect width="18" height="18" x="3" y="3" rx="2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const al=`
<svg
  class="lucide lucide-table-properties"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 3v18" />
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M21 9H3" />
  <path d="M21 15H3" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ll=`
<svg
  class="lucide lucide-table"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3v18" />
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M3 9h18" />
  <path d="M3 15h18" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dl=`
<svg
  class="lucide lucide-text-align-center"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 5H3" />
  <path d="M17 12H7" />
  <path d="M19 19H5" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cl=`
<svg
  class="lucide lucide-text-align-end"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 5H3" />
  <path d="M21 12H9" />
  <path d="M21 19H7" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pl=`
<svg
  class="lucide lucide-text-align-justify"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 5h18" />
  <path d="M3 12h18" />
  <path d="M3 19h18" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hl=`
<svg
  class="lucide lucide-text-align-start"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 5H3" />
  <path d="M15 12H3" />
  <path d="M17 19H3" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ul=`
<svg
  class="lucide lucide-trash-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <path d="M3 6h18" />
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gl=`
<svg
  class="lucide lucide-type"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 4v16" />
  <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />
  <path d="M9 20h6" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fl=`
<svg
  class="lucide lucide-underline"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 4v6a6 6 0 0 0 12 0V4" />
  <line x1="4" x2="20" y1="20" y2="20" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ml=`
<svg
  class="lucide lucide-undo-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9 14 4 9l5-5" />
  <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
</svg>
`;/**
 * @license lucide-static v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bl=`
<svg
  class="lucide lucide-video"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
  <rect x="2" y="6" width="14" height="12" rx="2" />
</svg>
`;function E(l){return l.replace(/width="24"/,'width="16"').replace(/height="24"/,'height="16"')}const ne={bold:E(la),italic:E(Sa),underline:E(fl),strike:E(il),undo:E(ml),redo:E(qa),alignLeft:E(hl),alignCenter:E(dl),alignRight:E(cl),alignJustify:E(pl),indent:E(Ra),outdent:E(_a),foreColor:E(ra),backColor:E(ka),lineHeight:E(aa),letterSpacing:E(Pa),fileNew:E(va),fileOpen:E(wa),save:E(Xa),print:E(Ua),settings:E(Za),clock:E(ga),cut:E(Ka),copy:E(ba),paste:E(ua),pastePlain:E(ha),selectAll:E(xn),search:E(Ja),image:E(Ca),images:E(La),link:E(Da),linkOff:E(Ba),bookmark:E(ca),calendar:E(pa),hr:E(za),symbol:E(Oa),video:E(bl),youtube:E(Na),viewDesign:E(Aa),viewHtml:E(fa),viewPreview:E(xa),viewText:E(gl),viewPage:E(ya),fullscreen:E($a),ruler:E(Ya),grid:E(Ea),hiddenBorder:E(xn),table:E(ll),tableProps:E(al),cellProps:E(Ma),mergeCells:E(sl),splitCell:E(rl),rowAbove:E(sa),rowBelow:E(ia),colLeft:E(na),colRight:E(oa),rowDelete:E(Ga),colDelete:E(ma),tableDelete:E(ul),painterCopy:E(ja),painterPaste:E(Wa),formatClear:E(Va),ul:E(Ha),ol:E(Fa),sup:E(ol),sub:E(nl),a11y:E(ta),privacy:E(Qa),form:E(tl),calc:E(el),shortcuts:E(Ia),guide:E(da),about:E(Ta)},xl={"file:new":"fileNew","file:open":"fileOpen","file:save":"save","file:saveas":"save","file:print":"print",settings:"settings","edit:cut":"cut","edit:copy":"copy","edit:paste":"paste","edit:paste-plain":"pastePlain","edit:select-all":"selectAll","find-replace":"search","edit:image-edit":"image",image:"image","insert:multi-image":"images","insert:link":"link","insert:bookmark":"bookmark","insert:datetime":"calendar","insert:hr":"hr","insert:symbol":"symbol","view:design":"viewDesign","view:html":"viewHtml","view:preview":"viewPreview","view:text":"viewText","view:page":"viewPage","view:fullscreen":"fullscreen","view:ruler":"ruler","view:grid":"grid","view:hidden-border":"hiddenBorder",table:"table","table:table-props":"tableProps","table:cell-props":"cellProps","table:merge":"mergeCells","table:split-cell":"splitCell","table:row-above":"rowAbove","table:row-below":"rowBelow","table:col-left":"colLeft","table:col-right":"colRight","table:row-delete":"rowDelete","table:col-delete":"colDelete","table:delete":"tableDelete","format:painter-copy":"painterCopy","format:painter-paste":"painterPaste","format:clear":"formatClear","format:ul":"ul","format:ol":"ol","format:sup":"sup","format:sub":"sub","misc:a11y":"a11y","misc:privacy":"privacy","misc:form":"form","misc:calc":"calc","help:shortcuts":"shortcuts","help:guide":"guide","help:about":"about"},vl={file:[[["새 문서","file:new"],["열기","file:open"],["저장","file:save"],["다른 이름으로 저장","file:saveas"]],[["인쇄","file:print"],["환경설정","settings"]]],edit:[[["잘라내기","edit:cut"],["복사","edit:copy"],["붙여넣기","edit:paste"],["서식 없이 붙여넣기","edit:paste-plain"]],[["찾기·바꾸기","find-replace"],["이미지 편집","edit:image-edit"],["전체 선택","edit:select-all"]]],insert:[[["이미지","image"]],[["하이퍼링크","insert:link"],["책갈피","insert:bookmark"]],[["서명","insert:signature"],["이모지","insert:emoji"]],[["툴팁","insert:tooltip"],["툴팁 관리","insert:tooltip-list"]],[["날짜·시간","insert:datetime"],["가로줄","insert:hr"],["기호","insert:symbol"]]],view:[[["디자인","view:design"],["HTML","view:html"],["미리보기","view:preview"],["텍스트","view:text"],["페이지","view:page"]],[["전체화면","view:fullscreen"],["눈금자","view:ruler"],["그리드","view:grid"],["숨김 테두리","view:hidden-border"]]],table:[[["표 삽입","table"],["표 속성","table:table-props"],["셀 속성","table:cell-props"]],[["셀 병합","table:merge"],["셀 나누기","table:split-cell"]],[["위에 행 삽입","table:row-above"],["아래에 행 삽입","table:row-below"],["왼쪽에 열 삽입","table:col-left"],["오른쪽에 열 삽입","table:col-right"]],[["행 삭제","table:row-delete"],["열 삭제","table:col-delete"],["표 삭제","table:delete"]]],format:[[["서식 복사","format:painter-copy"],["서식 붙여넣기","format:painter-paste"],["서식 제거","format:clear"]],[["글머리 기호","format:ul"],["글머리 번호","format:ol"]],[["위 첨자","format:sup"],["아래 첨자","format:sub"]]],misc:[[["웹 접근성 체크","misc:a11y"],["개인정보 체크","misc:privacy"]],[["폼 컨트롤","misc:form"],["계산식","misc:calc"],["템플릿","misc:template"]]],help:[[["단축키","help:shortcuts"],["사용자 가이드","help:guide"],["제품 정보","help:about"]]]},yl=new Set(["view:design","view:html","view:preview","view:text","view:page"]),wl=`
:host {
  display: block;
  --icon-color:         #374151;
  --icon-hover-bg:      #F3F4F6;
  --icon-hover-color:   #111827;
  --icon-active-bg:     #EFF6FF;
  --icon-active-color:  #2563EB;
  --icon-active-border: #BFDBFE;
  --toolbar-bg:         #F9FAFB;
  --toolbar-border:     #E5E7EB;
  --sep-color:          #D1D5DB;
}
.ctx-bar {
  display: flex; align-items: center; flex-wrap: wrap; gap: 2px;
  padding: 3px 8px; min-height: 36px;
  background: var(--toolbar-bg);
  border-bottom: 1px solid var(--toolbar-border);
  user-select: none; -webkit-user-select: none;
}
.group { display: flex; align-items: center; gap: 1px; }
.sep {
  width: 1px; height: 20px;
  background: var(--sep-color);
  margin: 0 4px; flex-shrink: 0;
}
.btn {
  position: relative;
  height: 30px; padding: 0 8px;
  border: 1px solid transparent; border-radius: 6px;
  background: transparent; color: var(--icon-color);
  font-size: 12px; cursor: pointer;
  display: inline-flex; align-items: center; gap: 5px;
  white-space: nowrap;
  transition: background 0.12s, color 0.12s;
}
.btn svg { pointer-events: none; flex-shrink: 0; }
.btn:hover:not(:disabled) {
  background: var(--icon-hover-bg);
  color: var(--icon-hover-color);
}
.btn:disabled { opacity: 0.35; cursor: not-allowed; }
.btn.active {
  background: var(--icon-active-bg);
  color: var(--icon-active-color);
  border-color: var(--icon-active-border);
  font-weight: 600;
}

/* 툴팁 */
.btn::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #1F2937;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 400;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s ease 0s;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
.btn:hover:not(:disabled)::after {
  opacity: 1;
  transition-delay: 0.6s;
}
`;class El extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"activeTab","edit");c(this,"activeViewMode","design");c(this,"busHandler",({tab:e})=>{this.activeTab=e,this.render()});c(this,"viewHandler",({mode:e})=>{this.activeViewMode=e,this.activeTab==="view"&&this.render()});this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render(),P.on(O.MENUBAR_CHANGE,this.busHandler),P.on(O.VIEW_CHANGE,this.viewHandler)}disconnectedCallback(){P.off(O.MENUBAR_CHANGE,this.busHandler),P.off(O.VIEW_CHANGE,this.viewHandler)}render(){const e=vl[this.activeTab]??[],t=[];for(let n=0;n<e.length;n++){n>0&&t.push('<div class="sep"></div>'),t.push('<div class="group">');for(const o of e[n])if(o===null)t.push('<div class="sep" style="margin:0 2px;"></div>');else{const[s,a,r,d]=o,p=r?` data-value="${r}"`:"",g=yl.has(a)&&a===`view:${this.activeViewMode}`?" active":"",f=d??s,m=xl[a],b=m?ne[m]:"",w=b?`${b}<span>${s}</span>`:s;t.push(`<button class="btn${g}" data-action="${a}"${p} data-tip="${f}">${w}</button>`)}t.push("</div>")}this.shadow.innerHTML=`<style>${wl}</style><div class="ctx-bar">${t.join("")}</div>`,this.shadow.querySelector(".ctx-bar").addEventListener("mousedown",n=>{const o=n.target.closest(".btn");if(!o||o.disabled)return;const s=o.dataset.action;if(!s)return;n.preventDefault();const a=o.dataset.value;this.dispatchEvent(new CustomEvent("poa-action",{bubbles:!0,composed:!0,detail:{type:s,value:a}}))})}}const kl=[{label:"기본",value:"inherit"},{label:"맑은 고딕",value:"맑은 고딕, sans-serif"},{label:"나눔고딕",value:"나눔고딕, sans-serif"},{label:"나눔명조",value:"나눔명조, serif"},{label:"굴림",value:"굴림, sans-serif"},{label:"돋움",value:"돋움, sans-serif"},{label:"바탕",value:"바탕, serif"},{label:"궁서",value:"궁서, serif"},{label:"Arial",value:"Arial, sans-serif"},{label:"Times New Roman",value:"Times New Roman, serif"},{label:"Courier New",value:"Courier New, monospace"},{label:"Georgia",value:"Georgia, serif"},{label:"Verdana",value:"Verdana, sans-serif"},{label:"Tahoma",value:"Tahoma, sans-serif"}],Cl=["8","9","10","11","12","14","16","18","20","24","28","32","36","48","72"],Ll=["1","1.2","1.4","1.5","1.6","1.8","2.0","2.5"],Tl=["0px","0.5px","1px","1.5px","2px","3px","4px"],Sl=`
:host {
  display: block;
  --icon-color:         #374151;
  --icon-hover-bg:      #F3F4F6;
  --icon-hover-color:   #111827;
  --icon-active-bg:     #EFF6FF;
  --icon-active-color:  #2563EB;
  --icon-active-border: #BFDBFE;
  --toolbar-bg:         #FFFFFF;
  --toolbar-border:     #E5E7EB;
  --sep-color:          #D1D5DB;
}
.toolbar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 2px;
  padding: 4px 8px;
  background: var(--toolbar-bg);
  border-bottom: 1px solid var(--toolbar-border);
  user-select: none; -webkit-user-select: none;
}
.group { display: flex; align-items: center; gap: 1px; }
.sep {
  width: 1px; height: 20px;
  background: var(--sep-color);
  margin: 0 4px; flex-shrink: 0;
}
.btn {
  position: relative;
  width: 32px; height: 32px; padding: 0;
  border: 1px solid transparent; border-radius: 6px;
  background: transparent;
  color: var(--icon-color);
  cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background 0.12s, color 0.12s;
  flex-shrink: 0;
}
.btn svg { pointer-events: none; display: block; }
.btn:hover:not(:disabled) {
  background: var(--icon-hover-bg);
  color: var(--icon-hover-color);
}
.btn.active {
  background: var(--icon-active-bg);
  color: var(--icon-active-color);
  border-color: var(--icon-active-border);
}
.btn:disabled { opacity: 0.35; cursor: not-allowed; }

/* 다크 툴팁 — 600ms 지연 */
.btn::after {
  content: attr(data-tip);
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #1F2937;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 400;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s ease 0s;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
.btn:hover:not(:disabled)::after {
  opacity: 1;
  transition-delay: 0.6s;
}

/* 색상 버튼 */
select {
  height: 32px; padding: 0 6px;
  border: 1px solid var(--toolbar-border); border-radius: 6px;
  background: #fff; color: var(--icon-color);
  font-size: 12px; cursor: pointer;
  outline: none;
  transition: border-color 0.12s;
}
select:focus { border-color: var(--icon-active-color); }
.sel-family { width: 96px; }
.sel-size   { width: 52px; }
.sel-lh     { width: 76px; }
.sel-ls     { width: 76px; }

/* 색상 버튼 — 아이콘 + 컬러바 */
.color-wrap  { position: relative; display: inline-flex; }
.color-btn   {
  flex-direction: column; gap: 2px;
  width: 32px; height: 32px; padding: 6px 8px;
}
.c-icon      { display: flex; align-items: center; justify-content: center; pointer-events: none; }
.c-bar       { width: 16px; height: 3px; border-radius: 1px; pointer-events: none; }
.color-input {
  position: absolute; inset: 0; width: 100%; height: 100%;
  opacity: 0; cursor: pointer; border: none; padding: 0; margin: 0;
}
`,Il=`
<div class="toolbar">
  <div class="group">
    <select class="sel-family" id="sel-family" title="글꼴"></select>
    <select class="sel-size"   id="sel-size"   title="글자 크기 (pt)"></select>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-bold"      data-tip="굵게 (Ctrl+B)">${ne.bold}</button>
    <button class="btn" id="btn-italic"    data-tip="기울임 (Ctrl+I)">${ne.italic}</button>
    <button class="btn" id="btn-underline" data-tip="밑줄 (Ctrl+U)">${ne.underline}</button>
    <button class="btn" id="btn-strike"    data-tip="취소선">${ne.strike}</button>
  </div>
  <div class="sep"></div>

  <div class="group">
    <div class="color-wrap" data-tip="글자색">
      <button class="btn color-btn" id="btn-fore" data-tip="글자색">
        <span class="c-icon">${ne.foreColor}</span>
        <span class="c-bar" id="fore-bar" style="background:#000000"></span>
      </button>
      <input type="color" class="color-input" id="fore-input" value="#000000">
    </div>
    <div class="color-wrap">
      <button class="btn color-btn" id="btn-back" data-tip="배경 강조색">
        <span class="c-icon">${ne.backColor}</span>
        <span class="c-bar" id="back-bar" style="background:#FBBF24"></span>
      </button>
      <input type="color" class="color-input" id="back-input" value="#FBBF24">
    </div>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-al-left"    data-tip="왼쪽 정렬">${ne.alignLeft}</button>
    <button class="btn" id="btn-al-center"  data-tip="가운데 정렬">${ne.alignCenter}</button>
    <button class="btn" id="btn-al-right"   data-tip="오른쪽 정렬">${ne.alignRight}</button>
    <button class="btn" id="btn-al-justify" data-tip="양쪽 정렬">${ne.alignJustify}</button>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-indent"  data-tip="들여쓰기">${ne.indent}</button>
    <button class="btn" id="btn-outdent" data-tip="내어쓰기">${ne.outdent}</button>
  </div>
  <div class="sep"></div>

  <div class="group">
    <select class="sel-lh" id="sel-lh" title="줄 간격"></select>
    <select class="sel-ls" id="sel-ls" title="자간"></select>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-undo" data-tip="실행 취소 (Ctrl+Z)">${ne.undo}</button>
    <button class="btn" id="btn-redo" data-tip="다시 실행 (Ctrl+Y)">${ne.redo}</button>
  </div>
</div>
`;class Al extends HTMLElement{constructor(){super();c(this,"shadow");this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>${Sl}</style>${Il}`,this.populateSelects(),this.bindEvents()}populateSelects(){const e=this.shadow,t=e.getElementById("sel-family");for(const{label:a,value:r}of kl){const d=document.createElement("option");d.value=r,d.textContent=a,t.appendChild(d)}const n=e.getElementById("sel-size");for(const a of Cl){const r=document.createElement("option");r.value=`${a}pt`,r.textContent=a,n.appendChild(r)}n.value="12pt";const o=e.getElementById("sel-lh");for(const a of Ll){const r=document.createElement("option");r.value=a,r.textContent=`줄간 ${a}`,o.appendChild(r)}o.value="1.5";const s=e.getElementById("sel-ls");for(const a of Tl){const r=document.createElement("option");r.value=a,r.textContent=`자간 ${a}`,s.appendChild(r)}s.value="0px"}bindEvents(){var s,a,r,d,p,h;const e=this.shadow,t=(g,f)=>{this.dispatchEvent(new CustomEvent("poa-action",{bubbles:!0,composed:!0,detail:{type:g,value:f}}))},n=(g,f)=>{var m;(m=e.getElementById(g))==null||m.addEventListener("mousedown",b=>{b.preventDefault(),t("format",f)})};n("btn-bold","bold"),n("btn-italic","italic"),n("btn-underline","underline"),n("btn-strike","strike"),(s=e.getElementById("fore-input"))==null||s.addEventListener("change",g=>{const f=g.target.value;e.getElementById("fore-bar").style.background=f,t("foreColor",f)}),(a=e.getElementById("back-input"))==null||a.addEventListener("change",g=>{const f=g.target.value;e.getElementById("back-bar").style.background=f,t("backColor",f)});const o=(g,f)=>{var m;(m=e.getElementById(g))==null||m.addEventListener("mousedown",b=>{b.preventDefault(),t("align",f)})};o("btn-al-left","left"),o("btn-al-center","center"),o("btn-al-right","right"),o("btn-al-justify","justify"),(r=e.getElementById("btn-indent"))==null||r.addEventListener("mousedown",g=>{g.preventDefault(),t("indent")}),(d=e.getElementById("btn-outdent"))==null||d.addEventListener("mousedown",g=>{g.preventDefault(),t("outdent")}),(p=e.getElementById("btn-undo"))==null||p.addEventListener("mousedown",g=>{g.preventDefault(),t("undo")}),(h=e.getElementById("btn-redo"))==null||h.addEventListener("mousedown",g=>{g.preventDefault(),t("redo")}),e.getElementById("sel-family").addEventListener("change",g=>t("fontFamily",g.target.value)),e.getElementById("sel-size").addEventListener("change",g=>t("fontSize",g.target.value)),e.getElementById("sel-lh").addEventListener("change",g=>t("lineHeight",g.target.value)),e.getElementById("sel-ls").addEventListener("change",g=>t("letterSpacing",g.target.value))}setState(e){const t=this.shadow,n=(s,a)=>{var r;(r=t.getElementById(s))==null||r.classList.toggle("active",a)},o=(s,a)=>{const r=t.getElementById(s);r&&(r.disabled=a)};if(n("btn-bold",e.bold),n("btn-italic",e.italic),n("btn-underline",e.underline),n("btn-strike",e.strike),n("btn-al-left",e.align==="left"),n("btn-al-center",e.align==="center"),n("btn-al-right",e.align==="right"),n("btn-al-justify",e.align==="justify"),o("btn-undo",!e.canUndo),o("btn-redo",!e.canRedo),e.fontFamily){const s=e.fontFamily.replace(/['"]/g,"").replace(/\s*,\s*/g,", ").trim();t.getElementById("sel-family").value=s}e.fontSize&&(t.getElementById("sel-size").value=e.fontSize),e.lineHeight&&(t.getElementById("sel-lh").value=e.lineHeight),e.letterSpacing&&(t.getElementById("sel-ls").value=e.letterSpacing),e.foreColor&&(t.getElementById("fore-bar").style.background=e.foreColor,t.getElementById("fore-input").value=e.foreColor),e.backColor&&(t.getElementById("back-bar").style.background=e.backColor,t.getElementById("back-input").value=e.backColor)}setHistoryState(e,t){const n=this.shadow,o=n.getElementById("btn-undo"),s=n.getElementById("btn-redo");o&&(o.disabled=!e),s&&(s.disabled=!t)}}class Ml extends HTMLElement{constructor(){super();c(this,"shadow");this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`
<style>
:host { display: block; box-sizing: border-box; }
.bar {
  display: flex; align-items: center; gap: 16px;
  padding: 3px 12px;
  background: var(--poa-statusbar-bg, #f5f5f5);
  border-top: 1px solid var(--poa-toolbar-border, #ddd);
  font-size: 11px; color: var(--poa-statusbar-color, #777);
  user-select: none; -webkit-user-select: none;
}
</style>
<div class="bar">
  <span id="char-count">0자</span>
  <span id="word-count">0단어</span>
</div>`}update(e){const t=this.shadow.getElementById("char-count"),n=this.shadow.getElementById("word-count");if(!t||!n)return;const s=new DOMParser().parseFromString(e,"text/html").body.textContent??"",a=[...s.replace(/\s/g,"")].length,r=s.trim()===""?0:s.trim().split(/\s+/).length;t.textContent=`${a}자`,n.textContent=`${r}단어`}}const Bl=`
:host { display: none; }
:host([open]) { display: block; }
.backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
}
.dialog {
  background: #fff; border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  width: 480px; max-width: 95vw; max-height: 80vh;
  display: flex; flex-direction: column;
  overflow: hidden;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; border-bottom: 1px solid #eee;
  font-size: 15px; font-weight: 600; color: #333;
}
.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #888; line-height: 1; padding: 0 4px;
}
.close-btn:hover { color: #333; }
.body { flex: 1; overflow-y: auto; }
.section { padding: 16px 20px; }
.section + .section { border-top: 1px solid #f0f0f0; }
.section-title {
  font-size: 12px; font-weight: 600; color: #888;
  text-transform: uppercase; letter-spacing: .05em;
  margin: 0 0 10px;
}
.file-btns { display: flex; gap: 8px; flex-wrap: wrap; }
.file-btns button {
  padding: 6px 14px; border: 1px solid #ccc; border-radius: 4px;
  background: #fff; cursor: pointer; font-size: 13px;
}
.file-btns button:hover { background: #f5f5f5; }
.history-list { list-style: none; margin: 0; padding: 0; }
.history-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 0; border-bottom: 1px solid #f5f5f5;
}
.history-item:last-child { border-bottom: none; }
.history-time { font-size: 12px; color: #666; }
.restore-btn {
  padding: 3px 10px; border: 1px solid #1976d2; border-radius: 3px;
  background: transparent; color: #1976d2; cursor: pointer; font-size: 12px;
}
.restore-btn:hover { background: #e3f2fd; }
.empty-msg { color: #aaa; font-size: 13px; text-align: center; padding: 20px 0; }
.clear-btn {
  margin-top: 10px; padding: 5px 12px;
  border: 1px solid #ccc; border-radius: 3px;
  background: #fff; cursor: pointer; font-size: 12px; color: #666;
}
.clear-btn:hover { background: #fafafa; }
`;function Dl(l){return new Date(l).toLocaleString("ko-KR",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})}class _l extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"autoSave",null);this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>${Bl}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="설정">
    <div class="header">
      <span>파일 관리 · 자동저장 이력</span>
      <button class="close-btn" id="btn-close" title="닫기">×</button>
    </div>
    <div class="body">
      <div class="section">
        <p class="section-title">파일</p>
        <div class="file-btns">
          <button id="btn-new">새 문서</button>
          <button id="btn-open">열기</button>
          <button id="btn-save">저장</button>
          <button id="btn-saveas">다른 이름으로 저장</button>
        </div>
      </div>
      <div class="section">
        <p class="section-title">자동저장 이력</p>
        <ul class="history-list" id="history-list"></ul>
        <button class="clear-btn" id="btn-clear">이력 전체 삭제</button>
      </div>
    </div>
  </div>
</div>`,this.bindEvents()}setAutoSave(e){this.autoSave=e}setFileManager(e){}async show(){var e;await this.loadHistory(),this.setAttribute("open",""),(e=this.shadow.getElementById("btn-close"))==null||e.focus()}close(){this.removeAttribute("open")}bindEvents(){var n,o,s,a,r,d,p;const e=this.shadow;(n=e.getElementById("backdrop"))==null||n.addEventListener("click",h=>{h.target===e.getElementById("backdrop")&&this.close()}),(o=e.getElementById("btn-close"))==null||o.addEventListener("click",()=>this.close());const t=h=>{this.dispatchEvent(new CustomEvent(`poa-file-${h}`,{bubbles:!0,composed:!0})),this.close()};(s=e.getElementById("btn-new"))==null||s.addEventListener("click",()=>t("new")),(a=e.getElementById("btn-open"))==null||a.addEventListener("click",()=>t("open")),(r=e.getElementById("btn-save"))==null||r.addEventListener("click",()=>t("save")),(d=e.getElementById("btn-saveas"))==null||d.addEventListener("click",()=>t("saveas")),(p=e.getElementById("btn-clear"))==null||p.addEventListener("click",async()=>{var h;await((h=this.autoSave)==null?void 0:h.clearAll()),await this.loadHistory()})}async loadHistory(){const e=this.shadow.getElementById("history-list");if(!e)return;if(e.innerHTML="",!this.autoSave){e.innerHTML='<li class="empty-msg">자동저장 미설정</li>';return}const t=await this.autoSave.listSnapshots();if(t.length===0){e.innerHTML='<li class="empty-msg">저장된 이력이 없습니다</li>';return}for(const n of t){const o=document.createElement("li");o.className="history-item",o.innerHTML=`
        <span class="history-time">${Dl(n.savedAt)}</span>
        <button class="restore-btn" data-id="${String(n.id)}">복원</button>`,o.querySelector(".restore-btn").addEventListener("click",()=>{this.handleRestore(n)}),e.appendChild(o)}}handleRestore(e){this.dispatchEvent(new CustomEvent("poa-autosave-restore",{bubbles:!0,composed:!0,detail:{html:e.html}})),this.close()}}const Rl=`
/* ── 호스트 슬라이드 애니메이션 ── */
:host {
  display: block;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.2s ease, opacity 0.15s ease;
}
:host([open]) {
  max-height: 125px;   /* find-only 높이 */
  opacity: 1;
}
:host([open][replace]) {
  max-height: 165px;   /* find + replace 높이 */
}

/* ── 전체 바 ── */
.bar {
  background: #FAFBFF;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* ── 탭 행 ── */
.tab-row {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid #E5E7EB;
  padding: 0 12px;
  background: #FAFBFF;
}
.tab {
  padding: 6px 14px;
  font-size: 13px; font-weight: 500;
  color: #6B7280;
  cursor: pointer; border: none; background: transparent;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  white-space: nowrap;
  transition: color 0.12s, background 0.12s;
  border-radius: 4px 4px 0 0;
}
.tab:hover {
  color: #374151;
  background: #F3F4F6;
}
.tab.active {
  color: #2563EB;
  border-bottom-color: #2563EB;
}

/* ── 바디 (탭 아래) ── */
.body {
  padding: 5px 12px 7px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 1px solid #DBEAFE;
}

/* ── 공통 행 ── */
.row {
  display: flex;
  align-items: center;
  gap: 7px;
}

/* ── 바꾸기 행 슬라이드 (grid 애니메이션) ── */
.replace-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}
:host([replace]) .replace-wrap {
  grid-template-rows: 1fr;
}
.replace-row {
  overflow: hidden;
  min-height: 0;
  /* grid-item이므로 gap은 부모 grid에서 제어되지 않음 — 위 margin으로 보정 */
  padding-top: 4px;
}

/* ── 라벨 (바꾸기 탭에서만 표시) ── */
.lbl {
  font-size: 12px; color: #6B7280;
  width: 44px; flex-shrink: 0;
  display: none;
}
:host([replace]) .lbl {
  display: inline-flex;
  align-items: center;
}

/* ── 입력란 ── */
input[type=text] {
  height: 30px;
  border: 1px solid #CBD5E1; border-radius: 6px;
  padding: 0 10px; font-size: 13px;
  background: #FFFFFF; flex: 1; max-width: 400px;
  outline: none; box-sizing: border-box;
  transition: border-color 0.12s, box-shadow 0.12s;
}
input[type=text]:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
input[type=text].no-match {
  border-color: #FCA5A5;
  background: #FFF5F5;
}

/* ── 매치 카운터 ── */
.count {
  font-size: 12px; color: #94A3B8;
  min-width: 36px; text-align: center;
  flex-shrink: 0; white-space: nowrap;
}
.count.empty { color: #EF4444; }

/* ── 이전/다음 버튼 ── */
.nav-btn {
  width: 26px; height: 26px; flex-shrink: 0;
  border: 1px solid #E2E8F0; border-radius: 5px;
  background: #FFFFFF; cursor: pointer;
  color: #475569; font-size: 11px;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background 0.1s, border-color 0.1s;
}
.nav-btn:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}

/* ── 닫기 버튼 ── */
.close-btn {
  width: 26px; height: 26px; flex-shrink: 0;
  border: none; background: transparent; cursor: pointer;
  color: #94A3B8; font-size: 16px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 5px;
  transition: color 0.1s, background 0.1s;
}
.close-btn:hover {
  color: #EF4444;
  background: #FEE2E2;
}

/* ── 바꾸기 버튼 ── */
.btn-replace {
  height: 28px; padding: 0 14px;
  background: #FFFFFF; border: 1px solid #3B82F6;
  color: #3B82F6; border-radius: 6px; cursor: pointer;
  font-size: 12px; font-weight: 500; white-space: nowrap; flex-shrink: 0;
  transition: background 0.1s;
}
.btn-replace:hover { background: #EFF6FF; }

/* ── 모두 바꾸기 버튼 ── */
.btn-replace-all {
  height: 28px; padding: 0 14px;
  background: #3B82F6; color: #FFFFFF;
  border: none; border-radius: 6px; cursor: pointer;
  font-size: 12px; font-weight: 500; white-space: nowrap; flex-shrink: 0;
  transition: background 0.1s;
}
.btn-replace-all:hover { background: #2563EB; }

/* ── 옵션 행 ── */
.opts-row {
  display: flex; align-items: center; gap: 16px;
  padding: 2px 0;
}
.opts-row label {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: #64748B; cursor: pointer;
  user-select: none; -webkit-user-select: none;
}
.opts-row input[type=checkbox] {
  width: 14px; height: 14px; flex-shrink: 0;
  border-radius: 3px; cursor: pointer;
  accent-color: #3B82F6;
}
`,Fl=`
<div class="bar">
  <div class="tab-row">
    <button class="tab active" id="tab-find">찾기</button>
    <button class="tab"        id="tab-replace">바꾸기</button>
  </div>
  <div class="body">
    <div class="row">
      <span class="lbl" id="lbl-find">찾기</span>
      <input type="text" id="inp-find" placeholder="찾을 내용" autocomplete="off" aria-label="찾을 내용">
      <span class="count" id="count-label" aria-live="polite"></span>
      <button class="nav-btn" id="btn-prev" title="이전 (Shift+Enter)">∧</button>
      <button class="nav-btn" id="btn-next" title="다음 (Enter)">∨</button>
      <button class="close-btn" id="btn-close" title="닫기 (Esc)">✕</button>
    </div>
    <div class="replace-wrap">
      <div class="replace-row">
        <div class="row">
          <span class="lbl">바꾸기</span>
          <input type="text" id="inp-replace" placeholder="바꿀 내용" autocomplete="off" aria-label="바꿀 내용">
          <button class="btn-replace"     id="btn-replace">바꾸기</button>
          <button class="btn-replace-all" id="btn-replace-all">모두 바꾸기</button>
        </div>
      </div>
    </div>
    <div class="opts-row">
      <label><input type="checkbox" id="chk-case"> 대소문자 구분</label>
      <label><input type="checkbox" id="chk-word"> 전체 단어 일치</label>
    </div>
  </div>
</div>
`;class Hl extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"debounceTimer",null);this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>${Rl}</style>${Fl}`,this.bindEvents()}open(e="find"){this.setAttribute("open",""),this.setMode(e),setTimeout(()=>{var t;(t=this.shadow.getElementById("inp-find"))==null||t.focus()},50)}close(){this.removeAttribute("open"),this.removeAttribute("replace"),this.updateTabUI(!1),this.debounceTimer!==null&&(clearTimeout(this.debounceTimer),this.debounceTimer=null),this.clearInputState(),this.dispatch("find-clear",{})}updateResult(e,t){const n=this.shadow.getElementById("count-label"),o=this.shadow.getElementById("inp-find");if(!n)return;if(!(((o==null?void 0:o.value.trim().length)??0)>0)){n.textContent="",n.className="count",o==null||o.classList.remove("no-match");return}e===0?(n.textContent="0 / 0",n.className="count empty",o==null||o.classList.add("no-match")):(n.textContent=`${t+1} / ${e}`,n.className="count",o==null||o.classList.remove("no-match"))}setMode(e){const t=e==="replace";t?this.setAttribute("replace",""):this.removeAttribute("replace"),this.updateTabUI(t)}updateTabUI(e){var n,o;const t=this.shadow;(n=t.getElementById("tab-find"))==null||n.classList.toggle("active",!e),(o=t.getElementById("tab-replace"))==null||o.classList.toggle("active",e)}clearInputState(){const e=this.shadow.getElementById("inp-find"),t=this.shadow.getElementById("count-label");e&&e.classList.remove("no-match"),t&&(t.textContent="",t.className="count")}bindEvents(){var p,h,g,f,m,b,w;const e=this.shadow,t=e.getElementById("inp-find"),n=e.getElementById("inp-replace"),o=e.getElementById("chk-case"),s=e.getElementById("chk-word"),a=()=>({query:t.value,caseSensitive:o.checked,wholeWord:s.checked}),r=()=>{this.debounceTimer!==null&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>{this.debounceTimer=null,this.dispatch("find-search",a())},300)},d=()=>{this.debounceTimer!==null&&(clearTimeout(this.debounceTimer),this.debounceTimer=null),this.dispatch("find-search",a())};(p=e.getElementById("tab-find"))==null||p.addEventListener("click",()=>this.setMode("find")),(h=e.getElementById("tab-replace"))==null||h.addEventListener("click",()=>this.setMode("replace")),(g=e.getElementById("btn-close"))==null||g.addEventListener("click",()=>this.close()),t.addEventListener("input",r),t.addEventListener("keydown",v=>{if(v.key==="Enter"){v.preventDefault(),d(),v.shiftKey?this.dispatch("find-prev",{}):this.dispatch("find-next",{});return}v.key==="Escape"&&(v.preventDefault(),this.close())}),o.addEventListener("change",r),s.addEventListener("change",r),(f=e.getElementById("btn-prev"))==null||f.addEventListener("click",()=>{d(),this.dispatch("find-prev",{})}),(m=e.getElementById("btn-next"))==null||m.addEventListener("click",()=>{d(),this.dispatch("find-next",{})}),n.addEventListener("keydown",v=>{v.key==="Escape"&&(v.preventDefault(),this.close())}),(b=e.getElementById("btn-replace"))==null||b.addEventListener("click",()=>this.dispatch("find-replace",{replacement:n.value})),(w=e.getElementById("btn-replace-all"))==null||w.addEventListener("click",()=>this.dispatch("find-replace-all",{...a(),replacement:n.value}))}dispatch(e,t){this.dispatchEvent(new CustomEvent(`poa-${e}`,{bubbles:!0,composed:!0,detail:t}))}}const $l=`
:host { display: none; }
:host([open]) { display: block; }
.backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  z-index: 1100; display: flex; align-items: center; justify-content: center;
}
.dialog {
  background: #fff; border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.3);
  width: 520px; max-width: 95vw; max-height: 90vh;
  display: flex; flex-direction: column; overflow: hidden;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 18px; border-bottom: 1px solid #eee;
  font-size: 14px; font-weight: 600; color: #333;
}
.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #888; padding: 0 4px; line-height: 1;
}
.close-btn:hover { color: #333; }
.tabs { display: flex; border-bottom: 1px solid #ddd; background: #fafafa; }
.tab-btn {
  padding: 8px 18px; border: none; background: transparent;
  cursor: pointer; font-size: 13px; color: #666;
  border-bottom: 2px solid transparent;
}
.tab-btn.active { color: #1976d2; border-bottom-color: #1976d2; font-weight: 600; }
.tab-btn:hover:not(.active) { background: #f0f0f0; }
.tab-content { display: none; flex: 1; flex-direction: column; overflow: hidden; }
.tab-content.active { display: flex; }
.preview {
  flex: 1; overflow: auto; display: flex;
  align-items: center; justify-content: center;
  background: #f0f0f0; min-height: 180px; padding: 12px;
}
.preview img { max-width: 100%; max-height: 360px; object-fit: contain; display: block; }
.loading { color: #888; font-size: 13px; }
.controls {
  display: flex; gap: 8px; padding: 10px 18px;
  border-top: 1px solid #eee; flex-wrap: wrap;
}
.controls button {
  padding: 5px 12px; border: 1px solid #ccc; border-radius: 4px;
  background: #fff; cursor: pointer; font-size: 12px;
}
.controls button:hover { background: #f5f5f5; }
.controls button:disabled { opacity: .4; cursor: default; }
.props { padding: 14px 18px; overflow-y: auto; flex: 1; }
.field { margin-bottom: 11px; }
.field label { display: block; font-size: 12px; color: #555; margin-bottom: 3px; font-weight: 500; }
.field input, .field select {
  width: 100%; box-sizing: border-box;
  padding: 5px 8px; border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; outline: none;
}
.field input:focus, .field select:focus { border-color: #1976d2; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
.err { color: #d32f2f; font-size: 11px; margin-top: 3px; display: none; }
.err.show { display: block; }
.footer {
  display: flex; gap: 8px; justify-content: flex-end;
  padding: 10px 18px; border-top: 1px solid #eee;
}
.btn-cancel {
  padding: 7px 18px; border: 1px solid #ccc; border-radius: 4px;
  background: #fff; cursor: pointer; font-size: 13px;
}
.btn-cancel:hover { background: #f5f5f5; }
.btn-apply {
  padding: 7px 18px; border: none; border-radius: 4px;
  background: #1976d2; color: #fff; cursor: pointer; font-size: 13px;
}
.btn-apply:hover { background: #1565c0; }
.btn-apply:disabled { opacity: .5; cursor: default; }
`;class zl extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"editor",new yr);c(this,"originalSrc","");c(this,"currentDataUrl","");c(this,"busy",!1);this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>${$l}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="이미지 편집">
    <div class="header">
      <span>이미지 편집</span>
      <button class="close-btn" id="btn-close" title="닫기">×</button>
    </div>
    <div class="tabs">
      <button class="tab-btn active" data-tab="canvas">이미지 편집</button>
      <button class="tab-btn" data-tab="props">속성</button>
    </div>

    <!-- 이미지 편집 탭 -->
    <div class="tab-content active" id="tc-canvas">
      <div class="preview" id="preview">
        <span class="loading">이미지를 불러오는 중...</span>
      </div>
      <div class="controls">
        <button id="btn-rotate90">↻ 90° 회전</button>
        <button id="btn-flip-h">↔ 좌우 반전</button>
        <button id="btn-flip-v">↕ 상하 반전</button>
        <button id="btn-reset">원본으로</button>
      </div>
    </div>

    <!-- 속성 탭 -->
    <div class="tab-content" id="tc-props">
      <div class="props">
        <div class="field">
          <label>대체 텍스트 (alt) *</label>
          <input id="p-alt" type="text" placeholder="이미지 설명 — 접근성 필수">
          <div class="err" id="err-p-alt">alt 텍스트를 입력하세요.</div>
        </div>
        <div class="field">
          <label>title</label>
          <input id="p-title" type="text">
        </div>
        <div class="row3">
          <div class="field">
            <label>가로 (width)</label>
            <input id="p-width" type="text" placeholder="200px">
          </div>
          <div class="field">
            <label>세로 (height)</label>
            <input id="p-height" type="text" placeholder="auto">
          </div>
          <div class="field">
            <label>테두리 (border)</label>
            <input id="p-border" type="text" placeholder="1px solid">
          </div>
        </div>
        <div class="row3">
          <div class="field">
            <label>정렬 (align)</label>
            <select id="p-align">
              <option value="">기본</option>
              <option value="left">왼쪽</option>
              <option value="right">오른쪽</option>
            </select>
          </div>
          <div class="field">
            <label>ID</label>
            <input id="p-id" type="text">
          </div>
          <div class="field">
            <label>클래스 (class)</label>
            <input id="p-class" type="text">
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <button class="btn-cancel" id="btn-cancel">취소</button>
      <button class="btn-apply" id="btn-apply">적용</button>
    </div>
  </div>
</div>`,this.bindEvents()}async open(e,t){var n;this.originalSrc=e,this.currentDataUrl=e,this.busy=!1,this.switchTab("canvas"),t&&this.fillProps(t),this.setAttribute("open",""),await this.renderPreview(e),(n=this.shadow.getElementById("btn-close"))==null||n.focus()}close(){this.removeAttribute("open"),this.originalSrc="",this.currentDataUrl=""}switchTab(e){var n,o;const t=this.shadow;t.querySelectorAll(".tab-btn").forEach(s=>s.classList.toggle("active",s.dataset.tab===e)),(n=t.getElementById("tc-canvas"))==null||n.classList.toggle("active",e==="canvas"),(o=t.getElementById("tc-props"))==null||o.classList.toggle("active",e==="props")}fillProps(e){var n;const t=(o,s)=>{this.shadow.getElementById(o).value=s??""};t("p-alt",e.alt),t("p-title",e.title),t("p-width",e.width),t("p-height",e.height),t("p-border",e.border),t("p-id",e.id),t("p-class",e.className),this.shadow.getElementById("p-align").value=e.align??"",(n=this.shadow.getElementById("err-p-alt"))==null||n.classList.remove("show")}bindEvents(){var t,n,o,s,a,r,d,p;const e=this.shadow;(t=e.getElementById("backdrop"))==null||t.addEventListener("click",h=>{h.target===e.getElementById("backdrop")&&this.onCancel()}),(n=e.getElementById("btn-close"))==null||n.addEventListener("click",()=>this.onCancel()),(o=e.getElementById("btn-cancel"))==null||o.addEventListener("click",()=>this.onCancel()),(s=e.getElementById("btn-apply"))==null||s.addEventListener("click",()=>this.onApply()),e.querySelectorAll(".tab-btn").forEach(h=>{h.addEventListener("click",()=>this.switchTab(h.dataset.tab))}),(a=e.getElementById("btn-rotate90"))==null||a.addEventListener("click",()=>void this.applyOp(()=>this.editor.rotate(this.currentDataUrl,90))),(r=e.getElementById("btn-flip-h"))==null||r.addEventListener("click",()=>void this.applyOp(()=>this.editor.flip(this.currentDataUrl,"horizontal"))),(d=e.getElementById("btn-flip-v"))==null||d.addEventListener("click",()=>void this.applyOp(()=>this.editor.flip(this.currentDataUrl,"vertical"))),(p=e.getElementById("btn-reset"))==null||p.addEventListener("click",async()=>{this.currentDataUrl=this.originalSrc,await this.renderPreview(this.originalSrc)})}async applyOp(e){if(!this.busy){this.busy=!0,this.setControlsDisabled(!0);try{this.currentDataUrl=await e(),await this.renderPreview(this.currentDataUrl)}catch{}finally{this.busy=!1,this.setControlsDisabled(!1)}}}async renderPreview(e){const t=this.shadow.getElementById("preview");if(!t)return;t.innerHTML='<span class="loading">처리 중...</span>';const n=document.createElement("img");n.alt="미리보기",await new Promise(o=>{n.onload=()=>o(),n.onerror=()=>o(),n.src=e}),t.innerHTML="",t.appendChild(n)}setControlsDisabled(e){this.shadow.querySelectorAll(".controls button, .btn-apply").forEach(t=>{t.disabled=e})}readProps(){const e=t=>this.shadow.getElementById(t).value.trim();return{alt:e("p-alt")||void 0,title:e("p-title")||void 0,width:e("p-width")||void 0,height:e("p-height")||void 0,border:e("p-border")||void 0,align:this.shadow.getElementById("p-align").value||void 0,id:e("p-id")||void 0,className:e("p-class")||void 0}}onApply(){var s;const e=this.readProps();if(((s=this.shadow.getElementById("tc-props"))==null?void 0:s.classList.contains("active"))&&!e.alt){this.shadow.getElementById("err-p-alt").classList.add("show"),this.shadow.getElementById("p-alt").focus();return}const n=this.originalSrc,o=this.currentDataUrl;this.close(),this.dispatchEvent(new CustomEvent("poa-image-edit-confirm",{bubbles:!0,composed:!0,detail:{original:n,edited:o,attrs:e}}))}onCancel(){this.close(),this.dispatchEvent(new CustomEvent("poa-image-edit-cancel",{bubbles:!0,composed:!0}))}}const Nl=`
:host { display: none; }
:host([open]) { display: block; }
.backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.45);
  z-index: 1050; display: flex; align-items: center; justify-content: center;
}
.dialog {
  background: #fff; border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  width: 540px; max-width: 96vw; max-height: 88vh;
  display: flex; flex-direction: column; overflow: hidden;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 20px; border-bottom: 1px solid #eee;
  font-size: 14px; font-weight: 600; color: #333;
}
.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #888; padding: 0 4px; line-height: 1;
}
.close-btn:hover { color: #333; }
.tabs { display: flex; border-bottom: 1px solid #ddd; background: #fafafa; }
.tab-btn {
  padding: 9px 20px; border: none; background: transparent;
  cursor: pointer; font-size: 13px; color: #666; border-bottom: 2px solid transparent;
}
.tab-btn.active { color: #1976d2; border-bottom-color: #1976d2; font-weight: 600; }
.tab-btn:hover:not(.active) { background: #f0f0f0; }
.body { flex: 1; overflow-y: auto; padding: 16px 20px; }
.panel { display: none; }
.panel.active { display: block; }
.field { margin-bottom: 12px; }
.field label { display: block; font-size: 12px; color: #555; margin-bottom: 4px; font-weight: 500; }
.field input, .field select {
  width: 100%; box-sizing: border-box;
  padding: 6px 9px; border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; outline: none;
}
.field input:focus, .field select:focus { border-color: #1976d2; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
.err { color: #d32f2f; font-size: 11px; margin-top: 3px; display: none; }
.err.show { display: block; }
.preview-box {
  margin-top: 10px; text-align: center; background: #f5f5f5;
  border-radius: 4px; padding: 10px; min-height: 60px;
  display: none;
}
.preview-box.show { display: block; }
.preview-box img { max-width: 100%; max-height: 160px; object-fit: contain; }
.file-drop {
  border: 2px dashed #ccc; border-radius: 4px; padding: 20px;
  text-align: center; color: #888; font-size: 13px; cursor: pointer;
  margin-bottom: 12px; transition: border-color .15s;
}
.file-drop:hover { border-color: #1976d2; color: #1976d2; }
.upload-list { list-style: none; margin: 0; padding: 0; }
.upload-item {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px;
}
.upload-item:last-child { border-bottom: none; }
.upload-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.upload-status { font-size: 11px; padding: 2px 6px; border-radius: 2px; white-space: nowrap; }
.status-pending  { background: #eee; color: #666; }
.status-uploading{ background: #e3f2fd; color: #1565c0; }
.status-done     { background: #e8f5e9; color: #2e7d32; }
.status-error    { background: #fce4ec; color: #c62828; }
.upload-errors { color: #c62828; font-size: 12px; margin-top: 8px; }
.upload-errors li { margin: 2px 0; }
.summary { font-size: 12px; color: #666; margin-top: 8px; }
.footer {
  display: flex; gap: 8px; justify-content: flex-end;
  padding: 12px 20px; border-top: 1px solid #eee;
}
.btn { padding: 7px 16px; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer; font-size: 13px; }
.btn:hover { background: #f5f5f5; }
.btn.primary { border-color: #1976d2; background: #1976d2; color: #fff; }
.btn.primary:hover { background: #1565c0; }
.btn:disabled { opacity: .45; cursor: default; }
#single-attrs { display: none; }
#multi-attrs  { display: none; }
`;function Pl(l){return l<1024*1024?`${(l/1024).toFixed(1)}KB`:`${(l/1024/1024).toFixed(1)}MB`}class Ol extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"uploader",new kr);c(this,"uploadConfig",null);c(this,"selectedFiles",[]);c(this,"busy",!1);c(this,"onErrorFn",null);this.shadow=this.attachShadow({mode:"open"})}setOnError(e){this.onErrorFn=e}connectedCallback(){this.shadow.innerHTML=`<style>${Nl}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="이미지 삽입">
    <div class="header">
      <span>이미지 삽입</span>
      <button class="close-btn" id="btn-close" title="닫기">×</button>
    </div>
    <div class="tabs">
      <button class="tab-btn active" data-tab="url">URL 입력</button>
      <button class="tab-btn" data-tab="file">파일 업로드</button>
    </div>
    <div class="body">

      <!-- URL 탭 -->
      <div class="panel active" id="panel-url">
        <div class="field">
          <label>이미지 URL *</label>
          <input id="inp-src" type="url" placeholder="https://example.com/image.png">
        </div>
        <div class="field">
          <label>대체 텍스트 (alt) *</label>
          <input id="inp-alt" type="text" placeholder="이미지 설명 — 접근성 필수">
          <div class="err" id="err-alt">alt 텍스트를 입력하세요.</div>
        </div>
        <div class="row2">
          <div class="field">
            <label>title</label>
            <input id="inp-title" type="text">
          </div>
          <div class="field">
            <label>정렬 (align)</label>
            <select id="sel-align">
              <option value="">기본</option>
              <option value="left">왼쪽 float</option>
              <option value="right">오른쪽 float</option>
            </select>
          </div>
        </div>
        <div class="row3">
          <div class="field">
            <label>가로 (width)</label>
            <input id="inp-width" type="text" placeholder="200px">
          </div>
          <div class="field">
            <label>세로 (height)</label>
            <input id="inp-height" type="text" placeholder="auto">
          </div>
          <div class="field">
            <label>테두리 (border)</label>
            <input id="inp-border" type="text" placeholder="1px solid #ccc">
          </div>
        </div>
        <div class="row2">
          <div class="field">
            <label>ID</label>
            <input id="inp-id" type="text">
          </div>
          <div class="field">
            <label>클래스 (class)</label>
            <input id="inp-class" type="text">
          </div>
        </div>
        <div class="preview-box" id="url-preview">
          <img id="preview-img" alt="미리보기" src="">
        </div>
      </div>

      <!-- 파일 업로드 탭 -->
      <div class="panel" id="panel-file">
        <div class="file-drop" id="file-drop" role="button" tabindex="0">
          클릭하거나 파일을 드래그하세요<br>
          <small>jpg · png · gif · webp · svg | 최대 20MB</small>
        </div>
        <input id="inp-file" type="file" accept=".jpg,.jpeg,.png,.gif,.webp,.svg" multiple style="display:none">

        <!-- 단일 파일 속성 입력 (1장 선택 시 표시) -->
        <div id="single-attrs">
          <div class="field">
            <label>대체 텍스트 (alt) *</label>
            <input id="inp-single-alt" type="text" placeholder="이미지 설명 — 접근성 필수">
            <div class="err" id="err-single-alt">alt 텍스트를 입력하세요.</div>
          </div>
          <div class="row2">
            <div class="field">
              <label>title</label>
              <input id="inp-single-title" type="text">
            </div>
            <div class="field">
              <label>정렬 (align)</label>
              <select id="sel-single-align">
                <option value="">기본</option>
                <option value="left">왼쪽 float</option>
                <option value="right">오른쪽 float</option>
              </select>
            </div>
          </div>
          <div class="row3">
            <div class="field">
              <label>가로 (width)</label>
              <input id="inp-single-width" type="text" placeholder="200px">
            </div>
            <div class="field">
              <label>세로 (height)</label>
              <input id="inp-single-height" type="text" placeholder="auto">
            </div>
            <div class="field">
              <label>테두리 (border)</label>
              <input id="inp-single-border" type="text" placeholder="1px solid #ccc">
            </div>
          </div>
          <div class="preview-box show" id="single-preview">
            <img id="single-preview-img" alt="미리보기" src="">
          </div>
        </div>

        <!-- 다중 파일 alt (여러 장 선택 시 표시) -->
        <div id="multi-attrs">
          <div class="field">
            <label>대체 텍스트 (alt) * — 모든 이미지에 일괄 적용</label>
            <input id="inp-file-alt" type="text" placeholder="이미지 설명">
            <div class="err" id="err-file-alt">alt 텍스트를 입력하세요.</div>
          </div>
        </div>

        <ul class="upload-list" id="upload-list"></ul>
        <div class="summary" id="upload-summary"></div>
        <ul class="upload-errors" id="upload-errors"></ul>
      </div>
    </div>

    <div class="footer">
      <button class="btn" id="btn-cancel">취소</button>
      <button class="btn primary" id="btn-confirm">삽입</button>
    </div>
  </div>
</div>`,this.bindEvents()}setUploadConfig(e){this.uploadConfig=e}open(){var e;this.reset(),this.setAttribute("open",""),(e=this.shadow.getElementById("inp-src"))==null||e.focus()}close(){this.removeAttribute("open")}reset(){var t,n,o,s;const e=this.shadow;e.getElementById("inp-src").value="",e.getElementById("inp-alt").value="",e.getElementById("inp-title").value="",e.getElementById("inp-width").value="",e.getElementById("inp-height").value="",e.getElementById("inp-border").value="",e.getElementById("inp-id").value="",e.getElementById("inp-class").value="",e.getElementById("sel-align").value="",(t=e.getElementById("err-alt"))==null||t.classList.remove("show"),(n=e.getElementById("url-preview"))==null||n.classList.remove("show"),e.getElementById("inp-single-alt").value="",e.getElementById("inp-single-title").value="",e.getElementById("inp-single-width").value="",e.getElementById("inp-single-height").value="",e.getElementById("inp-single-border").value="",e.getElementById("sel-single-align").value="",e.getElementById("single-preview-img").src="",(o=e.getElementById("err-single-alt"))==null||o.classList.remove("show"),e.getElementById("inp-file-alt").value="",(s=e.getElementById("err-file-alt"))==null||s.classList.remove("show"),e.getElementById("upload-list").innerHTML="",e.getElementById("upload-summary").textContent="",e.getElementById("upload-errors").innerHTML="",e.getElementById("single-attrs").style.display="none",e.getElementById("multi-attrs").style.display="none",this.selectedFiles=[],this.busy=!1,this.switchTab("url")}bindEvents(){var o,s,a,r,d,p;const e=this.shadow;(o=e.getElementById("backdrop"))==null||o.addEventListener("click",h=>{h.target===e.getElementById("backdrop")&&this.close()}),(s=e.getElementById("btn-close"))==null||s.addEventListener("click",()=>this.close()),(a=e.getElementById("btn-cancel"))==null||a.addEventListener("click",()=>this.close()),(r=e.getElementById("btn-confirm"))==null||r.addEventListener("click",()=>void this.onConfirm()),e.querySelectorAll(".tab-btn").forEach(h=>{h.addEventListener("click",()=>this.switchTab(h.dataset.tab))}),(d=e.getElementById("inp-src"))==null||d.addEventListener("input",()=>{this.updatePreview(),this.syncConfirmBtn()}),(p=e.getElementById("inp-alt"))==null||p.addEventListener("input",()=>this.syncConfirmBtn());const t=e.getElementById("file-drop"),n=e.getElementById("inp-file");t.addEventListener("click",()=>n.click()),t.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&n.click()}),t.addEventListener("dragover",h=>{h.preventDefault(),t.style.borderColor="#1976d2"}),t.addEventListener("dragleave",()=>{t.style.borderColor=""}),t.addEventListener("drop",h=>{var f;h.preventDefault(),t.style.borderColor="";const g=Array.from(((f=h.dataTransfer)==null?void 0:f.files)??[]);this.handleFiles(g)}),n.addEventListener("change",()=>{this.handleFiles(Array.from(n.files??[])),n.value=""})}switchTab(e){const t=this.shadow;t.querySelectorAll(".tab-btn").forEach(n=>n.classList.toggle("active",n.dataset.tab===e)),t.querySelectorAll(".panel").forEach(n=>n.classList.toggle("active",n.id===`panel-${e}`)),this.syncConfirmBtn()}syncConfirmBtn(){const e=this.shadow,t=e.getElementById("btn-confirm"),n=e.querySelector(".panel.active");if((n==null?void 0:n.id)==="panel-url"){const s=e.getElementById("inp-src").value.trim(),a=e.getElementById("inp-alt").value.trim();t.disabled=!s||!a,t.textContent="삽입";return}const o=e.getElementById("single-attrs").style.display!=="none";t.textContent=o?"삽입":"업로드 · 삽입",t.disabled=!1}updatePreview(){const e=this.shadow.getElementById("inp-src").value.trim(),t=this.shadow.getElementById("url-preview"),n=this.shadow.getElementById("preview-img");e?(n.src=e,t.classList.add("show")):t.classList.remove("show")}handleFiles(e){const{valid:t,errors:n}=this.uploader.validateFiles(e);this.selectedFiles.push(...t),this.renderErrors(n);const o=this.shadow;if(this.selectedFiles.length===1){o.getElementById("single-attrs").style.display="block",o.getElementById("multi-attrs").style.display="none",o.getElementById("upload-list").innerHTML="",o.getElementById("upload-summary").textContent="";const s=new FileReader;s.onload=a=>{var r;o.getElementById("single-preview-img").src=(r=a.target)==null?void 0:r.result},s.readAsDataURL(this.selectedFiles[0])}else if(this.selectedFiles.length>1){o.getElementById("single-attrs").style.display="none",o.getElementById("multi-attrs").style.display="block",this.renderUploadList();const s=this.selectedFiles.reduce((a,r)=>a+r.size,0);o.getElementById("upload-summary").textContent=`${this.selectedFiles.length}개 파일 선택됨 (${Pl(s)} / 20MB)`}this.syncConfirmBtn()}renderUploadList(e){const t=this.shadow.getElementById("upload-list"),n=e??this.selectedFiles.map(o=>({file:o,status:"pending",progress:0}));t.innerHTML=n.map(o=>{const s={pending:"대기",uploading:"업로드 중",done:"완료",error:"오류"},a=`status-${o.status}`,r=o.status==="error"?` — ${o.error??""}`:"";return`<li class="upload-item">
        <span class="upload-name">${o.file.name}</span>
        <span class="upload-status ${a}">${s[o.status]}${r}</span>
      </li>`}).join("")}renderErrors(e){const t=this.shadow.getElementById("upload-errors");t.innerHTML=e.map(n=>`<li>${n}</li>`).join("")}async onConfirm(){if(this.busy)return;const e=this.shadow.querySelector(".panel.active");(e==null?void 0:e.id)==="panel-url"?this.confirmUrl():await this.confirmUpload()}confirmUrl(){const e=this.shadow,t=e.getElementById("inp-src").value.trim(),n=e.getElementById("inp-alt").value.trim();if(!n){e.getElementById("err-alt").classList.add("show"),e.getElementById("inp-alt").focus();return}e.getElementById("err-alt").classList.remove("show");const o={src:t,alt:n,title:e.getElementById("inp-title").value.trim()||void 0,width:e.getElementById("inp-width").value.trim()||void 0,height:e.getElementById("inp-height").value.trim()||void 0,border:e.getElementById("inp-border").value.trim()||void 0,align:e.getElementById("sel-align").value||void 0,id:e.getElementById("inp-id").value.trim()||void 0,className:e.getElementById("inp-class").value.trim()||void 0};this.dispatch("poa-image-insert",{attrs:o}),this.close()}async confirmUpload(){if(this.selectedFiles.length===0)return;const e=this.shadow;if(e.getElementById("single-attrs").style.display!=="none"){const a=e.getElementById("inp-single-alt").value.trim();if(!a){e.getElementById("err-single-alt").classList.add("show"),e.getElementById("inp-single-alt").focus();return}e.getElementById("err-single-alt").classList.remove("show");const r={alt:a,title:e.getElementById("inp-single-title").value.trim()||void 0,width:e.getElementById("inp-single-width").value.trim()||void 0,height:e.getElementById("inp-single-height").value.trim()||void 0,border:e.getElementById("inp-single-border").value.trim()||void 0,align:e.getElementById("sel-single-align").value||void 0,src:""};this.busy=!0,e.getElementById("btn-confirm").disabled=!0;try{const d=this.selectedFiles[0];if(this.uploadConfig){const h=(await this.uploader.upload([d],{...this.uploadConfig,onProgress:g=>this.renderUploadList(g)}))[0];(h==null?void 0:h.status)==="done"&&h.url&&this.dispatch("poa-image-insert",{attrs:{...r,src:h.url}})}else{const p=await this.readAsDataUrl(d);this.dispatch("poa-image-insert",{attrs:{...r,src:p}})}this.busy=!1,this.close()}catch(d){(this.onErrorFn??(p=>console.error(p)))(d instanceof Error?d.message:"파일 읽기에 실패했습니다."),this.busy=!1,this.syncConfirmBtn()}return}const n=e.getElementById("inp-file-alt").value.trim();if(!n){e.getElementById("err-file-alt").classList.add("show"),e.getElementById("inp-file-alt").focus();return}if(e.getElementById("err-file-alt").classList.remove("show"),this.busy=!0,e.getElementById("btn-confirm").disabled=!0,!this.uploadConfig){try{for(const a of this.selectedFiles){const r=await this.readAsDataUrl(a);this.dispatch("poa-image-insert",{attrs:{src:r,alt:n}})}this.busy=!1,this.close()}catch(a){(this.onErrorFn??(r=>console.error(r)))(a instanceof Error?a.message:"파일 읽기에 실패했습니다."),this.busy=!1,this.syncConfirmBtn()}return}const o=await this.uploader.upload(this.selectedFiles,{...this.uploadConfig,onProgress:a=>this.renderUploadList(a)});o.forEach(a=>{a.status==="done"&&a.url&&this.dispatch("poa-image-insert",{attrs:{src:a.url,alt:n}})}),o.some(a=>a.status==="error")?(this.busy=!1,this.syncConfirmBtn()):(this.busy=!1,this.close())}readAsDataUrl(e){return new Promise((t,n)=>{const o=new FileReader;o.onload=()=>t(o.result),o.onerror=()=>n(new Error(`"${e.name}" 파일 읽기에 실패했습니다.`)),o.readAsDataURL(e)})}dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}}const lt=10,Ut=10,Je=22,ti=2,jl=`
:host { display: none; }
:host(.open) { display: block; }

.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 8000;
}
.dialog {
  background: #fff; border-radius: 6px;
  box-shadow: 0 4px 28px rgba(0,0,0,.22);
  width: 280px; overflow: hidden;
  font-size: 13px; color: #333;
  user-select: none;
}

/* ── 헤더 ──────────────────────────────────── */
.dlg-hd {
  display: flex; align-items: center; justify-content: space-between;
  padding: 9px 12px; border-bottom: 1px solid #eee;
  font-size: 14px; font-weight: 600;
}
.dlg-close {
  border: none; background: transparent;
  font-size: 16px; cursor: pointer; color: #999;
  line-height: 1; padding: 0 2px;
}
.dlg-close:hover { color: #333; }

/* ── 본문 ──────────────────────────────────── */
.dlg-body { padding: 12px 14px 14px; }

/* ── 프리셋 ────────────────────────────────── */
.preset-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-bottom: 11px;
}
.preset-item {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  cursor: pointer; border-radius: 4px; padding: 4px 2px;
  border: 2px solid transparent; transition: border-color .12s;
}
.preset-item:hover  { border-color: #90caf9; }
.preset-item.active { border-color: #1565c0; }
.preset-item svg    { display: block; pointer-events: none; }
.preset-lbl {
  font-size: 10px; color: #777; text-align: center;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;
  pointer-events: none;
}
.preset-item.active .preset-lbl { color: #1565c0; font-weight: 600; }

/* ── 구분선 ────────────────────────────────── */
.sep { border: none; border-top: 1px solid #eee; margin: 0 0 12px; }

/* ── 그리드 피커 ────────────────────────────── */
.grid-wrap { display: flex; flex-direction: column; align-items: center; gap: 7px; }
.grid-picker {
  display: grid;
  grid-template-columns: repeat(${lt}, ${Je}px);
  gap: ${ti}px;
  cursor: crosshair;
}
.gc {
  width: ${Je}px; height: ${Je}px;
  border: 1px solid #ddd; background: #fff;
  border-radius: 2px; box-sizing: border-box;
  pointer-events: none;
}
.gc.hl { background: #bbdefb; border-color: #1565c0; }
.grid-size {
  font-size: 13px; color: #444; font-weight: 500; height: 18px; line-height: 18px;
}

/* ── 속성 모드 ──────────────────────────────── */
.props-form {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 7px 10px; align-items: center;
}
.p-lbl { font-size: 12px; color: #666; text-align: right; }
.p-inp {
  height: 26px; padding: 0 7px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; box-sizing: border-box; width: 100%;
}
.p-sel {
  height: 26px; padding: 0 5px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; background: #fff; width: 100%;
}
.p-clr {
  height: 26px; width: 60px;
  border: 1px solid #ccc; border-radius: 3px;
  padding: 1px 2px; cursor: pointer;
}
.props-actions {
  display: flex; justify-content: flex-end;
  gap: 8px; margin-top: 14px;
}
.btn {
  height: 28px; padding: 0 14px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; cursor: pointer; background: #fff;
}
.btn-primary { background: #1565c0; color: #fff; border-color: #1565c0; }
.btn-primary:hover { background: #1251a3; }
.btn:not(.btn-primary):hover { background: #f5f5f5; }
`;class ct extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"selectedPreset","border-all");c(this,"gridCells",[]);this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>${jl}</style>
<div class="overlay" id="overlay">
  <div class="dialog" role="dialog" aria-modal="true">
    <div class="dlg-hd">
      <span id="dlg-title">표</span>
      <button class="dlg-close" id="btn-close" title="닫기">✕</button>
    </div>
    <div class="dlg-body" id="dlg-body"></div>
  </div>
</div>`,this.shadow.getElementById("btn-close").addEventListener("click",()=>this.close()),this.shadow.getElementById("overlay").addEventListener("click",e=>{e.target.id==="overlay"&&this.close()})}open(e){this.classList.add("open");const t=this.shadow.getElementById("dlg-body"),n=this.shadow.getElementById("dlg-title");e?(n.textContent="표 속성",this.renderProps(t,e)):(n.textContent="표",this.renderInsert(t))}close(){this.classList.remove("open"),this.gridCells=[]}renderInsert(e){const t=e.ownerDocument;e.innerHTML="";const n=t.createElement("div");n.className="preset-grid";for(const d of at){const p=t.createElement("div");p.className="preset-item"+(d.id===this.selectedPreset?" active":""),p.dataset.pid=d.id,p.innerHTML=`${d.icon}<span class="preset-lbl">${d.label}</span>`,p.addEventListener("click",()=>this.selectPreset(d.id)),n.appendChild(p)}e.appendChild(n);const o=t.createElement("hr");o.className="sep",e.appendChild(o);const s=t.createElement("div");s.className="grid-wrap";const a=t.createElement("div");a.className="grid-picker",this.gridCells=[];for(let d=0;d<Ut;d++)for(let p=0;p<lt;p++){const h=t.createElement("div");h.className="gc",h.dataset.r=String(d),h.dataset.c=String(p),a.appendChild(h),this.gridCells.push(h)}const r=t.createElement("div");r.className="grid-size",r.textContent="",a.addEventListener("mousemove",d=>{if(!d.target.closest(".grid-picker"))return;const h=a.getBoundingClientRect(),g=Je+ti,f=Math.min(Math.floor((d.clientX-h.left)/g),lt-1),m=Math.min(Math.floor((d.clientY-h.top)/g),Ut-1);this.highlightGrid(m,f),r.textContent=`${f+1} × ${m+1}`}),a.addEventListener("mouseleave",()=>{this.highlightGrid(-1,-1),r.textContent=""}),a.addEventListener("click",d=>{const p=a.getBoundingClientRect(),h=Je+ti,g=Math.min(Math.floor((d.clientX-p.left)/h),lt-1),f=Math.min(Math.floor((d.clientY-p.top)/h),Ut-1);this.insertTable(f+1,g+1)}),s.appendChild(a),s.appendChild(r),e.appendChild(s)}selectPreset(e){this.selectedPreset=e,this.shadow.querySelectorAll(".preset-item").forEach(t=>{t.classList.toggle("active",t.dataset.pid===e)})}highlightGrid(e,t){for(const n of this.gridCells){const o=parseInt(n.dataset.r??"0"),s=parseInt(n.dataset.c??"0");n.classList.toggle("hl",o<=e&&s<=t)}}insertTable(e,t){const n=at.find(s=>s.id===this.selectedPreset)??at[0],o={rows:e,cols:t,width:"100%",...n.baseOptions};this.dispatchEvent(new CustomEvent("poa-table-insert",{bubbles:!0,composed:!0,detail:{options:o,presetId:n.id}})),this.close()}renderProps(e,t){const n=t.style.width||"100%",o=ct.rgbToHex(t.style.backgroundColor)||"#ffffff",s=t.querySelector("td,th"),a=s==null?void 0:s.style.border.match(/solid\s+(#[\da-fA-F]{3,6}|[a-z]+)/i),r=a?a[1]:"#000000";let d="left";t.style.marginLeft==="auto"&&t.style.marginRight==="auto"?d="center":t.style.marginLeft==="auto"&&(d="right"),e.innerHTML=`
<div class="props-form">
  <label class="p-lbl">너비</label>
  <input  class="p-inp" id="pp-w"  type="text"  value="${n}">
  <label class="p-lbl">테두리 색</label>
  <input  class="p-clr" id="pp-bc" type="color" value="${r}">
  <label class="p-lbl">배경색</label>
  <input  class="p-clr" id="pp-bg" type="color" value="${o}">
  <label class="p-lbl">정렬</label>
  <select class="p-sel" id="pp-al">
    <option value="left">왼쪽</option>
    <option value="center">가운데</option>
    <option value="right">오른쪽</option>
  </select>
</div>
<div class="props-actions">
  <button class="btn"         id="pp-cancel">취소</button>
  <button class="btn btn-primary" id="pp-ok">적용</button>
</div>`,e.querySelector("#pp-al").value=d,e.querySelector("#pp-cancel").addEventListener("click",()=>this.close()),e.querySelector("#pp-ok").addEventListener("click",()=>{const p={width:e.querySelector("#pp-w").value.trim(),borderColor:e.querySelector("#pp-bc").value,bgColor:e.querySelector("#pp-bg").value,align:e.querySelector("#pp-al").value};this.dispatchEvent(new CustomEvent("poa-table-update",{bubbles:!0,composed:!0,detail:{options:p,table:t}})),this.close()})}static rgbToHex(e){const t=e.match(/\d+/g);return!t||t.length<3?"":"#"+t.slice(0,3).map(n=>parseInt(n).toString(16).padStart(2,"0")).join("")}static colorToHex(e){return ct.rgbToHex(e)||"#ffffff"}}const qt=[{label:"날짜 (2025-05-05)",fn:()=>new Date().toISOString().slice(0,10)},{label:"시간 (14:30:05)",fn:()=>new Intl.DateTimeFormat("ko-KR",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(new Date)},{label:"날짜·시간 (2025-05-05 14:30)",fn:()=>{const l=new Date,i=l.toISOString().slice(0,10),e=new Intl.DateTimeFormat("ko-KR",{hour:"2-digit",minute:"2-digit",hour12:!1}).format(l);return`${i} ${e}`}},{label:"한국어 날짜 (2025년 5월 5일)",fn:()=>new Intl.DateTimeFormat("ko-KR",{year:"numeric",month:"long",day:"numeric"}).format(new Date)},{label:"한국어 날짜·시간 (2025년 5월 5일 월요일 오후 2:30)",fn:()=>new Intl.DateTimeFormat("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long",hour:"numeric",minute:"2-digit"}).format(new Date)}],Wl=`
:host { display: none; }
:host([open]) { display: block; }
.backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.45);
  z-index: 1050; display: flex; align-items: center; justify-content: center;
}
.dialog {
  background: #fff; border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  width: 520px; max-width: 96vw; max-height: 90vh;
  display: flex; flex-direction: column; overflow: hidden;
}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 20px; border-bottom: 1px solid #eee;
  font-size: 14px; font-weight: 600; color: #333;
}
.close-btn {
  border: none; background: transparent; font-size: 20px;
  cursor: pointer; color: #888; padding: 0 4px; line-height: 1;
}
.close-btn:hover { color: #333; }
.tabs { display: flex; border-bottom: 1px solid #ddd; background: #fafafa; }
.tab-btn {
  padding: 9px 20px; border: none; background: transparent;
  cursor: pointer; font-size: 13px; color: #666; border-bottom: 2px solid transparent;
}
.tab-btn.active { color: #1976d2; border-bottom-color: #1976d2; font-weight: 600; }
.tab-btn:hover:not(.active) { background: #f0f0f0; }
.body { flex: 1; overflow-y: auto; padding: 16px 20px; }
.panel { display: none; }
.panel.active { display: block; }
.field { margin-bottom: 12px; }
.field label { display: block; font-size: 12px; color: #555; margin-bottom: 4px; font-weight: 500; }
.field input, .field select, .field textarea {
  width: 100%; box-sizing: border-box;
  padding: 6px 9px; border: 1px solid #ccc; border-radius: 3px;
  font-size: 13px; outline: none; font-family: inherit;
}
.field input:focus, .field select:focus { border-color: #1976d2; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.err { color: #d32f2f; font-size: 11px; margin-top: 3px; display: none; }
.err.show { display: block; }
.rel-hint {
  font-size: 11px; color: #388e3c; margin-top: 4px;
  background: #f1f8e9; border-radius: 3px; padding: 3px 8px; display: none;
}
.rel-hint.show { display: block; }
.footer {
  display: flex; gap: 8px; justify-content: flex-end;
  padding: 12px 20px; border-top: 1px solid #eee;
}
.btn { padding: 7px 16px; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer; font-size: 13px; }
.btn:hover { background: #f5f5f5; }
.btn.primary { border-color: #1976d2; background: #1976d2; color: #fff; }
.btn.primary:hover { background: #1565c0; }
.btn.danger { border-color: #d32f2f; background: #fff; color: #d32f2f; }
.btn.danger:hover { background: #fce4ec; }
.btn.sm { padding: 4px 10px; font-size: 12px; }
.btn:disabled { opacity: .45; cursor: default; }

/* 책갈피 탭 */
.bm-create { display: flex; gap: 8px; align-items: flex-end; margin-bottom: 16px; }
.bm-create .field { margin-bottom: 0; flex: 1; }
.bm-list-header {
  font-size: 12px; font-weight: 600; color: #555;
  margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #eee;
}
.bm-list { list-style: none; margin: 0; padding: 0; max-height: 200px; overflow-y: auto; }
.bm-item {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 0; border-bottom: 1px solid #f5f5f5; font-size: 13px;
}
.bm-item:last-child { border-bottom: none; }
.bm-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bm-id { font-size: 11px; color: #999; font-family: monospace; }
.bm-edit-row { display: flex; gap: 6px; margin-top: 4px; }
.bm-edit-row input { flex: 1; padding: 4px 6px; border: 1px solid #1976d2; border-radius: 3px; font-size: 12px; }
.bm-empty { font-size: 13px; color: #999; padding: 12px 0; text-align: center; }

/* 날짜·시간 탭 */
.dt-preset {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 12px; border: 1px solid #eee; border-radius: 4px;
  margin-bottom: 8px; font-size: 13px;
}
.dt-preview { flex: 1; color: #333; }
.dt-format { font-size: 11px; color: #999; margin-left: 8px; }
`;class Ul extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"bookmarks",[]);c(this,"editingId",null);c(this,"editingAnchor",null);this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>${Wl}</style>
<div class="backdrop" id="backdrop">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="링크 삽입">
    <div class="header">
      <span id="dialog-title">링크 삽입</span>
      <button class="close-btn" id="btn-close" title="닫기">×</button>
    </div>
    <div class="tabs">
      <button class="tab-btn active" data-tab="link">하이퍼링크</button>
      <button class="tab-btn" data-tab="bookmark">책갈피</button>
      <button class="tab-btn" data-tab="datetime">날짜·시간</button>
    </div>
    <div class="body">

      <!-- 하이퍼링크 탭 -->
      <div class="panel active" id="panel-link">
        <div class="field">
          <label>URL *</label>
          <input id="inp-href" type="url" placeholder="https://example.com">
          <div class="err" id="err-href">유효한 URL을 입력하세요.</div>
        </div>
        <div class="field">
          <label>링크 텍스트 *</label>
          <input id="inp-text" type="text" placeholder="링크에 표시할 텍스트">
          <div class="err" id="err-text">링크 텍스트를 입력하세요.</div>
        </div>
        <div class="field">
          <label>제목 (title)</label>
          <input id="inp-title" type="text" placeholder="마우스 오버 시 표시">
        </div>
        <div class="row2">
          <div class="field">
            <label>열기 방식</label>
            <select id="sel-target">
              <option value="">현재 탭</option>
              <option value="_blank">새 탭 (_blank)</option>
            </select>
          </div>
        </div>
        <div class="rel-hint" id="rel-hint">
          rel="noopener noreferrer" 자동 추가됩니다 (보안)
        </div>
      </div>

      <!-- 책갈피 탭 -->
      <div class="panel" id="panel-bookmark">
        <div class="bm-create">
          <div class="field">
            <label>새 책갈피 레이블</label>
            <input id="inp-bm-label" type="text" placeholder="책갈피 이름">
          </div>
          <button class="btn primary sm" id="btn-bm-create">만들기</button>
        </div>

        <div class="bm-list-header">책갈피 목록</div>
        <ul class="bm-list" id="bm-list"></ul>
      </div>

      <!-- 날짜·시간 탭 -->
      <div class="panel" id="panel-datetime">
        <div id="dt-presets"></div>
      </div>

    </div>
    <div class="footer">
      <button class="btn" id="btn-cancel">닫기</button>
      <button class="btn primary" id="btn-confirm">삽입</button>
    </div>
  </div>
</div>`,this.buildDatetimePresets(),this.bindEvents()}setBookmarks(e){this.bookmarks=e,this.isConnected&&this.renderBookmarkList()}open(e="link",t){var n,o,s;if(this.reset(),this.editingAnchor=t??null,this.setAttribute("open",""),this.switchTab(e),e==="link"){if(t){const a=this.shadow;a.getElementById("inp-href").value=t.getAttribute("href")??"",a.getElementById("inp-text").value=t.textContent??"",a.getElementById("inp-title").value=t.title??"";const r=t.target==="_blank"?"_blank":"";a.getElementById("sel-target").value=r,(n=a.getElementById("rel-hint"))==null||n.classList.toggle("show",r==="_blank"),a.getElementById("dialog-title").textContent="링크 수정",a.getElementById("btn-confirm").textContent="수정"}(o=this.shadow.getElementById("inp-href"))==null||o.focus()}else e==="bookmark"&&((s=this.shadow.getElementById("inp-bm-label"))==null||s.focus())}close(){this.removeAttribute("open"),this.editingId=null,this.editingAnchor=null}reset(){var t,n,o;const e=this.shadow;e.getElementById("inp-href").value="",e.getElementById("inp-text").value="",e.getElementById("inp-title").value="",e.getElementById("sel-target").value="",e.getElementById("inp-bm-label").value="",(t=e.getElementById("err-href"))==null||t.classList.remove("show"),(n=e.getElementById("err-text"))==null||n.classList.remove("show"),(o=e.getElementById("rel-hint"))==null||o.classList.remove("show"),e.getElementById("dialog-title").textContent="링크 삽입",e.getElementById("btn-confirm").textContent="삽입",this.editingId=null,this.editingAnchor=null,this.renderBookmarkList()}bindEvents(){var t,n,o,s,a,r,d;const e=this.shadow;(t=e.getElementById("backdrop"))==null||t.addEventListener("click",p=>{p.target===e.getElementById("backdrop")&&this.close()}),(n=e.getElementById("btn-close"))==null||n.addEventListener("click",()=>this.close()),(o=e.getElementById("btn-cancel"))==null||o.addEventListener("click",()=>this.close()),(s=e.getElementById("btn-confirm"))==null||s.addEventListener("click",()=>this.onConfirm()),e.querySelectorAll(".tab-btn").forEach(p=>{p.addEventListener("click",()=>this.switchTab(p.dataset.tab))}),(a=e.getElementById("sel-target"))==null||a.addEventListener("change",()=>{var h;const p=e.getElementById("sel-target").value==="_blank";(h=e.getElementById("rel-hint"))==null||h.classList.toggle("show",p)}),(r=e.getElementById("btn-bm-create"))==null||r.addEventListener("click",()=>this.onBookmarkCreate()),(d=e.getElementById("inp-bm-label"))==null||d.addEventListener("keydown",p=>{p.key==="Enter"&&this.onBookmarkCreate()})}switchTab(e){const t=this.shadow;t.querySelectorAll(".tab-btn").forEach(s=>s.classList.toggle("active",s.dataset.tab===e)),t.querySelectorAll(".panel").forEach(s=>s.classList.toggle("active",s.id===`panel-${e}`));const n={link:"링크 삽입",bookmark:"책갈피 관리",datetime:"날짜·시간 삽입"};t.getElementById("dialog-title").textContent=n[e];const o=t.getElementById("btn-confirm");e==="bookmark"?o.style.display="none":(o.style.display="",o.textContent="삽입")}onConfirm(){const e=this.shadow.querySelector(".panel.active");(e==null?void 0:e.id)==="panel-link"&&this.confirmLink()}confirmLink(){const e=this.shadow,t=e.getElementById("inp-href").value.trim(),n=e.getElementById("inp-text").value.trim(),o=e.getElementById("inp-title").value.trim(),s=e.getElementById("sel-target").value;let a=!0;const r=t.startsWith("#")?t.length>1:(()=>{try{return new URL(t),!0}catch{return!1}})();if(!t||!r?(e.getElementById("err-href").classList.add("show"),e.getElementById("inp-href").focus(),a=!1):e.getElementById("err-href").classList.remove("show"),n?e.getElementById("err-text").classList.remove("show"):(e.getElementById("err-text").classList.add("show"),a&&e.getElementById("inp-text").focus(),a=!1),!a)return;const d={href:t,text:n,title:o||void 0,target:s==="_blank"?"_blank":"_self"};this.editingAnchor?this.dispatch("poa-link-update",{anchor:this.editingAnchor,attrs:d}):this.dispatch("poa-link-insert",{attrs:d}),this.close()}onBookmarkCreate(){const e=this.shadow.getElementById("inp-bm-label"),t=e.value.trim();if(!t){e.focus();return}this.dispatch("poa-bookmark-create",{label:t}),e.value="",e.focus()}renderBookmarkList(){const e=this.shadow.getElementById("bm-list");if(e){if(this.bookmarks.length===0){e.innerHTML='<li class="bm-empty">책갈피가 없습니다.</li>';return}e.innerHTML=this.bookmarks.map(t=>`
      <li class="bm-item" data-id="${t.id}">
        <span class="bm-label" title="${t.label}">${t.label}</span>
        <span class="bm-id">#${t.id}</span>
        <button class="btn sm" data-action="link" data-id="${t.id}" title="이 책갈피로 링크 삽입">링크</button>
        <button class="btn sm" data-action="edit" data-id="${t.id}" title="수정">수정</button>
        <button class="btn sm danger" data-action="delete" data-id="${t.id}" title="삭제">삭제</button>
      </li>
      ${this.editingId===t.id?`
      <li class="bm-item" style="padding:4px 0;">
        <div class="bm-edit-row" style="flex:1;">
          <input id="inp-bm-edit" type="text" value="${t.label}" placeholder="새 레이블">
          <button class="btn sm primary" data-action="save" data-id="${t.id}">저장</button>
          <button class="btn sm" data-action="cancel-edit">취소</button>
        </div>
      </li>`:""}
    `).join(""),e.addEventListener("click",t=>{const n=t.target.closest("[data-action]");if(!n)return;const o=n.dataset.action,s=n.dataset.id??"";o==="link"?this.onBookmarkLink(s):o==="edit"?this.onBookmarkEditStart(s):o==="save"?this.onBookmarkSave(s):o==="delete"?this.onBookmarkDelete(s):o==="cancel-edit"&&(this.editingId=null,this.renderBookmarkList())},{once:!0})}}onBookmarkLink(e){const t=this.bookmarks.find(n=>n.id===e);t&&(this.dispatch("poa-bookmark-link-insert",{bookmarkId:e,text:t.label}),this.close())}onBookmarkEditStart(e){var t;this.editingId=e,this.renderBookmarkList(),(t=this.shadow.getElementById("inp-bm-edit"))==null||t.focus()}onBookmarkSave(e){const t=this.shadow.getElementById("inp-bm-edit"),n=(t==null?void 0:t.value.trim())??"";if(!n){t==null||t.focus();return}this.dispatch("poa-bookmark-update",{id:e,label:n}),this.editingId=null}onBookmarkDelete(e){this.dispatch("poa-bookmark-delete",{id:e})}buildDatetimePresets(){const e=this.shadow.getElementById("dt-presets");e&&(e.innerHTML=qt.map((t,n)=>`
      <div class="dt-preset">
        <span class="dt-preview" id="dt-prev-${n}"></span>
        <span class="dt-format">${t.label}</span>
        <button class="btn sm primary" data-preset="${n}">삽입</button>
      </div>
    `).join(""),this.refreshDatetimePreviews(),e.addEventListener("click",t=>{var a;const n=t.target.closest("[data-preset]");if(!n)return;const o=parseInt(n.dataset.preset??"0"),s=((a=qt[o])==null?void 0:a.fn())??"";this.dispatch("poa-datetime-insert",{text:s}),this.close()}))}refreshDatetimePreviews(){qt.forEach((e,t)=>{const n=this.shadow.getElementById(`dt-prev-${t}`);n&&(n.textContent=e.fn())})}dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}}const ql=`
:host { display: none; }
:host([open]) {
  display: flex; align-items: center; gap: 6px;
  position: fixed; z-index: 1040;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,.18);
  padding: 5px 10px;
  font-size: 12px;
  color: #333;
  white-space: nowrap;
  pointer-events: all;
  user-select: none;
}
label { color: #555; }
.inp {
  width: 52px; padding: 2px 4px;
  border: 1px solid #ccc; border-radius: 3px;
  font-size: 12px; text-align: right; outline: none;
}
.inp:focus { border-color: #1976d2; }
.unit { color: #888; margin-right: 4px; }
.sep { width: 1px; height: 18px; background: #e0e0e0; margin: 0 2px; }
.cb-wrap { display: flex; align-items: center; gap: 4px; cursor: pointer; }
.cb-wrap input { margin: 0; cursor: pointer; }
.btn {
  padding: 3px 8px; border: 1px solid #ccc; border-radius: 3px;
  background: #f5f5f5; font-size: 12px; cursor: pointer;
}
.btn:hover { background: #e8e8e8; }
`;class Vl extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"img",null);c(this,"aspectLocked",!1);c(this,"naturalW",0);c(this,"naturalH",0);this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>${ql}</style>
<label>너비</label>
<input class="inp" id="inp-w" type="number" min="20" max="9999">
<span class="unit">px</span>
<label>높이</label>
<input class="inp" id="inp-h" type="number" min="20" max="9999">
<span class="unit">px</span>
<div class="sep"></div>
<label class="cb-wrap">
  <input type="checkbox" id="cb-ratio">비율고정
</label>
<div class="sep"></div>
<button class="btn" id="btn-reset">원본크기</button>`,this.bindEvents()}show(e){this.img=e,this.naturalW=e.naturalWidth||Math.round(e.getBoundingClientRect().width),this.naturalH=e.naturalHeight||Math.round(e.getBoundingClientRect().height),this.aspectLocked=!1,this.shadow.getElementById("cb-ratio").checked=!1,this.setAttribute("open",""),this.updateInputsFromImg(),this.positionNear(e)}update(e){this.img===e&&(this.updateInputsFromImg(),this.positionNear(e))}hide(){this.img=null,this.removeAttribute("open")}bindEvents(){const e=this.shadow,t=e.getElementById("inp-w"),n=e.getElementById("inp-h"),o=e.getElementById("cb-ratio"),s=e.getElementById("btn-reset");o.addEventListener("change",()=>{this.aspectLocked=o.checked}),t.addEventListener("change",()=>this.onWidthChange(t)),n.addEventListener("change",()=>this.onHeightChange(n)),t.addEventListener("keydown",a=>{a.key==="Enter"&&this.onWidthChange(t)}),n.addEventListener("keydown",a=>{a.key==="Enter"&&this.onHeightChange(n)}),this.shadow.addEventListener("mousedown",a=>a.stopPropagation()),s.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poa-img-reset-size",{bubbles:!0,composed:!0}))})}onWidthChange(e){if(!this.img)return;let t=parseInt(e.value,10);(isNaN(t)||t<20)&&(t=20,e.value="20");let n;if(this.aspectLocked&&this.naturalW>0&&this.naturalH>0){const o=Math.round(parseFloat(this.img.style.height)||this.img.getBoundingClientRect().height),s=Math.round(parseFloat(this.img.style.width)||this.img.getBoundingClientRect().width),a=s>0?o/s:this.naturalH/this.naturalW;n=Math.max(20,Math.round(t*a)),this.shadow.getElementById("inp-h").value=String(n)}else n=Math.round(parseFloat(this.img.style.height)||this.img.getBoundingClientRect().height);this.dispatchEvent(new CustomEvent("poa-img-size-change",{bubbles:!0,composed:!0,detail:{width:t,height:n}}))}onHeightChange(e){if(!this.img)return;let t=parseInt(e.value,10);(isNaN(t)||t<20)&&(t=20,e.value="20");let n;if(this.aspectLocked&&this.naturalW>0&&this.naturalH>0){const o=Math.round(parseFloat(this.img.style.height)||this.img.getBoundingClientRect().height),s=Math.round(parseFloat(this.img.style.width)||this.img.getBoundingClientRect().width),a=o>0?s/o:this.naturalW/this.naturalH;n=Math.max(20,Math.round(t*a)),this.shadow.getElementById("inp-w").value=String(n)}else n=Math.round(parseFloat(this.img.style.width)||this.img.getBoundingClientRect().width);this.dispatchEvent(new CustomEvent("poa-img-size-change",{bubbles:!0,composed:!0,detail:{width:n,height:t}}))}updateInputsFromImg(){if(!this.img)return;const e=this.img.getBoundingClientRect(),t=Math.round(parseFloat(this.img.style.width)||e.width),n=Math.round(parseFloat(this.img.style.height)||e.height);this.shadow.getElementById("inp-w").value=String(t),this.shadow.getElementById("inp-h").value=String(n)}positionNear(e){const t=e.getBoundingClientRect(),n=36,s=window.innerHeight-t.bottom>n+10?t.bottom+6:t.top-n-6;this.style.top=`${Math.max(0,s)}px`,this.style.left=`${Math.max(0,t.left)}px`}}const Gl=`
:host { display: none; }
:host([open]) { display: block; }

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 99998;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.dialog {
  background: #FFFFFF;
  border-radius: 10px;
  padding: 24px;
  min-width: 300px;
  max-width: 440px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: dlgIn 0.15s ease;
}

@keyframes dlgIn {
  from { transform: translateY(-8px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.message {
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  margin: 0 0 24px;
  white-space: pre-wrap;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn-cancel {
  height: 36px;
  padding: 0 16px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.1s;
}
.btn-cancel:hover { background: #F9FAFB; }

.btn-ok {
  height: 36px;
  padding: 0 16px;
  background: #1F2937;
  border: none;
  border-radius: 6px;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.1s;
}
.btn-ok:hover { background: #374151; }
`,Yl=`
<div class="overlay" id="overlay">
  <div class="dialog">
    <p class="title">
      <span>⚠️</span>
      <span id="dlg-title">확인</span>
    </p>
    <p class="message" id="dlg-message"></p>
    <div class="buttons">
      <button class="btn-cancel" id="btn-cancel">취소</button>
      <button class="btn-ok"     id="btn-ok">확인</button>
    </div>
  </div>
</div>
`;class Xl extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"resolvePromise",null);this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>${Gl}</style>${Yl}`,this.bindEvents()}show(e,t="확인"){const n=this.shadow.getElementById("dlg-title"),o=this.shadow.getElementById("dlg-message");return n&&(n.textContent=t),o&&(o.textContent=e),this.setAttribute("open",""),new Promise(s=>{this.resolvePromise=s})}close(e){var t;this.removeAttribute("open"),(t=this.resolvePromise)==null||t.call(this,e),this.resolvePromise=null}bindEvents(){var e,t,n;(e=this.shadow.getElementById("btn-ok"))==null||e.addEventListener("click",()=>this.close(!0)),(t=this.shadow.getElementById("btn-cancel"))==null||t.addEventListener("click",()=>this.close(!1)),(n=this.shadow.getElementById("overlay"))==null||n.addEventListener("click",o=>{o.target.id==="overlay"&&this.close(!1)}),this.addEventListener("keydown",o=>{o.key==="Escape"&&(o.preventDefault(),this.close(!1))})}}const st={error:"●",warning:"▲",info:"ℹ"},Kl={error:"#DC2626",warning:"#D97706",info:"#2563EB"},Jl=`
:host { display: none; }
:host([open]) { display: block; }

* { box-sizing: border-box; }

.overlay {
  position: fixed; inset: 0; z-index: 99990;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.dialog {
  background: #FFFFFF;
  border-radius: 10px;
  width: 580px; max-width: 96vw;
  max-height: 82vh;
  display: flex; flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  animation: dlgIn 0.15s ease;
}
@keyframes dlgIn {
  from { transform: translateY(-10px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}

/* ── 헤더 ── */
.header {
  background: #1F2937; color: #FFFFFF;
  padding: 14px 20px;
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.header h2 { margin: 0; font-size: 15px; font-weight: 600; }
.close-btn {
  width: 28px; height: 28px; border: none; background: transparent;
  color: #9CA3AF; font-size: 18px; cursor: pointer; border-radius: 5px;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background 0.1s, color 0.1s;
}
.close-btn:hover { background: rgba(255,255,255,0.1); color: #FFFFFF; }

/* ── 요약 바 ── */
.summary-bar {
  display: flex; gap: 8px; padding: 12px 16px;
  background: #F9FAFB; border-bottom: 1px solid #E5E7EB;
  flex-shrink: 0;
}
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 12px; border-radius: 20px;
  font-size: 13px; font-weight: 600;
}
.badge-error   { background: #FEE2E2; color: #DC2626; }
.badge-warning { background: #FEF3C7; color: #D97706; }
.badge-info    { background: #EFF6FF; color: #2563EB; }
.badge-pass    { background: #DCFCE7; color: #16A34A; }

/* ── 툴바 ── */
.toolbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px; border-bottom: 1px solid #E5E7EB; flex-shrink: 0;
}
.filter-select {
  height: 30px; padding: 0 8px; border: 1px solid #D1D5DB; border-radius: 6px;
  background: #FFFFFF; font-size: 13px; cursor: pointer; outline: none;
}
.btn-fix-all {
  height: 30px; padding: 0 14px;
  background: #1F2937; color: #FFFFFF; border: none;
  border-radius: 6px; font-size: 13px; cursor: pointer;
  transition: background 0.1s;
}
.btn-fix-all:hover { background: #374151; }
.btn-fix-all:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── 로딩 ── */
.loading {
  display: none; flex-direction: column; align-items: center;
  justify-content: center; gap: 12px; padding: 40px;
  color: #6B7280; font-size: 14px;
}
:host([loading]) .loading  { display: flex; }
:host([loading]) .issue-list { display: none; }

/* ── 이슈 목록 ── */
.issue-list { overflow-y: auto; flex: 1; }

.issue-card {
  border-bottom: 1px solid #F3F4F6;
}
.issue-card[hidden] { display: none; }

.issue-header {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 16px; cursor: pointer;
  border-left: 4px solid #E5E7EB;
  transition: background 0.1s;
  user-select: none;
}
.issue-header:hover { background: #F9FAFB; }

.issue-card[data-level="error"]   .issue-header { border-left-color: #DC2626; }
.issue-card[data-level="warning"] .issue-header { border-left-color: #D97706; }
.issue-card[data-level="info"]    .issue-header { border-left-color: #2563EB; }

.issue-icon  { font-size: 13px; flex-shrink: 0; }
.issue-title { font-size: 13px; font-weight: 500; color: #111827; flex: 1; }
.issue-arrow { color: #9CA3AF; font-size: 11px; flex-shrink: 0; transition: transform 0.15s; }
.issue-card.expanded .issue-arrow { transform: rotate(180deg); }

.issue-body {
  display: none; padding: 0 16px 12px 30px;
}
.issue-card.expanded .issue-body { display: block; }

.issue-message {
  font-size: 12px; color: #6B7280; margin: 0 0 10px;
  font-family: 'Courier New', monospace; word-break: break-all;
}
.issue-actions { display: flex; gap: 8px; flex-wrap: wrap; }

.btn {
  height: 26px; padding: 0 12px; font-size: 12px; font-weight: 500;
  border-radius: 5px; cursor: pointer; transition: background 0.1s;
}
.btn-nav {
  background: #FFFFFF; border: 1px solid #D1D5DB; color: #374151;
}
.btn-nav:hover { background: #F9FAFB; }
.btn-fix {
  background: #EFF6FF; border: 1px solid #BFDBFE; color: #2563EB;
}
.btn-fix:hover { background: #DBEAFE; }

/* ── 인라인 수정 패널 ── */
.fix-panel {
  display: none; margin-top: 10px; padding: 12px;
  background: #F9FAFB; border-radius: 6px; border: 1px solid #E5E7EB;
}
.fix-panel.open { display: block; }
.fix-panel label {
  display: block; font-size: 12px; color: #374151; margin-bottom: 6px;
}
.fix-input {
  width: 100%; height: 30px; padding: 0 8px;
  border: 1px solid #CBD5E1; border-radius: 5px;
  font-size: 13px; outline: none;
  transition: border-color 0.12s;
}
.fix-input:focus { border-color: #3B82F6; }
.fix-row { display: flex; gap: 8px; margin-top: 8px; }
.btn-apply {
  height: 28px; padding: 0 14px;
  background: #2563EB; color: #FFFFFF; border: none;
  border-radius: 5px; font-size: 12px; font-weight: 500; cursor: pointer;
  transition: background 0.1s;
}
.btn-apply:hover { background: #1D4ED8; }
.btn-auto-fix {
  height: 28px; padding: 0 14px;
  background: #16A34A; color: #FFFFFF; border: none;
  border-radius: 5px; font-size: 12px; font-weight: 500; cursor: pointer;
  transition: background 0.1s;
}
.btn-auto-fix:hover { background: #15803D; }
.no-fix-msg { font-size: 12px; color: #9CA3AF; }

/* ── 결과 없음 ── */
.empty {
  display: none; padding: 32px; text-align: center;
  color: #6B7280; font-size: 14px;
}
.empty-icon { font-size: 32px; margin-bottom: 8px; }
`;class Zl extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"issues",[]);c(this,"contentEl",null);c(this,"rerunFn",null);c(this,"currentFilter","all");this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=`<style>${Jl}</style>
<div class="overlay" id="overlay">
  <div class="dialog">
    <div class="header">
      <h2>웹 접근성 검사 결과</h2>
      <button class="close-btn" id="btn-close" title="닫기">✕</button>
    </div>
    <div class="summary-bar" id="summary-bar"></div>
    <div class="toolbar">
      <select class="filter-select" id="filter-select">
        <option value="all">전체</option>
        <option value="error">오류만</option>
        <option value="warning">경고만</option>
        <option value="info">정보만</option>
      </select>
      <button class="btn-fix-all" id="btn-fix-all">모두 수정</button>
    </div>
    <div class="loading" id="loading">
      <div>⏳</div>
      <div>접근성 검사 중...</div>
    </div>
    <div class="issue-list" id="issue-list"></div>
  </div>
</div>`,this.bindEvents()}setup(e,t){this.contentEl=e,this.rerunFn=t}startLoading(){this.setAttribute("open",""),this.setAttribute("loading","")}show(e){this.issues=e.issues,this.currentFilter="all",this.setAttribute("open",""),this.removeAttribute("loading"),this.renderSummary(e),this.renderIssues(),this.syncFilterSelect()}close(){this.removeAttribute("open"),this.removeAttribute("loading")}renderSummary(e){const t=this.shadow.getElementById("summary-bar");if(t){if(e.errorCount===0&&e.warningCount===0&&e.infoCount===0){t.innerHTML='<span class="badge badge-pass">✓ 문제 없음</span>';return}t.innerHTML=[e.errorCount>0?`<span class="badge badge-error">   ${st.error}   오류 ${e.errorCount}개</span>`:"",e.warningCount>0?`<span class="badge badge-warning">${st.warning} 경고 ${e.warningCount}개</span>`:"",e.infoCount>0?`<span class="badge badge-info">   ${st.info}   정보 ${e.infoCount}개</span>`:""].join("")}}renderIssues(){const e=this.shadow.getElementById("issue-list");if(!e)return;const t=this.shadow.getElementById("btn-fix-all"),n=this.issues.some(o=>o.autoFix);if(t&&(t.disabled=!n),this.issues.length===0){e.innerHTML=`<div class="empty" style="display:block">
        <div class="empty-icon">✅</div>
        <div>접근성 문제가 없습니다!</div>
      </div>`;return}e.innerHTML=this.issues.map((o,s)=>this.renderCard(o,s)).join(""),this.applyFilter(),this.bindCardEvents()}renderCard(e,t){const n=Kl[e.level],o=st[e.level],s=this.buildFixPanelHTML(e,t);return`
<div class="issue-card" data-level="${e.level}" data-idx="${t}">
  <div class="issue-header">
    <span class="issue-icon" style="color:${n}">${o}</span>
    <span class="issue-title">${vn(e.title)}</span>
    <span class="issue-arrow">∨</span>
  </div>
  <div class="issue-body">
    <p class="issue-message">${vn(e.message)}</p>
    <div class="issue-actions">
      ${e.element?`<button class="btn btn-nav" data-idx="${t}">해당 요소로 이동</button>`:""}
      <button class="btn btn-fix" data-idx="${t}">직접 수정</button>
    </div>
    <div class="fix-panel" id="fp-${t}">${s}</div>
  </div>
</div>`}buildFixPanelHTML(e,t){return e.id==="img-alt-missing"||e.id==="img-alt-empty"?`<label>alt 텍스트</label>
        <div class="fix-row">
          <input type="text" class="fix-input" id="fi-${t}" placeholder="이미지 설명 입력">
          <button class="btn-apply" data-idx="${t}" data-action="set-alt">적용</button>
        </div>`:e.id==="table-caption-missing"?`<label>표 캡션</label>
        <div class="fix-row">
          <input type="text" class="fix-input" id="fi-${t}" placeholder="표 제목 입력">
          <button class="btn-apply" data-idx="${t}" data-action="set-caption">적용</button>
        </div>`:e.id==="link-vague-text"||e.id==="link-no-text"?`<label>링크 텍스트</label>
        <div class="fix-row">
          <input type="text" class="fix-input" id="fi-${t}" placeholder="링크 설명 입력">
          <button class="btn-apply" data-idx="${t}" data-action="set-link-text">적용</button>
        </div>`:e.autoFix?`<button class="btn-auto-fix" data-idx="${t}" data-action="auto-fix">자동 수정</button>`:'<span class="no-fix-msg">자동 수정을 지원하지 않습니다.</span>'}bindEvents(){var e,t,n,o;(e=this.shadow.getElementById("btn-close"))==null||e.addEventListener("click",()=>this.close()),(t=this.shadow.getElementById("overlay"))==null||t.addEventListener("click",s=>{s.target.id==="overlay"&&this.close()}),(n=this.shadow.getElementById("filter-select"))==null||n.addEventListener("change",s=>{this.currentFilter=s.target.value,this.applyFilter()}),(o=this.shadow.getElementById("btn-fix-all"))==null||o.addEventListener("click",()=>this.doFixAll()),this.addEventListener("keydown",s=>{s.key==="Escape"&&(s.preventDefault(),this.close())})}bindCardEvents(){const e=this.shadow.getElementById("issue-list");e&&e.addEventListener("click",t=>{var p,h;const n=t.target,o=n.closest(".issue-header");if(o){(p=o.closest(".issue-card"))==null||p.classList.toggle("expanded");return}const s=n.closest(".btn-nav");if(s){const g=parseInt(s.dataset.idx??"-1");this.navigateTo(((h=this.issues[g])==null?void 0:h.element)??null);return}const a=n.closest(".btn-fix");if(a){const g=a.dataset.idx,f=this.shadow.getElementById(`fp-${g}`);f==null||f.classList.toggle("open");return}const r=n.closest(".btn-apply");if(r){const g=parseInt(r.dataset.idx??"-1"),f=r.dataset.action??"",m=this.shadow.getElementById(`fi-${g}`),b=(m==null?void 0:m.value.trim())??"";this.applyFix(g,f,b);return}const d=n.closest('[data-action="auto-fix"]');if(d){const g=parseInt(d.dataset.idx??"-1");this.applyFix(g,"auto-fix","")}})}navigateTo(e){!e||!this.contentEl||(e.scrollIntoView({behavior:"smooth",block:"center"}),e.style.outline="3px solid #F59E0B",e.style.outlineOffset="2px",setTimeout(()=>{e.style.outline="",e.style.outlineOffset=""},2e3))}applyFix(e,t,n){var s,a,r;const o=this.issues[e];if(o){switch(t){case"set-alt":(s=o.element)==null||s.setAttribute("alt",n||"이미지");break;case"set-caption":{const d=o.element;if(d){let p=d.querySelector("caption");p||(p=d.ownerDocument.createElement("caption"),d.prepend(p)),p.textContent=n||"표"}break}case"set-link-text":o.element&&(o.element.textContent=n);break;case"auto-fix":(a=o.autoFix)==null||a.call(o);break}(r=this.rerunFn)==null||r.call(this)}}doFixAll(){var t;(this.currentFilter==="all"?this.issues:this.issues.filter(n=>n.level===this.currentFilter)).forEach(n=>{var o;return(o=n.autoFix)==null?void 0:o.call(n)}),(t=this.rerunFn)==null||t.call(this)}applyFilter(){this.shadow.querySelectorAll(".issue-card").forEach(t=>{const n=t.dataset.level;t.hidden=this.currentFilter!=="all"&&n!==this.currentFilter})}syncFilterSelect(){const e=this.shadow.getElementById("filter-select");e&&(e.value="all")}}function vn(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const Ql={"very-high":"🔴",high:"🟠",medium:"🟡"},ed={"very-high":"매우높음",high:"높음",medium:"중간"},Vt=`
:host { display: none; }
:host([open]) { display: block; }

* { box-sizing: border-box; }

.overlay {
  position: fixed; inset: 0; z-index: 99990;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.dialog {
  background: #fff;
  border-radius: 8px;
  width: 520px; max-width: 96vw;
  max-height: 80vh;
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  overflow: hidden;
}

.header {
  background: #1F2937;
  color: #fff;
  padding: 14px 18px;
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.header h2 { margin: 0; font-size: 15px; font-weight: 600; }
.header button {
  background: transparent; border: none; color: #9CA3AF;
  font-size: 18px; cursor: pointer; line-height: 1; padding: 2px 6px;
}
.header button:hover { color: #fff; }

.summary {
  padding: 12px 18px;
  background: #FFF7ED;
  border-bottom: 1px solid #FED7AA;
  font-size: 13px; color: #92400E;
  flex-shrink: 0;
}
.summary.clean {
  background: #F0FDF4; border-color: #86EFAC; color: #166534;
}

.toolbar {
  padding: 10px 18px;
  border-bottom: 1px solid #E5E7EB;
  display: flex; align-items: center; gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
}
.toolbar select {
  padding: 4px 8px; border: 1px solid #D1D5DB; border-radius: 4px;
  font-size: 12px; background: #fff; cursor: pointer;
}
.toolbar-spacer { flex: 1; }
.btn {
  padding: 5px 12px; border-radius: 4px; font-size: 12px;
  cursor: pointer; border: 1px solid #D1D5DB;
  background: #fff; color: #374151;
  white-space: nowrap;
}
.btn:hover { background: #F3F4F6; }
.btn.danger { background: #FEF2F2; border-color: #FCA5A5; color: #B91C1C; }
.btn.danger:hover { background: #FEE2E2; }
.btn.mask { background: #EFF6FF; border-color: #93C5FD; color: #1D4ED8; }
.btn.mask:hover { background: #DBEAFE; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }

.list {
  overflow-y: auto;
  flex: 1;
  padding: 8px 0;
}
.list::-webkit-scrollbar { width: 6px; }
.list::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }

.card {
  margin: 4px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  overflow: hidden;
}
.card[data-level="very-high"] { border-color: #FCA5A5; }
.card[data-level="high"]      { border-color: #FCD34D; }
.card[data-level="medium"]    { border-color: #93C5FD; }

.card-header {
  padding: 9px 12px;
  display: flex; align-items: center; gap: 8px;
  cursor: pointer;
  user-select: none;
  background: #F9FAFB;
}
.card[data-level="very-high"] .card-header { background: #FFF5F5; }
.card[data-level="high"]      .card-header { background: #FFFBEB; }
.card-header:hover { filter: brightness(0.97); }

.card-icon { font-size: 14px; }
.card-label { font-size: 13px; font-weight: 600; color: #1F2937; flex: 1; }
.card-risk {
  font-size: 10px; padding: 2px 6px; border-radius: 10px;
  font-weight: 600;
}
.card[data-level="very-high"] .card-risk { background: #FEE2E2; color: #B91C1C; }
.card[data-level="high"]      .card-risk { background: #FEF3C7; color: #92400E; }
.card[data-level="medium"]    .card-risk { background: #EFF6FF; color: #1D4ED8; }
.card-toggle { font-size: 11px; color: #6B7280; }

.card-body {
  padding: 10px 14px;
  border-top: 1px solid #E5E7EB;
  background: #fff;
}
.card-body.hidden { display: none; }

.raw-text {
  font-family: 'Courier New', monospace;
  font-size: 12px; color: #DC2626;
  background: #FFF5F5; padding: 4px 8px;
  border-radius: 3px; margin-bottom: 6px;
  word-break: break-all;
}
.location { font-size: 11px; color: #6B7280; margin-bottom: 8px; }

.card-actions { display: flex; gap: 6px; flex-wrap: wrap; }
.card-actions .btn { font-size: 11px; padding: 4px 10px; }

.empty {
  text-align: center; padding: 40px 20px;
  color: #6B7280; font-size: 13px;
}

.loading {
  display: flex; align-items: center; justify-content: center;
  padding: 40px 20px; gap: 10px; color: #6B7280; font-size: 13px;
}
.spinner {
  width: 20px; height: 20px;
  border: 2px solid #E5E7EB;
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
`;class td extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"items",[]);c(this,"filteredType","all");c(this,"onModified",null);c(this,"onConfirmFn",null);this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`<style>${Vt}</style><slot></slot>`}setup(e,t){this.onModified=e,this.onConfirmFn=t}startLoading(){var e;this.setAttribute("open",""),this.shadow.innerHTML=`<style>${Vt}</style>
<div class="overlay">
  <div class="dialog">
    <div class="header">
      <h2>개인정보 검사</h2>
      <button id="btn-close">✕</button>
    </div>
    <div class="loading"><div class="spinner"></div>검사 중…</div>
  </div>
</div>`,(e=this.shadow.getElementById("btn-close"))==null||e.addEventListener("click",()=>this.close())}show(e){this.items=e,this.filteredType="all",this.setAttribute("open",""),this.render()}close(){this.removeAttribute("open"),this.items=[]}render(){const e=this.buildTypeOptions(),t=this.visibleMatches(),n=this.items.length;this.shadow.innerHTML=`<style>${Vt}</style>
<div class="overlay" id="overlay">
  <div class="dialog" id="dialog">
    <div class="header">
      <h2>개인정보 검사 결과</h2>
      <button id="btn-close">✕</button>
    </div>

    <div class="summary ${n===0?"clean":""}">
      ${n===0?"✅ 개인정보가 발견되지 않았습니다.":`⚠ 총 <strong>${n}개</strong>의 개인정보가 발견됐습니다.`}
    </div>

    ${n>0?`
    <div class="toolbar">
      <select id="filter-type">
        <option value="all">전체 (${n})</option>
        ${e}
      </select>
      <div class="toolbar-spacer"></div>
      <button class="btn danger" id="btn-delete-all">전체 삭제</button>
      <button class="btn mask"   id="btn-mask-all">전체 마스킹</button>
    </div>`:""}

    <div class="list" id="list">
      ${n===0?'<div class="empty">검사할 내용이 없거나 개인정보가 없습니다.</div>':t.map(o=>this.buildCard(o)).join("")}
    </div>
  </div>
</div>`,this.bindEvents()}buildTypeOptions(){const e=new Map;for(const t of this.items)e.set(t.label,(e.get(t.label)??0)+1);return Array.from(e.entries()).map(([t,n])=>`<option value="${t}">${t} (${n})</option>`).join("")}buildCard(e){return`
<div class="card" data-level="${e.riskLevel}" data-id="${e.id}">
  <div class="card-header" data-toggle="${e.id}">
    <span class="card-icon">${Ql[e.riskLevel]}</span>
    <span class="card-label">${e.label}</span>
    <span class="card-risk">${ed[e.riskLevel]}</span>
    <span class="card-toggle">∨</span>
  </div>
  <div class="card-body" id="body-${e.id}">
    <div class="raw-text">"${yn(e.raw)}"</div>
    <div class="location">위치: ${e.locationLabel}</div>
    <div class="card-actions">
      <button class="btn" data-action="navigate" data-id="${e.id}">이동</button>
      <button class="btn danger" data-action="delete" data-id="${e.id}">삭제</button>
      <button class="btn mask"   data-action="mask"   data-id="${e.id}">마스킹 (${yn(e.masked)})</button>
    </div>
  </div>
</div>`}visibleMatches(){return this.filteredType==="all"?this.items:this.items.filter(e=>e.label===this.filteredType)}bindEvents(){var t,n,o,s,a,r,d;const e=this.shadow;(t=e.getElementById("btn-close"))==null||t.addEventListener("click",()=>this.close()),(n=e.getElementById("overlay"))==null||n.addEventListener("click",()=>this.close()),(o=e.getElementById("dialog"))==null||o.addEventListener("click",p=>p.stopPropagation()),(s=e.getElementById("filter-type"))==null||s.addEventListener("change",p=>{this.filteredType=p.target.value,this.renderList()}),(a=e.getElementById("btn-delete-all"))==null||a.addEventListener("click",async()=>{var h,g;await(((h=this.onConfirmFn)==null?void 0:h.call(this,`탐지된 ${this.visibleMatches().length}개 항목을 모두 삭제할까요?`))??Promise.resolve(!0))&&(fe.deleteAll(this.visibleMatches()),this.items=this.items.filter(f=>f.highlightEl!==null),(g=this.onModified)==null||g.call(this),this.render())}),(r=e.getElementById("btn-mask-all"))==null||r.addEventListener("click",()=>{var p;fe.maskAll(this.visibleMatches()),this.items=this.items.filter(h=>h.highlightEl!==null),(p=this.onModified)==null||p.call(this),this.render()}),e.querySelectorAll("[data-toggle]").forEach(p=>{p.addEventListener("click",()=>{const h=p.dataset.toggle,g=e.getElementById(`body-${h}`),f=p.querySelector(".card-toggle");if(!g)return;const m=!g.classList.contains("hidden");g.classList.toggle("hidden",m),f&&(f.textContent=m?"›":"∨")})}),(d=e.getElementById("list"))==null||d.addEventListener("click",p=>{var b,w;const h=p.target.closest("[data-action]");if(!h)return;const g=h.dataset.id,f=this.items.find(v=>v.id===g);if(!f)return;const m=h.dataset.action;m==="navigate"?this.navigateTo(f):m==="delete"?(fe.deleteMatch(f),this.items=this.items.filter(v=>v.id!==g),(b=this.onModified)==null||b.call(this),this.render()):m==="mask"&&(fe.maskMatch(f),this.items=this.items.filter(v=>v.id!==g),(w=this.onModified)==null||w.call(this),this.render())})}renderList(){const e=this.shadow.getElementById("list");if(!e)return;const t=this.visibleMatches();e.innerHTML=t.length===0?'<div class="empty">해당 유형의 항목이 없습니다.</div>':t.map(n=>this.buildCard(n)).join(""),e.querySelectorAll("[data-toggle]").forEach(n=>{n.addEventListener("click",()=>{const o=n.dataset.toggle,s=this.shadow.getElementById(`body-${o}`),a=n.querySelector(".card-toggle");if(!s)return;const r=!s.classList.contains("hidden");s.classList.toggle("hidden",r),a&&(a.textContent=r?"›":"∨")})})}navigateTo(e){const t=e.highlightEl;if(!t)return;t.scrollIntoView({behavior:"smooth",block:"center"});const n=t.style.outline;t.style.outline="2px solid #F59E0B",t.style.outlineOffset="2px",setTimeout(()=>{t.style.outline=n,t.style.outlineOffset=""},2e3)}}function yn(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const wn=`
:host { display: none; }
:host([open]) { display: block; }

* { box-sizing: border-box; margin: 0; padding: 0; }

.overlay {
  position: fixed; inset: 0; z-index: 99990;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.overlay.pick-mode { pointer-events: none; }

.dialog {
  background: #fff; border-radius: 8px;
  width: 440px; max-width: 96vw; max-height: 88vh;
  display: flex; flex-direction: column;
  box-shadow: 0 8px 32px rgba(0,0,0,.25);
  overflow: hidden;
  pointer-events: all;
}

.header {
  background: #1F2937; color: #fff;
  padding: 13px 18px;
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.header h2 { font-size: 14px; font-weight: 600; }
.header button {
  background: transparent; border: none; color: #9CA3AF;
  font-size: 18px; cursor: pointer; padding: 2px 6px; line-height: 1;
}
.header button:hover { color: #fff; }

.body { overflow-y: auto; flex: 1; padding: 0 18px; }
.body::-webkit-scrollbar { width: 5px; }
.body::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }

.section {
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
}
.section:last-child { border-bottom: none; }

.section-title {
  font-size: 12px; font-weight: 600; color: #374151;
  margin-bottom: 8px;
  display: flex; align-items: center; gap: 8px;
}

.radio-group { display: flex; flex-direction: column; gap: 5px; }
.radio-group label,
.radio-row label {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: #374151; cursor: pointer;
}
.radio-row { display: flex; flex-wrap: wrap; gap: 10px; }

.range-row {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #6B7280;
  flex-wrap: wrap;
}
.range-row label { display: flex; align-items: center; gap: 3px; font-size: 12px; }
.range-row span { font-weight: 600; color: #374151; margin-right: 2px; }
.separator { color: #D1D5DB; margin: 0 4px; font-size: 16px; }

input[type="number"] {
  width: 52px; padding: 4px 6px;
  border: 1px solid #D1D5DB; border-radius: 4px;
  font-size: 12px; text-align: center;
}
input[type="number"]:focus { outline: none; border-color: #3B82F6; }

input[type="color"] {
  width: 36px; height: 28px; border: 1px solid #D1D5DB;
  border-radius: 4px; cursor: pointer; padding: 1px 2px;
}

.target-other-row {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #6B7280; margin-top: 5px;
  flex-wrap: wrap;
}
.target-other-row label { display: flex; align-items: center; gap: 3px; }

.style-row { display: flex; gap: 20px; }
.style-row label { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #374151; }

.btn-pick {
  padding: 2px 8px; border: 1px solid #3B82F6; border-radius: 3px;
  background: #EFF6FF; color: #1D4ED8; font-size: 11px; cursor: pointer;
}
.btn-pick:hover { background: #DBEAFE; }

.footer {
  padding: 12px 18px;
  border-top: 1px solid #E5E7EB;
  display: flex; justify-content: flex-end; gap: 8px;
  flex-shrink: 0;
}
.btn {
  padding: 6px 16px; border-radius: 4px; font-size: 13px; cursor: pointer;
  border: 1px solid #D1D5DB; background: #fff; color: #374151;
}
.btn:hover { background: #F3F4F6; }
.btn.primary { background: #1F2937; color: #fff; border-color: #1F2937; }
.btn.primary:hover { background: #374151; }

.decimal-places-wrap {
  display: inline-flex; align-items: center; gap: 4px; font-size: 12px;
}
.decimal-places-wrap input { width: 44px; }
`;class id extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"currentTable",null);c(this,"currentRow",1);c(this,"currentCol",1);c(this,"pickBar",null);this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`<style>${wn}</style>`}open(e){this.currentTable=e.table,this.currentRow=e.cellRow,this.currentCol=e.cellCol,this.setAttribute("open",""),this.render(e.existingFormula,e.initialRange)}close(){this.removeAttribute("open"),this.exitPickMode(),this.currentTable=null}applyRange(e,t,n,o){this.exitPickMode();const s=r=>this.shadow.getElementById(r),a=(r,d)=>{const p=s(r);p&&(p.value=String(d))};a("sr",e),a("sc",t),a("er",n),a("ec",o)}render(e,t){var y,C;const n=(e==null?void 0:e.fn)??"SUM",o=(e==null?void 0:e.format)??"integer",s=(e==null?void 0:e.decimalPlaces)??2,[a,r,d,p]=(e==null?void 0:e.range)??t??[1,1,1,1],h=(e==null?void 0:e.targetRow)??this.currentRow,g=(e==null?void 0:e.targetCol)??this.currentCol,f=!e||e.targetRow===this.currentRow&&e.targetCol===this.currentCol,m=((y=e==null?void 0:e.style)==null?void 0:y.backgroundColor)??"#ffffff",b=((C=e==null?void 0:e.style)==null?void 0:C.color)??"#000000",w=(L,D)=>`<label><input type="radio" name="fn" value="${L}"${n===L?" checked":""}> ${L} (${D})</label>`,v=(L,D)=>`<label><input type="radio" name="format" value="${L}"${o===L?" checked":""}> ${D}</label>`;this.shadow.innerHTML=`<style>${wn}</style>
<div class="overlay" id="overlay">
  <div class="dialog" id="dialog">
    <div class="header">
      <h2>계산식 설정</h2>
      <button id="btn-close">✕</button>
    </div>

    <div class="body">
      <!-- 함수 선택 -->
      <div class="section">
        <div class="section-title">함수 선택</div>
        <div class="radio-group">
          ${w("SUM","합계")}
          ${w("AVERAGE","평균")}
          ${w("PRODUCT","곱셈")}
          ${w("SUBTRACT","뺄셈")}
        </div>
      </div>

      <!-- 계산 범위 -->
      <div class="section">
        <div class="section-title">
          계산 범위
          <button class="btn-pick" id="btn-pick">범위 선택</button>
        </div>
        <div class="range-row">
          <span>시작</span>
          <label>행 <input id="sr" type="number" min="1" value="${a}"></label>
          <label>열 <input id="sc" type="number" min="1" value="${r}"></label>
          <span class="separator">→</span>
          <span>끝</span>
          <label>행 <input id="er" type="number" min="1" value="${d}"></label>
          <label>열 <input id="ec" type="number" min="1" value="${p}"></label>
        </div>
      </div>

      <!-- 결과 셀 -->
      <div class="section">
        <div class="section-title">결과 셀</div>
        <div class="radio-group">
          <label>
            <input type="radio" name="target" value="current"${f?" checked":""}>
            현재 셀에 출력
          </label>
          <label>
            <input type="radio" name="target" value="other"${f?"":" checked"}>
            다른 셀 지정
          </label>
        </div>
        <div class="target-other-row" id="target-other-row" style="${f?"opacity:.4;pointer-events:none":""}">
          <label>행 <input id="tr" type="number" min="1" value="${h}"></label>
          <label>열 <input id="tc" type="number" min="1" value="${g}"></label>
        </div>
      </div>

      <!-- 결과 포맷 -->
      <div class="section">
        <div class="section-title">결과 포맷</div>
        <div class="radio-row">
          ${v("integer","정수")}
          <label>
            <input type="radio" name="format" value="decimal"${o==="decimal"?" checked":""}>
            소수점
            <span class="decimal-places-wrap">
              <input id="dp" type="number" min="0" max="10" value="${s}"> 자리
            </span>
          </label>
          ${v("currency","통화 (₩)")}
          ${v("percent","퍼센트 (%)")}
        </div>
      </div>

      <!-- 스타일 -->
      <div class="section">
        <div class="section-title">결과 셀 스타일 <span style="font-weight:400;color:#9CA3AF">(선택)</span></div>
        <div class="style-row">
          <label>배경색 <input type="color" id="bg-color" value="${m}"></label>
          <label>글자색 <input type="color" id="text-color" value="${b}"></label>
        </div>
      </div>
    </div>

    <div class="footer">
      <button class="btn" id="btn-cancel">취소</button>
      <button class="btn primary" id="btn-confirm">확인</button>
    </div>
  </div>
</div>`,this.bindEvents()}bindEvents(){var t,n,o,s,a,r;const e=this.shadow;(t=e.getElementById("btn-close"))==null||t.addEventListener("click",()=>this.close()),(n=e.getElementById("btn-cancel"))==null||n.addEventListener("click",()=>this.close()),(o=e.getElementById("overlay"))==null||o.addEventListener("click",()=>this.close()),(s=e.getElementById("dialog"))==null||s.addEventListener("click",d=>d.stopPropagation()),e.querySelectorAll('input[name="target"]').forEach(d=>{d.addEventListener("change",()=>{const p=e.getElementById("target-other-row");p&&(d.value==="other"?(p.style.opacity="1",p.style.pointerEvents="auto"):(p.style.opacity="0.4",p.style.pointerEvents="none"))})}),(a=e.getElementById("btn-pick"))==null||a.addEventListener("click",()=>{this.enterPickMode()}),(r=e.getElementById("btn-confirm"))==null||r.addEventListener("click",()=>this.confirm())}confirm(){var f,m,b,w,v,y;if(!this.currentTable)return;const e=C=>this.shadow.getElementById(C),t=C=>{var L;return Math.max(1,parseInt(((L=e(C))==null?void 0:L.value)??"1",10))},n=((f=this.shadow.querySelector('input[name="fn"]:checked'))==null?void 0:f.value)??"SUM",o=((m=this.shadow.querySelector('input[name="format"]:checked'))==null?void 0:m.value)??"integer",s=((b=this.shadow.querySelector('input[name="target"]:checked'))==null?void 0:b.value)??"current",a=parseInt(((w=e("dp"))==null?void 0:w.value)??"2",10),r=((v=e("bg-color"))==null?void 0:v.value)??"",d=((y=e("text-color"))==null?void 0:y.value)??"",p=s==="current"?this.currentRow:t("tr"),h=s==="current"?this.currentCol:t("tc"),g={fn:n,range:[t("sr"),t("sc"),t("er"),t("ec")],targetRow:p,targetCol:h,format:o,decimalPlaces:o==="decimal"?a:void 0,style:{backgroundColor:r!=="#ffffff"?r:void 0,color:d!=="#000000"?d:void 0}};this.dispatchEvent(new CustomEvent("poa-formula-apply",{bubbles:!0,composed:!1,detail:{formula:g,table:this.currentTable}})),this.close()}enterPickMode(){var n;const e=this.shadow.getElementById("overlay");e==null||e.classList.add("pick-mode");const t=document.createElement("div");t.style.cssText=["position:fixed","top:20px","left:50%","transform:translateX(-50%)","background:#1F2937","color:#fff","padding:8px 18px","border-radius:6px","display:flex","align-items:center","gap:14px","z-index:100000","font-size:13px","font-family:system-ui,sans-serif","box-shadow:0 4px 12px rgba(0,0,0,.3)"].join(";"),t.innerHTML=`
      <span>표에서 셀을 드래그하여 범위를 선택하세요</span>
      <button id="cancel-pick" style="
        background:#374151;border:none;color:#fff;padding:4px 10px;
        border-radius:4px;cursor:pointer;font-size:12px;
      ">취소</button>`,document.body.appendChild(t),this.pickBar=t,(n=t.querySelector("#cancel-pick"))==null||n.addEventListener("click",()=>this.exitPickMode()),this.dispatchEvent(new CustomEvent("poa-formula-start-pick",{bubbles:!0}))}exitPickMode(){var t;const e=this.shadow.getElementById("overlay");e==null||e.classList.remove("pick-mode"),(t=this.pickBar)==null||t.remove(),this.pickBar=null}}customElements.get("poa-menubar")||customElements.define("poa-menubar",ea);customElements.get("poa-context-toolbar")||customElements.define("poa-context-toolbar",El);customElements.get("poa-toolbar")||customElements.define("poa-toolbar",Al);customElements.get("poa-status-bar")||customElements.define("poa-status-bar",Ml);customElements.get("poa-settings-dialog")||customElements.define("poa-settings-dialog",_l);customElements.get("poa-find-replace-dialog")||customElements.define("poa-find-replace-dialog",Hl);customElements.get("poa-image-edit-dialog")||customElements.define("poa-image-edit-dialog",zl);customElements.get("poa-image-dialog")||customElements.define("poa-image-dialog",Ol);customElements.get("poa-table-dialog")||customElements.define("poa-table-dialog",ct);customElements.get("poa-cell-split-dialog")||customElements.define("poa-cell-split-dialog",Lr);customElements.get("poa-link-dialog")||customElements.define("poa-link-dialog",Ul);customElements.get("poa-image-toolbar")||customElements.define("poa-image-toolbar",Vl);customElements.get("poa-confirm-dialog")||customElements.define("poa-confirm-dialog",Xl);customElements.get("poa-accessibility-dialog")||customElements.define("poa-accessibility-dialog",Zl);customElements.get("poa-privacy-dialog")||customElements.define("poa-privacy-dialog",td);customElements.get("poa-formula-dialog")||customElements.define("poa-formula-dialog",id);customElements.get("poa-video-dialog")||customElements.define("poa-video-dialog",Tr);customElements.get("poa-form-control-dialog")||customElements.define("poa-form-control-dialog",Dr);customElements.get("poa-template-tree")||customElements.define("poa-template-tree",Hr);customElements.get("poa-template-dialog")||customElements.define("poa-template-dialog",Nr);customElements.get("poa-signature-dialog")||customElements.define("poa-signature-dialog",qr);customElements.get("poa-emoji-dialog")||customElements.define("poa-emoji-dialog",Gr);customElements.get("poa-tooltip-dialog")||customElements.define("poa-tooltip-dialog",Xr);customElements.get("poa-input-property-dialog")||customElements.define("poa-input-property-dialog",Jr);customElements.get("poa-editor")||customElements.define("poa-editor",ei);const ve=document.getElementById("editor"),pt=document.getElementById("output"),_n=`
<h2>poa-editor v1.0.0</h2>
<p>안녕하세요! <strong>poa-editor</strong>에 오신 것을 환영합니다.</p>
<p>텍스트를 선택하고 <em>툴바 버튼</em>으로 서식을 적용해보세요.</p>
<ul>
  <li>글머리 기호 목록</li>
  <li><strong>굵게</strong>, <em>기울임</em>, <u>밑줄</u></li>
  <li>글자색 · 배경색 · 글꼴 변경</li>
</ul>
<p>표 삽입 → 삽입 메뉴 → 표를 사용해보세요.</p>
`.trim();document.getElementById("btn-get-html").addEventListener("click",()=>{pt.style.display="block",pt.textContent=ve.getHTML()});document.getElementById("btn-set-html").addEventListener("click",()=>{ve.setHTML(_n),pt.style.display="none"});document.getElementById("btn-clear").addEventListener("click",()=>{ve.setHTML(""),pt.style.display="none"});document.getElementById("btn-find").addEventListener("click",()=>{var l;(l=ve.querySelector(".poa-editor-content"))==null||l.focus(),ve.dispatchEvent(new KeyboardEvent("keydown",{key:"f",ctrlKey:!0,bubbles:!0}))});document.getElementById("btn-replace").addEventListener("click",()=>{var l;(l=ve.querySelector(".poa-editor-content"))==null||l.focus(),ve.dispatchEvent(new KeyboardEvent("keydown",{key:"h",ctrlKey:!0,bubbles:!0}))});document.getElementById("btn-undo").addEventListener("click",()=>{var l;(l=ve.querySelector(".poa-editor-content"))==null||l.focus(),document.execCommand("undo")});document.getElementById("btn-redo").addEventListener("click",()=>{var l;(l=ve.querySelector(".poa-editor-content"))==null||l.focus(),document.execCommand("redo")});setTimeout(()=>ve.setHTML(_n),100);
