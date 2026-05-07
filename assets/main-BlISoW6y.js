const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/dist-BltSwrmZ.js","assets/dist-BioMHKUN.js","assets/dist-CM7C67hO.js"])))=>i.map(i=>d[i]);
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var{entries:e,setPrototypeOf:t,isFrozen:n,getPrototypeOf:r,getOwnPropertyDescriptor:i}=Object,{freeze:a,seal:o,create:s}=Object,{apply:c,construct:l}=typeof Reflect<`u`&&Reflect;a||=function(e){return e},o||=function(e){return e},c||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},l||=function(e){return new e(...[...arguments].slice(1))};var u=C(Array.prototype.forEach),d=C(Array.prototype.lastIndexOf),f=C(Array.prototype.pop),p=C(Array.prototype.push),m=C(Array.prototype.splice),h=Array.isArray,g=C(String.prototype.toLowerCase),_=C(String.prototype.toString),v=C(String.prototype.match),ee=C(String.prototype.replace),y=C(String.prototype.indexOf),b=C(String.prototype.trim),te=C(Number.prototype.toString),ne=C(Boolean.prototype.toString),re=typeof BigInt>`u`?null:C(BigInt.prototype.toString),ie=typeof Symbol>`u`?null:C(Symbol.prototype.toString),x=C(Object.prototype.hasOwnProperty),ae=C(Object.prototype.toString),S=C(RegExp.prototype.test),oe=se(TypeError);function C(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return c(e,t,n)}}function se(e){return function(){return l(e,[...arguments])}}function w(e,r){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:g;if(t&&t(e,null),!h(r))return e;let a=r.length;for(;a--;){let t=r[a];if(typeof t==`string`){let e=i(t);e!==t&&(n(r)||(r[a]=e),t=e)}e[t]=!0}return e}function T(e){for(let t=0;t<e.length;t++)x(e,t)||(e[t]=null);return e}function E(t){let n=s(null);for(let[r,i]of e(t))x(t,r)&&(h(i)?n[r]=T(i):i&&typeof i==`object`&&i.constructor===Object?n[r]=E(i):n[r]=i);return n}function ce(e){switch(typeof e){case`string`:return e;case`number`:return te(e);case`boolean`:return ne(e);case`bigint`:return re?re(e):`0`;case`symbol`:return ie?ie(e):`Symbol()`;case`undefined`:return ae(e);case`function`:case`object`:{if(e===null)return ae(e);let t=e,n=D(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:ae(e)}return ae(e)}default:return ae(e)}}function D(e,t){for(;e!==null;){let n=i(e,t);if(n){if(n.get)return C(n.get);if(typeof n.value==`function`)return C(n.value)}e=r(e)}function n(){return null}return n}function le(e){try{return S(e,``),!0}catch{return!1}}var O=a(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),k=a(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),ue=a([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),de=a([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),A=a(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),fe=a([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),pe=a([`#text`]),me=a(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),he=a(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-rendering.textlength.type.u1.u2.unicode.values.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),ge=a(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),_e=a([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),ve=o(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ye=o(/<%[\w\W]*|[\w\W]*%>/gm),be=o(/\$\{[\w\W]*/gm),xe=o(/^data-[\-\w.\u00B7-\uFFFF]+$/),Se=o(/^aria-[\-\w]+$/),Ce=o(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),j=o(/^(?:\w+script|data):/i),we=o(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Te=o(/^html$/i),Ee=o(/^[a-z][.\w]*(-[.\w]+)+$/i),De=Object.freeze({__proto__:null,ARIA_ATTR:Se,ATTR_WHITESPACE:we,CUSTOM_ELEMENT:Ee,DATA_ATTR:xe,DOCTYPE_NAME:Te,ERB_EXPR:ye,IS_ALLOWED_URI:Ce,IS_SCRIPT_OR_DATA:j,MUSTACHE_EXPR:ve,TMPLIT_EXPR:be}),Oe={element:1,text:3,progressingInstruction:7,comment:8,document:9},ke=function(){return typeof window>`u`?null:window},Ae=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},je=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Me(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ke(),n=e=>Me(e);if(n.version=`3.4.2`,n.removed=[],!t||!t.document||t.document.nodeType!==Oe.document||!t.Element)return n.isSupported=!1,n;let{document:r}=t,i=r,o=i.currentScript,{DocumentFragment:c,HTMLTemplateElement:l,Node:te,Element:ne,NodeFilter:re,NamedNodeMap:ie=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:ae,DOMParser:C,trustedTypes:se}=t,T=ne.prototype,ve=D(T,`cloneNode`),ye=D(T,`remove`),be=D(T,`nextSibling`),xe=D(T,`childNodes`),Se=D(T,`parentNode`);if(typeof l==`function`){let e=r.createElement(`template`);e.content&&e.content.ownerDocument&&(r=e.content.ownerDocument)}let j,we=``,{implementation:Ee,createNodeIterator:M,createDocumentFragment:Ne,getElementsByTagName:Pe}=r,{importNode:Fe}=i,N=je();n.isSupported=typeof e==`function`&&typeof Se==`function`&&Ee&&Ee.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Ie,ERB_EXPR:Le,TMPLIT_EXPR:Re,DATA_ATTR:P,ARIA_ATTR:F,IS_SCRIPT_OR_DATA:ze,ATTR_WHITESPACE:Be,CUSTOM_ELEMENT:Ve}=De,{IS_ALLOWED_URI:He}=De,I=null,Ue=w({},[...O,...k,...ue,...A,...pe]),L=null,We=w({},[...me,...he,...ge,..._e]),R=Object.seal(s(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ge=null,Ke=null,qe=Object.seal(s(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Je=!0,Ye=!0,Xe=!1,Ze=!0,Qe=!1,$e=!0,et=!1,tt=!1,nt=!1,rt=!1,it=!1,at=!1,ot=!0,st=!1,ct=`user-content-`,lt=!0,ut=!1,dt={},z=null,ft=w({},[`annotation-xml`,`audio`,`colgroup`,`desc`,`foreignobject`,`head`,`iframe`,`math`,`mi`,`mn`,`mo`,`ms`,`mtext`,`noembed`,`noframes`,`noscript`,`plaintext`,`script`,`style`,`svg`,`template`,`thead`,`title`,`video`,`xmp`]),pt=null,mt=w({},[`audio`,`video`,`img`,`source`,`image`,`track`]),ht=null,gt=w({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),_t=`http://www.w3.org/1998/Math/MathML`,vt=`http://www.w3.org/2000/svg`,B=`http://www.w3.org/1999/xhtml`,yt=B,V=!1,bt=null,xt=w({},[_t,vt,B],_),St=w({},[`mi`,`mo`,`mn`,`ms`,`mtext`]),Ct=w({},[`annotation-xml`]),wt=w({},[`title`,`style`,`font`,`a`,`script`]),Tt=null,Et=[`application/xhtml+xml`,`text/html`],H=null,Dt=null,Ot=r.createElement(`form`),kt=function(e){return e instanceof RegExp||e instanceof Function},At=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Dt&&Dt===e)return;(!e||typeof e!=`object`)&&(e={}),e=E(e),Tt=Et.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,H=Tt===`application/xhtml+xml`?_:g,I=x(e,`ALLOWED_TAGS`)&&h(e.ALLOWED_TAGS)?w({},e.ALLOWED_TAGS,H):Ue,L=x(e,`ALLOWED_ATTR`)&&h(e.ALLOWED_ATTR)?w({},e.ALLOWED_ATTR,H):We,bt=x(e,`ALLOWED_NAMESPACES`)&&h(e.ALLOWED_NAMESPACES)?w({},e.ALLOWED_NAMESPACES,_):xt,ht=x(e,`ADD_URI_SAFE_ATTR`)&&h(e.ADD_URI_SAFE_ATTR)?w(E(gt),e.ADD_URI_SAFE_ATTR,H):gt,pt=x(e,`ADD_DATA_URI_TAGS`)&&h(e.ADD_DATA_URI_TAGS)?w(E(mt),e.ADD_DATA_URI_TAGS,H):mt,z=x(e,`FORBID_CONTENTS`)&&h(e.FORBID_CONTENTS)?w({},e.FORBID_CONTENTS,H):ft,Ge=x(e,`FORBID_TAGS`)&&h(e.FORBID_TAGS)?w({},e.FORBID_TAGS,H):E({}),Ke=x(e,`FORBID_ATTR`)&&h(e.FORBID_ATTR)?w({},e.FORBID_ATTR,H):E({}),dt=x(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?E(e.USE_PROFILES):e.USE_PROFILES:!1,Je=e.ALLOW_ARIA_ATTR!==!1,Ye=e.ALLOW_DATA_ATTR!==!1,Xe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Ze=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Qe=e.SAFE_FOR_TEMPLATES||!1,$e=e.SAFE_FOR_XML!==!1,et=e.WHOLE_DOCUMENT||!1,rt=e.RETURN_DOM||!1,it=e.RETURN_DOM_FRAGMENT||!1,at=e.RETURN_TRUSTED_TYPE||!1,nt=e.FORCE_BODY||!1,ot=e.SANITIZE_DOM!==!1,st=e.SANITIZE_NAMED_PROPS||!1,lt=e.KEEP_CONTENT!==!1,ut=e.IN_PLACE||!1,He=le(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Ce,yt=typeof e.NAMESPACE==`string`?e.NAMESPACE:B,St=x(e,`MATHML_TEXT_INTEGRATION_POINTS`)&&e.MATHML_TEXT_INTEGRATION_POINTS&&typeof e.MATHML_TEXT_INTEGRATION_POINTS==`object`?E(e.MATHML_TEXT_INTEGRATION_POINTS):w({},[`mi`,`mo`,`mn`,`ms`,`mtext`]),Ct=x(e,`HTML_INTEGRATION_POINTS`)&&e.HTML_INTEGRATION_POINTS&&typeof e.HTML_INTEGRATION_POINTS==`object`?E(e.HTML_INTEGRATION_POINTS):w({},[`annotation-xml`]);let t=x(e,`CUSTOM_ELEMENT_HANDLING`)&&e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING==`object`?E(e.CUSTOM_ELEMENT_HANDLING):s(null);if(R=s(null),x(t,`tagNameCheck`)&&kt(t.tagNameCheck)&&(R.tagNameCheck=t.tagNameCheck),x(t,`attributeNameCheck`)&&kt(t.attributeNameCheck)&&(R.attributeNameCheck=t.attributeNameCheck),x(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(R.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),Qe&&(Ye=!1),it&&(rt=!0),dt&&(I=w({},pe),L=s(null),dt.html===!0&&(w(I,O),w(L,me)),dt.svg===!0&&(w(I,k),w(L,he),w(L,_e)),dt.svgFilters===!0&&(w(I,ue),w(L,he),w(L,_e)),dt.mathMl===!0&&(w(I,A),w(L,ge),w(L,_e))),qe.tagCheck=null,qe.attributeCheck=null,x(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?qe.tagCheck=e.ADD_TAGS:h(e.ADD_TAGS)&&(I===Ue&&(I=E(I)),w(I,e.ADD_TAGS,H))),x(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?qe.attributeCheck=e.ADD_ATTR:h(e.ADD_ATTR)&&(L===We&&(L=E(L)),w(L,e.ADD_ATTR,H))),x(e,`ADD_URI_SAFE_ATTR`)&&h(e.ADD_URI_SAFE_ATTR)&&w(ht,e.ADD_URI_SAFE_ATTR,H),x(e,`FORBID_CONTENTS`)&&h(e.FORBID_CONTENTS)&&(z===ft&&(z=E(z)),w(z,e.FORBID_CONTENTS,H)),x(e,`ADD_FORBID_CONTENTS`)&&h(e.ADD_FORBID_CONTENTS)&&(z===ft&&(z=E(z)),w(z,e.ADD_FORBID_CONTENTS,H)),lt&&(I[`#text`]=!0),et&&w(I,[`html`,`head`,`body`]),I.table&&(w(I,[`tbody`]),delete Ge.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw oe(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw oe(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);j=e.TRUSTED_TYPES_POLICY,we=j.createHTML(``)}else j===void 0&&(j=Ae(se,o)),j!==null&&typeof we==`string`&&(we=j.createHTML(``));a&&a(e),Dt=e},jt=w({},[...k,...ue,...de]),Mt=w({},[...A,...fe]),Nt=function(e){let t=Se(e);(!t||!t.tagName)&&(t={namespaceURI:yt,tagName:`template`});let n=g(e.tagName),r=g(t.tagName);return bt[e.namespaceURI]?e.namespaceURI===vt?t.namespaceURI===B?n===`svg`:t.namespaceURI===_t?n===`svg`&&(r===`annotation-xml`||St[r]):!!jt[n]:e.namespaceURI===_t?t.namespaceURI===B?n===`math`:t.namespaceURI===vt?n===`math`&&Ct[r]:!!Mt[n]:e.namespaceURI===B?t.namespaceURI===vt&&!Ct[r]||t.namespaceURI===_t&&!St[r]?!1:!Mt[n]&&(wt[n]||!jt[n]):!!(Tt===`application/xhtml+xml`&&bt[e.namespaceURI]):!1},Pt=function(e){p(n.removed,{element:e});try{Se(e).removeChild(e)}catch{ye(e)}},Ft=function(e,t){try{p(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch{p(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e===`is`)if(rt||it)try{Pt(t)}catch{}else try{t.setAttribute(e,``)}catch{}},It=function(e){let t=null,n=null;if(nt)e=`<remove></remove>`+e;else{let t=v(e,/^[\r\n\t ]+/);n=t&&t[0]}Tt===`application/xhtml+xml`&&yt===B&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=j?j.createHTML(e):e;if(yt===B)try{t=new C().parseFromString(i,Tt)}catch{}if(!t||!t.documentElement){t=Ee.createDocument(yt,`template`,null);try{t.documentElement.innerHTML=V?we:i}catch{}}let a=t.body||t.documentElement;return e&&n&&a.insertBefore(r.createTextNode(n),a.childNodes[0]||null),yt===B?Pe.call(t,et?`html`:`body`)[0]:et?t.documentElement:a},Lt=function(e){return M.call(e.ownerDocument||e,e,re.SHOW_ELEMENT|re.SHOW_COMMENT|re.SHOW_TEXT|re.SHOW_PROCESSING_INSTRUCTION|re.SHOW_CDATA_SECTION,null)},Rt=function(e){return e instanceof ae&&(typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||!(e.attributes instanceof ie)||typeof e.removeAttribute!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`)},U=function(e){return typeof te==`function`&&e instanceof te};function W(e,t,r){u(e,e=>{e.call(n,t,r,Dt)})}let zt=function(e){let t=null;if(W(N.beforeSanitizeElements,e,null),Rt(e))return Pt(e),!0;let r=H(e.nodeName);if(W(N.uponSanitizeElement,e,{tagName:r,allowedTags:I}),$e&&e.hasChildNodes()&&!U(e.firstElementChild)&&S(/<[/\w!]/g,e.innerHTML)&&S(/<[/\w!]/g,e.textContent)||$e&&e.namespaceURI===B&&r===`style`&&U(e.firstElementChild)||e.nodeType===Oe.progressingInstruction||$e&&e.nodeType===Oe.comment&&S(/<[/\w]/g,e.data))return Pt(e),!0;if(Ge[r]||!(qe.tagCheck instanceof Function&&qe.tagCheck(r))&&!I[r]){if(!Ge[r]&&Ht(r)&&(R.tagNameCheck instanceof RegExp&&S(R.tagNameCheck,r)||R.tagNameCheck instanceof Function&&R.tagNameCheck(r)))return!1;if(lt&&!z[r]){let t=Se(e)||e.parentNode,n=xe(e)||e.childNodes;if(n&&t){let r=n.length;for(let i=r-1;i>=0;--i){let r=ve(n[i],!0);t.insertBefore(r,be(e))}}}return Pt(e),!0}return e instanceof ne&&!Nt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&S(/<\/no(script|embed|frames)/i,e.innerHTML)?(Pt(e),!0):(Qe&&e.nodeType===Oe.text&&(t=e.textContent,u([Ie,Le,Re],e=>{t=ee(t,e,` `)}),e.textContent!==t&&(p(n.removed,{element:e.cloneNode()}),e.textContent=t)),W(N.afterSanitizeElements,e,null),!1)},Bt=function(e,t,n){if(Ke[t]||ot&&(t===`id`||t===`name`)&&(n in r||n in Ot))return!1;let i=L[t]||qe.attributeCheck instanceof Function&&qe.attributeCheck(t,e);if(!(Ye&&!Ke[t]&&S(P,t))&&!(Je&&S(F,t))){if(!i||Ke[t]){if(!(Ht(e)&&(R.tagNameCheck instanceof RegExp&&S(R.tagNameCheck,e)||R.tagNameCheck instanceof Function&&R.tagNameCheck(e))&&(R.attributeNameCheck instanceof RegExp&&S(R.attributeNameCheck,t)||R.attributeNameCheck instanceof Function&&R.attributeNameCheck(t,e))||t===`is`&&R.allowCustomizedBuiltInElements&&(R.tagNameCheck instanceof RegExp&&S(R.tagNameCheck,n)||R.tagNameCheck instanceof Function&&R.tagNameCheck(n))))return!1}else if(!ht[t]&&!S(He,ee(n,Be,``))&&!((t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&y(n,`data:`)===0&&pt[e])&&!(Xe&&!S(ze,ee(n,Be,``)))&&n)return!1}return!0},Vt=w({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),Ht=function(e){return!Vt[g(e)]&&S(Ve,e)},Ut=function(e){W(N.beforeSanitizeAttributes,e,null);let{attributes:t}=e;if(!t||Rt(e))return;let r={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:L,forceKeepAttr:void 0},i=t.length;for(;i--;){let{name:a,namespaceURI:o,value:s}=t[i],c=H(a),l=s,d=a===`value`?l:b(l);if(r.attrName=c,r.attrValue=d,r.keepAttr=!0,r.forceKeepAttr=void 0,W(N.uponSanitizeAttribute,e,r),d=r.attrValue,st&&(c===`id`||c===`name`)&&y(d,ct)!==0&&(Ft(a,e),d=ct+d),$e&&S(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,d)){Ft(a,e);continue}if(c===`attributename`&&v(d,`href`)){Ft(a,e);continue}if(r.forceKeepAttr)continue;if(!r.keepAttr){Ft(a,e);continue}if(!Ze&&S(/\/>/i,d)){Ft(a,e);continue}Qe&&u([Ie,Le,Re],e=>{d=ee(d,e,` `)});let p=H(e.nodeName);if(!Bt(p,c,d)){Ft(a,e);continue}if(j&&typeof se==`object`&&typeof se.getAttributeType==`function`&&!o)switch(se.getAttributeType(p,c)){case`TrustedHTML`:d=j.createHTML(d);break;case`TrustedScriptURL`:d=j.createScriptURL(d);break}if(d!==l)try{o?e.setAttributeNS(o,a,d):e.setAttribute(a,d),Rt(e)?Pt(e):f(n.removed)}catch{Ft(a,e)}}W(N.afterSanitizeAttributes,e,null)},Wt=function(e){let t=null,n=Lt(e);for(W(N.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)W(N.uponSanitizeShadowNode,t,null),zt(t),Ut(t),t.content instanceof c&&Wt(t.content);W(N.afterSanitizeShadowDOM,e,null)};return n.sanitize=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=null,a=null,o=null,s=null;if(V=!e,V&&(e=`<!-->`),typeof e!=`string`&&!U(e)&&(e=ce(e),typeof e!=`string`))throw oe(`dirty is not a string, aborting`);if(!n.isSupported)return e;if(tt||At(t),n.removed=[],typeof e==`string`&&(ut=!1),ut){let t=e.nodeName;if(typeof t==`string`){let e=H(t);if(!I[e]||Ge[e])throw oe(`root node is forbidden and cannot be sanitized in-place`)}}else if(e instanceof te)r=It(`<!---->`),a=r.ownerDocument.importNode(e,!0),a.nodeType===Oe.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?r=a:r.appendChild(a);else{if(!rt&&!Qe&&!et&&e.indexOf(`<`)===-1)return j&&at?j.createHTML(e):e;if(r=It(e),!r)return rt?null:at?we:``}r&&nt&&Pt(r.firstChild);let l=Lt(ut?e:r);for(;o=l.nextNode();)zt(o),Ut(o),o.content instanceof c&&Wt(o.content);if(ut)return e;if(rt){if(Qe){r.normalize();let e=r.innerHTML;u([Ie,Le,Re],t=>{e=ee(e,t,` `)}),r.innerHTML=e}if(it)for(s=Ne.call(r.ownerDocument);r.firstChild;)s.appendChild(r.firstChild);else s=r;return(L.shadowroot||L.shadowrootmode)&&(s=Fe.call(i,s,!0)),s}let d=et?r.outerHTML:r.innerHTML;return et&&I[`!doctype`]&&r.ownerDocument&&r.ownerDocument.doctype&&r.ownerDocument.doctype.name&&S(Te,r.ownerDocument.doctype.name)&&(d=`<!DOCTYPE `+r.ownerDocument.doctype.name+`>
`+d),Qe&&u([Ie,Le,Re],e=>{d=ee(d,e,` `)}),j&&at?j.createHTML(d):d},n.setConfig=function(){At(arguments.length>0&&arguments[0]!==void 0?arguments[0]:{}),tt=!0},n.clearConfig=function(){Dt=null,tt=!1},n.isValidAttribute=function(e,t,n){return Dt||At({}),Bt(H(e),H(t),n)},n.addHook=function(e,t){typeof t==`function`&&p(N[e],t)},n.removeHook=function(e,t){if(t!==void 0){let n=d(N[e],t);return n===-1?void 0:m(N[e],n,1)[0]}return f(N[e])},n.removeHooks=function(e){N[e]=[]},n.removeAllHooks=function(){N=je()},n}var M=Me(),Ne=class{execute(e){e.execute()}undo(){}redo(){}},Pe=class{name;constructor(e){this.name=e}},Fe=class extends Pe{tag;savedRange;ownerDocument;lastActionWasWrap=!1;wrappedElement=null;movedChildren=null;movedChildrenParent=null;movedChildrenAnchor=null;constructor(e,t,n){super(`format:${e}`),this.tag=e,this.savedRange=t.cloneRange(),this.ownerDocument=n}execute(){let e=this.savedRange.cloneRange();if(e.collapsed)return;let t=this.ownerDocument.getSelection();this.isTagActive(e)?(this.lastActionWasWrap=!1,this.removeFormat(e,t)):(this.lastActionWasWrap=!0,this.applyFormat(e,t))}undo(){this.lastActionWasWrap?this.undoWrap():this.undoRemove()}isTagActive(e){return this.findAncestor(e.commonAncestorContainer,this.tag)!==null}applyFormat(e,t){let n=this.ownerDocument.createElement(this.tag);try{let r=e.extractContents();if(n.appendChild(r),e.insertNode(n),this.wrappedElement=n,t){t.removeAllRanges();let e=this.ownerDocument.createRange();e.selectNodeContents(n),t.addRange(e)}}catch{}}removeFormat(e,t){let n=this.findAncestor(e.commonAncestorContainer,this.tag);if(!n||!n.parentNode)return;let r=n.parentNode,i=Array.from(n.childNodes),a=n.nextSibling;if(i.forEach(e=>r.insertBefore(e,n)),r.removeChild(n),this.movedChildren=i,this.movedChildrenParent=r,this.movedChildrenAnchor=a,t&&i.length>0){t.removeAllRanges();let e=this.ownerDocument.createRange();e.setStartBefore(i[0]),e.setEndAfter(i[i.length-1]),t.addRange(e)}}undoWrap(){if(!this.wrappedElement||!this.wrappedElement.parentNode)return;let e=this.wrappedElement.parentNode;Array.from(this.wrappedElement.childNodes).forEach(t=>e.insertBefore(t,this.wrappedElement)),e.removeChild(this.wrappedElement),this.wrappedElement=null}undoRemove(){if(!this.movedChildren||!this.movedChildrenParent)return;let e=this.ownerDocument.createElement(this.tag);this.movedChildren.forEach(t=>e.appendChild(t)),this.movedChildrenParent.insertBefore(e,this.movedChildrenAnchor),this.movedChildren=null,this.movedChildrenParent=null,this.movedChildrenAnchor=null}findAncestor(e,t){let n=e;for(;n;){if(n.nodeType===1&&n.tagName.toLowerCase()===t.toLowerCase())return n;n=n.parentNode}return null}},N=class{static async serialize(e){let t=new TextEncoder().encode(e);if(typeof CompressionStream>`u`)return t;let n=new CompressionStream(`gzip`),r=n.writable.getWriter();r.write(t).then(()=>r.close());let i=await new Response(n.readable).arrayBuffer();return new Uint8Array(i)}static async deserialize(e){if(!(e.length>=2&&e[0]===31&&e[1]===139)||typeof DecompressionStream>`u`)return new TextDecoder().decode(e);let t=new DecompressionStream(`gzip`),n=t.writable.getWriter();n.write(new Uint8Array(e)).then(()=>n.close());let r=await new Response(t.readable).arrayBuffer();return new TextDecoder().decode(r)}},Ie=class{entries=[];pointer=-1;maxSize=100;setInitial(e){let t=new TextEncoder().encode(e);this.entries=[{data:t,label:`initial`,isCheckpoint:!1}],this.pointer=0}async push(e,t,n=!1){this.entries.splice(this.pointer+1);let r=await N.serialize(e);this.entries.push({data:r,label:t,isCheckpoint:n}),this.pointer++,this.entries.length>this.maxSize+1&&(this.entries.shift(),this.pointer--)}async undo(){return this.canUndo()?(this.pointer--,N.deserialize(this.entries[this.pointer].data)):null}async redo(){return this.canRedo()?(this.pointer++,N.deserialize(this.entries[this.pointer].data)):null}canUndo(){return this.pointer>0}canRedo(){return this.pointer>=0&&this.pointer<this.entries.length-1}isInitialized(){return this.pointer>=0}getStackSize(){return this.entries.length}getCurrentLabel(){return this.pointer<0?null:this.entries[this.pointer].label}},Le=class{config;commandManager;historyManager;root=null;inputTimer=null;inputHandler=()=>{this.inputTimer!==null&&clearTimeout(this.inputTimer),this.inputTimer=setTimeout(()=>{this.inputTimer=null,this.root&&this.historyManager.push(this.root.innerHTML,`input`).then(()=>{this.config.onHistoryPush?.()})},800)};keydownHandler=async e=>{(e.ctrlKey||e.metaKey)&&(e.key===`z`&&!e.shiftKey?(e.preventDefault(),await this.undo()):e.key===`y`||e.key===`z`&&e.shiftKey?(e.preventDefault(),await this.redo()):e.key===`b`?(e.preventDefault(),await this.bold()):e.key===`i`?(e.preventDefault(),await this.italic()):e.key===`u`&&(e.preventDefault(),await this.underline()))};constructor(e={}){this.config=e,this.commandManager=new Ne,this.historyManager=new Ie}mount(e){this.root=e,e.contentEditable=this.config.readonly?`false`:`true`,e.setAttribute(`role`,`textbox`),e.setAttribute(`aria-multiline`,`true`),this.config.placeholder&&(e.dataset.placeholder=this.config.placeholder),this.historyManager.setInitial(e.innerHTML),e.addEventListener(`input`,this.inputHandler),e.addEventListener(`keydown`,this.keydownHandler)}unmount(){this.root&&=(this.inputTimer!==null&&(clearTimeout(this.inputTimer),this.inputTimer=null),this.root.removeEventListener(`input`,this.inputHandler),this.root.removeEventListener(`keydown`,this.keydownHandler),this.root.contentEditable=`inherit`,this.root.removeAttribute(`role`),this.root.removeAttribute(`aria-multiline`),delete this.root.dataset.placeholder,null)}async execute(e){if(!this.root)throw Error(`EditorCore가 마운트되지 않았습니다.`);await this.flushInput(),this.commandManager.execute(e),await this.historyManager.push(this.root.innerHTML,e.name)}async undo(){if(!this.root)return;await this.flushInput();let e=await this.historyManager.undo();e!==null&&(this.root.innerHTML=M.sanitize(e))}async redo(){if(!this.root)return;let e=await this.historyManager.redo();e!==null&&(this.root.innerHTML=M.sanitize(e))}async flushInput(){this.inputTimer!==null&&(clearTimeout(this.inputTimer),this.inputTimer=null,this.root&&await this.historyManager.push(this.root.innerHTML,`input`))}async captureHistory(e){this.root&&await this.historyManager.push(this.root.innerHTML,e)}canUndo(){return this.historyManager.canUndo()}canRedo(){return this.historyManager.canRedo()}async bold(){await this.applyFormat(`strong`)}async italic(){await this.applyFormat(`em`)}async underline(){await this.applyFormat(`u`)}async applyFormatWithRange(e,t){if(!this.root)throw Error(`EditorCore가 마운트되지 않았습니다.`);let n=new Fe(e,t,this.root.ownerDocument);await this.execute(n)}async strike(){await this.applyFormat(`s`)}isMounted(){return this.root!==null}async applyFormat(e){if(!this.root)throw Error(`EditorCore가 마운트되지 않았습니다.`);let t=this.root.ownerDocument,n=t.getSelection();if(!n||n.rangeCount===0)return;let r=new Fe(e,n.getRangeAt(0),t);await this.execute(r)}},Re={bold:`strong`,italic:`em`,underline:`u`,strike:`s`},P=new class{listeners=new Map;on(e,t){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t)}off(e,t){this.listeners.get(e)?.delete(t)}emit(e,t){this.listeners.get(e)?.forEach(e=>e(t))}},F={FILE_NEW:`file:new`,FILE_OPENED:`file:opened`,FILE_SAVED:`file:saved`,FILE_DIRTY:`file:dirty`,AUTOSAVE_SAVED:`autosave:saved`,AUTOSAVE_RESTORED:`autosave:restored`,MENUBAR_CHANGE:`menubar:change`,VIEW_CHANGE:`view:change`};function ze(e){return M.sanitize(e,{USE_PROFILES:{html:!0},FORBID_TAGS:[`script`,`object`,`embed`],FORBID_ATTR:[`onerror`,`onload`,`onclick`,`onmouseover`,`onfocus`,`onblur`]})}function Be(e){return new DOMParser().parseFromString(e,`text/html`).body.textContent??``}function Ve(e){return e.split(`
`).map(e=>{let t=e.trim();return t===``?`<br>`:`<p>${He(t)}</p>`}).join(``)}function He(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function I(e){e.querySelectorAll(`input`).forEach(e=>{e.setAttribute(`value`,e.value)}),e.querySelectorAll(`textarea`).forEach(e=>{e.textContent=e.value}),e.querySelectorAll(`select`).forEach(e=>{let t=e.selectedIndex;Array.from(e.options).forEach((e,n)=>{n===t?e.setAttribute(`selected`,`selected`):e.removeAttribute(`selected`)})})}function Ue(e){return e.nodeType===Node.ELEMENT_NODE}var L=new Set([`P`,`DIV`,`H1`,`H2`,`H3`,`H4`,`H5`,`H6`,`LI`,`BLOCKQUOTE`,`PRE`,`FIGURE`,`TD`,`TH`]);function We(e){return Ue(e)&&L.has(e.tagName)}function R(e,t){let n=e;for(;n&&n!==t;){if(We(n))return n;n=n.parentNode}return null}function Ge(e,t){if(t.collapsed){let n=R(t.startContainer,e);if(n)return[n];if(t.startContainer===e){let n=e.childNodes[t.startOffset],r=e.childNodes[t.startOffset-1];if(n&&We(n))return[n];if(r&&We(r))return[r]}return[]}let n=t.commonAncestorContainer;if(n!==e&&!n.contains(e)){let t=R(n,e);if(t)return[t]}let r=[];for(let n of Array.from(e.childNodes))We(n)&&t.intersectsNode(n)&&r.push(n);if(r.length>0)return r;let i=R(t.startContainer,e);return i?[i]:[]}function Ke(e){let t=e.style.float||getComputedStyle(e).float;if(t===`left`)return`left`;if(t===`right`)return`right`;let n=e.style.marginLeft||getComputedStyle(e).marginLeft,r=e.style.marginRight||getComputedStyle(e).marginRight;return n===`auto`&&r===`auto`?`center`:`left`}function qe(e){let t=e.style.marginLeft||getComputedStyle(e).marginLeft,n=e.style.marginRight||getComputedStyle(e).marginRight;return t===`auto`&&n===`auto`?`center`:t===`auto`&&n!==`auto`?`right`:`left`}var Je=new Set([`image/png`,`image/jpeg`,`image/gif`,`image/webp`,`image/bmp`]);function Ye(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function Xe(e){return e.split(`
`).map(e=>{let t=e.trim();return t===``?`<br>`:`<p>${Ye(t)}</p>`}).join(``)}function Ze(e){return M.sanitize(e,{USE_PROFILES:{html:!0},ADD_ATTR:[`style`,`border`,`width`,`height`,`colspan`,`rowspan`,`cellpadding`,`cellspacing`],ADD_TAGS:[`table`,`tr`,`td`,`th`,`thead`,`tbody`,`tfoot`,`colgroup`,`col`]})}function Qe(e){let t=new DOMParser().parseFromString(e,`text/html`);return t.querySelectorAll(`table`).forEach(e=>{e.style.borderCollapse=`collapse`,e.style.width||(e.style.width=`100%`),!e.style.border&&!e.getAttribute(`border`)&&(e.style.border=`1px solid #000000`)}),t.querySelectorAll(`td, th`).forEach(e=>{!e.style.border&&!e.style.borderTop&&(e.style.border=`1px solid #000000`),e.style.padding||(e.style.padding=`4px 8px`)}),t.body.innerHTML}function $e(e){return e.includes(`xmlns:x="urn:schemas-microsoft-com:office:excel"`)||e.includes(`mso-number-format`)||e.includes(`x:str`)}function et(e){let t=new DOMParser().parseFromString(e,`text/html`);t.querySelectorAll(`[class^="xl"]`).forEach(e=>{e.removeAttribute(`class`)}),t.querySelectorAll(`td, th`).forEach(e=>{let t=(e.getAttribute(`style`)??``).split(`;`).filter(e=>!e.trim().startsWith(`mso-`)).join(`;`);e.setAttribute(`style`,t),!e.style.border&&!e.style.borderTop&&(e.style.border=`1px solid #000000`),e.style.padding||(e.style.padding=`4px 8px`)}),t.querySelectorAll(`table`).forEach(e=>{e.setAttribute(`border`,`1`),e.style.borderCollapse=`collapse`,e.style.width||(e.style.width=`100%`)});let n=t.querySelector(`table`);return n?Ze(n.outerHTML):``}var tt=class{root;options;pasteHandler=e=>{let t=e.clipboardData;if(!t)return;let n=t.getData(`text/html`);if(n){e.preventDefault();let t;if(t=$e(n)?et(n):n.includes(`<table`)?Ze(Qe(n)):ze(n),!t)return;this.insertAtCursor(t),this.options.onPaste?.(t);return}let r=t.getData(`text/plain`);if(r){e.preventDefault();let t=Xe(r);if(!t)return;this.insertAtCursor(t),this.options.onPaste?.(t);return}let i=Array.from(t.items).find(e=>Je.has(e.type));if(i){e.preventDefault();let t=i.getAsFile();if(!t)return;let n=new FileReader;n.onload=e=>{let t=e.target?.result;if(!t)return;let n=this.root.ownerDocument,r=n.createElement(`img`);r.src=t,r.style.maxWidth=`100%`,r.alt=`붙여넣기 이미지`;let i=n.getSelection();if(i&&i.rangeCount>0){let e=i.getRangeAt(0);e.deleteContents(),e.insertNode(r),e.setStartAfter(r),e.collapse(!0),i.removeAllRanges(),i.addRange(e)}else this.root.appendChild(r);this.options.onPasteImage?.()},n.readAsDataURL(t)}};constructor(e,t={}){this.root=e,this.options=t}register(){this.root.addEventListener(`paste`,this.pasteHandler)}unregister(){this.root.removeEventListener(`paste`,this.pasteHandler)}insertAtCursor(e){let t=this.root.ownerDocument.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0);n.deleteContents();let r=n.createContextualFragment(e),i=r.lastChild;n.insertNode(r),i&&(n.setStartAfter(i),n.collapse(!0),t.removeAllRanges(),t.addRange(n))}},nt=class{root;marks=[];currentIndex=-1;constructor(e){this.root=e}find(e,t={}){if(this.clearMarks(),!e.trim())return{count:0,current:-1};let n=this.buildRegex(e,t),r=this.collectTextNodes();for(let e=r.length-1;e>=0;e--){let t=r[e],i=t.nodeValue??``,a=[],o;for(;(o=n.exec(i))!==null;)a.push([o.index,o.index+o[0].length]);for(let e=a.length-1;e>=0;e--){let n=this.wrapRange(t,a[e][0],a[e][1]);n&&this.marks.unshift(n)}}return this.marks.length>0&&(this.currentIndex=0,this.applyHighlight()),{count:this.marks.length,current:this.marks.length>0?0:-1}}next(){return this.marks.length===0?{count:0,current:-1}:(this.currentIndex=(this.currentIndex+1)%this.marks.length,this.applyHighlight(),{count:this.marks.length,current:this.currentIndex})}prev(){return this.marks.length===0?{count:0,current:-1}:(this.currentIndex=(this.currentIndex-1+this.marks.length)%this.marks.length,this.applyHighlight(),{count:this.marks.length,current:this.currentIndex})}replaceCurrent(e){return this.marks.length===0||this.currentIndex<0?{count:0,current:-1}:(this.marks[this.currentIndex].replaceWith(this.root.ownerDocument.createTextNode(e)),this.marks.splice(this.currentIndex,1),this.marks.length===0?(this.currentIndex=-1,{count:0,current:-1,replaced:!0}):(this.currentIndex=Math.min(this.currentIndex,this.marks.length-1),this.applyHighlight(),{count:this.marks.length,current:this.currentIndex,replaced:!0}))}replaceAll(e,t,n={}){this.find(e,n);let r=this.marks.length,i=this.root.ownerDocument;for(let e of this.marks)e.replaceWith(i.createTextNode(t));return this.marks=[],this.currentIndex=-1,r}clearMarks(){for(let e of this.marks){if(!e.parentNode)continue;let t=e.ownerDocument.createDocumentFragment();for(;e.firstChild;)t.appendChild(e.firstChild);e.parentNode.replaceChild(t,e)}this.marks=[],this.currentIndex=-1}buildRegex(e,t){let n=e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),r=t.wholeWord?`\\b${n}\\b`:n;return new RegExp(r,t.caseSensitive?`g`:`gi`)}collectTextNodes(){let e=[],t=this.root.ownerDocument.createTreeWalker(this.root,NodeFilter.SHOW_TEXT),n;for(;(n=t.nextNode())!==null;)n.nodeValue?.trim()&&e.push(n);return e}wrapRange(e,t,n){try{let r=e.ownerDocument,i=r.createRange();i.setStart(e,t),i.setEnd(e,n);let a=r.createElement(`mark`);return a.dataset.poaMark=`true`,i.surroundContents(a),a}catch{return null}}applyHighlight(){this.marks.forEach((e,t)=>{let n=t===this.currentIndex;e.style.background=n?`#F59E0B`:`#FEF3C7`,e.style.color=n?`#FFFFFF`:``,e.style.outline=``}),this.marks[this.currentIndex]?.scrollIntoView?.({block:`nearest`,behavior:`smooth`})}},rt=new Set([`jpg`,`jpeg`,`png`,`gif`,`webp`,`svg`]),it=class{root;savedRange=null;constructor(e){this.root=e}saveSelection(){let e=this.root.ownerDocument.getSelection();e&&e.rangeCount>0&&(this.savedRange=e.getRangeAt(0).cloneRange())}insertFromUrl(e){if(!e.alt.trim())throw Error(`alt 텍스트는 필수입니다. 접근성을 위해 이미지 설명을 입력하세요.`);let t=this.buildImg(e);this.insertNode(t)}async uploadAndInsert(e,t,n){this.validateExtension(e.name);let r=await this.doUpload(e,n);this.insertFromUrl({...t,src:r})}validateExtension(e){let t=e.split(`.`).pop()?.toLowerCase()??``;if(!rt.has(t))throw Error(`지원하지 않는 파일 형식입니다. (허용: ${[...rt].join(`, `)})`)}async doUpload(e,t){let n=new FormData;n.append(t.fieldName??`file`,e);let r=await fetch(t.uploadUrl,{method:`POST`,headers:t.headers,body:n});if(!r.ok)throw Error(`업로드 실패: HTTP ${r.status}`);let i=await r.json();if(!i.url)throw Error(`서버에서 URL을 반환하지 않았습니다.`);return i.url}buildImg(e){let t=this.root.ownerDocument.createElement(`img`);return t.src=e.src,t.alt=e.alt,e.title&&(t.title=e.title),e.width&&(t.style.width=e.width),e.height&&(t.style.height=e.height),e.border&&(t.style.border=e.border),(e.align===`left`||e.align===`right`)&&(t.style.float=e.align),e.id&&(t.id=e.id),e.className&&(t.className=e.className),t}insertNode(e){let t=this.root.ownerDocument,n=t.getSelection(),r;this.savedRange?(r=this.savedRange.cloneRange(),this.savedRange=null):n&&n.rangeCount>0?r=n.getRangeAt(0):(r=t.createRange(),r.selectNodeContents(this.root),r.collapse(!1)),r.deleteContents(),r.insertNode(e),r.setStartAfter(e),r.collapse(!0),n?.removeAllRanges(),n?.addRange(r)}},at=[{description:`HTML 파일`,accept:{"text/html":[`.html`,`.htm`]}}],ot=[{description:`HTML 파일`,accept:{"text/html":[`.html`,`.htm`]}},{description:`텍스트 파일`,accept:{"text/plain":[`.txt`]}}],st=class{fileHandle=null;dirty=!1;currentName=`새 문서`;beforeUnloadHandler=e=>{this.dirty&&(e.preventDefault(),e.returnValue=``)};constructor(){window.addEventListener(`beforeunload`,this.beforeUnloadHandler)}destroy(){window.removeEventListener(`beforeunload`,this.beforeUnloadHandler)}isDirty(){return this.dirty}markDirty(){this.dirty=!0,P.emit(F.FILE_DIRTY,!0)}markClean(){this.dirty=!1,P.emit(F.FILE_DIRTY,!1)}getCurrentName(){return this.currentName}hasFileSystemAccess(){return typeof window<`u`&&`showOpenFilePicker`in window}newDocument(){this.fileHandle=null,this.currentName=`새 문서`,this.markClean(),P.emit(F.FILE_NEW,void 0)}async openFile(){return this.hasFileSystemAccess()?this.openWithFSA():this.openWithInput()}async openWithFSA(){try{let[e]=await window.showOpenFilePicker({types:ot,multiple:!1}),t=await e.getFile(),n=await t.text(),r=this.toHtml(t.name,n);this.fileHandle=e,this.currentName=t.name,this.markClean();let i={name:t.name,html:r};return P.emit(F.FILE_OPENED,i),i}catch(e){if(e.name!==`AbortError`)throw e;return null}}openWithInput(){return new Promise(e=>{let t=document.createElement(`input`);t.type=`file`,t.accept=`.html,.htm,.txt`,t.onchange=async()=>{let n=t.files?.[0];if(!n){e(null);return}let r=await n.text(),i=this.toHtml(n.name,r);this.fileHandle=null,this.currentName=n.name,this.markClean();let a={name:n.name,html:i};P.emit(F.FILE_OPENED,a),e(a)},t.addEventListener(`cancel`,()=>e(null)),t.click()})}async saveFile(e){return this.fileHandle?this.writeToHandle(this.fileHandle,e,this.currentName):this.saveAsFile(e)}async saveAsFile(e,t=`document.html`){return this.hasFileSystemAccess()?this.saveWithFSA(e,t):this.saveWithDownload(e,t)}async saveWithFSA(e,t){try{let n=await window.showSaveFilePicker({suggestedName:t,types:at});return this.writeToHandle(n,e,n.name)}catch(e){if(e.name!==`AbortError`)throw e;return!1}}async writeToHandle(e,t,n){let r=await e.createWritable();return await r.write(t),await r.close(),this.fileHandle=e,this.currentName=n,this.markClean(),P.emit(F.FILE_SAVED,{name:n}),!0}saveWithDownload(e,t){let n=t.endsWith(`.txt`),r=n?Be(e):e,i=new Blob([r],{type:`${n?`text/plain`:`text/html`};charset=utf-8`}),a=URL.createObjectURL(i),o=document.createElement(`a`);return o.href=a,o.download=t,o.click(),URL.revokeObjectURL(a),this.markClean(),P.emit(F.FILE_SAVED,{name:t}),!0}printDocument(e,t){let n=t??{top:25,right:30,bottom:25,left:30},r=document.createElement(`iframe`);r.style.cssText=`position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;border:none;`,document.body.appendChild(r);let i=r.contentWindow,a=r.contentDocument;if(!i||!a){r.remove();return}let o=Array.from(document.querySelectorAll(`link[rel="stylesheet"]`)).map(e=>e.outerHTML).join(`
`),s=`
<style>
* { box-sizing: border-box; }
body {
  margin: 0;
  padding: ${n.top}mm ${n.right}mm ${n.bottom}mm ${n.left}mm;
  background: #ffffff;
  font-family: 돋움체, sans-serif;
  font-size: 12pt;
  line-height: 1.5;
  color: #000000;
}
table {
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #000000;
  padding: 4px 8px;
}
hr.x-page-break {
  page-break-after: always;
  border: none;
  margin: 0;
}
/* 페이지 구분선 — 인쇄 시 실제 페이지 분리 */
div.poa-page-break {
  display: block;
  height: 0;
  overflow: hidden;
  border: none;
  margin: 0;
  padding: 0;
  page-break-after: always;
  break-after: page;
}
div.poa-page-break * { display: none; }
@page {
  size: A4 portrait;
  margin: 0;
}
</style>`;a.open(),a.write(`<!DOCTYPE html><html><head>
<meta charset="utf-8">
${o}
${s}
</head><body>${e}</body></html>`),a.close();let c=()=>{r.remove()};i.onafterprint=c,setTimeout(()=>{r.parentNode&&c()},2e3),i.focus(),i.print()}htmlToPlainText(e){return Be(e)}toHtml(e,t){if(e.endsWith(`.txt`))return Ve(t);let n=ze(t);return this.normalizeTableCells(n)}normalizeTableCells(e){let t=new DOMParser().parseFromString(e,`text/html`);return t.querySelectorAll(`td, th`).forEach(e=>{e.style.verticalAlign||(e.style.verticalAlign=`middle`)}),t.body.innerHTML}},ct=(e,t)=>t.some(t=>e instanceof t),lt,ut;function dt(){return lt||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function z(){return ut||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var ft=new WeakMap,pt=new WeakMap,mt=new WeakMap;function ht(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(V(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return mt.set(t,e),t}function gt(e){if(ft.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});ft.set(e,t)}var _t={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return ft.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return V(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)?!0:t in e}};function vt(e){_t=e(_t)}function B(e){return z().includes(e)?function(...t){return e.apply(bt(this),t),V(this.request)}:function(...t){return V(e.apply(bt(this),t))}}function yt(e){return typeof e==`function`?B(e):(e instanceof IDBTransaction&&gt(e),ct(e,dt())?new Proxy(e,_t):e)}function V(e){if(e instanceof IDBRequest)return ht(e);if(pt.has(e))return pt.get(e);let t=yt(e);return t!==e&&(pt.set(e,t),mt.set(t,e)),t}var bt=e=>mt.get(e);function xt(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=V(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(V(o.result),e.oldVersion,e.newVersion,V(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var St=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],Ct=[`put`,`add`,`delete`,`clear`],wt=new Map;function Tt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(wt.get(t))return wt.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=Ct.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||St.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return wt.set(t,a),a}vt(e=>({...e,get:(t,n,r)=>Tt(t,n)||e.get(t,n,r),has:(t,n)=>!!Tt(t,n)||e.has(t,n)}));var Et=[`continue`,`continuePrimaryKey`,`advance`],H={},Dt=new WeakMap,Ot=new WeakMap,kt={get(e,t){if(!Et.includes(t))return e[t];let n=H[t];return n||=H[t]=function(...e){Dt.set(this,Ot.get(this)[t](...e))},n}};async function*At(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;let n=new Proxy(t,kt);for(Ot.set(n,t),mt.set(n,bt(t));t;)yield n,t=await(Dt.get(n)||t.continue()),Dt.delete(n)}function jt(e,t){return t===Symbol.asyncIterator&&ct(e,[IDBIndex,IDBObjectStore,IDBCursor])||t===`iterate`&&ct(e,[IDBIndex,IDBObjectStore])}vt(e=>({...e,get(t,n,r){return jt(t,n)?At:e.get(t,n,r)},has(t,n){return jt(t,n)||e.has(t,n)}}));var Mt=`poa-editor-autosave`,Nt=`snapshots`,Pt=10,Ft=300*1e3,It=class{timer=null;intervalMs;constructor(e=Ft){this.intervalMs=e}start(e){this.stop(),this.timer=setInterval(()=>{this.saveNow(e())},this.intervalMs)}stop(){this.timer!==null&&(clearInterval(this.timer),this.timer=null)}isRunning(){return this.timer!==null}async saveNow(e){let t=(await this.openDB()).transaction(Nt,`readwrite`);await t.store.put({html:e,savedAt:Date.now()});let n=await t.store.getAllKeys();n.length>Pt&&await t.store.delete(n[0]),await t.done,P.emit(F.AUTOSAVE_SAVED,{savedAt:Date.now()})}async listSnapshots(){let e=await this.openDB(),[t,n]=await Promise.all([e.getAllKeys(Nt),e.getAll(Nt)]);return n.map((e,n)=>({id:t[n],html:e.html,savedAt:e.savedAt})).reverse()}async restoreSnapshot(e){return(await(await this.openDB()).get(Nt,e))?.html??null}async clearAll(){await(await this.openDB()).clear(Nt)}async openDB(){return xt(Mt,1,{upgrade(e){e.objectStoreNames.contains(Nt)||e.createObjectStore(Nt,{autoIncrement:!0})}})}},Lt=new Set([`p`,`div`,`h1`,`h2`,`h3`,`h4`,`h5`,`h6`,`li`,`blockquote`,`pre`]),Rt=class e{static build(e,t=document){let{rows:n,cols:r,width:i,height:a,border:o=1,marginLeft:s=0,align:c=`left`,headerPosition:l=`none`,borderColor:u=`#000000`,bgColor:d,id:f,className:p,caption:m,captionVisible:h=!0,summary:g}=e,_=t.createElement(`table`),v={"border-collapse":`collapse`,"max-width":`100%`,"table-layout":`fixed`,"word-break":`break-word`};i&&(v.width=i),a&&(v.height=a),d&&(v[`background-color`]=d),c===`center`?(v[`margin-left`]=`auto`,v[`margin-right`]=`auto`):c===`right`?(v[`margin-left`]=`auto`,v[`margin-right`]=`0`):s>0&&(v[`margin-left`]=`${s}px`),_.style.cssText=Object.entries(v).map(([e,t])=>`${e}:${t}`).join(`;`);let ee=t.createElement(`colgroup`),y=(100/r).toFixed(4);for(let e=0;e<r;e++){let e=t.createElement(`col`);e.style.width=`${y}%`,ee.appendChild(e)}if(_.appendChild(ee),o>0&&_.setAttribute(`border`,String(o)),_.setAttribute(`cellpadding`,`4`),_.setAttribute(`cellspacing`,`0`),g?.trim()&&_.setAttribute(`summary`,g.trim()),f&&(_.id=f),p&&(_.className=p),m?.trim()){let e=t.createElement(`caption`);e.textContent=m.trim(),h||(e.style.display=`none`),_.appendChild(e)}let b=o>0?`border:${o}px solid ${u};padding:4px;overflow:hidden;word-break:break-word;vertical-align:middle;`:`border:none;padding:4px;overflow:hidden;word-break:break-word;vertical-align:middle;`,te=b+`background:#f5f5f5;font-weight:bold;`;if(l===`top`&&n>0){let e=t.createElement(`thead`),n=t.createElement(`tr`);for(let e=0;e<r;e++){let e=t.createElement(`th`);e.setAttribute(`scope`,`col`),e.style.cssText=te,e.innerHTML=`&nbsp;`,n.appendChild(e)}e.appendChild(n),_.appendChild(e)}let ne=t.createElement(`tbody`),re=l===`top`&&n>0?n-1:n;for(let e=0;e<re;e++){let e=t.createElement(`tr`);for(let n=0;n<r;n++)if(l===`left`&&n===0){let n=t.createElement(`th`);n.setAttribute(`scope`,`row`),n.style.cssText=te,n.innerHTML=`&nbsp;`,e.appendChild(n)}else{let n=t.createElement(`td`);n.style.cssText=b,n.innerHTML=`&nbsp;`,e.appendChild(n)}ne.appendChild(e)}return _.appendChild(ne),_}static applyOptions(e,t){let{width:n,height:r,border:i,marginLeft:a,align:o,borderColor:s,bgColor:c,id:l,className:u,caption:d,captionVisible:f,summary:p}=t;if(e.style.tableLayout=`fixed`,e.style.wordBreak=`break-word`,n!==void 0&&(e.style.width=n),r!==void 0&&(e.style.height=r||``),c!==void 0&&(e.style.backgroundColor=c||``),l!==void 0&&(e.id=l||``),u!==void 0&&(e.className=u||``),o===void 0?a!==void 0&&(e.style.marginLeft=a>0?`${a}px`:``):(e.style.marginLeft=``,e.style.marginRight=``,o===`center`?(e.style.marginLeft=`auto`,e.style.marginRight=`auto`):o===`right`?(e.style.marginLeft=`auto`,e.style.marginRight=`0`):(a??0)>0&&(e.style.marginLeft=`${a}px`)),i!==void 0&&(i>0?e.setAttribute(`border`,String(i)):e.removeAttribute(`border`)),s!==void 0){let t=i??(parseInt(e.getAttribute(`border`)||`1`,10)||1),n=t>0?`${t}px solid ${s}`:`none`;for(let t of Array.from(e.querySelectorAll(`td, th`)))t.style.border=n}if(p!==void 0&&(p.trim()?e.setAttribute(`summary`,p.trim()):e.removeAttribute(`summary`)),d!==void 0||f!==void 0){let t=e.querySelector(`caption`),n=d??t?.textContent??``,r=t?t.style.display===`none`:!1,i=f??!r;n.trim()?(t||(t=e.ownerDocument.createElement(`caption`),e.insertBefore(t,e.firstChild)),t.textContent=n.trim(),t.style.display=i?``:`none`):t&&t.remove()}}static readOptions(e){let t=parseInt(e.getAttribute(`border`)??`1`,10),n=`left`;e.style.marginLeft===`auto`&&e.style.marginRight===`auto`?n=`center`:e.style.marginLeft===`auto`&&(n=`right`);let r=e.querySelector(`caption`),i=e.querySelector(`td, th`),a=`#000000`;if(i){let e=i.style.border.match(/solid\s+(#[\da-fA-F]{3,6}|[a-z]+)/i);e&&(a=e[1])}let o=`none`;e.querySelector(`thead`)?o=`top`:e.querySelector(`tbody tr:first-child th`)&&(o=`left`);let s=parseFloat(e.style.marginLeft)||0;return{width:e.style.width||e.getAttribute(`width`)||``,height:e.style.height||``,border:isNaN(t)?1:t,marginLeft:n===`left`?s:0,align:n,headerPosition:o,borderColor:a,bgColor:e.style.backgroundColor||``,id:e.id||``,className:e.className||``,caption:r?.textContent?.trim()||``,captionVisible:r?r.style.display!==`none`:!0,summary:e.getAttribute(`summary`)||``}}static insert(t,n){let r=n.ownerDocument,i=r.getSelection(),a=r.createElement(`p`);if(a.innerHTML=`&nbsp;`,i&&i.rangeCount>0){let o=i.getRangeAt(0);if(n.contains(o.startContainer)){let s=e.findBlockAncestor(o.startContainer,n);s&&s!==n?s.insertAdjacentElement(`afterend`,t):(o.deleteContents(),o.insertNode(t)),t.insertAdjacentElement(`afterend`,a);try{let e=r.createRange();e.setStart(a.firstChild,0),e.collapse(!0),i.removeAllRanges(),i.addRange(e)}catch{}return}}n.appendChild(t),n.appendChild(a)}static findBlockAncestor(e,t){let n=e;for(;n&&n!==t;){if(n.nodeType===Node.ELEMENT_NODE&&Lt.has(n.tagName.toLowerCase()))return n;n=n.parentNode}return null}};function U(e){let t=Array.from(e.rows),n=t.map(()=>[]);for(let e=0;e<t.length;e++){let r=0;for(let i of Array.from(t[e].cells)){let a=i;for(;n[e][r]!==void 0&&n[e][r]!==null;)r++;let o=Math.max(a.rowSpan,1),s=Math.max(a.colSpan,1),c={cell:a,row:e,col:r};for(let i=0;i<o&&e+i<t.length;i++){n[e+i]||(n[e+i]=[]);for(let t=0;t<s;t++)n[e+i][r+t]=c}r+=s}}return n}var W=class e{contentEl=null;selectedCells=new Set;anchorCell=null;currentTable=null;clickHandler=e=>{let t=this.findCell(e.target);if(!t){e.target.closest?.(`table`)||this.clearSelection();return}let n=t.closest(`table`);e.shiftKey&&this.anchorCell&&n===this.currentTable?(e.preventDefault(),this.selectRange(this.anchorCell,t)):(this.clearSelection(),this.currentTable=n,this.anchorCell=t,this.selectCell(t))};attach(t){this.detach(),this.contentEl=t,t.addEventListener(`click`,this.clickHandler),e.injectStyles(t.ownerDocument)}detach(){this.contentEl&&=(this.contentEl.removeEventListener(`click`,this.clickHandler),null),this.clearSelection(),this.anchorCell=null,this.currentTable=null}getSelectedCells(){return Array.from(this.selectedCells)}getSelectedTable(){return this.currentTable}selectTo(e){this.anchorCell?this.selectRange(this.anchorCell,e):(this.clearSelection(),this.anchorCell=e,this.currentTable=e.closest(`table`),this.selectCell(e))}setAnchor(e){this.clearSelection(),this.currentTable=e.closest(`table`),this.anchorCell=e,this.selectCell(e)}clearSelection(){for(let e of this.selectedCells)e.classList.remove(`poa-cell-selected`,`poa-cell-sel-ok`,`poa-cell-sel-bad`);this.selectedCells.clear()}merge(){if(!this.currentTable)return{success:!1,message:`선택된 표가 없습니다.`};if(this.selectedCells.size<2)return{success:!1,message:`병합할 셀을 2개 이상 선택하세요.`};let t=e.mergeCells(Array.from(this.selectedCells),this.currentTable);return t.success&&this.clearSelection(),t}static mergeCells(e,t){if(e.length<2)return{success:!1,message:`병합할 셀을 2개 이상 선택하세요.`};let n=U(t),r=new Set(e),i=1/0,a=-1/0,o=1/0,s=-1/0;for(let e=0;e<n.length;e++)for(let t=0;t<(n[e]?.length??0);t++){let c=n[e]?.[t];c&&r.has(c.cell)&&(e<i&&(i=e),e>a&&(a=e),t<o&&(o=t),t>s&&(s=t))}for(let e=i;e<=a;e++)for(let t=o;t<=s;t++){let i=n[e]?.[t];if(!i||!r.has(i.cell))return{success:!1,message:`병합 불가: 선택 영역이 직사각형이 아닙니다.`}}let c=n[i]?.[o]?.cell;if(!c)return{success:!1};let l=[],u=new Set;for(let e=i;e<=a;e++)for(let t=o;t<=s;t++){let r=n[e]?.[t];if(!r||r.row!==e||r.col!==t||r.cell===c)continue;let i=r.cell.innerHTML.replace(/^(\s|&nbsp;)*$/i,``).trim();i&&l.push(i),u.add(r.cell)}l.length>0&&(c.innerHTML=[c.innerHTML.replace(/^(\s|&nbsp;)*$/i,``).trim(),...l].filter(Boolean).join(` `)||`&nbsp;`),c.colSpan=s-o+1,c.rowSpan=a-i+1;for(let e of u)e.remove();return{success:!0}}static splitCellHorizontal(t,n){let r=Math.max(t.colSpan,1);if(r===1)return;let i=U(n),a=t.ownerDocument,o=t.tagName.toLowerCase(),s=-1,c=-1;outer:for(let e=0;e<i.length;e++)for(let n=0;n<(i[e]?.length??0);n++){let r=i[e]?.[n];if(r?.cell===t&&r.row===e&&r.col===n){s=e,c=n;break outer}}if(s===-1)return;let l=Math.max(t.rowSpan,1);t.colSpan=1;let u=t;for(let n=1;n<r;n++){let n=e.makeEmptyCell(a,o,t.style.cssText);n.rowSpan=l,u.insertAdjacentElement(`afterend`,n),u=n}if(l>1){let u=Array.from(n.rows);for(let n=1;n<l;n++){let l=u[s+n];if(!l)continue;let d=e.findInsertBefore(i,s+n,c+r-1,l);for(let n=0;n<r;n++){let n=e.makeEmptyCell(a,o,t.style.cssText);d?l.insertBefore(n,d):l.appendChild(n)}}t.rowSpan=1}}static splitCellVertical(t,n){let r=Math.max(t.rowSpan,1);if(r===1)return;let i=U(n),a=Array.from(n.rows),o=t.ownerDocument,s=t.tagName.toLowerCase(),c=-1,l=-1;outer:for(let e=0;e<i.length;e++)for(let n=0;n<(i[e]?.length??0);n++){let r=i[e]?.[n];if(r?.cell===t&&r.row===e&&r.col===n){c=e,l=n;break outer}}if(c===-1)return;let u=Math.max(t.colSpan,1);t.rowSpan=1;for(let n=1;n<r;n++){let r=a[c+n];if(!r)continue;let d=e.findInsertBefore(i,c+n,l+u-1,r);for(let n=0;n<u;n++){let n=e.makeEmptyCell(o,s,t.style.cssText);d?r.insertBefore(n,d):r.appendChild(n)}}}static applyCellProperties(e,t){let{borderStyle:n,borderWidth:r,borderColor:i,indent:a,bgColor:o,fontSize:s,id:c,className:l,verticalAlign:u}=t;if(n!==void 0||r!==void 0||i!==void 0){let t=n??`solid`,a=r??1,o=i??`#000000`;e.style.border=t===`none`?`none`:`${a}px ${t} ${o}`}if(a!==void 0&&(e.style.paddingLeft=a>0?`${a}px`:``),o!==void 0&&(e.style.backgroundColor=o),u!==void 0&&(e.style.verticalAlign=u),s!==void 0){let t=s>0?`${s}px`:``;e.style.fontSize=t,e.querySelectorAll(`[style*="font-size"]`).forEach(e=>{e.style.fontSize=t})}c!==void 0&&(e.id=c),l!==void 0&&(e.className=l)}static readCellProperties(e){let t=e.style.border.match(/^(\d+)px\s+(\S+)\s+(.+)$/),n=e.style.verticalAlign;return{borderStyle:t?.[2]??`solid`,borderWidth:t?parseInt(t[1],10):1,borderColor:t?.[3]??`#000000`,indent:parseFloat(e.style.paddingLeft)||0,bgColor:e.style.backgroundColor||``,fontSize:parseFloat(e.style.fontSize)||0,id:e.id||``,className:e.className||``,verticalAlign:n===`top`||n===`bottom`?n:`middle`}}findCell(e){let t=e;for(;t;){if(t.nodeType===Node.ELEMENT_NODE){let e=t.tagName.toLowerCase();if(e===`td`||e===`th`)return t;if(e===`table`)break}t=t.parentNode}return null}selectCell(e){this.selectedCells.add(e),e.classList.add(`poa-cell-selected`)}selectRange(e,t){let n=e.closest(`table`);if(!n||t.closest(`table`)!==n)return;let r=U(n),i=new Map;for(let e=0;e<r.length;e++)for(let t=0;t<(r[e]?.length??0);t++){let n=r[e]?.[t];n&&n.row===e&&n.col===t&&i.set(n.cell,{r:e,c:t})}let a=i.get(e),o=i.get(t);if(!a||!o)return;let s=Math.min(a.r,o.r),c=Math.max(a.r,o.r),l=Math.min(a.c,o.c),u=Math.max(a.c,o.c);this.clearSelection();for(let e=s;e<=c;e++)for(let t=l;t<=u;t++){let n=r[e]?.[t];n&&n.row===e&&n.col===t&&this.selectCell(n.cell)}}static splitCell(t,n,r,i){let a=Math.max(r,1),o=Math.max(i,1);if(a<=1&&o<=1)return;let s=t.ownerDocument,c=t.tagName.toLowerCase(),l=1,u=[Math.max(t.colSpan,1)];if(a>1){let r=U(n),i=Array.from(n.rows),o=Math.max(t.colSpan,1),d=Math.max(t.rowSpan,1),f=-1,p=-1;outerH:for(let e=0;e<r.length;e++)for(let n=0;n<(r[e]?.length??0);n++){let i=r[e]?.[n];if(i?.cell===t&&i.row===e&&i.col===n){f=e,p=n;break outerH}}if(f!==-1)if(a<=o){let n=e.distribute(o,a);l=a,u=n,t.colSpan=n[0];let r=t;for(let i=1;i<a;i++){let a=e.makeEmptyCell(s,c,t.style.cssText);a.colSpan=n[i],a.rowSpan=d,r.insertAdjacentElement(`afterend`,a),r=a}}else{let n=a-1;l=a,u=Array(a).fill(1);let o=t;for(let r=0;r<n;r++){let n=e.makeEmptyCell(s,c,t.style.cssText);o.insertAdjacentElement(`afterend`,n),o=n}let m=new Set;for(let e=0;e<i.length;e++){if(e>=f&&e<f+d)continue;let i=r[e]?.[p];!i||i.cell===t||m.has(i.cell)||(m.add(i.cell),i.cell.colSpan+=n)}}}if(o>1){let r=U(n),i=Array.from(n.rows),a=Math.max(t.colSpan,1),d=Math.max(t.rowSpan,1),f=-1,p=-1;outerV:for(let e=0;e<r.length;e++)for(let n=0;n<(r[e]?.length??0);n++){let i=r[e]?.[n];if(i?.cell===t&&i.row===e&&i.col===n){f=e,p=n;break outerV}}if(f===-1)return;if(o<=d){let n=e.distribute(d,o);t.rowSpan=n[0];let l=n[0];for(let u=1;u<o;u++){let o=i[f+l];if(o){let i=e.findInsertBefore(r,f+l,p+a-1,o),d=e.makeEmptyCell(s,c,t.style.cssText);d.colSpan=a,d.rowSpan=n[u],i?o.insertBefore(d,i):o.appendChild(d)}l+=n[u]}}else{let n=o-1,d=i[f];for(let r=0;r<n;r++){let n=s.createElement(`tr`);for(let r=0;r<l;r++){let i=e.makeEmptyCell(s,c,t.style.cssText);i.colSpan=u[r]??1,n.appendChild(i)}d.insertAdjacentElement(`afterend`,n),d=n}let m=new Set;for(let e=0;e<(r[f]?.length??0);e++){if(e>=p&&e<p+a)continue;let i=r[f]?.[e];!i||i.cell===t||m.has(i.cell)||(m.add(i.cell),i.cell.rowSpan+=n)}}}}static distribute(e,t){if(t<=0)return[e];let n=Math.floor(e/t),r=e%t;return Array.from({length:t},(e,t)=>n+ +(t<r))}static findInsertBefore(e,t,n,r){let i=e[t];if(!i)return null;for(let e=n+1;e<i.length;e++){let n=i[e];if(n&&n.row===t&&n.col===e&&n.cell.parentElement===r)return n.cell}return null}static makeEmptyCell(e,t,n){let r=e.createElement(t);return r.style.cssText=n,r.innerHTML=`&nbsp;`,r}static _stylesInjected=!1;static injectStyles(t){if(e._stylesInjected)return;e._stylesInjected=!0;let n=t.createElement(`style`);n.id=`poa-cell-merger-styles`,n.textContent=[`.poa-cell-selected{outline:2px solid rgba(0,120,215,0.8)!important;outline-offset:-2px!important;background:rgba(0,120,215,0.15)!important;}`,`.poa-cell-sel-ok{outline:2px solid rgba(0,120,215,0.8)!important;outline-offset:-2px!important;background:rgba(0,120,215,0.15)!important;}`,`.poa-cell-sel-bad{outline:2px solid #c62828!important;outline-offset:-2px!important;background:rgba(198,40,40,0.12)!important;}`].join(``),t.head.appendChild(n)}},zt=class{contentEl=null;menuEl=null;cb;noMenu;dragState=null;pendingResize=null;lastCursorCell=null;constructor(e={},t={}){this.cb=e,this.noMenu=t.noMenu??!1}keydownHandler=e=>{if(e.key!==`Tab`)return;let t=this.findCell(e.target);t&&(e.preventDefault(),e.shiftKey?this.navigatePrev(t):this.navigateNext(t))};contextmenuHandler=e=>{if(this.noMenu)return;let t=this.findCell(e.target);t&&(e.preventDefault(),this.showContextMenu(e.clientX,e.clientY,t))};dismissMenu=e=>{this.menuEl&&!this.menuEl.contains(e.target)&&this.hideContextMenu()};mousemoveResizeHandler=e=>{if(this.dragState)return;let t=e.target,n=t.tagName;if(n!==`TD`&&n!==`TH`){this.clearResizeCursor();return}let r=t,i=r.closest(`table`);if(!i){this.clearResizeCursor();return}let a=r.getBoundingClientRect(),o=a.right-e.clientX,s=a.bottom-e.clientY;if(o>=0&&o<=4){let e=U(i),t=this.findCellCol(e,r),n=Math.max(...e.map(e=>e.length));if(t!==-1&&t+r.colSpan<n){this.setCursorOnCell(r,`col-resize`),this.pendingResize={type:`col`,cell:r,table:i};return}}if(s>=0&&s<=4){this.setCursorOnCell(r,`row-resize`),this.pendingResize={type:`row`,cell:r,table:i};return}this.clearResizeCursor()};mousedownResizeHandler=e=>{if(!this.pendingResize||e.button!==0)return;let{type:t,cell:n,table:r}=this.pendingResize;e.preventDefault(),t===`col`?this.startColResize(n,r,e.clientX):this.startRowResize(n,r,e.clientY)};attach(e){this.detach(),this.contentEl=e,e.addEventListener(`keydown`,this.keydownHandler),e.addEventListener(`contextmenu`,this.contextmenuHandler),e.addEventListener(`mousemove`,this.mousemoveResizeHandler),e.addEventListener(`mousedown`,this.mousedownResizeHandler)}detach(){this.contentEl&&=(this.contentEl.removeEventListener(`keydown`,this.keydownHandler),this.contentEl.removeEventListener(`contextmenu`,this.contextmenuHandler),this.contentEl.removeEventListener(`mousemove`,this.mousemoveResizeHandler),this.contentEl.removeEventListener(`mousedown`,this.mousedownResizeHandler),null),this.hideContextMenu()}navigateNext(e){let t=e.closest(`table`),n=this.getAllCells(t),r=n.indexOf(e);if(r<n.length-1)this.focusCell(n[r+1]);else{this.appendRow(t);let e=this.getAllCells(t);this.focusCell(e[r+1]??e[e.length-1]),this.cb.onModified?.()}}navigatePrev(e){let t=e.closest(`table`),n=this.getAllCells(t),r=n.indexOf(e);r>0&&this.focusCell(n[r-1])}focusCell(e){e.focus();let t=e.ownerDocument,n=t.createRange();n.selectNodeContents(e),n.collapse(!1);let r=t.getSelection();r&&(r.removeAllRanges(),r.addRange(n))}getAllCells(e){return Array.from(e.querySelectorAll(`td, th`))}appendRow(e){let t=e.querySelector(`tbody`)??e,n=t.querySelector(`tr:last-child`);if(!n)return;let r=e.ownerDocument,i=r.createElement(`tr`),a=Array.from(n.cells).reduce((e,t)=>e+Math.max(t.colSpan,1),0),o=n.cells[0].style.cssText;for(let e=0;e<a;e++){let e=r.createElement(`td`);e.style.cssText=o,e.innerHTML=`&nbsp;`,i.appendChild(e)}t.appendChild(i)}showContextMenu(e,t,n){this.hideContextMenu();let r=n.closest(`table`),i=n.ownerDocument,a=r.querySelectorAll(`.poa-cell-selected`).length>=2,o=n.colSpan>1,s=n.rowSpan>1,c=U(r),l=Math.max(...c.map(e=>e.length)),u=[{label:`위에 행 삽입`,action:()=>this.insertRowAbove(n,r)},{label:`아래에 행 삽입`,action:()=>this.insertRowBelow(n,r)},{label:`왼쪽에 열 삽입`,action:()=>this.insertColLeft(n,r)},{label:`오른쪽에 열 삽입`,action:()=>this.insertColRight(n,r)},`---`,{label:`행 삭제`,action:()=>this.deleteRow(n,r),disabled:r.rows.length<=1},{label:`열 삭제`,action:()=>this.deleteCol(n,r),disabled:l<=1},{label:`표 삭제`,action:()=>this.deleteTable(r)},`---`,{label:`셀 병합`,action:()=>this.doMerge(),disabled:!a},{label:`수평 분할`,action:()=>this.doSplitH(n,r),disabled:!o},{label:`수직 분할`,action:()=>this.doSplitV(n,r),disabled:!s},`---`,{label:`세로 정렬: 위쪽`,action:()=>this.applyCellVerticalAlign(n,r,`top`)},{label:`세로 정렬: 가운데`,action:()=>this.applyCellVerticalAlign(n,r,`middle`)},{label:`세로 정렬: 아래쪽`,action:()=>this.applyCellVerticalAlign(n,r,`bottom`)},`---`,{label:`표 왼쪽 정렬`,action:()=>this.applyTableAlign(r,`left`)},{label:`표 가운데 정렬`,action:()=>this.applyTableAlign(r,`center`)},{label:`표 오른쪽 정렬`,action:()=>this.applyTableAlign(r,`right`)},`---`,{label:`셀 속성`,action:()=>this.showCellPropsModal(n)},{label:`표 속성`,action:()=>this.cb.onOpenTableProps?.(r)}],d=i.createElement(`div`);d.style.cssText=[`position:fixed`,`left:${e}px`,`top:${t}px`,`background:#fff`,`border:1px solid #ccc`,`border-radius:4px`,`box-shadow:0 4px 12px rgba(0,0,0,0.15)`,`z-index:9999`,`font-size:13px`,`user-select:none`,`min-width:160px`,`padding:4px 0`].join(`;`);for(let e of u){if(e===`---`){let e=i.createElement(`hr`);e.style.cssText=`border:none;border-top:1px solid #eee;margin:4px 0;`,d.appendChild(e);continue}let t=i.createElement(`div`);t.textContent=e.label,e.disabled?t.style.cssText=`padding:6px 16px;color:#aaa;cursor:default;`:(t.style.cssText=`padding:6px 16px;cursor:pointer;`,t.addEventListener(`mouseenter`,()=>{t.style.background=`#f0f4ff`}),t.addEventListener(`mouseleave`,()=>{t.style.background=``}),t.addEventListener(`mousedown`,t=>{t.preventDefault(),this.hideContextMenu(),e.action()})),d.appendChild(t)}i.body.appendChild(d),this.menuEl=d,requestAnimationFrame(()=>{if(!this.menuEl)return;let n=this.menuEl.getBoundingClientRect(),r=i.defaultView?.innerWidth??0,a=i.defaultView?.innerHeight??0;n.right>r&&(this.menuEl.style.left=`${e-n.width}px`),n.bottom>a&&(this.menuEl.style.top=`${t-n.height}px`)}),i.addEventListener(`mousedown`,this.dismissMenu)}hideContextMenu(){this.menuEl&&(this.menuEl.remove(),this.menuEl=null,this.contentEl?.ownerDocument.removeEventListener(`mousedown`,this.dismissMenu))}doMerge(){if(!this.cb.onMerge)return;let e=this.cb.onMerge();!e.success&&e.message?this.cb.onError?.(e.message):e.success&&this.cb.onModified?.()}doSplitH(e,t){this.cb.onSplitH?this.cb.onSplitH(e,t):W.splitCellHorizontal(e,t),this.cb.onModified?.()}doSplitV(e,t){this.cb.onSplitV?this.cb.onSplitV(e,t):W.splitCellVertical(e,t),this.cb.onModified?.()}insertRowAbove(e,t){let n=e.closest(`tr`);n&&(n.insertAdjacentElement(`beforebegin`,this.makeEmptyRow(n,t)),this.cb.onModified?.())}insertRowBelow(e,t){let n=e.closest(`tr`);n&&(n.insertAdjacentElement(`afterend`,this.makeEmptyRow(n,t)),this.cb.onModified?.())}makeEmptyRow(e,t){let n=t.ownerDocument,r=U(t),i=Array.from(t.rows).indexOf(e),a=Math.max(...r.map(e=>e.length)),o=e.cells[0]?.style.cssText??``,s=n.createElement(`tr`);for(let e=0;e<a;e++){let t=r[i]?.[e];if(t&&t.row!==i)continue;let a=n.createElement(`td`);a.style.cssText=o,a.innerHTML=`&nbsp;`,s.appendChild(a)}return s}insertColLeft(e,t){let n=U(t),r=this.findCellCol(n,e);r!==-1&&this.insertColAt(t,n,r,e),this.cb.onModified?.()}insertColRight(e,t){let n=U(t),r=this.findCellCol(n,e);r!==-1&&this.insertColAt(t,n,r+Math.max(e.colSpan,1),e),this.cb.onModified?.()}insertColAt(e,t,n,r){let i=Array.from(e.rows),a=e.ownerDocument;for(let e=0;e<i.length;e++){let o=a.createElement(`td`);o.style.cssText=r.style.cssText,o.innerHTML=`&nbsp;`;let s=null;for(let r=n;r<(t[e]?.length??0);r++){let n=t[e]?.[r];if(n&&n.row===e&&n.col===r&&n.cell.parentElement===i[e]){s=n.cell;break}}s?i[e].insertBefore(o,s):i[e].appendChild(o)}}deleteRow(e,t){t.rows.length<=1||(e.closest(`tr`)?.remove(),this.cb.onModified?.())}deleteCol(e,t){let n=U(t),r=this.findCellCol(n,e),i=Math.max(...n.map(e=>e.length));if(r===-1||i<=1)return;let a=Array.from(t.rows);for(let e=0;e<a.length;e++){let t=n[e]?.[r];!t||t.row!==e||t.col!==r||t.cell.parentElement===a[e]&&(t.cell.colSpan>1?--t.cell.colSpan:t.cell.remove())}this.cb.onModified?.()}deleteTable(e){e.remove(),this.cb.onModified?.()}applyCellVerticalAlign(e,t,n){let r=t.querySelectorAll(`.poa-cell-selected`);r.length>0?r.forEach(e=>{e.style.verticalAlign=n}):e.style.verticalAlign=n,this.cb.onModified?.()}applyTableAlign(e,t){t===`center`?(e.style.marginLeft=`auto`,e.style.marginRight=`auto`):t===`right`?(e.style.marginLeft=`auto`,e.style.marginRight=`0`):(e.style.marginLeft=`0`,e.style.marginRight=`auto`),this.cb.onModified?.()}showCellPropsModal(e){let t=e.ownerDocument,n=W.readCellProperties(e),r=n.verticalAlign??`middle`,i=t.createElement(`div`);i.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:10000;`;let a=t.createElement(`div`);a.style.cssText=`background:#fff;border-radius:6px;box-shadow:0 4px 24px rgba(0,0,0,0.2);padding:20px 24px;min-width:300px;font-size:13px;`;let o=(e,t,n)=>{let i=r===e;return`<button class="cp-va-btn" data-va="${e}" style="display:inline-flex;align-items:center;gap:4px;height:28px;padding:0 10px;border:1.5px solid ${i?`#1565c0`:`#ccc`};border-radius:3px;background:${i?`#e3f0ff`:`#fff`};color:${i?`#1565c0`:`#374151`};font-size:12px;cursor:pointer;font-weight:${i?`600`:`400`};">${t} ${n}</button>`};a.innerHTML=`
<h4 style="margin:0 0 14px;font-size:14px;">셀 속성</h4>
<div style="display:grid;grid-template-columns:80px 1fr;gap:8px 10px;align-items:center;margin-bottom:14px;">
  <label>세로 정렬</label>
  <div id="cp-va-wrap" style="display:flex;gap:5px;">
    ${o(`top`,`⬆`,`위쪽`)}
    ${o(`middle`,`⬛`,`가운데`)}
    ${o(`bottom`,`⬇`,`아래쪽`)}
  </div>
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
    <input id="cp-bwidth" type="number" value="${n.borderWidth??1}" min="0" max="20" style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span>
  </div>
  <label>테두리 색</label>
  <input id="cp-bcolor" type="color" value="${n.borderColor??`#000000`}" style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;cursor:pointer;">
  <label>들여쓰기</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-indent" type="number" value="${n.indent??0}" min="0" max="100" style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span>
  </div>
  <label>배경색</label>
  <input id="cp-bg" type="color" value="${n.bgColor||`#ffffff`}" style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;cursor:pointer;">
  <label>ID</label>
  <input id="cp-id" type="text" value="${n.id??``}" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
  <label>Class</label>
  <input id="cp-class" type="text" value="${n.className??``}" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
</div>
<div style="display:flex;justify-content:flex-end;gap:8px;">
  <button id="cp-cancel" style="height:28px;padding:0 14px;border:1px solid #ccc;border-radius:3px;background:#fff;cursor:pointer;font-size:13px;">취소</button>
  <button id="cp-ok" style="height:28px;padding:0 14px;border:1px solid #1565c0;border-radius:3px;background:#1565c0;color:#fff;cursor:pointer;font-size:13px;">적용</button>
</div>`,i.appendChild(a),t.body.appendChild(i),a.querySelector(`#cp-bstyle`).value=n.borderStyle??`solid`;let s=r;a.querySelector(`#cp-va-wrap`).addEventListener(`click`,e=>{let t=e.target.closest(`.cp-va-btn`);if(!t)return;let n=t.dataset.va;s=n,a.querySelectorAll(`.cp-va-btn`).forEach(e=>{let t=e.dataset.va===n;e.style.borderColor=t?`#1565c0`:`#ccc`,e.style.background=t?`#e3f0ff`:`#fff`,e.style.color=t?`#1565c0`:`#374151`,e.style.fontWeight=t?`600`:`400`})});let c=()=>i.remove();a.querySelector(`#cp-cancel`)?.addEventListener(`click`,c),i.addEventListener(`click`,e=>{e.target===i&&c()}),a.querySelector(`#cp-ok`)?.addEventListener(`click`,()=>{let t={verticalAlign:s,borderStyle:a.querySelector(`#cp-bstyle`).value,borderWidth:parseInt(a.querySelector(`#cp-bwidth`).value,10)||0,borderColor:a.querySelector(`#cp-bcolor`).value,indent:parseInt(a.querySelector(`#cp-indent`).value,10)||0,bgColor:a.querySelector(`#cp-bg`).value,id:a.querySelector(`#cp-id`).value.trim(),className:a.querySelector(`#cp-class`).value.trim()};W.applyCellProperties(e,t),this.cb.onModified?.(),c()})}executeAction(e,t,n){switch(e){case`table:row-above`:this.insertRowAbove(t,n);break;case`table:row-below`:this.insertRowBelow(t,n);break;case`table:col-left`:this.insertColLeft(t,n);break;case`table:col-right`:this.insertColRight(t,n);break;case`table:row-delete`:this.deleteRow(t,n);break;case`table:col-delete`:this.deleteCol(t,n);break;case`table:delete`:this.deleteTable(n);break;case`table:merge`:this.doMerge();break;case`table:split-h`:this.doSplitH(t,n);break;case`table:split-v`:this.doSplitV(t,n);break;case`table:cell-props`:this.showCellPropsModal(t);break;case`table:table-props`:this.cb.onOpenTableProps?.(n);break;case`table:align-left`:this.applyTableAlign(n,`left`);break;case`table:align-center`:this.applyTableAlign(n,`center`);break;case`table:align-right`:this.applyTableAlign(n,`right`);break}}startColResize(e,t,n){let r=U(t),i=this.findCellCol(r,e);if(i===-1)return;let a=i+e.colSpan;if(a>=Math.max(...r.map(e=>e.length)))return;let o=e.getBoundingClientRect().width,s=60;for(let e=0;e<r.length;e++){let t=r[e]?.[a];if(t&&t.col===a){s=t.cell.getBoundingClientRect().width;break}}let c=t.querySelector(`colgroup`),l=c?Array.from(c.children):[];this.dragState={type:`col`,table:t,colIdx:i,nextColIdx:a,startX:n,startWidth1:o,startWidth2:s,col1:l[i]??null,col2:l[a]??null,grid:r};let u=t.ownerDocument;u.body.style.userSelect=`none`,t.classList.add(`col-resizing`);let d=e=>this.handleColDragMove(e),f=()=>{u.removeEventListener(`mousemove`,d),u.removeEventListener(`mouseup`,f),u.body.style.userSelect=``,t.classList.remove(`col-resizing`),this.dragState=null,this.cb.onModified?.()};u.addEventListener(`mousemove`,d),u.addEventListener(`mouseup`,f)}handleColDragMove(e){if(!this.dragState||this.dragState.type!==`col`)return;let t=this.dragState,n=e.clientX-t.startX,r=t.startWidth1+n,i=t.startWidth2-n;r<30&&(i-=30-r,r=30),i<30&&(r-=30-i,i=30),r=Math.max(30,r),i=Math.max(30,i),t.col1&&(t.col1.style.width=`${r}px`),t.col2&&(t.col2.style.width=`${i}px`),this.applyColCellWidths(t.grid,t.colIdx,r),this.applyColCellWidths(t.grid,t.nextColIdx,i)}applyColCellWidths(e,t,n){for(let r=0;r<e.length;r++){let i=e[r]?.[t];i&&i.row===r&&i.col===t&&i.cell.colSpan===1&&(i.cell.style.width=`${n}px`)}}startRowResize(e,t,n){let r=e.closest(`tr`);if(!r)return;let i=r.getBoundingClientRect().height;this.dragState={type:`row`,table:t,row:r,startY:n,startHeight:i};let a=t.ownerDocument;a.body.style.userSelect=`none`,t.classList.add(`row-resizing`);let o=e=>this.handleRowDragMove(e),s=()=>{a.removeEventListener(`mousemove`,o),a.removeEventListener(`mouseup`,s),a.body.style.userSelect=``,t.classList.remove(`row-resizing`),this.dragState=null,this.cb.onModified?.()};a.addEventListener(`mousemove`,o),a.addEventListener(`mouseup`,s)}handleRowDragMove(e){if(!this.dragState||this.dragState.type!==`row`)return;let t=this.dragState,n=Math.max(20,t.startHeight+(e.clientY-t.startY));t.row.style.height=`${n}px`,Array.from(t.row.cells).forEach(e=>{e.style.height=`${n}px`})}setCursorOnCell(e,t){this.lastCursorCell&&this.lastCursorCell!==e&&(this.lastCursorCell.style.cursor=``),e.style.cursor=t,this.lastCursorCell=e}clearResizeCursor(){this.lastCursorCell&&=(this.lastCursorCell.style.cursor=``,null),this.pendingResize=null}findCell(e){let t=e;for(;t;){if(t.nodeType===Node.ELEMENT_NODE){let e=t.tagName.toLowerCase();if(e===`td`||e===`th`)return t;if(e===`table`)break}t=t.parentNode}return null}findCellCol(e,t){for(let n=0;n<e.length;n++)for(let r=0;r<(e[n]?.length??0);r++){let i=e[n]?.[r];if(i?.cell===t&&i.row===n&&i.col===r)return r}return-1}},Bt=5,Vt=5,Ht=30,Ut=20,Wt=300,Gt={type:null,cell:null,row:null,startX:0,startY:0,startW:0,startH:0},Kt=class{contentEl=null;onModified=()=>{};state={...Gt};lastCursorCell=null;constructor(e=()=>{}){this.onModified=e}attach(e){this.detach(),this.contentEl=e,e.addEventListener(`mousemove`,this.onContentMouseMove),e.addEventListener(`mousedown`,this.onContentMouseDown),document.addEventListener(`mousemove`,this.onDocMouseMove),document.addEventListener(`mouseup`,this.onDocMouseUp)}detach(){this.contentEl&&=(this.contentEl.removeEventListener(`mousemove`,this.onContentMouseMove),this.contentEl.removeEventListener(`mousedown`,this.onContentMouseDown),null),document.removeEventListener(`mousemove`,this.onDocMouseMove),document.removeEventListener(`mouseup`,this.onDocMouseUp),this.resetCursor(),this.state={...Gt}}onContentMouseMove=e=>{if(this.state.type)return;let t=this.findCell(e.target);if(!t){this.resetCursor();return}let n=t.getBoundingClientRect();e.clientX>=n.right-Bt?(t.style.cursor=`col-resize`,this.lastCursorCell=t):e.clientY>=n.bottom-Vt?(t.style.cursor=`row-resize`,this.lastCursorCell=t):this.lastCursorCell===t?this.resetCursor():t.style.cursor=``};resetCursor(){this.lastCursorCell&&=(this.lastCursorCell.style.cursor=``,null)}onContentMouseDown=e=>{if(e.button!==0)return;let t=this.findCell(e.target);if(!t)return;let n=t.getBoundingClientRect();if(e.clientX>=n.right-Bt)e.preventDefault(),this.state={type:`col`,cell:t,row:null,startX:e.clientX,startY:0,startW:t.offsetWidth,startH:0},document.body.style.cursor=`col-resize`,document.body.style.userSelect=`none`;else if(e.clientY>=n.bottom-Vt){e.preventDefault();let n=t.closest(`tr`);if(!n)return;this.state={type:`row`,cell:null,row:n,startX:0,startY:e.clientY,startW:0,startH:n.offsetHeight},document.body.style.cursor=`row-resize`,document.body.style.userSelect=`none`}};onDocMouseMove=e=>{if(this.state.type){if(this.state.type===`col`&&this.state.cell){let t=e.clientX-this.state.startX;if(Math.abs(t)>Wt)return;let n=Math.max(Ht,this.state.startW+t);this.state.cell.style.width=`${n}px`,this.state.cell.style.minWidth=`${n}px`}if(this.state.type===`row`&&this.state.row){let t=e.clientY-this.state.startY;if(Math.abs(t)>Wt)return;let n=Math.max(Ut,this.state.startH+t);this.state.row.style.height=`${n}px`;for(let e of Array.from(this.state.row.cells))e.style.height=`${n}px`}}};onDocMouseUp=()=>{this.state.type&&(this.onModified(),this.state={...Gt},document.body.style.cursor=``,document.body.style.userSelect=``)};findCell(e){let t=e.nodeType===Node.ELEMENT_NODE?e:e.parentElement;return t?t.closest(`td, th`):null}},qt=class{contentEl=null;merger;anchor=null;isDragging=!1;justDragged=!1;constructor(e){this.merger=e}attach(e){this.detach(),this.contentEl=e,e.addEventListener(`mousedown`,this.mdownHandler),e.addEventListener(`click`,this.clickGuard,!0),document.addEventListener(`mousemove`,this.mmoveHandler),document.addEventListener(`mouseup`,this.mupHandler)}detach(){this.contentEl&&=(this.contentEl.removeEventListener(`mousedown`,this.mdownHandler),this.contentEl.removeEventListener(`click`,this.clickGuard,!0),null),document.removeEventListener(`mousemove`,this.mmoveHandler),document.removeEventListener(`mouseup`,this.mupHandler),this.anchor=null,this.isDragging=!1,this.justDragged=!1}mdownHandler=e=>{let t=this.findCell(e.target);t&&e.button===0&&(e.target.style?.cursor?.includes(`resize`)||t.style?.cursor?.includes(`resize`)||(this.anchor=t,this.isDragging=!1,this.justDragged=!1,this.merger.setAnchor(t),this.applyFeedback(`drag`)))};mmoveHandler=e=>{if(!this.anchor||e.buttons!==1)return;let t=this.findCellAt(e.clientX,e.clientY);if(!t)return;let n=this.anchor.closest(`table`);if(!n||t.closest(`table`)!==n||(!this.isDragging&&t!==this.anchor&&(this.isDragging=!0),!this.isDragging))return;this.merger.selectTo(t);let r=this.isRectangular()?`ok`:`bad`;this.applyFeedback(r)};mupHandler=()=>{if(!this.isDragging){this.anchor=null;return}this.isDragging=!1,this.justDragged=!0;let e=this.isRectangular()?`ok`:`bad`;this.applyFeedback(e),this.anchor=null};clickGuard=e=>{this.justDragged&&(this.justDragged=!1,this.findCell(e.target)&&e.stopPropagation())};isRectangular(){let e=this.merger.getSelectedCells(),t=this.merger.getSelectedTable();if(!t||e.length<2)return!0;let n=U(t),r=new Set(e),i=1/0,a=-1/0,o=1/0,s=-1/0;for(let e=0;e<n.length;e++)for(let t=0;t<(n[e]?.length??0);t++){let c=n[e]?.[t];c&&r.has(c.cell)&&(e<i&&(i=e),e>a&&(a=e),t<o&&(o=t),t>s&&(s=t))}for(let e=i;e<=a;e++)for(let t=o;t<=s;t++){let i=n[e]?.[t];if(!i||!r.has(i.cell))return!1}return!0}applyFeedback(e){let t=this.merger.getSelectedCells();for(let n of t)n.classList.remove(`poa-cell-selected`,`poa-cell-sel-ok`,`poa-cell-sel-bad`),e===`drag`&&n.classList.add(`poa-cell-selected`),e===`ok`&&n.classList.add(`poa-cell-sel-ok`),e===`bad`&&n.classList.add(`poa-cell-sel-bad`)}get canMerge(){return this.merger.getSelectedCells().length>=2&&this.isRectangular()}getCellSelection(){return this.merger.getSelectedCells()}findCell(e){let t=e;for(;t;){if(t.nodeType===Node.ELEMENT_NODE){let e=t.tagName.toLowerCase();if(e===`td`||e===`th`)return t;if(e===`table`)break}t=t.parentNode}return null}findCellAt(e,t){let n=document.elementFromPoint(e,t);return n?this.findCell(n):null}},Jt=class{contentEl=null;handle=null;currentTable=null;hideTimer=0;onSelectAll=null;constructor(e){this.onSelectAll=e??null}attach(e){this.detach(),this.contentEl=e,e.addEventListener(`mouseover`,this.overHandler),e.addEventListener(`mouseout`,this.outHandler),this.createHandle(e.ownerDocument)}detach(){this.contentEl&&=(this.contentEl.removeEventListener(`mouseover`,this.overHandler),this.contentEl.removeEventListener(`mouseout`,this.outHandler),null),this.handle?.remove(),this.handle=null,this.currentTable=null,clearTimeout(this.hideTimer)}overHandler=e=>{let t=this.findTable(e.target);t&&(clearTimeout(this.hideTimer),this.currentTable=t,this.positionHandle(t),this.showHandle())};outHandler=e=>{let t=e.relatedTarget;t&&(this.handle?.contains(t)||this.currentTable?.contains(t))||(this.hideTimer=window.setTimeout(()=>this.hideHandle(),200))};createHandle(e){let t=e.createElement(`div`);t.title=`표 전체 선택`,t.style.cssText=[`position:fixed`,`width:20px`,`height:20px`,`background:#1565c0`,`color:#fff`,`border-radius:3px`,`cursor:pointer`,`display:none`,`align-items:center`,`justify-content:center`,`font-size:14px`,`line-height:1`,`z-index:8000`,`box-shadow:0 1px 4px rgba(0,0,0,0.3)`,`user-select:none`,`-webkit-user-select:none`].join(`;`),t.textContent=`⊕`,t.addEventListener(`mousedown`,e=>{e.preventDefault(),e.stopPropagation()}),t.addEventListener(`click`,()=>{this.currentTable&&this.onSelectAll&&this.onSelectAll(this.currentTable)}),t.addEventListener(`mouseenter`,()=>{clearTimeout(this.hideTimer)}),t.addEventListener(`mouseleave`,()=>{this.hideTimer=window.setTimeout(()=>this.hideHandle(),200)}),e.body.appendChild(t),this.handle=t}positionHandle(e){if(!this.handle)return;let t=e.getBoundingClientRect();this.handle.style.left=`${t.left-2}px`,this.handle.style.top=`${t.top-2}px`}showHandle(){this.handle&&(this.handle.style.display=`flex`)}hideHandle(){this.handle&&(this.handle.style.display=`none`),this.currentTable=null}findTable(e){let t=e;for(;t;){if(t.nodeType===Node.ELEMENT_NODE&&t.tagName.toLowerCase()===`table`)return t;t=t.parentNode}return null}},Yt=class{contentEl=null;menuEl=null;navigator;cb;constructor(e,t={}){this.navigator=e,this.cb=t}attach(e){this.detach(),this.contentEl=e,e.addEventListener(`contextmenu`,this.cmHandler)}detach(){this.contentEl&&=(this.contentEl.removeEventListener(`contextmenu`,this.cmHandler),null),this.hide()}cmHandler=e=>{let t=this.findCell(e.target);t&&(e.preventDefault(),this.show(e.clientX,e.clientY,t))};show(e,t,n){this.hide();let r=n.closest(`table`);if(!r)return;let i=n.ownerDocument,a=U(r),o=Math.max(...a.map(e=>e.length)),s=r.rows.length,c=r.querySelectorAll(`.poa-cell-selected, .poa-cell-sel-ok`).length,l=this.cb.canMerge?.()??c>=2,u=n.colSpan>1||n.rowSpan>1,d=this.navigator,f=[{label:`셀 병합`,action:()=>this.doMerge(),disabled:!l},{label:`셀 나누기`,action:()=>this.cb.onSplitCell?.(n),disabled:!u},`---`,{label:`위에 행 삽입`,action:()=>d.executeAction(`table:row-above`,n,r)},{label:`아래에 행 삽입`,action:()=>d.executeAction(`table:row-below`,n,r)},{label:`왼쪽에 열 삽입`,action:()=>d.executeAction(`table:col-left`,n,r)},{label:`오른쪽에 열 삽입`,action:()=>d.executeAction(`table:col-right`,n,r)},`---`,{label:`행 삭제`,action:()=>d.executeAction(`table:row-delete`,n,r),disabled:s<=1},{label:`열 삭제`,action:()=>d.executeAction(`table:col-delete`,n,r),disabled:o<=1},{label:`표 삭제`,action:()=>d.executeAction(`table:delete`,n,r)},`---`,{label:`셀 속성`,action:()=>this.showCellProps(n)},{label:`표 속성`,action:()=>this.cb.onOpenTableProps?.(r)}],p=i.createElement(`div`);p.style.cssText=[`position:fixed`,`left:${e}px`,`top:${t}px`,`background:#fff`,`border:1px solid #ccc`,`border-radius:5px`,`box-shadow:0 4px 14px rgba(0,0,0,0.18)`,`z-index:9999`,`font-size:13px`,`min-width:170px`,`padding:5px 0`,`user-select:none`].join(`;`);for(let e of f){if(e===`---`){let e=i.createElement(`div`);e.style.cssText=`border-top:1px solid #eee;margin:4px 6px;`,p.appendChild(e);continue}let t=i.createElement(`div`);t.textContent=e.label,e.disabled?t.style.cssText=`padding:6px 18px;color:#bbb;cursor:default;`:(t.style.cssText=`padding:6px 18px;cursor:pointer;color:#222;`,t.addEventListener(`mouseenter`,()=>{t.style.background=`#eef3ff`}),t.addEventListener(`mouseleave`,()=>{t.style.background=``}),t.addEventListener(`mousedown`,t=>{t.preventDefault(),this.hide(),e.action()})),p.appendChild(t)}i.body.appendChild(p),this.menuEl=p,requestAnimationFrame(()=>{if(!this.menuEl)return;let n=this.menuEl.getBoundingClientRect(),r=i.defaultView?.innerWidth??0,a=i.defaultView?.innerHeight??0;n.right>r&&(this.menuEl.style.left=`${e-n.width}px`),n.bottom>a&&(this.menuEl.style.top=`${t-n.height}px`)}),i.addEventListener(`mousedown`,this.dismissHandler)}dismissHandler=e=>{this.menuEl&&!this.menuEl.contains(e.target)&&this.hide()};hide(){this.menuEl&&(this.menuEl.remove(),this.menuEl=null,this.contentEl?.ownerDocument.removeEventListener(`mousedown`,this.dismissHandler))}doMerge(){if(!this.cb.onMerge)return;let e=this.cb.onMerge();!e.success&&e.message&&this.cb.onError?.(e.message),e.success&&this.cb.onModified?.()}showCellProps(e){let t=e.ownerDocument,n=this.cb.getSelectedCells?.()??[],r=n.includes(e)&&n.length>0?n:[e],i=W.readCellProperties(r[0]),a=t.createElement(`div`);a.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,0.38);display:flex;align-items:center;justify-content:center;z-index:10000;`;let o=t.createElement(`div`);o.style.cssText=`background:#fff;border-radius:6px;box-shadow:0 4px 24px rgba(0,0,0,0.2);padding:20px 24px;min-width:280px;font-size:13px;`;let s=r.length>1?`<p style="margin:0 0 10px;font-size:11px;color:#1565c0;">선택된 ${r.length}개 셀에 일괄 적용됩니다.</p>`:``,c=`height:26px;padding:0 10px;border:1px solid #ccc;border-radius:3px;font-size:12px;cursor:pointer;background:#fff;color:#374151;transition:all .1s;`,l=`height:26px;padding:0 10px;border:1px solid #1565c0;border-radius:3px;font-size:12px;cursor:pointer;background:#EFF6FF;color:#1565c0;font-weight:600;`,u=i.verticalAlign??`middle`;o.innerHTML=`
<h4 style="margin:0 0 10px;font-size:14px;font-weight:600;">셀 속성</h4>
${s}
<div style="display:grid;grid-template-columns:80px 1fr;gap:8px 12px;align-items:center;">
  <label>테두리 종류</label>
  <select id="cp-bs" style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;">
    ${[`solid`,`dashed`,`dotted`,`double`,`none`].map(e=>`<option value="${e}">${e}</option>`).join(``)}
  </select>
  <label>테두리 두께</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-bw" type="number" value="${i.borderWidth??1}" min="0" max="20"
      style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span>
  </div>
  <label>테두리 색</label>
  <input id="cp-bc" type="color" value="${i.borderColor??`#000000`}"
    style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;">
  <label>들여쓰기</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-ind" type="number" value="${i.indent??0}" min="0"
      style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
    <span>px</span>
  </div>
  <label>배경색</label>
  <input id="cp-bg" type="color" value="${i.bgColor||`#ffffff`}"
    style="height:26px;width:60px;border:1px solid #ccc;border-radius:3px;">
  <label>글자 크기</label>
  <div style="display:flex;gap:4px;align-items:center;">
    <input id="cp-fs" type="number" value="${i.fontSize??0}" min="0" max="100"
      style="width:60px;height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;"
      placeholder="0=상속">
    <span>px</span>
  </div>
  <label>세로 정렬</label>
  <div style="display:flex;gap:4px;">
    <button type="button" data-va="top"    style="${u===`top`?l:c}">위쪽</button>
    <button type="button" data-va="middle" style="${u===`middle`?l:c}">가운데</button>
    <button type="button" data-va="bottom" style="${u===`bottom`?l:c}">아래쪽</button>
  </div>
  <label>ID</label>
  <input id="cp-id" type="text" value="${i.id??``}"
    style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
  <label>Class</label>
  <input id="cp-cls" type="text" value="${i.className??``}"
    style="height:26px;border:1px solid #ccc;border-radius:3px;font-size:13px;padding:0 6px;">
</div>
<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:16px;">
  <button id="cp-cancel" style="height:28px;padding:0 14px;border:1px solid #ccc;border-radius:3px;background:#fff;cursor:pointer;">취소</button>
  <button id="cp-ok" style="height:28px;padding:0 14px;border:1px solid #1565c0;border-radius:3px;background:#1565c0;color:#fff;cursor:pointer;">적용</button>
</div>`,a.appendChild(o),t.body.appendChild(a),o.querySelector(`#cp-bs`).value=i.borderStyle??`solid`;let d=o.querySelectorAll(`[data-va]`);d.forEach(e=>{e.addEventListener(`click`,()=>{d.forEach(e=>{e.style.cssText=`height:26px;padding:0 10px;border:1px solid #ccc;border-radius:3px;font-size:12px;cursor:pointer;background:#fff;color:#374151;transition:all .1s;`}),e.style.cssText=`height:26px;padding:0 10px;border:1px solid #1565c0;border-radius:3px;font-size:12px;cursor:pointer;background:#EFF6FF;color:#1565c0;font-weight:600;`})});let f=()=>a.remove();o.querySelector(`#cp-cancel`).addEventListener(`click`,f),a.addEventListener(`click`,e=>{e.target===a&&f()}),o.querySelector(`#cp-ok`).addEventListener(`click`,()=>{let e=o.querySelector(`[data-va][style*="#EFF6FF"]`),t={borderStyle:o.querySelector(`#cp-bs`).value,borderWidth:parseInt(o.querySelector(`#cp-bw`).value,10)||0,borderColor:o.querySelector(`#cp-bc`).value,indent:parseInt(o.querySelector(`#cp-ind`).value,10)||0,bgColor:o.querySelector(`#cp-bg`).value,fontSize:parseInt(o.querySelector(`#cp-fs`).value,10)||0,verticalAlign:e?.dataset.va??u,id:o.querySelector(`#cp-id`).value.trim(),className:o.querySelector(`#cp-cls`).value.trim()};for(let e of r)W.applyCellProperties(e,t);this.cb.onModified?.(),f()})}findCell(e){let t=e;for(;t;){if(t.nodeType===Node.ELEMENT_NODE){let e=t.tagName.toLowerCase();if(e===`td`||e===`th`)return t;if(e===`table`)break}t=t.parentNode}return null}},G=`padding:6px 8px;overflow:hidden;word-break:break-word;`;function Xt(e){return Array.from(e.querySelectorAll(`td,th`))}function Zt(e){return Array.from(e.querySelectorAll(`thead td,thead th`))}function Qt(e){return Array.from(e.querySelectorAll(`tbody tr`))}function $t(e){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">${e}</svg>`}var en={"border-all":$t(`
    <rect x="3" y="3" width="34" height="34" fill="#fff" stroke="#bbb" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#bbb" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#bbb" stroke-width="1"/>
    <line x1="3"  y1="14" x2="37" y2="14" stroke="#bbb" stroke-width="1"/>
    <line x1="3"  y1="25" x2="37" y2="25" stroke="#bbb" stroke-width="1"/>`),"border-thick":$t(`
    <rect x="2" y="2" width="36" height="36" fill="#fff" stroke="#444" stroke-width="2"/>
    <line x1="14" y1="2" x2="14" y2="38" stroke="#aaa" stroke-width="1"/>
    <line x1="26" y1="2" x2="26" y2="38" stroke="#aaa" stroke-width="1"/>
    <line x1="2"  y1="13" x2="38" y2="13" stroke="#aaa" stroke-width="1"/>
    <line x1="2"  y1="25" x2="38" y2="25" stroke="#aaa" stroke-width="1"/>`),"header-light":$t(`
    <rect x="3" y="3"  width="34" height="11" fill="#f0f0f0" stroke="#ccc" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff"    stroke="#ccc" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#fff"    stroke="#ccc" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#ccc" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#ccc" stroke-width="1"/>`),"header-dark":$t(`
    <rect x="3" y="3"  width="34" height="11" fill="#333" stroke="#333" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff" stroke="#aaa" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#fff" stroke="#aaa" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#888" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#888" stroke-width="1"/>`),"stripe-light":$t(`
    <rect x="3" y="3"  width="34" height="11" fill="#f9f9f9" stroke="#ddd" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff"    stroke="#ddd" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#f9f9f9" stroke="#ddd" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#ddd" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#ddd" stroke-width="1"/>`),"stripe-dark":$t(`
    <rect x="3" y="3"  width="34" height="11" fill="#e0e0e0" stroke="#bbb" stroke-width="1"/>
    <rect x="3" y="14" width="34" height="11" fill="#fff"    stroke="#bbb" stroke-width="1"/>
    <rect x="3" y="25" width="34" height="12" fill="#e0e0e0" stroke="#bbb" stroke-width="1"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#bbb" stroke-width="1"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#bbb" stroke-width="1"/>`),borderless:$t(`
    <rect x="3" y="3" width="34" height="34" fill="#fafafa" stroke="#e0e0e0"
          stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="3"  y1="14" x2="37" y2="14" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>
    <line x1="3"  y1="25" x2="37" y2="25" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="2,2"/>`),dashed:$t(`
    <rect x="3" y="3" width="34" height="34" fill="#fff" stroke="#999"
          stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="14" y1="3" x2="14" y2="37" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="25" y1="3" x2="25" y2="37" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="3"  y1="14" x2="37" y2="14" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="3"  y1="25" x2="37" y2="25" stroke="#999" stroke-width="1" stroke-dasharray="3,2"/>`)},tn=[{id:`border-all`,label:`전체 테두리`,icon:en[`border-all`],baseOptions:{width:`100%`,border:1,borderColor:`#cccccc`,headerPosition:`none`},apply:e=>{for(let t of Xt(e))t.style.cssText=`border:1px solid #ccc;${G}`}},{id:`border-thick`,label:`굵은 외부`,icon:en[`border-thick`],baseOptions:{width:`100%`,border:1,borderColor:`#aaaaaa`,headerPosition:`none`},apply:e=>{for(let t of Xt(e))t.style.cssText=`border:1px solid #aaa;${G}`;e.style.boxShadow=`0 0 0 2px #333333`}},{id:`header-light`,label:`헤더 강조`,icon:en[`header-light`],baseOptions:{width:`100%`,border:1,borderColor:`#cccccc`,headerPosition:`top`},apply:e=>{for(let t of Xt(e))t.style.cssText=`border:1px solid #ccc;${G}`;for(let t of Zt(e))t.style.cssText=`border:1px solid #ccc;${G}background:#f0f0f0;font-weight:bold;`}},{id:`header-dark`,label:`헤더 진한`,icon:en[`header-dark`],baseOptions:{width:`100%`,border:1,borderColor:`#aaaaaa`,headerPosition:`top`},apply:e=>{for(let t of Xt(e))t.style.cssText=`border:1px solid #aaa;${G}`;for(let t of Zt(e))t.style.cssText=`border:1px solid #555;${G}background:#333333;color:#ffffff;font-weight:bold;`}},{id:`stripe-light`,label:`줄무늬`,icon:en[`stripe-light`],baseOptions:{width:`100%`,border:1,borderColor:`#dddddd`,headerPosition:`none`},apply:e=>{for(let t of Xt(e))t.style.cssText=`border:1px solid #ddd;${G}`;Qt(e).forEach((e,t)=>{let n=t%2==0?`#f9f9f9`:``;for(let t of Array.from(e.querySelectorAll(`td,th`)))t.style.backgroundColor=n})}},{id:`stripe-dark`,label:`진한 줄무늬`,icon:en[`stripe-dark`],baseOptions:{width:`100%`,border:1,borderColor:`#bbbbbb`,headerPosition:`none`},apply:e=>{for(let t of Xt(e))t.style.cssText=`border:1px solid #bbb;${G}`;Qt(e).forEach((e,t)=>{let n=t%2==0?`#e0e0e0`:``;for(let t of Array.from(e.querySelectorAll(`td,th`)))t.style.backgroundColor=n})}},{id:`borderless`,label:`테두리 없음`,icon:en.borderless,baseOptions:{width:`100%`,border:0,headerPosition:`none`},apply:e=>{for(let t of Xt(e))t.style.cssText=`border:none;${G}`;e.removeAttribute(`border`)}},{id:`dashed`,label:`점선 테두리`,icon:en.dashed,baseOptions:{width:`100%`,border:1,borderColor:`#999999`,headerPosition:`none`},apply:e=>{for(let t of Xt(e))t.style.cssText=`border:1px dashed #999;${G}`}}];function nn(e,t){tn.find(t=>t.id===e)?.apply(t)}var rn=new Set([`http:`,`https:`,`mailto:`,`tel:`]);function an(e){if(e.startsWith(`#`))return e.length>1;try{let t=new URL(e);return rn.has(t.protocol)}catch{return!1}}var on=class{root;savedRange=null;constructor(e){this.root=e}saveSelection(){let e=this.root.ownerDocument.getSelection();e&&e.rangeCount>0&&(this.savedRange=e.getRangeAt(0).cloneRange())}insertLink(e){if(!an(e.href))throw Error(`유효하지 않은 URL입니다.`);let t=this.root.ownerDocument.createElement(`a`);t.href=e.href,e.title&&(t.title=e.title),e.target===`_blank`&&(t.target=`_blank`,t.rel=`noopener noreferrer`),t.textContent=this.savedRange?.toString().trim()||e.text.trim()||e.href,e.target===`_self`&&(t.target=`_self`),this.insertNode(t)}updateLink(e,t){if(t.href!==void 0){if(!an(t.href))throw Error(`유효하지 않은 URL입니다.`);e.href=t.href}t.text!==void 0&&(e.textContent=t.text),t.title!==void 0&&(e.title=t.title),t.target!==void 0&&(t.target===`_blank`?(e.target=`_blank`,e.rel=`noopener noreferrer`):(e.target=`_self`,e.removeAttribute(`rel`)))}removeLink(e){let t=e.parentNode;if(t){for(;e.firstChild;)t.insertBefore(e.firstChild,e);t.removeChild(e)}}getFocusedAnchor(){let e=this.root.ownerDocument.getSelection();if(!e||e.rangeCount===0)return null;let t=e.getRangeAt(0).startContainer;for(;t&&t!==this.root;){if(t.nodeType===Node.ELEMENT_NODE&&t.tagName===`A`)return t;t=t.parentNode}return null}insertNode(e){let t=this.root.ownerDocument,n=t.getSelection(),r;this.savedRange?(r=this.savedRange.cloneRange(),this.savedRange=null):n&&n.rangeCount>0?r=n.getRangeAt(0):(r=t.createRange(),r.selectNodeContents(this.root),r.collapse(!1)),r.deleteContents(),r.insertNode(e),r.setStartAfter(e),r.collapse(!0),n?.removeAllRanges(),n?.addRange(r)}};function sn(){let e=new Uint8Array(6);return crypto.getRandomValues(e),Array.from(e,e=>e.toString(16).padStart(2,`0`)).join(``)}var cn=class{root;savedRange=null;constructor(e){this.root=e}saveSelection(){let e=this.root.ownerDocument.getSelection();e&&e.rangeCount>0&&(this.savedRange=e.getRangeAt(0).cloneRange())}insert(e){let t=`bm-${sn()}`,n=this.root.ownerDocument.createElement(`a`);return n.id=t,n.setAttribute(`name`,t),n.className=`poa-bookmark`,n.setAttribute(`data-label`,e),n.title=e||t,n.textContent=`[${e||t}]`,n.contentEditable=`false`,this.insertAtRange(n),t}getAll(){return Array.from(this.root.querySelectorAll(`a.poa-bookmark[id^="bm-"]`)).map(e=>({id:e.id,label:e.getAttribute(`data-label`)??e.id,element:e}))}update(e,t){let n=this.root.querySelector(`a[id="${e}"]`);if(!n)throw Error(`책갈피 '${e}'를 찾을 수 없습니다.`);n.setAttribute(`data-label`,t),n.title=t,n.textContent=`[${t||e}]`}remove(e){this.root.querySelector(`a[id="${e}"]`)?.remove()}insertAtRange(e){let t=this.root.ownerDocument,n=t.getSelection(),r;this.savedRange?(r=this.savedRange.cloneRange(),this.savedRange=null):n&&n.rangeCount>0?r=n.getRangeAt(0):(r=t.createRange(),r.selectNodeContents(this.root),r.collapse(!1)),r.collapse(!0),r.insertNode(e),r.setStartAfter(e),r.collapse(!0),n?.removeAllRanges(),n?.addRange(r)}},ln=[{dir:`nw`,cursor:`nw-resize`,top:`0`,left:`0`},{dir:`n`,cursor:`n-resize`,top:`0`,left:`50%`},{dir:`ne`,cursor:`ne-resize`,top:`0`,left:`100%`},{dir:`e`,cursor:`e-resize`,top:`50%`,left:`100%`},{dir:`se`,cursor:`se-resize`,top:`100%`,left:`100%`},{dir:`s`,cursor:`s-resize`,top:`100%`,left:`50%`},{dir:`sw`,cursor:`sw-resize`,top:`100%`,left:`0`},{dir:`w`,cursor:`w-resize`,top:`50%`,left:`0`}],un=20,dn=class{root;cb;overlay=null;activeImg=null;dragging=!1;dragDir=`se`;dragStartX=0;dragStartY=0;dragStartW=0;dragStartH=0;constructor(e,t={}){this.root=e,this.cb=t}attach(){this.root.style.position||(this.root.style.position=`relative`),this.root.addEventListener(`click`,this.onRootClick,!0),this.root.addEventListener(`contextmenu`,this.onContextMenu),this.root.addEventListener(`input`,this.onContentInput),document.addEventListener(`mousemove`,this.onMouseMove),document.addEventListener(`mouseup`,this.onMouseUp)}detach(){this.deactivate(),this.root.removeEventListener(`click`,this.onRootClick,!0),this.root.removeEventListener(`contextmenu`,this.onContextMenu),this.root.removeEventListener(`input`,this.onContentInput),document.removeEventListener(`mousemove`,this.onMouseMove),document.removeEventListener(`mouseup`,this.onMouseUp)}getActiveImage(){return this.activeImg}syncOverlay(){this.updatePos()}deactivate(){this.overlay?.remove(),this.overlay=null,this.activeImg&&(this.activeImg=null,this.cb.onDeactivate?.())}activate(e){this.activeImg!==e&&(this.overlay?.remove(),this.activeImg=e,this.createOverlay(),this.cb.onActivate?.(e))}createOverlay(){if(!this.activeImg)return;let e=document.createElement(`div`);e.className=`poa-img-resize-overlay`,e.dataset.poaTemp=`true`,e.style.cssText=`position:absolute;border:2px solid #0078d7;pointer-events:none;z-index:10;box-sizing:border-box;`;for(let t of ln){let n=document.createElement(`div`);n.dataset.dir=t.dir,n.style.cssText=`position:absolute;width:8px;height:8px;background:#0078d7;border:1px solid #fff;border-radius:1px;box-sizing:border-box;cursor:${t.cursor};top:${t.top};left:${t.left};transform:translate(-50%,-50%);pointer-events:all;z-index:11;`,n.addEventListener(`mousedown`,this.onHandleMouseDown),e.appendChild(n)}this.root.appendChild(e),this.overlay=e,this.updatePos()}updatePos(){if(!this.overlay||!this.activeImg)return;let e=this.activeImg.getBoundingClientRect(),t=this.root.getBoundingClientRect(),n=e.top-t.top+this.root.scrollTop,r=e.left-t.left+this.root.scrollLeft;Object.assign(this.overlay.style,{top:`${n}px`,left:`${r}px`,width:`${e.width}px`,height:`${e.height}px`})}onRootClick=e=>{let t=e.target;this.overlay?.contains(t)||(t.tagName===`IMG`?this.activate(t):this.deactivate())};onContextMenu=e=>{let t=e.target;if(t.tagName!==`IMG`)return;e.preventDefault();let n=t;this.activate(n),this.cb.onContextMenu?.(n,e.clientX,e.clientY)};onContentInput=()=>{this.activeImg&&!this.root.contains(this.activeImg)&&this.deactivate()};onHandleMouseDown=e=>{if(!this.activeImg)return;let t=e.currentTarget.dataset.dir;e.preventDefault(),e.stopPropagation();let n=this.activeImg.getBoundingClientRect();this.dragging=!0,this.dragDir=t,this.dragStartX=e.clientX,this.dragStartY=e.clientY,this.dragStartW=n.width,this.dragStartH=n.height,document.body.style.cursor=e.currentTarget.style.cursor,document.body.style.userSelect=`none`};onMouseMove=e=>{if(!this.dragging||!this.activeImg)return;let t=e.clientX-this.dragStartX,n=e.clientY-this.dragStartY,r=this.dragDir,i=this.root.clientWidth,a=this.dragStartW,o=this.dragStartH;(r===`e`||r===`ne`||r===`se`)&&(a=this.dragStartW+t),(r===`w`||r===`nw`||r===`sw`)&&(a=this.dragStartW-t),(r===`s`||r===`se`||r===`sw`)&&(o=this.dragStartH+n),(r===`n`||r===`ne`||r===`nw`)&&(o=this.dragStartH-n);let s=r===`nw`||r===`ne`||r===`sw`||r===`se`;if(e.shiftKey&&s&&this.dragStartH>0){let e=this.dragStartW/this.dragStartH;Math.abs(t)>=Math.abs(n)?o=a/e:a=o*e}a=Math.max(un,Math.min(i,a)),o=Math.max(un,o),this.activeImg.style.width=`${Math.round(a)}px`,this.activeImg.style.height=`${Math.round(o)}px`,this.updatePos(),this.cb.onResize?.(this.activeImg)};onMouseUp=()=>{this.dragging&&(this.dragging=!1,document.body.style.cursor=``,document.body.style.userSelect=``,this.activeImg&&(this.updatePos(),this.cb.onResizeEnd?.()))}},fn=794,pn=1123,mn={top:60,right:80,bottom:60,left:80},hn=`poa-print-styles`,gn=class{container=null;mount(e,t,n=[],r=mn){this.container=e,e.innerHTML=``;let i=document.createElement(`div`);i.className=`poa-page-main`,i.style.cssText=`flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;align-items:center;background:#e8e8e8;`,this.injectPrintStyles(r);let a=this.splitByPageBreaks(t);for(let e of a)i.appendChild(this.buildPage(e,r));e.appendChild(i),n.length>0&&e.appendChild(this.buildSidebar(n))}unmount(){this.container&&=(this.container.innerHTML=``,null),document.getElementById(hn)?.remove()}getPageCount(e){return this.splitByPageBreaks(e).length}buildPage(e,t){let n=document.createElement(`div`);return n.className=`poa-a4-page`,n.style.cssText=[`width:${fn}px`,`min-height:${pn}px`,`background:#fff`,`box-shadow:0 2px 8px rgba(0,0,0,.2)`,`padding:${t.top}px ${t.right}px ${t.bottom}px ${t.left}px`,`box-sizing:border-box`,`margin-bottom:20px`,`position:relative`,`font-size:14px`,`line-height:1.6`].join(`;`),n.innerHTML=e,n}buildSidebar(e){let t=document.createElement(`div`);t.className=`poa-page-sidebar`,t.style.cssText=[`width:180px`,`flex-shrink:0`,`overflow-y:auto`,`background:#fafafa`,`border-left:1px solid #ddd`,`padding:12px`].join(`;`);let n=document.createElement(`div`);n.style.cssText=`font-size:12px;font-weight:600;color:#555;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #eee;`,n.textContent=`책갈피`,t.appendChild(n);for(let n of e){let e=document.createElement(`a`);e.href=`#${n.id}`,e.textContent=n.label,e.style.cssText=`display:block;font-size:12px;color:#1976d2;text-decoration:none;padding:5px 0;border-bottom:1px solid #f0f0f0;`,e.addEventListener(`mouseenter`,()=>{e.style.textDecoration=`underline`}),e.addEventListener(`mouseleave`,()=>{e.style.textDecoration=`none`}),t.appendChild(e)}return t}splitByPageBreaks(e){let t=e.split(/<hr[^>]*class="[^"]*poa-page-break[^"]*"[^>]*\/?>|<div[^>]*class="[^"]*poa-page-break[^"]*"[^>]*>[\s\S]*?<\/div>/gi);return t.length>0?t:[e]}injectPrintStyles(e){if(document.getElementById(hn))return;let t=document.createElement(`style`);t.id=hn,t.textContent=`
@media print {
  body > *:not(poa-editor) { display: none !important; }
  poa-editor { all: unset; display: block; }
  .poa-page-sidebar { display: none; }
  .poa-a4-page {
    page-break-after: always;
    box-shadow: none !important;
    margin: 0 !important;
    padding: ${e.top}px ${e.right}px ${e.bottom}px ${e.left}px !important;
  }
  hr.poa-page-break { display: none; }
}
`,document.head.appendChild(t)}};function _n(e){let t=e.ownerDocument,n=t.getSelection(),r;n&&n.rangeCount>0?r=n.getRangeAt(0):(r=t.createRange(),r.selectNodeContents(e),r.collapse(!1)),r.deleteContents();let i=t.createElement(`div`);i.className=`poa-page-break`,i.contentEditable=`false`;let a=t.createElement(`span`);a.className=`poa-page-break-label`,a.textContent=`페이지 나누기`,i.appendChild(a);let o=t.createElement(`p`);o.appendChild(t.createElement(`br`));let s=vn(r.startContainer,e);s&&s!==e?s.after(i,o):(r.insertNode(o),r.insertNode(i));let c=t.createRange();c.setStart(o,0),c.collapse(!0),n?.removeAllRanges(),n?.addRange(c),P.emit(F.FILE_DIRTY,!0),e.dispatchEvent(new Event(`input`,{bubbles:!0}))}function vn(e,t){let n=new Set([`P`,`DIV`,`H1`,`H2`,`H3`,`H4`,`H5`,`H6`,`BLOCKQUOTE`,`LI`,`TD`,`TH`,`PRE`]),r=e.nodeType===Node.ELEMENT_NODE?e:e.parentElement;for(;r&&r!==t;){if(r.nodeType===Node.ELEMENT_NODE&&n.has(r.tagName))return r;r=r.parentNode}return null}var yn=`modulepreload`,bn=function(e){return`/poa-editor/`+e},xn={},Sn=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=bn(t,n),t in xn)return;xn[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:yn,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Cn=class{mode=`design`;rulerVisible=!1;gridVisible=!1;hiddenBorderVisible=!1;wrapper=null;contentRow=null;rulerH=null;rulerV=null;gridOverlay=null;htmlPanel=null;previewPanel=null;textPanel=null;pagePanel=null;pageViewInstance=null;cmGetContent=null;cmDestroy=null;constructor(e,t={}){this.contentEl=e,this.callbacks=t}attach(){let e=this.contentEl.parentElement;if(!e)return;let t=document.createElement(`div`);t.className=`poa-view-wrapper`;let n=this.contentEl.getAttribute(`slot`)??``;n&&(t.setAttribute(`slot`,n),this.contentEl.removeAttribute(`slot`)),t.style.cssText=`display:flex;flex-direction:column;flex:1;overflow:hidden;position:relative;min-height:0;`,e.insertBefore(t,this.contentEl);let r=document.createElement(`div`);r.className=`poa-view-content-row`,r.style.cssText=`display:flex;flex:1;overflow:hidden;min-height:0;`,t.appendChild(r),r.appendChild(this.contentEl),this.contentEl.style.flex=`1`,this.contentEl.style.minHeight=`0`,this.htmlPanel=this.createPanel(`poa-html-panel`),this.previewPanel=this.createPanel(`poa-preview-panel`),this.textPanel=this.createPanel(`poa-text-panel`),this.pagePanel=this.createPanel(`poa-page-panel`),r.appendChild(this.htmlPanel),r.appendChild(this.previewPanel),r.appendChild(this.textPanel),r.appendChild(this.pagePanel),this.wrapper=t,this.contentRow=r}detach(){if(this.cmDestroy?.(),this.cmDestroy=null,this.cmGetContent=null,this.pageViewInstance?.unmount(),this.pageViewInstance=null,this.wrapper&&this.contentEl){let e=this.wrapper.parentElement;if(e){let t=this.wrapper.getAttribute(`slot`)??``;t&&this.contentEl.setAttribute(`slot`,t),e.insertBefore(this.contentEl,this.wrapper),this.wrapper.remove()}}this.contentEl.style.display=``,this.wrapper=null,this.contentRow=null,this.rulerH=null,this.rulerV=null,this.gridOverlay=null,this.htmlPanel=null,this.previewPanel=null,this.textPanel=null,this.pagePanel=null}getMode(){return this.mode}isRulerVisible(){return this.rulerVisible}isGridVisible(){return this.gridVisible}getScrollContainer(){return this.contentRow}async switchTo(e){if(this.mode!==e){switch(this.mode===`html`&&(this.syncFromHtml(),this.cmDestroy?.(),this.cmDestroy=null,this.cmGetContent=null,this.htmlPanel&&(this.htmlPanel.innerHTML=``)),this.mode===`page`&&(this.pageViewInstance?.unmount(),this.pageViewInstance=null),this.mode=e,this.contentEl.style.display=e===`design`?``:`none`,this.htmlPanel&&(this.htmlPanel.style.display=e===`html`?`flex`:`none`),this.previewPanel&&(this.previewPanel.style.display=e===`preview`?`block`:`none`),this.textPanel&&(this.textPanel.style.display=e===`text`?`block`:`none`),this.pagePanel&&(this.pagePanel.style.display=e===`page`?`flex`:`none`),e){case`html`:await this.initHtmlView();break;case`preview`:this.initPreviewView();break;case`text`:this.initTextView();break;case`page`:this.initPageView();break;case`design`:this.contentEl.focus();break}this.callbacks.onViewChange?.(e)}}toggleRuler(){return this.rulerVisible=!this.rulerVisible,this.applyRuler(),this.rulerVisible}toggleGrid(){return this.gridVisible=!this.gridVisible,this.applyGrid(),this.gridVisible}toggleHiddenBorder(){return this.hiddenBorderVisible=!this.hiddenBorderVisible,this.contentEl.classList.toggle(`poa-show-hidden-borders`,this.hiddenBorderVisible),this.hiddenBorderVisible}toggleFullscreen(e){document.fullscreenElement?document.exitFullscreen?.():e.requestFullscreen?.()}createPanel(e){let t=document.createElement(`div`);return t.className=e,t.style.cssText=`display:none;flex:1;overflow-y:auto;box-sizing:border-box;min-height:0;`,t}async initHtmlView(){if(!this.htmlPanel)return;let e=this.prettyHtml(this.contentEl.innerHTML);try{let[{EditorView:t,basicSetup:n},{html:r}]=await Promise.all([Sn(()=>import(`./dist-BltSwrmZ.js`),__vite__mapDeps([0,1])),Sn(()=>import(`./dist-CM7C67hO.js`),__vite__mapDeps([2,1]))]);this.htmlPanel.innerHTML=``,this.htmlPanel.style.cssText=`display:flex;flex:1;overflow:hidden;box-sizing:border-box;`;let i=document.createElement(`div`);i.style.cssText=`flex:1;overflow:auto;`,this.htmlPanel.appendChild(i);let a=new t({doc:e,extensions:[n,r()],parent:i});this.cmGetContent=()=>a.state.doc.toString(),this.cmDestroy=()=>a.destroy()}catch{this.htmlPanel.innerHTML=``,this.htmlPanel.style.cssText=`display:flex;flex:1;overflow:hidden;box-sizing:border-box;`;let t=document.createElement(`textarea`);t.value=e,t.id=`poa-html-fallback-ta`,t.style.cssText=`flex:1;font-family:monospace;font-size:13px;border:none;outline:none;padding:12px;resize:none;box-sizing:border-box;`,this.htmlPanel.appendChild(t),this.cmGetContent=()=>t.value,this.cmDestroy=()=>{}}}syncFromHtml(){let e=this.cmGetContent?.()??``;e.trim()&&(this.contentEl.innerHTML=M.sanitize(e))}initPreviewView(){if(!this.previewPanel)return;I(this.contentEl);let e=M.sanitize(this.contentEl.innerHTML);this.previewPanel.style.cssText=`display:block;flex:1;overflow-y:auto;padding:20px;font-size:14px;line-height:1.6;box-sizing:border-box;`,this.previewPanel.innerHTML=e}initTextView(){if(!this.textPanel)return;let e=this.contentEl.innerText??this.contentEl.textContent??``;this.textPanel.innerHTML=``,this.textPanel.style.cssText=`display:block;flex:1;overflow-y:auto;box-sizing:border-box;`;let t=document.createElement(`pre`);t.style.cssText=`padding:20px;white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0;font-family:inherit;`,t.textContent=e,this.textPanel.appendChild(t)}initPageView(){if(!this.pagePanel)return;I(this.contentEl);let e=M.sanitize(this.contentEl.innerHTML),t=this.callbacks.getBookmarks?.()??[];this.pagePanel.innerHTML=``,this.pagePanel.style.cssText=`display:flex;flex:1;overflow:hidden;box-sizing:border-box;`,this.pageViewInstance=new gn,this.pageViewInstance.mount(this.pagePanel,e,t)}applyRuler(){!this.wrapper||!this.contentRow||(this.rulerVisible?(this.rulerH||(this.rulerH=this.buildHRuler(),this.wrapper.insertBefore(this.rulerH,this.contentRow)),this.rulerH.style.display=`block`,this.rulerV||(this.rulerV=this.buildVRuler(),this.contentRow.insertBefore(this.rulerV,this.contentRow.firstChild)),this.rulerV.style.display=`block`):(this.rulerH&&(this.rulerH.style.display=`none`),this.rulerV&&(this.rulerV.style.display=`none`)))}applyGrid(){if(this.wrapper)if(this.gridVisible){if(!this.gridOverlay){let e=document.createElement(`div`);e.className=`poa-grid-overlay`,e.style.cssText=`position:absolute;inset:0;pointer-events:none;z-index:5;background-image:repeating-linear-gradient(transparent,transparent 19px,rgba(0,120,212,.12) 19px,rgba(0,120,212,.12) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(0,120,212,.12) 19px,rgba(0,120,212,.12) 20px);`,this.wrapper.appendChild(e),this.gridOverlay=e}this.gridOverlay.style.display=``}else this.gridOverlay&&(this.gridOverlay.style.display=`none`)}buildHRuler(){let e=document.createElement(`div`);e.className=`poa-ruler-h`,e.style.cssText=`height:20px;flex-shrink:0;background:#f0f0f0;border-bottom:1px solid #ddd;overflow:hidden;`;let t=document.createElement(`canvas`);return t.height=20,e.appendChild(t),requestAnimationFrame(()=>{try{this.drawHRuler(t)}catch{}}),e}buildVRuler(){let e=document.createElement(`div`);e.className=`poa-ruler-v`,e.style.cssText=`width:20px;flex-shrink:0;background:#f0f0f0;border-right:1px solid #ddd;overflow:hidden;`;let t=document.createElement(`canvas`);return t.width=20,e.appendChild(t),requestAnimationFrame(()=>{try{this.drawVRuler(t)}catch{}}),e}drawHRuler(e){let t=(this.wrapper?.clientWidth??0)||800;e.width=t;let n=e.getContext(`2d`);if(n){n.clearRect(0,0,t,20),n.strokeStyle=`#bbb`,n.fillStyle=`#777`,n.font=`8px sans-serif`,n.lineWidth=1;for(let e=0;e<=t;e+=10){let t=e%100==0,r=t?12:e%50==0?8:4;n.beginPath(),n.moveTo(e+.5,20-r),n.lineTo(e+.5,20),n.stroke(),t&&e>0&&(n.textAlign=`center`,n.fillText(String(e),e,7))}}}drawVRuler(e){let t=(this.wrapper?.clientHeight??0)||600;e.height=t;let n=e.getContext(`2d`);if(n){n.clearRect(0,0,20,t),n.strokeStyle=`#bbb`,n.fillStyle=`#777`,n.font=`8px sans-serif`,n.lineWidth=1;for(let e=0;e<=t;e+=10){let t=e%100==0,r=t?12:e%50==0?8:4;n.beginPath(),n.moveTo(20-r,e+.5),n.lineTo(20,e+.5),n.stroke(),t&&e>0&&(n.save(),n.translate(6,e),n.rotate(-Math.PI/2),n.textAlign=`center`,n.fillText(String(e),0,0),n.restore())}}}prettyHtml(e){return e.replace(/(<\/(?:div|p|br|h[1-6]|li|ul|ol|table|tr|td|th|thead|tbody|tfoot)>)/gi,`$1
`).replace(/(<(?:div|p|h[1-6]|li|ul|ol|table|tr|td|th|thead|tbody|tfoot)[^>]*>)/gi,`
$1`).replace(/\n{3,}/g,`

`).trim()}},wn=100,Tn=8,En=[{dir:`e`,cursor:`e-resize`,top:`50%`,left:`100%`},{dir:`s`,cursor:`s-resize`,top:`100%`,left:`50%`},{dir:`se`,cursor:`se-resize`,top:`100%`,left:`100%`}],Dn=class{contentEl;cb;table=null;overlay=null;preview=null;tooltip=null;dragging=!1;dragDir=`se`;dragStartX=0;dragStartY=0;dragStartW=0;dragStartH=0;constructor(e,t={}){this.contentEl=e,this.cb=t}attach(e){this.detach(),this.table=e,this.createOverlay(),document.addEventListener(`mousemove`,this.onMouseMove),document.addEventListener(`mouseup`,this.onMouseUp),this.contentEl.addEventListener(`scroll`,this.syncHandles),window.addEventListener(`scroll`,this.syncHandles,!0),this.contentEl.addEventListener(`input`,this.onContentInput)}detach(){this.overlay?.remove(),this.preview?.remove(),this.destroyTooltip(),this.overlay=null,this.preview=null,this.table=null,this.dragging=!1,document.removeEventListener(`mousemove`,this.onMouseMove),document.removeEventListener(`mouseup`,this.onMouseUp),this.contentEl.removeEventListener(`scroll`,this.syncHandles),window.removeEventListener(`scroll`,this.syncHandles,!0),this.contentEl.removeEventListener(`input`,this.onContentInput)}syncHandles=()=>{this.updateOverlayPos()};createOverlay(){if(!this.table)return;let e=document.createElement(`div`);e.dataset.poaTemp=`true`,e.style.cssText=`position:fixed;pointer-events:none;z-index:10;box-sizing:border-box;`;for(let t of En){let n=document.createElement(`div`);n.dataset.dir=t.dir,n.dataset.poaTemp=`true`,n.style.cssText=`position:absolute;width:${Tn}px;height:${Tn}px;background:#0078d7;border:1px solid #fff;border-radius:1px;box-sizing:border-box;cursor:${t.cursor};top:${t.top};left:${t.left};transform:translate(-50%,-50%);pointer-events:all;z-index:11;`,n.addEventListener(`mousedown`,this.onHandleMouseDown),e.appendChild(n)}document.body.appendChild(e),this.overlay=e,this.updateOverlayPos()}updateOverlayPos(){if(!this.overlay||!this.table)return;let e=this.table.getBoundingClientRect();Object.assign(this.overlay.style,{top:`${e.top}px`,left:`${e.left}px`,width:`${e.width}px`,height:`${e.height}px`})}onHandleMouseDown=e=>{if(!this.table)return;let t=e.currentTarget.dataset.dir;e.preventDefault(),e.stopPropagation();let n=this.table.getBoundingClientRect();this.dragging=!0,this.dragDir=t,this.dragStartX=e.clientX,this.dragStartY=e.clientY,this.dragStartW=n.width,this.dragStartH=n.height,document.body.style.cursor=e.currentTarget.style.cursor,document.body.style.userSelect=`none`,this.createPreview(n.width,n.height)};onMouseMove=e=>{if(!this.dragging||!this.table)return;let{w:t,h:n}=this.computeSize(e);this.updatePreview(t,n),this.showTooltip(t,n,e.clientX,e.clientY)};onMouseUp=e=>{if(!this.dragging||!this.table)return;this.dragging=!1;let{w:t,h:n}=this.computeSize(e),r=this.dragDir;(r===`e`||r===`se`)&&(this.table.style.width=`${Math.round(t)}px`),(r===`s`||r===`se`)&&(this.table.style.minHeight=`${Math.round(n)}px`),this.preview?.remove(),this.preview=null,this.destroyTooltip(),document.body.style.cursor=``,document.body.style.userSelect=``,requestAnimationFrame(()=>{this.updateOverlayPos(),this.table&&this.cb.onResizeEnd?.(this.table)})};onContentInput=()=>{this.table&&!this.contentEl.contains(this.table)&&this.detach()};computeSize(e){let t=e.clientX-this.dragStartX,n=e.clientY-this.dragStartY,r=this.dragDir,i=this.contentEl.clientWidth,a=Math.max(30,(this.table?.rows.length??1)*30),o=this.dragStartW,s=this.dragStartH;return(r===`e`||r===`se`)&&(o=this.dragStartW+t),(r===`s`||r===`se`)&&(s=this.dragStartH+n),e.shiftKey&&r===`se`&&this.dragStartH>0&&(s=o/(this.dragStartW/this.dragStartH)),{w:Math.max(wn,Math.min(i,o)),h:Math.max(a,s)}}createPreview(e,t){if(!this.table)return;let n=document.createElement(`div`);n.dataset.poaTemp=`true`,n.style.cssText=`position:fixed;border:1px dashed #0078d7;background:rgba(0,120,215,0.05);pointer-events:none;z-index:9;box-sizing:border-box;`,document.body.appendChild(n),this.preview=n,this.updatePreview(e,t)}updatePreview(e,t){if(!this.preview||!this.table)return;let n=this.table.getBoundingClientRect();Object.assign(this.preview.style,{top:`${n.top}px`,left:`${n.left}px`,width:`${Math.round(e)}px`,height:`${Math.round(t)}px`})}showTooltip(e,t,n,r){if(!this.tooltip){let e=document.createElement(`div`);e.dataset.poaTemp=`true`,e.style.cssText=`position:fixed;background:#222;color:#fff;font-size:11px;padding:3px 7px;border-radius:3px;pointer-events:none;z-index:9999;white-space:nowrap;`,document.body.appendChild(e),this.tooltip=e}this.tooltip.textContent=`${Math.round(e)}px × ${Math.round(t)}px`,this.tooltip.style.left=`${n+14}px`,this.tooltip.style.top=`${r+14}px`}destroyTooltip(){this.tooltip?.remove(),this.tooltip=null}},On=class{cb;toolbar=null;table=null;contentEl=null;wInput=null;hInput=null;wSelect=null;isDragging=!1;dragOffsetX=0;dragOffsetY=0;constructor(e={}){this.cb=e}show(e,t){this.hide(),this.table=e,this.contentEl=t,this.createToolbar(),t.addEventListener(`scroll`,this.onScroll),window.addEventListener(`scroll`,this.onScroll,!0)}hide(){this.toolbar?.remove(),this.contentEl?.removeEventListener(`scroll`,this.onScroll),window.removeEventListener(`scroll`,this.onScroll,!0),this.stopDrag(),this.toolbar=null,this.table=null,this.contentEl=null,this.wInput=null,this.hInput=null,this.wSelect=null}syncPosition(){this.isDragging||this.updatePosition(),this.syncValues()}createToolbar(){if(!this.table||!this.contentEl)return;let e=document.createElement(`div`);e.dataset.poaTemp=`true`,e.style.cssText=`position:fixed;display:flex;align-items:center;gap:6px;height:32px;background:rgba(255,255,255,0.95);border:1px solid #E5E7EB;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.12);padding:0 8px;font-size:12px;white-space:nowrap;z-index:100;box-sizing:border-box;`,e.addEventListener(`mousedown`,e=>e.stopPropagation());let t=document.createElement(`span`);t.textContent=`⠿`,t.title=`드래그하여 이동`,t.style.cssText=`cursor:grab;color:#9CA3AF;font-size:14px;line-height:1;padding:0 4px 0 0;flex-shrink:0;user-select:none;-webkit-user-select:none;`,t.addEventListener(`mousedown`,e=>this.onHandleMouseDown(e)),e.appendChild(t),e.appendChild(this.makeSep()),e.appendChild(this.makeLabel(`너비`));let n=this.makeInput(`w`,this.readWidthPx());this.wInput=n,e.appendChild(n);let r=this.makeUnitSelect(this.readWidthUnit());this.wSelect=r,e.appendChild(r),e.appendChild(this.makeSep()),e.appendChild(this.makeLabel(`높이`));let i=this.makeInput(`h`,this.readHeightPx());this.hInput=i,e.appendChild(i),e.appendChild(this.makeLabel(`px`)),e.appendChild(this.makeSep());let a=document.createElement(`button`);a.textContent=`원본`,a.style.cssText=`border:1px solid #D1D5DB;border-radius:4px;background:#F9FAFB;padding:2px 8px;cursor:pointer;font-size:11px;color:#374151;line-height:1.4;flex-shrink:0;`,a.addEventListener(`click`,()=>this.applyReset()),e.appendChild(a),this.toolbar=e,document.body.appendChild(e),this.updatePosition(),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),this.applyWidth())}),n.addEventListener(`blur`,()=>this.applyWidth()),r.addEventListener(`change`,()=>this.applyWidth()),i.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),this.applyHeight())}),i.addEventListener(`blur`,()=>this.applyHeight())}makeLabel(e){let t=document.createElement(`span`);return t.textContent=e,t.style.cssText=`color:#6B7280;flex-shrink:0;`,t}makeInput(e,t){let n=document.createElement(`input`);return n.type=`number`,n.value=t,n.min=`1`,n.id=`poa-tbl-tb-${e}`,n.style.cssText=`width:52px;height:22px;padding:0 4px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px;box-sizing:border-box;text-align:right;`,n}makeUnitSelect(e){let t=document.createElement(`select`);t.style.cssText=`height:22px;padding:0 2px;border:1px solid #D1D5DB;border-radius:4px;font-size:12px;`;for(let n of[`px`,`%`]){let r=document.createElement(`option`);r.value=n,r.textContent=n,n===e&&(r.selected=!0),t.appendChild(r)}return t}makeSep(){let e=document.createElement(`div`);return e.style.cssText=`width:1px;height:16px;background:#E5E7EB;margin:0 2px;flex-shrink:0;`,e}readWidthUnit(){return(this.table?.style.width??``).endsWith(`%`)?`%`:`px`}readWidthPx(){if(!this.table)return`100`;let e=this.table.style.width;return e.endsWith(`%`)||e.endsWith(`px`)?String(Math.round(parseFloat(e))):String(Math.round(this.table.getBoundingClientRect().width||100))}readHeightPx(){if(!this.table)return``;let e=this.table.style.minHeight;return e.endsWith(`px`)?String(Math.round(parseFloat(e))):String(Math.round(this.table.getBoundingClientRect().height||0))}applyWidth(){if(!this.table||!this.wInput||!this.wSelect)return;let e=this.wSelect.value,t=Math.max(1,parseFloat(this.wInput.value)||100);this.wInput.value=String(Math.round(t)),this.table.style.width=`${Math.round(t)}${e}`,this.isDragging||this.updatePosition(),this.cb.onApply?.(this.table)}applyHeight(){if(!this.table||!this.hInput)return;let e=Math.max(1,parseFloat(this.hInput.value)||0);this.hInput.value=String(Math.round(e)),this.table.style.minHeight=e>0?`${Math.round(e)}px`:``,this.cb.onApply?.(this.table)}applyReset(){this.table&&(this.table.style.width=`100%`,this.table.style.minHeight=``,this.syncValues(),this.isDragging||this.updatePosition(),this.cb.onApply?.(this.table))}syncValues(){!this.wInput||!this.hInput||!this.wSelect||!this.table||(this.wSelect.value=this.readWidthUnit(),this.wInput.value=this.readWidthPx(),this.hInput.value=this.readHeightPx())}updatePosition(){if(!this.toolbar||!this.table||!this.contentEl||this.isDragging)return;let e=this.table.getBoundingClientRect(),t=this.contentEl.getBoundingClientRect(),n=this.toolbar.offsetHeight||32,r=this.toolbar.offsetWidth||300,i=t.top,a=e.top-n-4,o=e.left;a<i+4&&(a=e.bottom+4,a+n>window.innerHeight-8&&(a=i+4));let s=t.right-r-4;o=Math.min(o,s),o=Math.max(t.left,o),this.toolbar.style.top=`${a}px`,this.toolbar.style.left=`${o}px`}onScroll=()=>{this.isDragging||this.updatePosition()};onHandleMouseDown(e){this.toolbar&&(e.preventDefault(),e.stopPropagation(),this.isDragging=!0,this.dragOffsetX=e.clientX-this.toolbar.offsetLeft,this.dragOffsetY=e.clientY-this.toolbar.offsetTop,document.addEventListener(`mousemove`,this.onDragMove),document.addEventListener(`mouseup`,this.onDragUp),this.toolbar&&(this.toolbar.style.cursor=`grabbing`))}onDragMove=e=>{if(!this.isDragging||!this.toolbar)return;let t=this.toolbar.offsetHeight||32,n=this.toolbar.offsetWidth||300,r=e.clientX-this.dragOffsetX,i=e.clientY-this.dragOffsetY;r=Math.max(0,Math.min(window.innerWidth-n-4,r)),i=Math.max(0,Math.min(window.innerHeight-t-4,i)),this.toolbar.style.left=`${r}px`,this.toolbar.style.top=`${i}px`};onDragUp=()=>{this.stopDrag()};stopDrag(){this.isDragging&&(this.isDragging=!1,document.removeEventListener(`mousemove`,this.onDragMove),document.removeEventListener(`mouseup`,this.onDragUp),this.toolbar&&(this.toolbar.style.cursor=``))}},kn=[`font-family`,`font-size`,`font-weight`,`font-style`,`text-decoration`,`color`,`background-color`,`letter-spacing`,`line-height`],An=new Set([`strong`,`em`,`u`,`s`,`sup`,`sub`,`span`]),jn=class{contentEl;cb;savedStyles=new Map;_active=!1;_continuous=!1;constructor(e,t={}){this.contentEl=e,this.cb=t}get isActive(){return this._active}get hasSavedStyles(){return this.savedStyles.size>0}copy(e=!1){let t=this.contentEl.ownerDocument.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0);this.collectStyles(n.startContainer),this._active=!0,this._continuous=e,this.contentEl.style.cursor=`crosshair`,this.cb.onModeChange?.(!0)}paste(e){if(this.savedStyles.size===0)return;let t=this.contentEl.ownerDocument.getSelection(),n=e??(t?.rangeCount?t.getRangeAt(0):null);if(!n||n.collapsed)return;let r=this.contentEl.ownerDocument,i=r.createElement(`span`);this.savedStyles.forEach((e,t)=>i.style.setProperty(t,e));let a=n.extractContents();if(i.appendChild(a),n.insertNode(i),t){t.removeAllRanges();let e=r.createRange();e.selectNodeContents(i),t.addRange(e)}this._continuous||this.deactivate()}clear(e){let t=this.contentEl.ownerDocument.getSelection(),n=e??(t?.rangeCount?t.getRangeAt(0):null);if(!n||n.collapsed)return;let r=n.cloneContents();this.flattenInlineElements(r);let i=r.textContent??n.toString();if(n.deleteContents(),n.insertNode(this.contentEl.ownerDocument.createTextNode(i)),t){t.removeAllRanges();let e=this.contentEl.ownerDocument.createRange();e.setStart(n.startContainer,n.startOffset),e.collapse(!0),t.addRange(e)}}deactivate(){this._active&&(this._active=!1,this._continuous=!1,this.contentEl.style.cursor=``,this.cb.onModeChange?.(!1))}handleMouseUp(){if(!this._active)return;let e=this.contentEl.ownerDocument.getSelection();e&&!e.isCollapsed&&this.paste()}handleKeydown(e){e.key===`Escape`&&this._active&&(e.preventDefault(),this.deactivate())}collectStyles(e){this.savedStyles.clear();let t=e.nodeType===Node.TEXT_NODE?e.parentNode:e;for(;t&&t!==this.contentEl;){if(t.nodeType===Node.ELEMENT_NODE){let e=t;for(let t of kn)if(!this.savedStyles.has(t)){let n=e.style.getPropertyValue(t);n&&this.savedStyles.set(t,n)}}t=t.parentNode}}flattenInlineElements(e){let t=Array.from(e.childNodes);for(let n of t)if(n.nodeType===Node.ELEMENT_NODE){let t=n;if(An.has(t.tagName.toLowerCase())){for(this.flattenInlineElements(t);t.firstChild;)e.insertBefore(t.firstChild,t);e.removeChild(t)}else this.flattenInlineElements(t)}}},Mn=new Set([`ul`,`ol`]);function Nn(e,t){let n=[],r=Array.from(e.children),i=e=>Mn.has(e.tagName.toLowerCase())?Array.from(e.children):[e];if(t.collapsed){let e=t.startContainer.nodeType===Node.TEXT_NODE?t.startContainer.parentElement:t.startContainer,a=r.find(t=>t===e||t.contains(e));return a&&n.push(...i(a)),n}for(let e of r)t.intersectsNode(e)&&n.push(...i(e));return n}function Pn(e){return e.tagName===`LI`}var Fn=class{contentEl;constructor(e){this.contentEl=e}toggleList(e){let t=this.contentEl.ownerDocument.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0),r=Nn(this.contentEl,n);r.length!==0&&(r.every(t=>Pn(t)?t.parentElement?.tagName.toLowerCase()===e:!1)?this.unlistBlocks(r):this.listifyBlocks(r,e))}toggleSuperSub(e){let t=this.contentEl.ownerDocument.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0);if(n.collapsed)return;let r=this.contentEl.ownerDocument,i=e===`sup`?`sub`:`sup`,a=this.findAncestorTag(n.commonAncestorContainer,e),o=this.findAncestorTag(n.commonAncestorContainer,i);if(a!==null||this.isWrappedWith(n.cloneContents(),e)){let t=a??(()=>{let t=n.extractContents();return this.unwrapTag(t,e),n.insertNode(t),null})();if(t){let e=t.parentNode;for(;t.firstChild;)e.insertBefore(t.firstChild,t);e.removeChild(t)}}else if(o){let n=r.createElement(e);for(;o.firstChild;)n.appendChild(o.firstChild);o.parentNode.replaceChild(n,o),t.removeAllRanges();let i=r.createRange();i.selectNodeContents(n),t.addRange(i)}else{let a=t.rangeCount?t.getRangeAt(0):n;if(a.collapsed)return;let o=a.extractContents();this.unwrapTag(o,i);let s=r.createElement(e);s.appendChild(o),a.insertNode(s),t.removeAllRanges();let c=r.createRange();c.selectNodeContents(s),t.addRange(c)}}handleTab(e){let t=this.contentEl.ownerDocument.getSelection();if(!t||t.rangeCount===0)return!1;let n=t.getRangeAt(0).startContainer,r=null;for(;n&&n!==this.contentEl;){if(n.nodeType===Node.ELEMENT_NODE&&n.tagName===`LI`){r=n;break}n=n.parentNode}return r?(e.preventDefault(),e.shiftKey?this.outdentListItem(r):this.indentListItem(r),!0):!1}listifyBlocks(e,t){let n=this.contentEl.ownerDocument,r=e[0],i=r.parentElement;if(Pn(r)&&i&&[`ul`,`ol`].includes(i.tagName.toLowerCase())){let e=n.createElement(t);e.innerHTML=i.innerHTML,i.replaceWith(e);return}let a=n.createElement(t),o=r.parentElement;for(let t of e){let e=n.createElement(`li`);for(;t.firstChild;)e.appendChild(t.firstChild);a.appendChild(e)}o?.insertBefore(a,r);for(let t of e)t.remove()}unlistBlocks(e){let t=this.contentEl.ownerDocument;for(let n of e){let e=n.parentElement;if(!e)continue;let r=t.createElement(`p`);for(;n.firstChild;)r.appendChild(n.firstChild);e.parentElement?.insertBefore(r,e),n.remove(),e.children.length===0&&e.remove()}}indentListItem(e){let t=e.previousElementSibling;if(!t)return;let n=this.contentEl.ownerDocument,r=e.parentElement?.tagName.toLowerCase()??`ul`,i=t.lastElementChild;if(i&&[`ul`,`ol`].includes(i.tagName.toLowerCase()))i.appendChild(e);else{let i=n.createElement(r);i.appendChild(e),t.appendChild(i)}}outdentListItem(e){let t=e.parentElement;if(!t)return;let n=t.parentElement;if(!n||n.tagName!==`LI`)return;let r=n.parentElement;r&&(r.insertBefore(e,n.nextSibling),t.children.length===0&&t.remove())}findAncestorTag(e,t){let n=e.nodeType===Node.TEXT_NODE?e.parentNode:e;for(;n&&n!==this.contentEl;){if(n.nodeType===Node.ELEMENT_NODE&&n.tagName.toLowerCase()===t)return n;n=n.parentNode}return null}isWrappedWith(e,t){if(!(e.textContent??``).trim())return!1;let n=this.contentEl.ownerDocument.createTreeWalker(e,NodeFilter.SHOW_TEXT),r=n.nextNode();for(;r;){let i=r.parentNode,a=!1;for(;i&&i!==e;){if(i.tagName?.toLowerCase()===t){a=!0;break}i=i.parentNode}if(!a)return!1;r=n.nextNode()}return!0}unwrapTag(e,t){if(e.nodeType===Node.ELEMENT_NODE){let n=e;if(n.tagName.toLowerCase()===t){for(;n.firstChild;)n.parentNode?.insertBefore(n.firstChild,n);n.parentNode?.removeChild(n);return}}Array.from(e.childNodes).forEach(e=>this.unwrapTag(e,t))}},In={success:{color:`#16A34A`,icon:`✓`},error:{color:`#EF4444`,icon:`✕`},info:{color:`#3B82F6`,icon:`ℹ`}},Ln=class{container;constructor(){this.container=document.createElement(`div`);let e=this.container.style;e.position=`fixed`,e.bottom=`16px`,e.right=`16px`,e.zIndex=`99999`,e.display=`flex`,e.flexDirection=`column`,e.gap=`8px`,e.pointerEvents=`none`,e.fontFamily=`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,document.body.appendChild(this.container)}show(e,t=`info`,n=2e3){let{color:r,icon:i}=In[t],a=document.createElement(`div`),o=a.style;o.background=`#1F2937`,o.color=`#FFFFFF`,o.borderRadius=`8px`,o.padding=`10px 16px`,o.fontSize=`13px`,o.minWidth=`200px`,o.display=`flex`,o.alignItems=`center`,o.gap=`8px`,o.boxShadow=`0 4px 12px rgba(0,0,0,0.15)`,o.borderLeft=`4px solid ${r}`,o.opacity=`0`,o.transform=`translateY(20px)`,o.transition=`opacity 0.2s ease, transform 0.2s ease`,o.pointerEvents=`auto`;let s=document.createElement(`span`);s.textContent=i,s.style.color=r,s.style.fontWeight=`600`,s.style.flexShrink=`0`,s.style.fontSize=`14px`;let c=document.createElement(`span`);c.textContent=e,a.appendChild(s),a.appendChild(c),this.container.appendChild(a),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.style.opacity=`1`,a.style.transform=`translateY(0)`})}),setTimeout(()=>{a.style.transition=`opacity 0.3s ease, transform 0.3s ease`,a.style.opacity=`0`,a.style.transform=`translateY(20px)`,setTimeout(()=>a.remove(),300)},n)}destroy(){this.container.remove()}};function K(e){let t=e.tagName.toLowerCase();return`${t}${e.id?`#${e.id}`:``}${e.getAttribute(`src`)?`[src="${e.getAttribute(`src`).slice(0,30)}"]`:``}`||t}function Rn(e){let t=e.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/);return!t||(t[4]===void 0?1:parseFloat(t[4]))===0?null:[parseInt(t[1]),parseInt(t[2]),parseInt(t[3])]}function zn(e){let t=e/255;return t<=.04045?t/12.92:((t+.055)/1.055)**2.4}function Bn(e,t,n){return .2126*zn(e)+.7152*zn(t)+.0722*zn(n)}function Vn(e,t){let n=Math.max(e,t),r=Math.min(e,t);return(n+.05)/(r+.05)}var Hn=class{root;constructor(e){this.root=e}run(){let e=[...this.checkImageAlt(),...this.checkTable(),...this.checkLinkText(),...this.checkFormLabels(),...this.checkVideoTrack(),...this.checkDuplicateIds(),...this.checkColorContrast(),...this.checkHeadingHierarchy()];return{issues:e,errorCount:e.filter(e=>e.level===`error`).length,warningCount:e.filter(e=>e.level===`warning`).length,infoCount:e.filter(e=>e.level===`info`).length}}checkImageAlt(){let e=[];return this.root.querySelectorAll(`img`).forEach(t=>{t.hasAttribute(`alt`)?t.alt===``&&e.push({id:`img-alt-empty`,level:`warning`,title:`이미지 alt 속성 빈값`,message:`${K(t)} — alt가 빈 문자열입니다. 장식용 이미지가 맞는지 확인하세요.`,element:t,selector:K(t)}):e.push({id:`img-alt-missing`,level:`error`,title:`이미지 alt 속성 누락`,message:`${K(t)} — alt 속성이 없습니다.`,element:t,selector:K(t),autoFix:()=>{t.alt=`이미지`}})}),e}checkTable(){let e=[];return this.root.querySelectorAll(`table`).forEach(t=>{t.querySelector(`caption`)||e.push({id:`table-caption-missing`,level:`warning`,title:`표 캡션 누락`,message:`${K(t)} — caption 요소가 없습니다.`,element:t,selector:K(t),autoFix:()=>{let e=t.ownerDocument.createElement(`caption`);e.textContent=`표`,t.prepend(e)}}),t.hasAttribute(`summary`)||e.push({id:`table-summary-missing`,level:`info`,title:`표 summary 속성 없음`,message:`${K(t)} — summary 속성을 추가하면 스크린 리더에 도움이 됩니다.`,element:t,selector:K(t)}),t.querySelectorAll(`th`).forEach(t=>{t.hasAttribute(`scope`)||e.push({id:`th-scope-missing`,level:`warning`,title:`표 헤더 scope 누락`,message:`th 요소에 scope 속성이 없습니다.`,element:t,selector:K(t),autoFix:()=>{t.scope=`col`}})})}),e}checkLinkText(){let e=new Set([`여기`,`클릭`,`링크`,`더보기`,`바로가기`,`here`,`click`,`link`,`more`]),t=[];return this.root.querySelectorAll(`a`).forEach(n=>{let r=(n.textContent??``).trim(),i=n.querySelector(`img[alt]`)!==null;!r&&!i?t.push({id:`link-no-text`,level:`error`,title:`링크 텍스트 없음`,message:`${K(n)} — 링크에 텍스트가 없습니다.`,element:n,selector:K(n)}):r&&e.has(r.toLowerCase())&&t.push({id:`link-vague-text`,level:`warning`,title:`링크 텍스트 불명확`,message:`<a>${r}</a> — 링크 목적을 알 수 없는 텍스트입니다.`,element:n,selector:K(n)})}),t}checkFormLabels(){let e=[],t=this.root.ownerDocument;return this.root.querySelectorAll(`input, select`).forEach(n=>{let r=n.hasAttribute(`aria-label`)||n.hasAttribute(`aria-labelledby`);if(!(n.id&&t.querySelector(`label[for="${n.id}"]`)!==null)&&!r){let t=n.tagName.toLowerCase();e.push({id:`${t}-label-missing`,level:`error`,title:`${t===`input`?`입력 필드`:`선택 상자`} 레이블 없음`,message:`${K(n)} — label 연결이 없습니다.`,element:n,selector:K(n)})}}),e}checkVideoTrack(){let e=[];return this.root.querySelectorAll(`video`).forEach(t=>{t.querySelector(`track`)||e.push({id:`video-track-missing`,level:`warning`,title:`비디오 자막 트랙 없음`,message:`${K(t)} — track 요소가 없습니다.`,element:t,selector:K(t)})}),e}checkDuplicateIds(){let e=[],t=new Map;return this.root.querySelectorAll(`[id]`).forEach(e=>{t.has(e.id)||t.set(e.id,[]),t.get(e.id).push(e)}),t.forEach((t,n)=>{t.length>1&&e.push({id:`duplicate-id`,level:`error`,title:`중복 ID`,message:`id="${n}" 가 ${t.length}개 요소에서 사용됩니다.`,element:t[0],selector:`[id="${n}"]`})}),e}checkColorContrast(){let e=[];if(typeof window>`u`)return e;let t=new Set;return this.root.querySelectorAll(`p, li, span, td, th, h1, h2, h3, h4, h5, h6, a`).forEach(n=>{try{let r=window.getComputedStyle(n),i=Rn(r.color),a=Rn(r.backgroundColor);if(!i||!a)return;let o=`${i.join(`,`)}-${a.join(`,`)}`;if(t.has(o))return;t.add(o);let s=Vn(Bn(...i),Bn(...a));s<4.5&&e.push({id:`color-contrast`,level:`warning`,title:`색상 대비 부족`,message:`대비율 ${s.toFixed(2)}:1 — WCAG AA 기준(4.5:1) 미만입니다.`,element:n,selector:K(n)})}catch{}}),e}checkHeadingHierarchy(){let e=[],t=Array.from(this.root.querySelectorAll(`h1, h2, h3, h4, h5, h6`));if(t.length===0)return e;t.some(e=>e.tagName===`H1`)||e.push({id:`heading-no-h1`,level:`warning`,title:`h1 제목 없음`,message:`문서에 h1 제목이 없습니다.`,element:t[0],selector:`heading`});let n=0;for(let r of t){let t=parseInt(r.tagName[1]);n>0&&t-n>1&&e.push({id:`heading-skip`,level:`warning`,title:`제목 레벨 건너뜀`,message:`h${n} 다음에 h${t}로 ${t-n-1}단계 건너뛰었습니다.`,element:r,selector:K(r)}),n=t}return e}},Un=[`계좌`,`통장`,`입금`,`출금`,`계좌번호`,`이체`,`송금`,`은행`];function Wn(e,t,n=100){let r=Math.max(0,t-n),i=Math.min(e.length,t+n),a=e.slice(r,i);return Un.some(e=>a.includes(e))}function Gn(e){return e.replace(/(01\d[-\s]?)(\d{3,4})([-\s]?\d{4})/,(e,t,n,r)=>`${t}****${r}`)}function Kn(e){return e.replace(/(0\d{1,2}[-\s]?)(\d{3,4})([-\s]?\d{4})/,(e,t,n,r)=>`${t}****${r}`)}function qn(e){let t=e.indexOf(`@`);return t<=1?e:e[0]+`***`+e.slice(t)}function Jn(e){return e.indexOf(`-`)===6||e.length>=13?e.slice(0,7)+`*******`:e.slice(0,6)+`-*******`}function Yn(e){let t=e.replace(/[-\s]/g,``).slice(-4),n=e.includes(`-`)?`-`:e.includes(` `)?` `:``;return n?`****${n}****${n}****${n}${t}`:`************${t}`}function Xn(e){return e.length<=4?e:e.slice(0,2)+`*`.repeat(e.length-4)+e.slice(-2)}function Zn(e){return e.replace(/\.\d+$/,`.***.***`)}function Qn(e){return e.slice(0,2)+`*`.repeat(e.length-2)}var $n=[{type:`resident-id`,label:`주민등록번호`,riskLevel:`very-high`,pattern:/\d{6}-?[1-4]\d{6}/g,mask:Jn},{type:`credit-card`,label:`신용카드 번호`,riskLevel:`very-high`,pattern:/\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/g,mask:Yn},{type:`phone-mobile`,label:`휴대폰 번호`,riskLevel:`high`,pattern:/01[0-9][-\s]?\d{3,4}[-\s]?\d{4}/g,mask:Gn},{type:`phone-general`,label:`일반 전화번호`,riskLevel:`high`,pattern:/0[2-9]\d?[-\s]?\d{3,4}[-\s]?\d{4}/g,mask:Kn},{type:`email`,label:`이메일 주소`,riskLevel:`high`,pattern:/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,mask:qn},{type:`bank-account`,label:`계좌번호`,riskLevel:`high`,pattern:/\d{10,14}/g,contextGuard:Wn,mask:Xn},{type:`passport`,label:`여권번호`,riskLevel:`high`,pattern:/[A-Z]{1,2}\d{7,9}/g,mask:Qn},{type:`ip-address`,label:`IP 주소`,riskLevel:`medium`,pattern:/\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g,mask:Zn}];function er(e,t){let n=new Set([`p`,`div`,`h1`,`h2`,`h3`,`h4`,`h5`,`h6`,`li`,`td`,`th`,`blockquote`,`pre`]),r=null,i=t.parentNode;for(;i&&i!==e;){if(i.nodeType===Node.ELEMENT_NODE&&n.has(i.tagName.toLowerCase())){r=i;break}i=i.parentNode}if(!r)return`문서`;let a=r.tagName.toLowerCase(),o=Array.from(e.querySelectorAll(a)).indexOf(r);return o>=0?`${o+1}번째 ${tr(a)}`:a}function tr(e){return{p:`단락`,div:`단락`,li:`목록 항목`,td:`표 셀`,th:`표 헤더`,blockquote:`인용문`,pre:`코드 블록`,h1:`제목`,h2:`제목`,h3:`제목`,h4:`제목`,h5:`제목`,h6:`제목`}[e]??e}var nr=class e{root;idSeq=0;constructor(e){this.root=e}run(){let e=[],t=document.createTreeWalker(this.root,NodeFilter.SHOW_TEXT),n=t.nextNode();for(;n;){let r=n.nodeValue??``;if(r.trim())for(let t of $n){t.pattern.lastIndex=0;let i;for(;(i=t.pattern.exec(r))!==null;){let a=i[0];t.contextGuard&&!t.contextGuard(r,i.index)||e.push({id:`pii-${++this.idSeq}`,type:t.type,riskLevel:t.riskLevel,label:t.label,raw:a,masked:t.mask(a),textNode:n,nodeOffset:i.index,locationLabel:er(this.root,n),highlightEl:null})}}n=t.nextNode()}let r={"very-high":0,high:1,medium:2};return e.sort((e,t)=>r[e.riskLevel]-r[t.riskLevel]),e}static highlight(e){let t=[...e].sort((e,t)=>e.textNode===t.textNode?t.nodeOffset-e.nodeOffset:0);for(let e of t)try{let t=e.textNode;if(!t.parentNode||!t.nodeValue)continue;let n=t.nodeValue.slice(0,e.nodeOffset),r=t.nodeValue.slice(e.nodeOffset,e.nodeOffset+e.raw.length),i=t.nodeValue.slice(e.nodeOffset+e.raw.length),a=t.ownerDocument,o=a.createElement(`span`);o.dataset.privacyId=e.id,o.dataset.privacyType=e.type,e.riskLevel===`very-high`?(o.style.background=`#DC2626`,o.style.color=`#FFFFFF`):o.style.background=`#FEE2E2`,o.style.borderRadius=`2px`,o.style.padding=`0 1px`,o.textContent=r;let s=t.parentNode;n&&s.insertBefore(a.createTextNode(n),t),s.insertBefore(o,t),i&&s.insertBefore(a.createTextNode(i),t),s.removeChild(t),e.highlightEl=o,e.textNode=o.firstChild,e.nodeOffset=0}catch{}}static removeHighlights(e){e.querySelectorAll(`[data-privacy-id]`).forEach(e=>{let t=e.textContent??``;e.replaceWith(e.ownerDocument.createTextNode(t))}),e.normalize()}static deleteMatch(e){let t=e.highlightEl;t?.parentNode&&(t.remove(),e.highlightEl=null)}static maskMatch(e){let t=e.highlightEl;t&&(t.textContent=e.masked,t.style.background=``,t.style.color=``,t.removeAttribute(`data-privacy-id`),t.removeAttribute(`data-privacy-type`),e.highlightEl=null)}static deleteAll(t){for(let n of t)e.deleteMatch(n)}static maskAll(t){for(let n of t)e.maskMatch(n)}},rr=0;function ir(e){return e.dataset.formulaTableId||(e.dataset.formulaTableId=`ftbl-${++rr}`),e.dataset.formulaTableId}function ar(e,t,n){let r=Array.from(e.querySelectorAll(`tr`));if(t<1||t>r.length)return null;let i=Array.from(r[t-1].querySelectorAll(`td, th`));return n<1||n>i.length?null:i[n-1]}function or(e,t){let n=Array.from(e.querySelectorAll(`tr`));for(let e=0;e<n.length;e++){let r=Array.from(n[e].querySelectorAll(`td, th`)).indexOf(t);if(r!==-1)return{row:e+1,col:r+1}}return null}function sr(e){let t=e.textContent?.trim()??``,n=parseFloat(t.replace(/[₩%,\s]/g,``));return isNaN(n)?0:n}function cr(e,t,n,r,i,a){let o=[],s=Math.min(t,r),c=Math.max(t,r),l=Math.min(n,i),u=Math.max(n,i);for(let t=s;t<=c;t++)for(let n=l;n<=u;n++){let r=ar(e,t,n);!r||r===a||o.push(sr(r))}return o}function lr(e){let[t,n,r,i]=e.range,{targetRow:a,targetCol:o}=e;return a>=Math.min(t,r)&&a<=Math.max(t,r)&&o>=Math.min(n,i)&&o<=Math.max(n,i)}function ur(e,t){if(t.length===0)return 0;switch(e){case`SUM`:return t.reduce((e,t)=>e+t,0);case`AVERAGE`:return t.reduce((e,t)=>e+t,0)/t.length;case`PRODUCT`:return t.reduce((e,t)=>e*t,1);case`SUBTRACT`:return t.slice(1).reduce((e,t)=>e-t,t[0])}}function dr(e,t,n=2){switch(t){case`integer`:return String(Math.round(e));case`decimal`:return e.toFixed(n);case`currency`:return`₩`+Math.round(e).toLocaleString(`ko-KR`);case`percent`:return e.toFixed(1)+`%`}}var fr=class e{observers=new Map;static OBS_CONFIG={subtree:!0,characterData:!0,childList:!0};attach(t){let n=ir(t);if(this.observers.has(n))return;let r=new MutationObserver(()=>this.recalculateTable(t));r.observe(t,e.OBS_CONFIG),this.observers.set(n,r)}detach(e){let t=e.dataset.formulaTableId;t&&(this.observers.get(t)?.disconnect(),this.observers.delete(t))}detachAll(){this.observers.forEach(e=>e.disconnect()),this.observers.clear()}applyFormula(t,n){this.attach(t);let r=ar(t,n.targetRow,n.targetCol);if(!r)return`invalid`;let i=this.observers.get(ir(t));if(lr(n))return i?.disconnect(),r.textContent=`#REF!`,r.style.color=`#DC2626`,r.dataset.formula=JSON.stringify(n),i?.observe(t,e.OBS_CONFIG),`circular`;let[a,o,s,c]=n.range,l=t.querySelectorAll(`tr`);if(a<1||s>l.length||o<1)return`invalid`;let u=cr(t,a,o,s,c,r),d=dr(ur(n.fn,u),n.format,n.decimalPlaces);i?.disconnect();try{r.textContent=d,r.dataset.formula=JSON.stringify(n),n.style?.backgroundColor&&(r.style.backgroundColor=n.style.backgroundColor),n.style?.color&&(r.style.color=n.style.color)}finally{i?.observe(t,e.OBS_CONFIG)}return`ok`}recalculateTable(t){let n=ir(t),r=this.observers.get(n);r?.disconnect();try{t.querySelectorAll(`[data-formula]`).forEach(e=>{try{let n=JSON.parse(e.dataset.formula),r=or(t,e);if(!r)return;if(n.targetRow=r.row,n.targetCol=r.col,lr(n)){e.textContent=`#REF!`,e.style.color=`#DC2626`;return}let[i,a,o,s]=n.range;e.textContent=dr(ur(n.fn,cr(t,i,a,o,s,e)),n.format,n.decimalPlaces),e.style.color===`rgb(220, 38, 38)`&&(e.style.color=``)}catch{}})}finally{r?.observe(t,e.OBS_CONFIG)}}static getSelectionBounds(e,t){if(t.length===0)return null;let n=1/0,r=1/0,i=-1/0,a=-1/0;for(let o of t){let t=or(e,o);t&&(n=Math.min(n,t.row),r=Math.min(r,t.col),i=Math.max(i,t.row),a=Math.max(a,t.col))}return n===1/0?null:[n,r,i,a]}},pr={ADD_TAGS:[`iframe`,`video`,`source`,`track`,`figure`],ADD_ATTR:[`controls`,`autoplay`,`loop`,`muted`,`poster`,`type`,`srclang`,`kind`,`label`,`frameborder`,`allowfullscreen`,`sandbox`,`width`,`height`]},mr={ko:`한국어`,en:`English`,ja:`日本語`,zh:`中文`,fr:`Français`,de:`Deutsch`,es:`Español`};function hr(e){let t=e.trim(),n=t.match(/(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);if(n){let e=n[1];return{embedUrl:`https://www.youtube.com/embed/${e}`,provider:`youtube`,thumbnailUrl:`https://img.youtube.com/vi/${e}/0.jpg`}}return n=t.match(/vimeo\.com\/(\d+)/),n?{embedUrl:`https://player.vimeo.com/video/${n[1]}`,provider:`vimeo`}:(n=t.match(/dailymotion\.com\/video\/([A-Za-z0-9]+)/),n?{embedUrl:`https://www.dailymotion.com/embed/video/${n[1]}`,provider:`dailymotion`}:null)}function gr(e){let t=e.width??640,n=e.height??360,r=e.muted??e.autoplay??!1,i=e.controls??!0,a=e.autoplay??!1,o=e.loop??!1,s=[i?`controls`:``,a?`autoplay`:``,o?`loop`:``,r?`muted`:``].filter(Boolean).join(` `),c=e.poster?` poster="${e.poster}"`:``,l=e.trackSrclang??`ko`,u=mr[l]??l,d=e.trackSrc?`\n    <track kind="captions" src="${e.trackSrc}" srclang="${l}" label="${u}">`:``;return`<figure class="poa-media">\n  <video width="${t}" height="${n}"${c} ${s}>\n    <source src="${e.src}" type="${e.type}">${d}\n    브라우저가 video 태그를 지원하지 않습니다.\n  </video>\n</figure>`}function _r(e){return`<figure class="poa-media">
  <iframe
    width="${e.width??640}" height="${e.height??360}"\n    src="${e.embedUrl}"\n    frameborder="0"\n    allowfullscreen\n    sandbox="allow-scripts allow-same-origin allow-presentation"\n  ></iframe>\n</figure>`}var vr=class{constructor(e){this.contentEl=e}insert(e){let t=String(M.sanitize(e,pr)),n=window.getSelection();if(!n?.rangeCount||!this.contentEl.contains(n.getRangeAt(0).commonAncestorContainer)){this.contentEl.insertAdjacentHTML(`beforeend`,t);return}let r=n.getRangeAt(0);r.deleteContents();let i=r.createContextualFragment(t);r.insertNode(i),r.collapse(!1)}};function q(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}var yr=0;function br(e){return`poa-${e}-${(++yr).toString(36)}`}function xr(e){return[e.disabled?`disabled`:``,e.readonly?`readonly`:``,e.ariaRequired?`aria-required="true"`:``,e.ariaDescribedBy?`aria-describedby="${q(e.ariaDescribedBy)}"`:``].filter(Boolean).join(` `)}function Sr(e){let t=e.autoLabel!==!1,n=e.id||br(e.type),r=e.label?q(e.label):``,i=xr(e),a=e.name?` name="${q(e.name)}"`:``,o=e.class?` ${q(e.class)}`:``;function s(e){return r?t?`<label for="${e}">${r}</label>`:`<label>${r}</label>`:``}let c=e=>`<div class="poa-form-group">\n  ${e}\n</div>`;switch(e.type){case`text`:{let t=e.placeholder?` placeholder="${q(e.placeholder)}"`:``,r=e.maxlength?` maxlength="${e.maxlength}"`:``,l=e.value?` value="${q(e.value)}"`:``;return c(`${s(n)}\n  <input type="text" id="${n}"${a} class="poa-input${o}"${t}${r}${l}${i?` `+i:``}>`)}case`textarea`:{let t=e.rows??4,r=e.cols??40,l=e.resize??`both`,u=e.placeholder?` placeholder="${q(e.placeholder)}"`:``;return c(`${s(n)}\n  <textarea id="${n}"${a} class="poa-textarea${o}" rows="${t}" cols="${r}" style="resize:${l}"${u}${i?` `+i:``}></textarea>`)}case`checkbox`:{let t=e.checkLabel?q(e.checkLabel):r,o=e.checked?` checked`:``;return c(`<label class="poa-checkbox-label">\n    <input type="checkbox" id="${n}"${a}${e.value?` value="${q(e.value)}"`:``}${o}${i?` `+i:``}>\n    ${t}\n  </label>`)}case`radio`:{let t=e.groupName??e.name??n,i=e.options??[];return c(`${r?`<label>${r}</label>`:``}\n  <div class="poa-radio-group">\n${i.map(e=>`    <label>\n      <input type="radio" name="${q(t)}" value="${q(e.value)}"${e.defaultChecked?` checked`:``}> ${q(e.label)}\n    </label>`).join(`
`)}\n  </div>`)}case`select`:{let t=e.multiple?` multiple`:``,r=(e.options??[]).map(e=>`    <option value="${q(e.value)}"${e.selected?` selected`:``}>${q(e.label)}</option>`).join(`
`);return c(`${s(n)}\n  <select id="${n}"${a} class="poa-select${o}"${t}${i?` `+i:``}>\n${r}\n  </select>`)}case`button`:{let t=e.text?q(e.text):`버튼`,r=e.btnType??`button`,s={default:`poa-btn`,primary:`poa-btn poa-btn-primary`,danger:`poa-btn poa-btn-danger`}[e.btnStyle??`default`]+o;return c(`<button type="${r}"${e.id?` id="${n}"`:``}${a} class="${s}"${i?` `+i:``}>${t}</button>`)}case`date`:{let t=e.min?` min="${q(e.min)}"`:``,r=e.max?` max="${q(e.max)}"`:``,l=e.value?` value="${q(e.value)}"`:``;return c(`${s(n)}\n  <input type="date" id="${n}"${a} class="poa-input${o}"${t}${r}${l}${i?` `+i:``}>`)}}}var Cr={ADD_ATTR:[`disabled`,`readonly`,`checked`,`selected`,`multiple`,`required`,`placeholder`,`maxlength`,`rows`,`cols`,`min`,`max`,`for`,`aria-required`,`aria-describedby`,`style`]},wr=class{constructor(e){this.contentEl=e}buildElement(e){let t=Sr(e),n=String(M.sanitize(t,Cr)),r=document.createElement(`div`);r.innerHTML=n;let i=r.firstElementChild;return i&&(i.dataset.poaForm=JSON.stringify(e)),i}insert(e){let t=this.buildElement(e);if(!t)return;let n=window.getSelection(),r=n?.rangeCount?n.getRangeAt(0):null,i=r&&this.contentEl.contains(r.commonAncestorContainer),a=r?.commonAncestorContainer instanceof Element?r.commonAncestorContainer.closest(`td, th`):(r?.commonAncestorContainer)?.parentElement?.closest(`td, th`);if(a&&i&&r){let n=t.querySelector(`input, textarea, select, button`)??t;n.dataset.poaForm=JSON.stringify(e),n.style.maxWidth=`100%`,n.style.boxSizing=`border-box`,r.deleteContents(),r.insertNode(n),r.collapse(!1),n.parentNode!==a&&a.appendChild(n);for(let e of Array.from(a.childNodes))if(e!==n)if(e.nodeType===Node.ELEMENT_NODE){let t=e;(t.tagName===`P`||t.tagName===`BR`)&&!t.textContent?.trim()&&!t.contains(n)&&a.removeChild(t)}else e.nodeType===Node.TEXT_NODE&&!e.textContent?.trim()&&a.removeChild(e)}else i&&r?(r.deleteContents(),r.insertNode(t),r.collapse(!1)):this.contentEl.appendChild(t)}},Tr=class{input=null;handle=null;observer=null;onResized=null;contentEl=null;_dragStart=0;_dragInitW=0;scrollHandler=()=>this.syncHandle();attach(e,t,n){this.detach(),this.input=e,this.onResized=t??null,this.contentEl=n??null,e.style.resize=`horizontal`,e.style.overflow=`hidden`,e.style.minWidth=`60px`,e.style.boxSizing=`border-box`,e.closest(`td, th`)?e.style.maxWidth=`100%`:n?e.style.maxWidth=`${n.clientWidth-32}px`:e.style.maxWidth=`100%`,typeof ResizeObserver<`u`&&(this.observer=new ResizeObserver(()=>{this.syncHandle(),this.onResized?.()}),this.observer.observe(e)),this._showHandle(e),window.addEventListener(`scroll`,this.scrollHandler,!0)}detach(){this.input&&=(this.input.style.resize=`none`,this.input.style.maxWidth=``,null),this.observer?.disconnect(),this.observer=null,this.contentEl=null,this._hideHandle(),this.onResized=null,window.removeEventListener(`scroll`,this.scrollHandler,!0)}syncHandle(){let e=this.handle,t=this.input;if(!e||!t)return;let n=t.getBoundingClientRect();e.style.left=`${n.right-4}px`,e.style.top=`${n.top+(n.height-24)/2}px`}_showHandle(e){this._hideHandle();let t=document.createElement(`div`);t.dataset.poaResizeHandle=`true`,t.title=`좌우로 드래그하여 너비 조절`,t.style.cssText=[`position:fixed`,`width:8px`,`height:24px`,`background:#2563EB`,`border-radius:3px`,`cursor:ew-resize`,`z-index:99999`,`display:flex`,`align-items:center`,`justify-content:center`,`user-select:none`,`-webkit-user-select:none`].join(`;`),t.innerHTML=`<svg width="6" height="14" viewBox="0 0 6 14" fill="none">
      <line x1="2" y1="2" x2="2" y2="12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="4" y1="2" x2="4" y2="12" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,document.body.appendChild(t),this.handle=t,this.syncHandle(),t.addEventListener(`mousedown`,t=>{t.preventDefault(),t.stopPropagation(),this._dragStart=t.clientX,this._dragInitW=e.getBoundingClientRect().width;let n=e.closest(`td, th`),r=n?n.getBoundingClientRect().width-4:this.contentEl?this.contentEl.clientWidth-32:9999,i=t=>{let n=Math.max(60,Math.min(r,this._dragInitW+(t.clientX-this._dragStart)));e.style.width=`${n}px`,this.syncHandle()},a=()=>{document.removeEventListener(`mousemove`,i),document.removeEventListener(`mouseup`,a),this.onResized?.()};document.addEventListener(`mousemove`,i),document.addEventListener(`mouseup`,a)})}_hideHandle(){this.handle?.remove(),this.handle=null}},Er=class{cb;toolbar=null;input=null;contentEl=null;wInput=null;alignSel=null;constructor(e={}){this.cb=e}show(e,t){this.hide(),this.input=e,this.contentEl=t,this._createToolbar(),t.addEventListener(`scroll`,this.onScroll),window.addEventListener(`scroll`,this.onScroll,!0)}hide(){this.toolbar?.remove(),this.contentEl?.removeEventListener(`scroll`,this.onScroll),window.removeEventListener(`scroll`,this.onScroll,!0),this.toolbar=null,this.input=null,this.contentEl=null,this.wInput=null,this.alignSel=null}syncPosition(){this._updatePosition(),this._syncValues()}_createToolbar(){if(!this.input||!this.contentEl)return;let e=!!this.input.closest(`td, th`),t=document.createElement(`div`);t.dataset.poaTemp=`true`,t.style.cssText=`position:fixed;display:flex;align-items:center;gap:6px;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.15);padding:4px 8px;font-size:12px;white-space:nowrap;z-index:99998;`,t.addEventListener(`mousedown`,e=>e.stopPropagation()),t.appendChild(this._makeLabel(`너비`));let n=document.createElement(`input`);n.type=`number`,n.min=`60`,n.max=`9999`,n.style.cssText=`width:60px;padding:1px 4px;border:1px solid #ccc;border-radius:3px;font-size:12px;`;let r=Math.round(this.input.getBoundingClientRect().width)||100;if(n.value=String(r),this.wInput=n,t.appendChild(n),t.appendChild(this._makeLabel(`px`)),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),this._applyWidth())}),n.addEventListener(`blur`,()=>this._applyWidth()),t.appendChild(this._makeSep()),e){let e=document.createElement(`button`);e.textContent=`셀에 맞춤`,e.style.cssText=this._btnStyle(),e.addEventListener(`click`,()=>this._applyCellFit()),t.appendChild(e)}let i=document.createElement(`button`);i.textContent=`에디터 너비에 맞춤`,i.style.cssText=this._btnStyle(),i.addEventListener(`click`,()=>this._applyEditorFit()),t.appendChild(i),t.appendChild(this._makeSep()),t.appendChild(this._makeLabel(`정렬`));let a=document.createElement(`select`);a.style.cssText=`padding:1px;border:1px solid #ccc;border-radius:3px;font-size:12px;`;let o=document.createElement(`optgroup`);o.label=`글자 정렬`;for(let[e,t]of[[`text-left`,`왼쪽`],[`text-center`,`가운데`],[`text-right`,`오른쪽`]]){let n=document.createElement(`option`);n.value=e,n.textContent=t,o.appendChild(n)}a.appendChild(o);let s=document.createElement(`optgroup`);s.label=`위치 정렬`;for(let[e,t]of[[`pos-left`,`왼쪽 배치`],[`pos-center`,`가운데 배치`],[`pos-right`,`오른쪽 배치`]]){let n=document.createElement(`option`);n.value=e,n.textContent=t,s.appendChild(n)}a.appendChild(s),a.value=this._getCurrentAlignValue(),a.addEventListener(`change`,()=>this._applyAlign(a.value)),this.alignSel=a,t.appendChild(a),this.toolbar=t,document.body.appendChild(t),this._updatePosition()}_applyWidth(){if(!this.input||!this.wInput||!this.contentEl)return;let e=Math.max(60,parseFloat(this.wInput.value)||60),t=this.input.closest(`td, th`),n=t?t.offsetWidth:this.contentEl.clientWidth,r=n>0?n-16:9999,i=Math.min(e,Math.max(60,r));this.wInput.value=String(Math.round(i)),this.input.style.width=`${Math.round(i)}px`,this._updatePosition(),this.cb.onResized?.()}_applyCellFit(){this.input&&(this.input.style.width=`100%`,this.input.style.maxWidth=`100%`,this._syncValues(),this._updatePosition(),this.cb.onResized?.())}_applyEditorFit(){if(!this.input||!this.contentEl)return;let e=this.contentEl.clientWidth>0?this.contentEl.clientWidth-32:200;this.input.style.width=`${e}px`,this.input.style.maxWidth=`${e}px`,this._syncValues(),this._updatePosition(),this.cb.onResized?.()}_applyAlign(e){if(!this.input)return;let[t,n]=e.split(`-`),r=this.input;if(t===`text`)r.style.textAlign=n===`left`?``:n;else if(t===`pos`){let e=r.closest(`td, th`);e?e.style.textAlign=n===`left`?``:n===`center`?`center`:`right`:(r.style.display=`block`,n===`left`?(r.style.marginLeft=`0`,r.style.marginRight=`auto`):n===`center`?(r.style.marginLeft=`auto`,r.style.marginRight=`auto`):(r.style.marginLeft=`auto`,r.style.marginRight=`0`))}this.cb.onResized?.()}_syncValues(){if(!this.input||!this.wInput||!this.alignSel)return;let e=Math.round(this.input.getBoundingClientRect().width)||100;this.wInput.value=String(e),this.alignSel.value=this._getCurrentAlignValue()}_getCurrentAlignValue(){if(!this.input)return`text-left`;let e=this.input,t=e.style.textAlign;if(t===`center`)return`text-center`;if(t===`right`)return`text-right`;let n=e.closest(`td, th`);if(n&&n.style.textAlign){let e=n.style.textAlign;return e===`center`?`pos-center`:e===`right`?`pos-right`:`pos-left`}let r=e.style.marginLeft,i=e.style.marginRight;return r===`auto`&&i===`auto`?`pos-center`:r===`auto`?`pos-right`:i===`auto`?`pos-left`:`text-left`}_updatePosition(){let e=this.toolbar,t=this.input;if(!e||!t)return;let n=t.getBoundingClientRect(),r=e.offsetHeight||32,i=e.offsetWidth||200,a=n.top-r-4;a<4&&(a=n.bottom+4);let o=n.left,s=window.innerWidth-i-4;o>s&&(o=s),o<4&&(o=4),e.style.top=`${a}px`,e.style.left=`${o}px`}onScroll=()=>{this._updatePosition()};_makeLabel(e){let t=document.createElement(`span`);return t.textContent=e,t.style.color=`#555`,t}_makeSep(){let e=document.createElement(`div`);return e.style.cssText=`width:1px;height:16px;background:#ddd;margin:0 2px;flex-shrink:0;`,e}_btnStyle(){return`border:1px solid #ccc;border-radius:3px;background:#f5f5f5;padding:1px 8px;cursor:pointer;font-size:12px;color:#333;white-space:nowrap;`}},Dr=class{selectedEl=null;selectedInput=null;ctxMenu=null;inputResizer=new Tr;inputToolbar;clickHandler=e=>this._onClick(e);ctxHandler=e=>this._onContextMenu(e);docClickHandler=e=>this._onDocClick(e);constructor(e){this.contentEl=e,this.inputToolbar=new Er({onResized:()=>this._dispatchResized()})}attach(){this.contentEl.addEventListener(`click`,this.clickHandler),this.contentEl.addEventListener(`contextmenu`,this.ctxHandler),document.addEventListener(`click`,this.docClickHandler)}detach(){this.contentEl.removeEventListener(`click`,this.clickHandler),this.contentEl.removeEventListener(`contextmenu`,this.ctxHandler),document.removeEventListener(`click`,this.docClickHandler),this.deselectAll()}getSelected(){return this.selectedEl}getSelectedInput(){return this.selectedInput}getConfig(e){let t=e.closest(`.poa-form-group`)??(e.dataset.poaForm?e:null);if(!t?.dataset.poaForm)return null;try{return JSON.parse(t.dataset.poaForm)}catch{return null}}deselectAll(){this.selectedEl?.classList.remove(`poa-form-selected`),this.selectedEl=null,this.selectedInput&&=(this.selectedInput.classList.remove(`poa-input-selected`),null),this.inputResizer.detach(),this.inputToolbar.hide(),this._hideCtxMenu()}deselect(){this.deselectAll()}_onClick(e){let t=e.target,n=t.closest(`.poa-form-group`),r=this._findResizableInput(t);if(r)e.stopPropagation(),this.deselectAll(),n&&(this.selectedEl=n,n.classList.add(`poa-form-selected`)),this.selectedInput=r,r.classList.add(`poa-input-selected`),this.inputResizer.attach(r,()=>this._dispatchResized(),this.contentEl),this.inputToolbar.show(r,this.contentEl),this.contentEl.dispatchEvent(new CustomEvent(`poa-input-select`,{bubbles:!0,detail:{el:r}}));else if(n)e.stopPropagation(),this.deselectAll(),this.selectedEl=n,n.classList.add(`poa-form-selected`);else{let n=this._findCellInput(t);n?(e.stopPropagation(),this.deselectAll(),this.selectedInput=n,n.classList.add(`poa-input-selected`),this.contentEl.dispatchEvent(new CustomEvent(`poa-input-select`,{bubbles:!0,detail:{el:n}}))):this.deselectAll()}}_onContextMenu(e){let t=e.target,n=t.closest(`.poa-form-group`),r=this._findResizableInput(t);if(r)e.preventDefault(),e.stopPropagation(),this.deselectAll(),n&&(this.selectedEl=n,n.classList.add(`poa-form-selected`)),this.selectedInput=r,r.classList.add(`poa-input-selected`),this.inputResizer.attach(r,()=>this._dispatchResized(),this.contentEl),this.inputToolbar.show(r,this.contentEl),this._showCtxMenu(r,e.clientX,e.clientY);else if(n)e.preventDefault(),e.stopPropagation(),this.deselectAll(),this.selectedEl=n,n.classList.add(`poa-form-selected`),this.contentEl.dispatchEvent(new CustomEvent(`poa-form-contextmenu`,{bubbles:!0,detail:{el:n,x:e.clientX,y:e.clientY}}));else{let n=this._findCellInput(t);n&&(e.preventDefault(),e.stopPropagation(),this.deselectAll(),this.selectedInput=n,n.classList.add(`poa-input-selected`),this._showCtxMenu(n,e.clientX,e.clientY))}}_onDocClick(e){let t=e.target;t.closest(`[data-poa-resize-handle]`)||t.closest(`[data-poa-input-menu]`)||this.deselectAll()}_findResizableInput(e){let t=e.closest(`input[data-poa-form], textarea[data-poa-form]`);if(t)return t;let n=e.closest(`.poa-form-group`);return n?n.querySelector(`input, textarea`)??null:null}_findCellInput(e){return e.closest(`input[data-poa-form], textarea[data-poa-form], select[data-poa-form], button[data-poa-form]`)}_dispatchResized(){this.contentEl.dispatchEvent(new CustomEvent(`poa-input-resized`,{bubbles:!0})),this.inputResizer.syncHandle(),this.inputToolbar.syncPosition()}_showCtxMenu(e,t,n){this._hideCtxMenu();let r=e.closest(`td, th`),i=document.createElement(`div`);i.dataset.poaInputMenu=`true`,i.style.cssText=`position:fixed;top:${n}px;left:${t}px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.15);z-index:99999;padding:4px 0;min-width:190px;font-size:13px;`;let a=(e,t,n=!1)=>{let r=document.createElement(`button`);r.style.cssText=`display:block;width:100%;padding:7px 14px;border:none;background:transparent;cursor:pointer;text-align:left;font-size:13px;color:${n?`#d32f2f`:`#222`};`,r.textContent=e,r.addEventListener(`mouseenter`,()=>{r.style.background=`#f5f5f5`}),r.addEventListener(`mouseleave`,()=>{r.style.background=`transparent`}),r.addEventListener(`mousedown`,e=>{e.stopPropagation(),t(),this._hideCtxMenu()}),i.appendChild(r)},o=()=>{let e=document.createElement(`div`);e.style.cssText=`height:1px;background:#f3f4f6;margin:4px 0;`,i.appendChild(e)},s=e=>{let t=document.createElement(`div`);t.style.cssText=`padding:5px 14px 2px;font-size:11px;font-weight:600;color:#9ca3af;letter-spacing:.04em;`,t.textContent=e,i.appendChild(t)},c=(e,t={})=>{this.contentEl.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:t}))};if(s(`너비`),a(`  셀에 맞춤 (100%)`,()=>{e.style.width=`100%`,e.style.maxWidth=`100%`,this._dispatchResized()}),a(`  절반 (50%)`,()=>{e.style.width=`50%`,this._dispatchResized()}),r){let t=Math.floor(r.getBoundingClientRect().width);a(`  현재 셀 전체 (${t}px)`,()=>{e.style.width=`${t}px`,e.style.maxWidth=`100%`,this._dispatchResized()})}o(),s(`텍스트 정렬`),a(`  왼쪽`,()=>{e.style.textAlign=``,this._dispatchResized()}),a(`  가운데`,()=>{e.style.textAlign=`center`,this._dispatchResized()}),a(`  오른쪽`,()=>{e.style.textAlign=`right`,this._dispatchResized()}),o(),a(`입력 요소 속성`,()=>{c(`poa-input-contextmenu`,{el:e,x:t,y:n})}),a(`입력 요소 삭제`,()=>{e.closest(`.poa-form-group`)?.remove()??e.remove(),this.deselectAll(),c(`poa-input-resized`)},!0),document.body.appendChild(i),this.ctxMenu=i;let l=i.getBoundingClientRect();l.bottom>window.innerHeight-8&&(i.style.top=`${n-l.height}px`),l.right>window.innerWidth-8&&(i.style.left=`${t-l.width}px`)}_hideCtxMenu(){this.ctxMenu?.remove(),this.ctxMenu=null}},Or=`poa-emoji-recent`,kr=16,Ar=[[`smileys`,`스마일리/감정`,`😀`,`😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 😎 🤩 🥳 😏 🤐`],[`sad`,`슬픔/공감`,`😢`,`😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 😈 👿 💀 ☠️ 💩 🤡 👹 👺 👻 👽 👾 🤖`],[`gestures`,`제스처/손`,`👍`,`👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 🤙 👈 👉 👆 👇 ☝️ 👏 🙌 🤲 🤝 🙏 ✋ 🤚 🖐️ 💪 🦾 🖖 🤌 🫶 🫵`],[`animals`,`동물/자연`,`🐶`,`🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🙈 🙉 🙊 🐔 🐧 🐦 🐤 🦅 🦆 🦉 🦇 🐺 🐗 🐴 🦄`],[`food`,`음식/음료`,`🍕`,`🍕 🍔 🌭 🍟 🌮 🌯 🥗 🍲 🍛 🍜 🍝 🍣 🍤 🍡 🥟 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🍫 🍬 🍭 🍷 🍸 🍺 ☕`],[`sports`,`활동/스포츠`,`⚽`,`⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🎱 🏓 🏸 🥊 🥋 🎽 🛹 🛷 🏊 🏄 🏋️ 🤸 🏇 🏂 🚴 🏆 🥇 🥈 🥉 🎯 🎿 🤺 🎻`],[`travel`,`여행/장소`,`🌍`,`🌍 🌎 🌏 🌐 🗺️ 🧭 🏔️ ⛰️ 🌋 🗻 🏕️ 🏖️ 🏜️ 🏝️ 🏞️ 🏟️ 🏛️ 🏗️ 🏘️ 🏠 🏡 🏢 🏣 🏤 🏥 🏦 🏨 🗼 🗽 ✈️`],[`objects`,`사물/기호`,`💡`,`💡 🔦 🕯️ 💰 💳 💎 🔑 🗝️ 🔓 🔒 🛡️ 🔧 🔨 ⚙️ 🔩 ⚖️ 🔗 📱 💻 🖥️ 🖨️ 📷 📸 📹 🎥 📞 ☎️ 📺 📻 🎙️`],[`symbols`,`기호/특수`,`❤️`,`❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 ✨ ⭐ 🌟 💫 🌈 ☀️ ⛅ 🌦️ ❄️ 🌊 🌸 🌺`]].map(([e,t,n,r])=>({id:e,label:t,icon:n,emojis:r.split(` `).filter(Boolean)})),jr=new Map([[`😀`,[`웃음`,`기쁨`,`smile`,`happy`,`grin`]],[`😂`,[`웃음`,`눈물`,`laugh`,`funny`,`tears`]],[`🤣`,[`웃음`,`롤`,`rofl`,`laugh`]],[`😍`,[`사랑`,`눈하트`,`love`,`heart eyes`]],[`🥰`,[`사랑`,`행복`,`love`,`happy`]],[`😘`,[`뽀뽀`,`키스`,`kiss`,`love`]],[`😎`,[`쿨`,`선글라스`,`cool`,`sunglasses`]],[`🤩`,[`신남`,`스타`,`star struck`,`excited`]],[`🥳`,[`파티`,`신남`,`party`,`celebrate`]],[`😢`,[`슬픔`,`눈물`,`sad`,`cry`]],[`😭`,[`슬픔`,`통곡`,`sob`,`cry`,`weep`]],[`😠`,[`화남`,`분노`,`angry`,`mad`]],[`😡`,[`화남`,`분노`,`rage`,`angry`]],[`👍`,[`좋아요`,`엄지`,`like`,`thumbs up`,`good`]],[`👎`,[`싫어요`,`dislike`,`thumbs down`,`bad`]],[`👏`,[`박수`,`칭찬`,`clap`,`applause`]],[`🙏`,[`감사`,`기도`,`pray`,`thanks`,`please`]],[`💪`,[`힘`,`근육`,`strong`,`muscle`,`flex`]],[`❤️`,[`하트`,`사랑`,`heart`,`love`,`red`]],[`💔`,[`실연`,`하트깨짐`,`broken heart`,`sad`]],[`🔥`,[`불`,`핫`,`인기`,`fire`,`hot`]],[`✨`,[`반짝`,`빛`,`sparkle`,`shine`,`stars`]],[`🎉`,[`파티`,`축하`,`party`,`celebrate`,`congratulations`]],[`🎊`,[`파티`,`축하`,`party`,`confetti`]],[`🐶`,[`강아지`,`개`,`dog`,`puppy`]],[`🐱`,[`고양이`,`cat`,`kitty`]],[`🍕`,[`피자`,`pizza`]],[`🍔`,[`버거`,`햄버거`,`burger`,`hamburger`]],[`☕`,[`커피`,`coffee`,`cafe`]],[`⚽`,[`축구`,`soccer`,`football`]],[`🏀`,[`농구`,`basketball`]],[`🌍`,[`지구`,`세계`,`earth`,`world`,`globe`]],[`💡`,[`전구`,`아이디어`,`idea`,`light`,`bulb`]],[`🔧`,[`렌치`,`수리`,`wrench`,`fix`,`repair`,`tool`]],[`📱`,[`폰`,`스마트폰`,`phone`,`smartphone`,`mobile`]],[`💻`,[`컴퓨터`,`노트북`,`computer`,`laptop`]],[`🎵`,[`음악`,`노래`,`music`,`song`,`note`]],[`🌸`,[`벚꽃`,`꽃`,`cherry blossom`,`flower`,`spring`]],[`⭐`,[`별`,`스타`,`star`,`rating`]],[`🌈`,[`무지개`,`rainbow`,`colorful`]]]);function Mr(e){let t=e.toLowerCase().trim();if(!t)return[];let n=new Set;for(let[e,r]of jr)r.some(e=>e.includes(t))&&n.add(e);return Array.from(n)}var Nr=class{getRecent(){try{let e=localStorage.getItem(Or);return e?JSON.parse(e):[]}catch{return[]}}addRecent(e){let t=this.getRecent().filter(t=>t!==e);t.unshift(e),t.length>kr&&(t.length=kr);try{localStorage.setItem(Or,JSON.stringify(t))}catch{}}insert(e,t){this.addRecent(e);let n=t.ownerDocument,r=n.getSelection();if(!r||r.rangeCount===0||!t.contains(r.getRangeAt(0).startContainer)){t.insertAdjacentText(`beforeend`,e);return}let i=r.getRangeAt(0);i.deleteContents();let a=n.createTextNode(e);i.insertNode(a),i.setStartAfter(a),i.collapse(!0),r.removeAllRanges(),r.addRange(i)}};function Pr(){return`tt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,5)}`}var Fr=class{constructor(e){this.container=e}insert(e,t,n){let r=this.container.ownerDocument.createElement(`span`);return r.className=`poa-tooltip`,r.dataset.tooltipId=Pr(),r.dataset.tooltipTitle=e,r.dataset.tooltipContent=t,r.appendChild(n.extractContents()),n.insertNode(r),r}getAll(){return Array.from(this.container.querySelectorAll(`.poa-tooltip[data-tooltip-id]`)).map(e=>({id:e.dataset.tooltipId??``,el:e,title:e.dataset.tooltipTitle??``,content:e.dataset.tooltipContent??``,anchorText:e.textContent??``}))}update(e,t,n){let r=this._findById(e);return r?(r.dataset.tooltipTitle=t,r.dataset.tooltipContent=n,!0):!1}remove(e){let t=this._findById(e);if(!t?.parentNode)return!1;let n=t.ownerDocument.createDocumentFragment();for(;t.firstChild;)n.appendChild(t.firstChild);return t.parentNode.replaceChild(n,t),!0}removeAll(){for(let e of this.getAll())this.remove(e.id)}_findById(e){return Array.from(this.container.querySelectorAll(`.poa-tooltip[data-tooltip-id]`)).find(t=>t.dataset.tooltipId===e)??null}static injectStyles(){if(document.getElementById(`poa-tooltip-styles`))return;let e=document.createElement(`style`);e.id=`poa-tooltip-styles`,e.textContent=[`.poa-tooltip {`,`  cursor: help;`,`  border-bottom: 1.5px dotted #6b7280;`,`}`,`.poa-tooltip-popup {`,`  position: fixed;`,`  background: #1F2937;`,`  color: #fff;`,`  border-radius: 6px;`,`  padding: 8px 12px;`,`  font-size: 13px;`,`  max-width: 240px;`,`  line-height: 1.5;`,`  pointer-events: none;`,`  z-index: 99999;`,`  box-shadow: 0 4px 12px rgba(0,0,0,.3);`,`  word-break: break-word;`,`  white-space: pre-wrap;`,`}`,`.poa-tooltip-popup-title {`,`  font-weight: 500;`,`  margin-bottom: 4px;`,`}`,`.poa-tooltip-popup-body {`,`  color: #D1D5DB;`,`}`].join(`
`),document.head.appendChild(e)}static attachHoverPopup(e){let t=null;e.addEventListener(`mouseover`,e=>{let n=e.target.closest(`.poa-tooltip`);if(!n)return;t?.remove();let r=n.dataset.tooltipTitle??``,i=n.dataset.tooltipContent??``;if(!i)return;if(t=document.createElement(`div`),t.className=`poa-tooltip-popup`,r){let e=document.createElement(`div`);e.className=`poa-tooltip-popup-title`,e.textContent=r,t.appendChild(e)}let a=document.createElement(`div`);a.className=`poa-tooltip-popup-body`,a.textContent=i,t.appendChild(a),t.style.visibility=`hidden`,document.body.appendChild(t);let o=n.getBoundingClientRect(),s=t.offsetWidth,c=t.offsetHeight,l=o.left+o.width/2-s/2,u=o.top-c-8;l=Math.max(8,Math.min(l,window.innerWidth-s-8)),u<0&&(u=o.bottom+8),t.style.left=`${l}px`,t.style.top=`${u}px`,t.style.visibility=``}),e.addEventListener(`mouseout`,e=>{e.target.closest(`.poa-tooltip`)&&(t?.remove(),t=null)})}},J={fieldId:`data-field-id`,placeholder:`data-placeholder`,label:`data-label`,prefix:`data-prefix`,suffix:`data-suffix`,multiline:`data-multiline`,fontSize:`data-font-size`,textAlign:`data-text-align`,fontFamily:`data-font-family`,sizeFixed:`data-size-fixed`,fieldType:`data-field-type`,numberFormat:`data-number-format`,dateFormat:`data-date-format`,rawValue:`data-raw-value`,dataWidth:`data-width`,dataHeight:`data-height`},Ir=[[`none`,`포맷 없음`],[`comma`,`천 단위 (1,000,000)`],[`comma_won`,`천 단위 + 원 (1,000,000원)`],[`korean`,`한국식 단위 (100만)`],[`korean_full`,`한국식 전체 (일백만원)`],[`decimal2`,`소수점 2자리 (1,000,000.00)`],[`percent`,`퍼센트 (10.5%)`],[`percent2`,`퍼센트 소수점 2자리 (10.50%)`]],Lr=[[`YYYY-MM-DD`,`YYYY-MM-DD  예) 2025-01-31`],[`YYYY년MM월DD일`,`YYYY년 MM월 DD일  예) 2025년 01월 31일`],[`YYYY. MM. DD`,`YYYY. MM. DD  예) 2025. 01. 31`],[`MM/DD/YYYY`,`MM/DD/YYYY  예) 01/31/2025`],[`DD-MM-YYYY`,`DD-MM-YYYY  예) 31-01-2025`]],Rr=[[`0`,`문서 기본값`],[`8`,`8px`],[`9`,`9px`],[`10`,`10px`],[`11`,`11px`],[`12`,`12px`],[`13`,`13px`],[`14`,`14px`],[`15`,`15px`],[`16`,`16px`],[`18`,`18px`],[`20`,`20px`],[`22`,`22px`],[`24`,`24px`],[`28`,`28px`],[`32`,`32px`],[`36`,`36px`],[`40`,`40px`],[`48`,`48px`],[`56`,`56px`],[`64`,`64px`],[`72`,`72px`]],zr=[[``,`문서 기본값`],[`'Noto Sans KR'`,`Noto Sans KR`],[`'Roboto'`,`Roboto`],[`'Malgun Gothic'`,`맑은 고딕`],[`'Dotum'`,`돋움체`],[`'Gulim'`,`굴림체`],[`'Batang'`,`바탕체`],[`'Arial'`,`Arial`]],Br={text:`T`,textarea:`☰`,number:`#`,date:`📅`},Vr=[`border:1px solid #93C5FD`,`border-radius:4px`,`font-size:inherit`,`background:#EFF6FF`,`color:#1E40AF`,`min-width:60px`,`max-width:100%`,`outline:none`,`font-family:inherit`,`box-sizing:border-box`,`margin:0`].join(`;`),Hr=`${Vr};display:inline-block;padding:1px 4px;vertical-align:middle;resize:horizontal;height:auto;`,Ur=`${Vr};display:inline-block;padding:2px 4px;vertical-align:middle;resize:both;max-height:400px;line-height:inherit;min-height:1.5em;height:auto;`,Wr=[``,`일`,`이`,`삼`,`사`,`오`,`육`,`칠`,`팔`,`구`];function Gr(e){if(e<=0||e>9999)return``;let t=``,n=[Math.floor(e/1e3),Math.floor(e%1e3/100),Math.floor(e%100/10),e%10],r=[`천`,`백`,`십`,``];for(let e=0;e<4;e++){if(n[e]===0)continue;let i=n[e]===1&&e<3?``:Wr[n[e]];t+=i+r[e]}return t}function Kr(e){if(e===0)return`0`;let t=e<0?`-`:``,n=Math.abs(Math.floor(e)),r=[];for(let[e,t]of[[0xe8d4a51000,`조`],[1e8,`억`],[1e4,`만`]]){let i=Math.floor(n/e);i>0&&(r.push(i.toLocaleString(`ko-KR`)+t),n%=e)}return n>0&&r.push(n.toLocaleString(`ko-KR`)),t+r.join(` `)}function qr(e){if(e===0)return`영원`;let t=e<0?`마이너스 `:``,n=Math.abs(Math.floor(e)),r=[];for(let[e,t]of[[0xe8d4a51000,`조`],[1e8,`억`],[1e4,`만`]]){let i=Math.floor(n/e);i>0&&(r.push(Gr(i)+t),n%=e)}return n>0&&r.push(Gr(n)),t+r.join(``)+`원`}var Jr={"YYYY-MM-DD":`예) 2026-12-31`,YYYY년MM월DD일:`예) 2026년 12월 31일`,"YYYY. MM. DD":`예) 2026. 12. 31`,"MM/DD/YYYY":`예) 12/31/2026`,"DD-MM-YYYY":`예) 31-12-2026`};function Yr(e,t){let n=e.replace(/\D/g,``);if(n.length<8)return e;let r=n.slice(0,4),i=n.slice(4,6),a=n.slice(6,8),o=Number(r),s=Number(i),c=Number(a);if(o<1e3||o>9999||s<1||s>12||c<1||c>31)return e;switch(t){case`YYYY-MM-DD`:return`${r}-${i}-${a}`;case`YYYY년MM월DD일`:return`${r}년 ${i}월 ${a}일`;case`YYYY. MM. DD`:return`${r}. ${i}. ${a}`;case`MM/DD/YYYY`:return`${i}/${a}/${r}`;case`DD-MM-YYYY`:return`${a}-${i}-${r}`;default:return e}}function Xr(e,t){let n=e.replace(/[,\s]/g,``),r=parseFloat(n);if(!n||isNaN(r))return e;switch(t){case`comma`:return r.toLocaleString(`ko-KR`);case`comma_won`:return r.toLocaleString(`ko-KR`)+`원`;case`korean`:return Kr(r);case`korean_full`:return qr(r);case`decimal2`:return r.toLocaleString(`ko-KR`,{minimumFractionDigits:2,maximumFractionDigits:2});case`percent`:return r.toLocaleString(`ko-KR`,{maximumFractionDigits:1})+`%`;case`percent2`:return r.toLocaleString(`ko-KR`,{minimumFractionDigits:2,maximumFractionDigits:2})+`%`;default:return e}}var Zr=`poa-field-popup-style`;function Qr(e){if(e.getElementById(Zr))return;let t=e.createElement(`style`);t.id=Zr,t.textContent=`
.poa-field-popup *{box-sizing:border-box;margin:0;padding:0;}
.poa-field-popup .pf-input,.poa-field-popup .pf-select,.poa-field-popup .pf-textarea{
  width:100%;border:1.5px solid #E5E7EB;border-radius:7px;
  padding:8px 10px;font-size:13px;color:#111827;background:#fff;
  outline:none;font-family:inherit;transition:border-color .15s,box-shadow .15s;
}
.poa-field-popup .pf-textarea{resize:vertical;min-height:60px;}
.poa-field-popup .pf-input:focus,.poa-field-popup .pf-select:focus,.poa-field-popup .pf-textarea:focus{
  border-color:#3B82F6;box-shadow:0 0 0 3px rgba(59,130,246,.15);
}
.poa-field-popup .pf-field{margin-bottom:10px;}
.poa-field-popup .pf-field-lbl{
  display:block;font-size:11px;font-weight:700;color:#6B7280;
  letter-spacing:.05em;text-transform:uppercase;margin-bottom:5px;
}
.poa-field-popup .pf-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.poa-field-popup .pf-sec{border-top:1px solid #F3F4F6;}
.poa-field-popup .pf-sec-hdr{
  display:flex;align-items:center;gap:5px;width:100%;
  padding:9px 16px 7px;border:none;background:none;cursor:pointer;
  font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:#9CA3AF;text-align:left;font-family:inherit;
  transition:color .12s;
}
.poa-field-popup .pf-sec-hdr:hover{color:#6B7280;}
.poa-field-popup .pf-sec-body{padding:0 16px 12px;}
.poa-field-popup .pf-align-btn{
  display:inline-flex;align-items:center;justify-content:center;
  width:36px;height:34px;border-radius:7px;cursor:pointer;
  border:1.5px solid #E5E7EB;background:#fff;color:#6B7280;
  transition:all .12s;font-family:inherit;
}
.poa-field-popup .pf-align-btn.active{
  border-color:#3B82F6;background:#EFF6FF;color:#2563EB;
}
.poa-field-popup .pf-align-btn:hover:not(.active){
  background:#F9FAFB;border-color:#D1D5DB;
}
.poa-field-popup .pf-move-btn{
  display:inline-flex;align-items:center;justify-content:center;
  width:24px;height:24px;border-radius:5px;cursor:pointer;
  border:1px solid #E5E7EB;background:#F9FAFB;color:#6B7280;
  font-size:13px;transition:all .1s;font-family:inherit;
  line-height:1;
}
.poa-field-popup .pf-move-btn:hover{
  background:#EFF6FF;border-color:#93C5FD;color:#2563EB;
}
.poa-field{display:inline-flex;align-items:center;position:relative;vertical-align:middle;}
.poa-field-drag-handle{
  display:inline-flex;align-items:center;justify-content:center;
  width:12px;cursor:grab;color:#93C5FD;font-size:11px;
  vertical-align:middle;user-select:none;opacity:0;transition:opacity .15s;
  padding:0;line-height:1;
}
.poa-field-drag-handle:active{cursor:grabbing;}
.poa-field:hover .poa-field-drag-handle{opacity:1;}
.poa-field.poa-field-dragging{opacity:.5;}
.poa-field-resize-handle{
  position:absolute;right:0;bottom:0;
  width:8px;height:8px;
  cursor:se-resize;
  background:linear-gradient(135deg,transparent 50%,#93C5FD 50%);
  opacity:0;transition:opacity .15s;
  flex-shrink:0;
}
.poa-field:hover .poa-field-resize-handle{opacity:1;}
`,e.head.appendChild(t)}var $r={left:`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="5" width="12" height="2.5" rx="1.2"/><rect x="3" y="10.7" width="18" height="2.5" rx="1.2"/><rect x="3" y="16.5" width="14" height="2.5" rx="1.2"/></svg>`,center:`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="12" height="2.5" rx="1.2"/><rect x="3" y="10.7" width="18" height="2.5" rx="1.2"/><rect x="5" y="16.5" width="14" height="2.5" rx="1.2"/></svg>`,right:`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="9" y="5" width="12" height="2.5" rx="1.2"/><rect x="3" y="10.7" width="18" height="2.5" rx="1.2"/><rect x="7" y="16.5" width="14" height="2.5" rx="1.2"/></svg>`},ei=class{contentEl=null;popupEl=null;dragCleanup=null;lastInsertedEl=null;clickHandler=e=>{let t=e.target;t.classList.contains(`poa-field-input`)&&this.contentEl?.dataset.userMode!==`true`&&(e.preventDefault(),e.stopPropagation(),this.openPopup(t))};handleMouseDown=e=>{let t=e.target.closest(`.poa-field-drag-handle`);if(!t)return;let n=t.closest(`.poa-field`);n&&(e.preventDefault(),this.startFieldDrag(n,e))};startFieldDrag(e,t){let n=e.ownerDocument,r=n.createElement(`div`);r.textContent=e.querySelector(`.poa-field-input`)?.getAttribute(`placeholder`)??``,r.style.cssText=[`position:fixed`,`pointer-events:none`,`z-index:99999`,`background:#EFF6FF`,`border:1.5px dashed #3B82F6`,`border-radius:4px`,`padding:2px 8px`,`font-size:12px`,`color:#1E40AF`,`white-space:nowrap`,`opacity:0.85`,`left:${t.clientX+12}px`,`top:${t.clientY+8}px`].join(`;`),n.body.appendChild(r),e.style.opacity=`0.4`;let i=e=>{r.style.left=`${e.clientX+12}px`,r.style.top=`${e.clientY+8}px`},a=t=>{if(n.removeEventListener(`mousemove`,i),n.removeEventListener(`mouseup`,a),r.remove(),e.style.opacity=``,!this.contentEl)return;let o=n,s=null;if(typeof o.caretRangeFromPoint==`function`)s=o.caretRangeFromPoint(t.clientX,t.clientY);else if(typeof o.caretPositionFromPoint==`function`){let e=o.caretPositionFromPoint(t.clientX,t.clientY);e&&(s=n.createRange(),s.setStart(e.offsetNode,e.offset),s.collapse(!0))}if(!s||e.contains(s.startContainer)||!this.contentEl.contains(s.startContainer))return;e.remove(),s.insertNode(e),s.setStartAfter(e),s.collapse(!0);let c=n.getSelection();c?.removeAllRanges(),c?.addRange(s),this.contentEl.dispatchEvent(new Event(`input`,{bubbles:!0}))};n.addEventListener(`mousemove`,i),n.addEventListener(`mouseup`,a)}attach(e){this.detach(),this.contentEl=e,e.addEventListener(`click`,this.clickHandler),e.addEventListener(`mousedown`,this.handleMouseDown)}detach(){this.contentEl&&=(this.contentEl.removeEventListener(`click`,this.clickHandler),this.contentEl.removeEventListener(`mousedown`,this.handleMouseDown),null),this.closePopup()}insertField(e,t){if(!this.contentEl)return;let n=this.contentEl.ownerDocument,r=n.getSelection(),i;t?i=t.cloneRange():r&&r.rangeCount>0?i=r.getRangeAt(0):(i=n.createRange(),i.selectNodeContents(this.contentEl),i.collapse(!1));let a=n.createElement(`span`);a.className=`poa-field`,a.setAttribute(J.fieldId,e.id),a.setAttribute(J.placeholder,e.placeholder),a.setAttribute(J.label,e.label),a.setAttribute(J.prefix,``),a.setAttribute(J.suffix,``),a.setAttribute(J.fieldType,e.type),a.setAttribute(J.multiline,`1`),e.defaultNumberFormat&&e.type===`number`&&a.setAttribute(J.numberFormat,e.defaultNumberFormat),e.type===`date`&&a.setAttribute(J.dateFormat,`YYYY-MM-DD`),a.contentEditable=`false`,a.style.cssText=`margin:0;padding:0;display:inline-flex;align-items:center;vertical-align:middle;max-width:100%;position:relative;line-height:1;`;let o=n.createElement(`span`);o.className=`poa-field-drag-handle`,o.textContent=`⠿`,o.title=`드래그하여 이동`;let s=this.createTextarea(n,e.label,e.id);s.rows=1,e.type===`date`&&s.setAttribute(`data-input-type`,`date`);let c=n.createElement(`span`);c.className=`poa-field-resize-handle`,c.title=`크기 조절`,a.appendChild(o),a.appendChild(s),a.appendChild(c);let l=this.findContainerCell(i);if(l&&this.isCellEffectivelyEmpty(l)){for(;l.firstChild;)l.removeChild(l.firstChild);l.appendChild(a)}else i.deleteContents(),i.insertNode(a),l&&this.cleanCellAfterInsert(l,a);i.setStartAfter(a),i.collapse(!0),r?.removeAllRanges(),r?.addRange(i);let u=n.defaultView;if(u){let e=a.parentElement,t=e?u.getComputedStyle(e).fontSize:``;t&&(s.style.fontSize=t)}this.attachResizeObserver(s,a),this.attachResizeDrag(c,s,a),this.lastInsertedEl=s}createInput(e,t,n){let r=e.createElement(`input`);return r.type=`text`,r.className=`poa-field-input`,r.placeholder=t,r.setAttribute(J.fieldId,n),r.style.cssText=Hr,r}createTextarea(e,t,n){let r=e.createElement(`textarea`);return r.className=`poa-field-input`,r.placeholder=t,r.setAttribute(J.fieldId,n),r.style.cssText=Ur,r}findContainerCell(e){let t=e.commonAncestorContainer;for(;t;){if(t.nodeType===Node.ELEMENT_NODE){let e=t.tagName;if(e===`TD`||e===`TH`)return t}t=t.parentNode}return null}isCellEffectivelyEmpty(e){return(e.textContent??``).trim()===``?Array.from(e.childNodes).every(e=>{if(e.nodeType===Node.TEXT_NODE)return(e.textContent??``).trim()===``;let t=e.tagName;return t===`BR`?!0:t===`P`?(e.textContent??``).trim()===``:!1}):!1}cleanCellAfterInsert(e,t){Array.from(e.querySelectorAll(`br`)).forEach(e=>{t.contains(e)||e.remove()}),Array.from(e.childNodes).forEach(n=>{n!==t&&n.nodeType===Node.TEXT_NODE&&(n.textContent??``).trim()===``&&e.removeChild(n)}),Array.from(e.querySelectorAll(`p`)).forEach(e=>{!t.contains(e)&&(e.textContent??``).trim()===``&&e.remove()})}attachResizeObserver(e,t){typeof ResizeObserver>`u`||new ResizeObserver(()=>{t.setAttribute(J.dataWidth,String(e.offsetWidth)),t.setAttribute(J.dataHeight,String(e.offsetHeight))}).observe(e)}attachResizeDrag(e,t,n){e.addEventListener(`mousedown`,r=>{r.preventDefault(),r.stopPropagation();let i=r.clientX,a=r.clientY,o=t.offsetWidth,s=t.offsetHeight,c=e.ownerDocument,l=n.closest(`td,th`),u=e=>{let r=e.clientX-i,c=e.clientY-a,u=Math.max(60,o+r),d=Math.max(24,s+c);l&&(u=Math.min(u,l.clientWidth-20)),u=Math.min(u,1200),d=Math.min(d,600),t.style.width=`${u}px`,t.style.height=`${d}px`,n.setAttribute(J.dataWidth,String(u)),n.setAttribute(J.dataHeight,String(d))},d=()=>{c.removeEventListener(`mousemove`,u),c.removeEventListener(`mouseup`,d)};c.addEventListener(`mousemove`,u),c.addEventListener(`mouseup`,d)})}openLastInsertedPopup(){this.lastInsertedEl?.isConnected&&this.openPopup(this.lastInsertedEl),this.lastInsertedEl=null}openPopup(e){this.closePopup();let t=e.closest(`.poa-field`);if(!t)return;let n=e.ownerDocument;Qr(n);let r=e.getBoundingClientRect(),i=t.getAttribute(J.prefix)??``,a=t.getAttribute(J.suffix)??``,o=t.getAttribute(J.fontSize)??`0`,s=t.getAttribute(J.textAlign)??`left`,c=t.getAttribute(J.fontFamily)??``,l=t.getAttribute(J.sizeFixed)??`0`,u=t.getAttribute(J.fieldType)??`text`,d=t.getAttribute(J.multiline)??`1`,f=t.getAttribute(J.numberFormat)??`none`,p=t.getAttribute(J.dateFormat)??`YYYY-MM-DD`,m=e.getAttribute(`placeholder`)??``,h=u===`number`,g=u===`date`,_=d===`1`,v=(e.tagName,e.value),ee=t.getAttribute(J.rawValue)??v,y=e;y.style.resize=l===`1`?`none`:_?`both`:`horizontal`;let b=(e,t,n)=>`<option value="${e}"${e===t?` selected`:``}>${n}</option>`,te=!Rr.some(([e])=>e===o)&&o!==`0`?`<option value="${o}" selected>${o}px</option>`:``,ne=Rr.map(([e,t])=>b(e,o,t)).join(``),re=h?`
      <div class="pf-field">
        <span class="pf-field-lbl">숫자 표시 형식</span>
        <select id="pf-numformat" class="pf-select">
          ${Ir.map(([e,t])=>b(e,f,t)).join(``)}
        </select>
      </div>`:g?`
      <div class="pf-field">
        <span class="pf-field-lbl">날짜 표시 형식</span>
        <select id="pf-dateformat" class="pf-select">
          ${Lr.map(([e,t])=>b(e,p,t)).join(``)}
        </select>
      </div>`:``,ie=[`left`,`center`,`right`].map(e=>`<button class="pf-align-btn${s===e?` active`:``}" data-align="${e}" title="${e===`left`?`왼쪽`:e===`center`?`가운데`:`오른쪽`}">${$r[e]}</button>`).join(``),x=h?ee:g?t.getAttribute(J.rawValue)??``:v,ae=g?Jr[p]??`예) 20261231`:m,S=_?`<textarea id="pf-value" placeholder="${m}" class="pf-textarea">${v}</textarea>`:`<input id="pf-value" type="${h?`number`:`text`}" value="${x}" placeholder="${ae}" class="pf-input">`,oe=y.tagName===`TEXTAREA`,C=y.offsetWidth||parseInt(t.getAttribute(J.dataWidth)??`0`,10)||120,se=y.offsetHeight||parseInt(t.getAttribute(J.dataHeight)??`0`,10)||28,w=`
<div class="pf-sec">
  <button class="pf-sec-hdr" data-sec="size"><span class="pf-sec-arrow">▾</span> 크기 설정</button>
  <div id="pf-body-size" class="pf-sec-body">
    <div class="pf-row2">
      <div class="pf-field" style="margin-bottom:0;">
        <span class="pf-field-lbl">가로 길이</span>
        <div style="display:flex;align-items:center;gap:4px;">
          <input id="pf-width" type="number" value="${C}" min="60" max="800" step="1"
            style="width:70px;" class="pf-input">
          <span style="font-size:12px;color:#6B7280;">px</span>
        </div>
      </div>
      ${oe?`
      <div class="pf-field" style="margin-bottom:0;">
        <span class="pf-field-lbl">세로 길이</span>
        <div style="display:flex;align-items:center;gap:4px;">
          <input id="pf-height" type="number" value="${se}" min="28" max="600" step="1"
            style="width:70px;" class="pf-input">
          <span style="font-size:12px;color:#6B7280;">px</span>
        </div>
      </div>`:`<div></div>`}
    </div>
  </div>
</div>`,T=n.defaultView,E=T?T.innerWidth:1920,ce=T?T.innerHeight:1080,D=r.left,le=r.bottom+6;le+340>ce&&(le=r.top-340-6),D+320>E&&(D=r.right-320),D=Math.max(4,D),le=Math.max(4,le);let O=n.createElement(`div`);O.className=`poa-field-popup`,O.style.cssText=[`position:fixed`,`left:${Math.round(D)}px`,`top:${Math.round(le)}px`,`width:320px`,`background:#fff`,`border:1px solid #E2E8F0`,`border-radius:12px`,`box-shadow:0 10px 40px rgba(0,0,0,.15),0 2px 8px rgba(0,0,0,.08)`,`z-index:99999`,`font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif`,`font-size:13px`,`overflow:hidden`].join(`;`),O.innerHTML=`
<div id="pf-header" style="padding:10px 12px 10px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #F1F5F9;gap:8px;cursor:move;">
  <div style="display:flex;align-items:center;gap:8px;min-width:0;">
    <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;background:linear-gradient(135deg,#3B82F6,#2563EB);border-radius:7px;color:#fff;font-size:11px;font-weight:700;flex-shrink:0;">${Br[u]??`T`}</span>
    <span style="font-size:13px;font-weight:700;color:#111827;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${m}</span>
  </div>
  <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
    <button class="pf-move-btn" data-dir="left"  title="왼쪽으로 이동">←</button>
    <button class="pf-move-btn" data-dir="right" title="오른쪽으로 이동">→</button>
    <button class="pf-move-btn" data-dir="up"    title="위로 이동">↑</button>
    <button class="pf-move-btn" data-dir="down"  title="아래로 이동">↓</button>
    <div style="width:1px;height:16px;background:#E5E7EB;margin:0 2px;"></div>
    <button id="pf-close" style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border:none;background:#F8FAFC;border-radius:6px;font-size:15px;cursor:pointer;color:#94A3B8;transition:all .12s;" title="닫기">✕</button>
  </div>
</div>

<div class="pf-sec">
  <button class="pf-sec-hdr" data-sec="value"><span class="pf-sec-arrow">▾</span> 값 설정</button>
  <div id="pf-body-value" class="pf-sec-body">
    ${re}
    <div class="pf-field" style="margin-bottom:0;">
      <span class="pf-field-lbl">기본값</span>
      ${S}
    </div>
  </div>
</div>

${w}

<div class="pf-sec">
  <button class="pf-sec-hdr" data-sec="font"><span class="pf-sec-arrow">▾</span> 글자 설정</button>
  <div id="pf-body-font" class="pf-sec-body">
    <div class="pf-row2">
      <div class="pf-field">
        <span class="pf-field-lbl">글자 크기</span>
        <select id="pf-fontsize" class="pf-select">${te}${ne}</select>
      </div>
      <div class="pf-field">
        <span class="pf-field-lbl">정렬</span>
        <div style="display:flex;gap:5px;">${ie}</div>
      </div>
    </div>
    <div class="pf-row2">
      <div class="pf-field" style="margin-bottom:0;">
        <span class="pf-field-lbl">글꼴</span>
        <select id="pf-font" class="pf-select">
          ${zr.map(([e,t])=>b(e,c,t)).join(``)}
        </select>
      </div>
      <div class="pf-field" style="margin-bottom:0;">
        <span class="pf-field-lbl">크기 고정</span>
        <select id="pf-size-fixed" class="pf-select">
          ${b(`0`,l,`사용 안 함`)}${b(`1`,l,`사용`)}
        </select>
      </div>
    </div>
    <div style="margin-top:10px;">
      <div class="pf-field" style="margin-bottom:0;">
        <span class="pf-field-lbl">줄바꿈 허용</span>
        <select id="pf-multiline" class="pf-select">
          ${b(`0`,d,`사용 안 함`)}${b(`1`,d,`사용`)}
        </select>
      </div>
    </div>
  </div>
</div>

<div class="pf-sec">
  <button class="pf-sec-hdr" data-sec="display"><span class="pf-sec-arrow">▾</span> 표시 설정</button>
  <div id="pf-body-display" class="pf-sec-body">
    <div class="pf-row2">
      <div class="pf-field" style="margin-bottom:0;">
        <span class="pf-field-lbl">앞에 붙일 텍스트</span>
        <input id="pf-prefix" type="text" value="${i}" class="pf-input">
      </div>
      <div class="pf-field" style="margin-bottom:0;">
        <span class="pf-field-lbl">뒤에 붙일 텍스트</span>
        <input id="pf-suffix" type="text" value="${a}" class="pf-input">
      </div>
    </div>
  </div>
</div>`,n.body.appendChild(O),this.popupEl=O;let k=e=>O.querySelector(`#${e}`),ue=()=>(y.tagName,y.value),de=e=>{y.tagName,y.value=e};O.querySelector(`#pf-value`).addEventListener(`input`,e=>{let n=e.target.value;if(h){t.setAttribute(J.rawValue,n);let e=t.getAttribute(J.numberFormat)??`none`;de(e===`none`?n:Xr(n,e))}else if(g){t.setAttribute(J.rawValue,n);let e=t.getAttribute(J.dateFormat)??`YYYY-MM-DD`;de(n?Yr(n,e):``)}else de(n)}),k(`pf-prefix`).addEventListener(`input`,e=>{t.setAttribute(J.prefix,e.target.value)}),k(`pf-suffix`).addEventListener(`input`,e=>{t.setAttribute(J.suffix,e.target.value)}),k(`pf-fontsize`).addEventListener(`change`,e=>{let n=e.target.value;t.setAttribute(J.fontSize,n),n===`0`?y.style.fontSize=``:y.style.fontSize=`${n}px`}),k(`pf-font`).addEventListener(`change`,e=>{let n=e.target.value;t.setAttribute(J.fontFamily,n),y.style.fontFamily=n||`inherit`}),k(`pf-size-fixed`).addEventListener(`change`,e=>{let n=e.target.value;t.setAttribute(J.sizeFixed,n),y.style.resize=n===`1`?`none`:y.tagName===`TEXTAREA`?`both`:`horizontal`}),k(`pf-multiline`).addEventListener(`change`,e=>{let r=e.target.value===`1`;if(r===(y.tagName===`TEXTAREA`))return;let i=ue(),a=y.getAttribute(`placeholder`)??``,o=t.getAttribute(J.fieldId)??``;t.setAttribute(J.multiline,r?`1`:`0`);let s=r?this.createTextarea(n,a,o):this.createInput(n,a,o);r&&(s.rows=3);let c=t.getAttribute(J.fontSize)??`0`;s.style.fontSize=c===`0`?`inherit`:`${c}px`;let l=t.getAttribute(J.fontFamily)??``;s.style.fontFamily=l||`inherit`,s.style.textAlign=t.getAttribute(J.textAlign)??`left`;let u=t.getAttribute(J.sizeFixed)??`0`;s.style.resize=u===`1`?`none`:r?`both`:`horizontal`;let d=t.getAttribute(J.dataWidth),f=t.getAttribute(J.dataHeight);d&&(s.style.width=`${d}px`),f&&r&&(s.style.height=`${f}px`),r?s.value=i:s.value=i.replace(/\n/g,` `),y.replaceWith(s),y=s,this.attachResizeObserver(s,t)}),h&&k(`pf-numformat`).addEventListener(`change`,e=>{let n=e.target.value;t.setAttribute(J.numberFormat,n);let r=t.getAttribute(J.rawValue)??``;de(n===`none`?r:Xr(r,n))}),g&&k(`pf-dateformat`).addEventListener(`change`,e=>{let n=e.target.value;t.setAttribute(J.dateFormat,n);let r=t.getAttribute(J.rawValue)??``;r&&de(Yr(r,n));let i=O.querySelector(`#pf-value`);i&&(i.placeholder=Jr[n]??`예) 20261231`)}),O.querySelector(`#pf-width`)?.addEventListener(`change`,e=>{let n=parseInt(e.target.value,10)||60;n=Math.max(60,Math.min(800,n)),e.target.value=String(n),y.style.width=`${n}px`,t.setAttribute(J.dataWidth,String(n))}),oe&&O.querySelector(`#pf-height`)?.addEventListener(`change`,e=>{let n=parseInt(e.target.value,10)||28;n=Math.max(28,Math.min(600,n)),e.target.value=String(n),y.style.height=`${n}px`,t.setAttribute(J.dataHeight,String(n))}),O.querySelectorAll(`.pf-align-btn`).forEach(e=>{e.addEventListener(`click`,()=>{O.querySelectorAll(`.pf-align-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let n=e.dataset.align??`left`;t.setAttribute(J.textAlign,n),y.style.textAlign=n})}),O.querySelectorAll(`.pf-sec-hdr`).forEach(e=>{e.addEventListener(`click`,()=>{let t=O.querySelector(`#pf-body-${e.dataset.sec}`),n=e.querySelector(`.pf-sec-arrow`);if(!t||!n)return;let r=t.style.display!==`none`;t.style.display=r?`none`:`block`,n.textContent=r?`▸`:`▾`})}),O.querySelectorAll(`.pf-move-btn`).forEach(e=>{e.addEventListener(`mousedown`,r=>{r.preventDefault(),r.stopPropagation();let i=e.dataset.dir;if(!i||!t.parentNode)return;let a=t.parentElement,o=a?.tagName===`TD`||a?.tagName===`TH`;switch(i){case`left`:{let e=t.previousSibling;e&&(!o||a?.contains(e))&&(t.parentNode.insertBefore(t,e),this.contentEl?.dispatchEvent(new Event(`input`,{bubbles:!0})));break}case`right`:{let e=t.nextSibling;e&&(!o||a?.contains(e))&&(t.parentNode.insertBefore(e,t),this.contentEl?.dispatchEvent(new Event(`input`,{bubbles:!0})));break}case`up`:{let e=n.createRange();e.setStartBefore(t),e.collapse(!0);let r=n.getSelection();r?.removeAllRanges(),r?.addRange(e),this.contentEl?.focus();break}case`down`:{let e=n.createRange();e.setStartAfter(t),e.collapse(!0);let r=n.getSelection();r?.removeAllRanges(),r?.addRange(e),this.contentEl?.focus();break}}})});let A=k(`pf-close`);A.addEventListener(`mouseenter`,()=>{A.style.background=`#F1F5F9`,A.style.color=`#374151`}),A.addEventListener(`mouseleave`,()=>{A.style.background=`#F8FAFC`,A.style.color=`#94A3B8`}),A.addEventListener(`click`,()=>this.closePopup());let fe=e=>{this.popupEl?.contains(e.target)||(this.closePopup(),n.removeEventListener(`mousedown`,fe))};setTimeout(()=>n.addEventListener(`mousedown`,fe),0),O.querySelector(`#pf-header`).addEventListener(`mousedown`,e=>{if(e.target.closest(`button`))return;e.preventDefault();let t=e.clientX,r=e.clientY,i=parseInt(O.style.left,10),a=parseInt(O.style.top,10),o=e=>{let n=e.clientX-t,o=e.clientY-r,s=Math.max(4,Math.min(i+n,(T?.innerWidth??1920)-320-4)),c=Math.max(4,Math.min(a+o,(T?.innerHeight??1080)-60));O.style.left=`${Math.round(s)}px`,O.style.top=`${Math.round(c)}px`},s=()=>{n.removeEventListener(`mousemove`,o),n.removeEventListener(`mouseup`,s),this.dragCleanup=null};n.addEventListener(`mousemove`,o),n.addEventListener(`mouseup`,s),this.dragCleanup=()=>{n.removeEventListener(`mousemove`,o),n.removeEventListener(`mouseup`,s)}})}closePopup(){this.dragCleanup?.(),this.dragCleanup=null,this.popupEl&&=(this.popupEl.remove(),null)}static exportFields(e){let t=new DOMParser().parseFromString(e,`text/html`);return t.querySelectorAll(`.poa-field`).forEach(e=>{let n=e.getAttribute(`data-label`)??``,r=(e.getAttribute(`data-placeholder`)??``)||n,i=e.getAttribute(`data-prefix`)??``,a=e.getAttribute(`data-suffix`)??``,o=e.getAttribute(`data-width`),s=e.getAttribute(`data-height`),c=e.querySelector(`.poa-field-input`),l=``;l=c?.tagName===`TEXTAREA`?c.textContent?.trim()??``:c?.getAttribute(`value`)?.trim()??``;let u=e.getAttribute(`data-field-type`)??``,d=e.getAttribute(`data-raw-value`)??``,f;f=l===``?r:u===`date`&&d?Yr(d,e.getAttribute(`data-date-format`)??`YYYY-MM-DD`):l;let p=`${i}${f}${a}`;if(o||s){let n=t.createElement(`span`);n.style.display=`inline-block`,o&&(n.style.width=`${o}px`),s&&(n.style.minHeight=`${s}px`),n.textContent=p,e.replaceWith(n)}else e.replaceWith(t.createTextNode(p))}),t.body.innerHTML}},ti=[{id:`text`,label:`텍스트`,placeholder:`$.{text}`,type:`text`,category:`기본`},{id:`number`,label:`숫자`,placeholder:`$.{number}`,type:`number`,category:`기본`,defaultNumberFormat:`none`},{id:`date`,label:`날짜`,placeholder:`$.{date}`,type:`date`,category:`기본`},{id:`doc_number`,label:`계약번호`,placeholder:`$.{doc_number}`,type:`text`,category:`계약`},{id:`contract_name`,label:`계약명`,placeholder:`$.{contract_name}`,type:`text`,category:`계약`},{id:`contract_date`,label:`계약일`,placeholder:`$.{contract_date}`,type:`date`,category:`계약`},{id:`start_date`,label:`계약시작일`,placeholder:`$.{start_date}`,type:`date`,category:`계약`},{id:`end_date`,label:`계약종료일`,placeholder:`$.{end_date}`,type:`date`,category:`계약`},{id:`currency`,label:`통화`,placeholder:`$.{currency}`,type:`text`,category:`계약`},{id:`pay_condition`,label:`지급조건`,placeholder:`$.{pay_condition}`,type:`text`,category:`계약`},{id:`pay_detail`,label:`지급조건상세`,placeholder:`$.{pay_detail}`,type:`text`,category:`계약`},{id:`amount`,label:`계약금액`,placeholder:`$.{amount}`,type:`number`,category:`금액`,defaultNumberFormat:`comma_won`},{id:`supply_price`,label:`공급가액`,placeholder:`$.{supply_price}`,type:`number`,category:`금액`,defaultNumberFormat:`comma_won`},{id:`vat`,label:`부가세`,placeholder:`$.{vat}`,type:`number`,category:`금액`,defaultNumberFormat:`comma_won`},{id:`penalty`,label:`지체상금`,placeholder:`$.{penalty}`,type:`number`,category:`금액`,defaultNumberFormat:`comma_won`},{id:`advance`,label:`선급금 이행 보증률`,placeholder:`$.{advance}`,type:`number`,category:`보증`,defaultNumberFormat:`percent`},{id:`contract_bond`,label:`계약 이행 보증률`,placeholder:`$.{contract_bond}`,type:`number`,category:`보증`,defaultNumberFormat:`percent`},{id:`defect_bond`,label:`하자 이행 보증률`,placeholder:`$.{defect_bond}`,type:`number`,category:`보증`,defaultNumberFormat:`percent`},{id:`warranty_end`,label:`하자보증기간 종류`,placeholder:`$.{warranty_end}`,type:`text`,category:`보증`},{id:`warranty_period`,label:`하자보증기간`,placeholder:`$.{warranty_period}`,type:`text`,category:`보증`},{id:`warranty_unit`,label:`하자보증기간 단위`,placeholder:`$.{warranty_unit}`,type:`text`,category:`보증`},{id:`remark`,label:`비고`,placeholder:`$.{remark}`,type:`text`,category:`기타`}],ni=Object.fromEntries(ti.map(e=>[e.id,e])),ri=[{id:`A3`,label:`A3`,widthPx:1123,heightPx:1587,widthMm:297,heightMm:420},{id:`A4`,label:`A4`,widthPx:794,heightPx:1123,widthMm:210,heightMm:297},{id:`A5`,label:`A5`,widthPx:559,heightPx:794,widthMm:148,heightMm:210},{id:`B4`,label:`B4`,widthPx:945,heightPx:1335,widthMm:250,heightMm:353},{id:`B5`,label:`B5`,widthPx:665,heightPx:945,widthMm:176,heightMm:250},{id:`Letter`,label:`Letter`,widthPx:816,heightPx:1056,widthMm:215.9,heightMm:279.4},{id:`Legal`,label:`Legal`,widthPx:816,heightPx:1344,widthMm:215.9,heightMm:355.6}],ii={top:25,right:30,bottom:25,left:30},ai=3.7795,oi=class e{currentSize;currentZoom;currentMargin;static ZOOM_MIN=50;static ZOOM_MAX=200;static ZOOM_STEP=10;static STORAGE_KEY_SIZE=`poa-paper-size`;static STORAGE_KEY_ZOOM=`poa-editor-zoom`;static STORAGE_KEY_MARGIN=`poa-paper-margin`;constructor(e,t){this.editableArea=e,this.wrapperEl=t,this.currentSize=ri.find(e=>e.id===`A4`),this.currentZoom=100,this.currentMargin={...ii}}init(){try{let t=localStorage.getItem(e.STORAGE_KEY_SIZE);if(t){let e=ri.find(e=>e.id===t);e&&(this.currentSize=e)}let n=localStorage.getItem(e.STORAGE_KEY_ZOOM);if(n){let t=parseInt(n,10);isNaN(t)||(this.currentZoom=Math.min(e.ZOOM_MAX,Math.max(e.ZOOM_MIN,t)))}let r=localStorage.getItem(e.STORAGE_KEY_MARGIN);if(r){let e=JSON.parse(r);this.currentMargin={...ii,...e}}}catch{}this.applyToEditor()}setPaperSize(e){let t=ri.find(t=>t.id===e);t&&(this.currentSize=t,this.applyToEditor())}setZoom(t){let n=Math.round(t/e.ZOOM_STEP)*e.ZOOM_STEP;this.currentZoom=Math.min(e.ZOOM_MAX,Math.max(e.ZOOM_MIN,n)),this.applyToEditor()}setMargin(e){this.currentMargin={...this.currentMargin,...e},this.applyToEditor()}zoomIn(){this.setZoom(this.currentZoom+e.ZOOM_STEP)}zoomOut(){this.setZoom(this.currentZoom-e.ZOOM_STEP)}resetZoom(){this.setZoom(100)}getSize(){return this.currentSize}getZoom(){return this.currentZoom}getMargin(){return{...this.currentMargin}}applyToEditor(){let{widthPx:t,heightPx:n}=this.currentSize,r=this.currentZoom/100,{top:i,right:a,bottom:o,left:s}=this.currentMargin,c=Math.round(i*ai),l=Math.round(a*ai),u=Math.round(o*ai),d=Math.round(s*ai);this.editableArea.style.width=`${t}px`,this.editableArea.style.minHeight=`${n}px`,this.editableArea.style.height=`auto`,this.editableArea.style.padding=`${c}px ${l}px ${u}px ${d}px`,this.editableArea.style.boxSizing=`border-box`,this.editableArea.style.overflowY=`visible`,this.editableArea.style.overflowX=`visible`,this.editableArea.style.flex=`0 0 auto`,this.editableArea.style.transform=`scale(${r})`,this.editableArea.style.transformOrigin=`top center`,this.editableArea.style.margin=`0 auto`,this.editableArea.style.background=`var(--poa-editor-bg, #fff)`,this.wrapperEl.style.background=`#e5e5e5`,this.wrapperEl.style.padding=`20px`,this.wrapperEl.style.overflowY=`auto`,this.wrapperEl.style.overflowX=`auto`,this.wrapperEl.style.display=`flex`,this.wrapperEl.style.flexDirection=`column`,this.wrapperEl.style.alignItems=`center`,this.wrapperEl.style.justifyContent=`flex-start`;try{localStorage.setItem(e.STORAGE_KEY_SIZE,this.currentSize.id),localStorage.setItem(e.STORAGE_KEY_ZOOM,String(this.currentZoom)),localStorage.setItem(e.STORAGE_KEY_MARGIN,JSON.stringify(this.currentMargin))}catch{}this.wrapperEl.dispatchEvent(new CustomEvent(`paper-change`,{bubbles:!0,detail:{size:this.currentSize,zoom:this.currentZoom,margin:this.currentMargin}}))}};function si(){return new URLSearchParams(window.location.search).get(`mode`)===`user`?`user`:`admin`}function ci(){return new URLSearchParams(window.location.search).get(`template`)}function li(){let{origin:e,pathname:t}=window.location,n=e+t.replace(/\/index\.html$/,`/`).replace(/\/[^/]*\.[^/]*$/,`/`);return n.endsWith(`/`)?n:n+`/`}function ui(e){return li()+`?mode=user&template=`+encodeURIComponent(e)}var di=`poa-templates`;function fi(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`}var pi=[{name:`공지사항 기본 양식`,content:`<h2>공지사항</h2><p><strong>제목:</strong>&nbsp;</p><p><strong>내용:</strong>&nbsp;</p><p><strong>담당자:</strong>&nbsp;</p><p><strong>날짜:</strong>&nbsp;</p>`},{name:`회의록 양식`,content:`<h2>회의록</h2><p><strong>일시:</strong>&nbsp;</p><p><strong>장소:</strong>&nbsp;</p><p><strong>참석자:</strong>&nbsp;</p><hr><h3>안건</h3><ol><li></li></ol><h3>결정사항</h3><ol><li></li></ol><h3>다음 회의</h3><p>&nbsp;</p>`},{name:`주간 보고서 양식`,content:`<h2>주간 보고서</h2><p><strong>기간:</strong>&nbsp;</p><p><strong>작성자:</strong>&nbsp;</p><hr><h3>이번 주 완료 업무</h3><ul><li></li></ul><h3>다음 주 계획</h3><ul><li></li></ul><h3>이슈 및 건의사항</h3><p>&nbsp;</p>`}],mi=class{nodes=[];constructor(){this._load(),this.nodes.length===0&&this._seed()}_load(){try{let e=localStorage.getItem(di);this.nodes=e?JSON.parse(e):[]}catch{this.nodes=[]}this._cleanTemp()}_cleanTemp(){let e=Date.now()-1440*60*1e3,t=this.nodes.length;this.nodes=this.nodes.filter(t=>t.type===`template`?!(t.name.startsWith(`임시_`)||t.isTemp&&t.createdAt<e):!0),this.nodes.length!==t&&this._persist()}_persist(){try{localStorage.setItem(di,JSON.stringify(this.nodes))}catch{this._evict();try{localStorage.setItem(di,JSON.stringify(this.nodes))}catch{}}}_evict(){let e=this.nodes.filter(e=>e.type===`template`).sort((e,t)=>e.updatedAt-t.updatedAt)[0];e&&(this.nodes=this.nodes.filter(t=>t.id!==e.id))}_seed(){let e={id:fi(),type:`folder`,name:`공용 템플릿`,parentId:null,isPublic:!0,createdAt:Date.now(),updatedAt:Date.now(),order:0},t={id:fi(),type:`folder`,name:`내 템플릿`,parentId:null,isPublic:!1,createdAt:Date.now(),updatedAt:Date.now(),order:1};this.nodes.push(e,t),pi.forEach((t,n)=>{let r=String(M.sanitize(t.content,{USE_PROFILES:{html:!0}}));this.nodes.push({id:fi(),type:`template`,name:t.name,parentId:e.id,content:r,isPublic:!0,createdAt:Date.now(),updatedAt:Date.now(),order:n})}),this._persist()}getAll(){return[...this.nodes]}getById(e){return this.nodes.find(t=>t.id===e)??null}getChildren(e){return this.nodes.filter(t=>t.parentId===e).sort((e,t)=>e.order-t.order||e.name.localeCompare(t.name))}getRoots(){return this.getChildren(null)}getFolders(){return this.nodes.filter(e=>e.type===`folder`)}addFolder(e,t,n=!1){let r={id:fi(),type:`folder`,name:e,parentId:t,isPublic:n,createdAt:Date.now(),updatedAt:Date.now(),order:this.getChildren(t).length};return this.nodes.push(r),this._persist(),r}addTemplate(e,t,n,r=!1,i=!1){let a=String(M.sanitize(t,{USE_PROFILES:{html:!0}})),o={id:fi(),type:`template`,name:e,parentId:n,content:a,isPublic:r,...i?{isTemp:!0}:{},createdAt:Date.now(),updatedAt:Date.now(),order:this.getChildren(n).length};return this.nodes.push(o),this._persist(),o}rename(e,t){let n=this.nodes.find(t=>t.id===e);return!n||!t.trim()?!1:(n.name=t.trim(),n.updatedAt=Date.now(),this._persist(),!0)}delete(e){for(let t of this.getChildren(e))this.delete(t.id);this.nodes=this.nodes.filter(t=>t.id!==e),this._persist()}move(e,t){let n=this.nodes.find(t=>t.id===e);return!n||this._isDescendant(t,e)?!1:(n.parentId=t,n.order=this.getChildren(t).filter(t=>t.id!==e).length,n.updatedAt=Date.now(),this._persist(),!0)}_isDescendant(e,t){if(e===null)return!1;if(e===t)return!0;let n=this.nodes.find(t=>t.id===e);return n?this._isDescendant(n.parentId,t):!1}},hi=2,gi=new Set([`p`,`div`,`h1`,`h2`,`h3`,`h4`,`h5`,`h6`,`li`,`blockquote`,`pre`]);function _i(e){return!e||e===`inherit`?e:e.split(`,`).map(e=>{let t=e.trim().replace(/^['"](.*)['"]\s*$/,`$1`);return/\s/.test(t)?`"${t}"`:t}).join(`, `)}var vi=class e extends HTMLElement{shadow;core;contentEl;toolbar;statusBar;savedRange=null;clipboardHandler;findReplace;imageInserter;fileManager;autoSave;findDialog;imageDialog;imageInsertDialog;settingsDialog;tableDialog;cellSplitDialog;cellMerger;tableNavigator;tableResizer;tableSelector;tableHandle;tableContextMenu;linkInserter;bookmarkManager;linkDialog;imageResizer;imageToolbar;imgContextMenu=null;linkContextMenu=null;viewManager;tableWholeResizer;tableInlineToolbar;formatPainter;listManager;toast;confirmDialog;accessibilityDialog;privacyDialog;formulaDialog;formulaManager;formulaPickMode=!1;videoDialog;videoInserter;formControlDialog;formControlInserter;formControlEditor;templateDialog;signatureDialog;emojiDialog;tooltipDialog;inputPropertyDialog;emojiInserter;tooltipManager;fieldInserter;paperSizeManager;scrollContainer=null;selectedTable=null;previousMenuTab=`edit`;inTableContext=!1;pendingStyles=new Map;pendingStylesJustSet=!1;selectionHandler=()=>{this.pendingStyles.size>0&&(this.pendingStylesJustSet?this.pendingStylesJustSet=!1:this.pendingStyles.clear()),this.syncToolbar()};constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`
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
<poa-input-property-dialog></poa-input-property-dialog>`,this.contentEl=this.querySelector(`.poa-editor-content`)??document.createElement(`div`),this.contentEl.className=`poa-editor-content`,this.contentEl.setAttribute(`slot`,`content`),this.contentEl.setAttribute(`role`,`textbox`),this.contentEl.setAttribute(`aria-multiline`,`true`),this.contentEl.setAttribute(`spellcheck`,`true`),this.contentEl.style.cssText=[`flex: 1`,`overflow-y: auto`,`overflow-x: hidden`,`padding: 16px 20px`,`outline: none`,`line-height: 1.6`,`min-height: 200px`,`box-sizing: border-box`,`position: relative`,`color: var(--poa-editor-color, #222)`,`background: var(--poa-editor-bg, #fff)`,`font-size: 14px`,`font-family: var(--poa-editor-font, '맑은 고딕', 'Malgun Gothic', sans-serif)`].join(`; `),this.contentEl.parentElement||this.appendChild(this.contentEl),e.injectContentStyles(),this.toolbar=this.shadow.querySelector(`poa-toolbar`),this.statusBar=this.shadow.querySelector(`poa-status-bar`),this.findDialog=this.shadow.querySelector(`poa-find-replace-dialog`),this.imageDialog=this.shadow.querySelector(`poa-image-edit-dialog`),this.imageInsertDialog=this.shadow.querySelector(`poa-image-dialog`),this.settingsDialog=this.shadow.querySelector(`poa-settings-dialog`),this.tableDialog=this.shadow.querySelector(`poa-table-dialog`),this.cellSplitDialog=this.shadow.querySelector(`poa-cell-split-dialog`),this.linkDialog=this.shadow.querySelector(`poa-link-dialog`),this.imageToolbar=this.shadow.querySelector(`poa-image-toolbar`),this.confirmDialog=this.shadow.querySelector(`poa-confirm-dialog`),this.accessibilityDialog=this.shadow.querySelector(`poa-accessibility-dialog`),this.accessibilityDialog.setup(this.contentEl,()=>this.runAccessibilityCheck()),this.privacyDialog=this.shadow.querySelector(`poa-privacy-dialog`),this.privacyDialog.setup(()=>{this.core.captureHistory(`privacyEdit`),this.statusBar.update(this.contentEl.innerHTML)},e=>this.confirmDialog.show(e)),this.formulaManager=new fr,this.formulaDialog=this.shadow.querySelector(`poa-formula-dialog`),this.videoInserter=new vr(this.contentEl),this.videoDialog=this.shadow.querySelector(`poa-video-dialog`),this.formControlInserter=new wr(this.contentEl),this.formControlEditor=new Dr(this.contentEl),this.formControlEditor.attach(),this.formControlDialog=this.shadow.querySelector(`poa-form-control-dialog`),this.templateDialog=this.shadow.querySelector(`poa-template-dialog`),this.templateDialog.setup(()=>this.getHTML()),this.signatureDialog=this.shadow.querySelector(`poa-signature-dialog`),this.emojiDialog=this.shadow.querySelector(`poa-emoji-dialog`),this.tooltipDialog=this.shadow.querySelector(`poa-tooltip-dialog`),this.emojiInserter=new Nr,this.inputPropertyDialog=this.shadow.querySelector(`poa-input-property-dialog`),this.tooltipManager=new Fr(this.contentEl),Fr.injectStyles(),Fr.attachHoverPopup(this.contentEl),this.fieldInserter=new ei,this.fieldInserter.attach(this.contentEl),this.toast=new Ln,this.imageInsertDialog.setOnError(e=>this.toast.show(e,`error`));let t=this.getAttribute(`placeholder`)??``;t&&(this.contentEl.dataset.placeholder=t);let n=this.hasAttribute(`readonly`);this.core=new Le({placeholder:t,readonly:n,onHistoryPush:()=>this.syncToolbar()}),this.core.mount(this.contentEl),this.imageInserter=new it(this.contentEl),this.linkInserter=new on(this.contentEl),this.bookmarkManager=new cn(this.contentEl),this.imageResizer=new dn(this.contentEl,{onActivate:e=>{this.deselectTable(),this.imageToolbar.show(e)},onResize:e=>{this.imageToolbar.update(e)},onResizeEnd:()=>{this.core.captureHistory(`imageResize`),this.statusBar.update(this.contentEl.innerHTML)},onDeactivate:()=>{this.imageToolbar.hide(),this.hideImgContextMenu()},onContextMenu:(e,t,n)=>{this.showImgContextMenu(e,t,n)}}),this.imageResizer.attach(),this.viewManager=new Cn(this.contentEl,{onViewChange:e=>{P.emit(F.VIEW_CHANGE,{mode:e})},getBookmarks:()=>this.bookmarkManager.getAll()}),this.viewManager.attach();let r=this.viewManager.getScrollContainer();r&&(this.scrollContainer=r,this.paperSizeManager=new oi(this.contentEl,r),this.paperSizeManager.init(),r.addEventListener(`paper-change`,e=>{this.statusBar.syncPaper(e)})),this.tableWholeResizer=new Dn(this.contentEl,{onResizeEnd:()=>{this.core.captureHistory(`tableWholeResize`),this.statusBar.update(this.contentEl.innerHTML),this.tableInlineToolbar.syncPosition()}}),this.tableInlineToolbar=new On({onApply:()=>{this.core.captureHistory(`tableResize`),this.statusBar.update(this.contentEl.innerHTML),this.tableWholeResizer.syncHandles()}}),this.formatPainter=new jn(this.contentEl,{onModeChange:e=>{this.contentEl.style.cursor=e?`crosshair`:``}}),this.listManager=new Fn(this.contentEl),this.fileManager=new st,this.autoSave=new It,this.settingsDialog.setAutoSave(this.autoSave),this.settingsDialog.setFileManager(this.fileManager),this.autoSave.start(()=>this.contentEl.innerHTML),this.cellMerger=new W,this.cellMerger.attach(this.contentEl),this.tableSelector=new qt(this.cellMerger),this.tableSelector.attach(this.contentEl);let i=()=>{this.core.captureHistory(`tableModified`),this.statusBar.update(this.contentEl.innerHTML)},a={onMerge:()=>{let e=this.cellMerger.getSelectedCells(),t=this.cellMerger.getSelectedTable();if(!e.length||!t)return{success:!1,message:`선택된 셀이 없습니다.`};let n=W.mergeCells(e,t);return n.success&&this.cellMerger.clearSelection(),n},onSplitH:(e,t)=>W.splitCellHorizontal(e,t),onSplitV:(e,t)=>W.splitCellVertical(e,t),onOpenTableProps:e=>this.tableDialog.open(e),onModified:i,onError:e=>this.toast.show(e,`error`)};this.tableNavigator=new zt(a,{noMenu:!0}),this.tableNavigator.attach(this.contentEl);let o={onMerge:a.onMerge,onSplitCell:e=>this.cellSplitDialog.open(e),onOpenTableProps:a.onOpenTableProps,onModified:i,canMerge:()=>this.tableSelector.canMerge,getSelectedCells:()=>this.tableSelector.getCellSelection(),onError:e=>this.toast.show(e,`error`)};this.tableContextMenu=new Yt(this.tableNavigator,o),this.tableContextMenu.attach(this.contentEl),this.tableResizer=new Kt(i),this.tableResizer.attach(this.contentEl),this.tableHandle=new Jt(e=>{this.cellMerger.clearSelection();for(let t of Array.from(e.querySelectorAll(`td, th`)))t.classList.add(`poa-cell-selected`)}),this.tableHandle.attach(this.contentEl),this.clipboardHandler=new tt(this.contentEl,{onPaste:()=>{this.core.captureHistory(`paste`),this.statusBar.update(this.contentEl.innerHTML)},onPasteImage:()=>{this.core.captureHistory(`pasteImage`),this.statusBar.update(this.contentEl.innerHTML)}}),this.clipboardHandler.register(),this.findReplace=new nt(this.contentEl),this.shadow.addEventListener(`poa-formula-apply`,e=>{let{formula:t,table:n}=e.detail,r=this.formulaManager.applyFormula(n,t);r===`circular`?this.toast.show(`순환 참조가 발견됐습니다. (#REF!)`,`error`):r===`invalid`?this.toast.show(`대상 셀을 찾을 수 없습니다.`,`error`):(this.core.captureHistory(`formulaApply`),this.statusBar.update(this.contentEl.innerHTML))}),this.shadow.addEventListener(`poa-formula-start-pick`,()=>{this.formulaPickMode=!0,this.contentEl.addEventListener(`mouseup`,()=>{if(!this.formulaPickMode)return;this.formulaPickMode=!1;let e=this.tableSelector.getCellSelection(),t=e[0]?.closest(`table`);if(t&&e.length>0){let n=fr.getSelectionBounds(t,e);n&&this.formulaDialog.applyRange(...n)}},{once:!0})}),this.shadow.addEventListener(`poa-action`,e=>{this.handleAction(e).catch(e=>{console.error(`[poa-editor] handleAction 오류:`,e)})}),this.shadow.addEventListener(`poa-find-search`,e=>{let{query:t,caseSensitive:n,wholeWord:r}=e.detail,i=this.findReplace.find(t,{caseSensitive:n,wholeWord:r});this.findDialog.updateResult(i.count,i.current)}),this.shadow.addEventListener(`poa-find-next`,()=>{let e=this.findReplace.next();this.findDialog.updateResult(e.count,e.current)}),this.shadow.addEventListener(`poa-find-prev`,()=>{let e=this.findReplace.prev();this.findDialog.updateResult(e.count,e.current)}),this.shadow.addEventListener(`poa-find-replace`,e=>{let{replacement:t}=e.detail,n=this.findReplace.replaceCurrent(t);this.core.captureHistory(`replace`),this.findDialog.updateResult(n.count,n.current),n.replaced&&this.toast.show(`바꿨습니다.`,`success`,1500)}),this.shadow.addEventListener(`poa-find-replace-all`,e=>{let{query:t,replacement:n,caseSensitive:r,wholeWord:i}=e.detail,a=this.findReplace.replaceAll(t,n,{caseSensitive:r,wholeWord:i});this.core.captureHistory(`replaceAll`),this.findDialog.updateResult(0,-1),this.statusBar.update(this.contentEl.innerHTML),a>0?this.toast.show(`${a}개 항목을 바꿨습니다.`,`success`):this.toast.show(`바꿀 항목이 없습니다.`,`info`)}),this.shadow.addEventListener(`poa-find-clear`,()=>{this.findReplace.clearMarks()}),this.shadow.addEventListener(`poa-video-insert`,e=>{let{html:t}=e.detail;this.videoInserter.insert(t),this.core.captureHistory(`videoInsert`),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener(`poa-form-insert`,e=>{let{config:t}=e.detail,n=this.formControlEditor.getSelected();if(n){let e=this.formControlInserter.buildElement(t);e&&n.replaceWith(e),this.formControlEditor.deselect()}else this.restoreSelection(),this.formControlInserter.insert(t);this.core.captureHistory(`formControlInsert`),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener(`poa-signature-insert`,e=>{let{html:t}=e.detail;this.restoreSelection();let n=this.contentEl.ownerDocument.getSelection();if(n&&n.rangeCount>0){let e=n.getRangeAt(0);e.deleteContents();let r=e.createContextualFragment(t);e.insertNode(r),e.collapse(!1)}else this.contentEl.insertAdjacentHTML(`beforeend`,t);this.core.captureHistory(`signatureInsert`),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener(`poa-emoji-insert`,e=>{let{emoji:t}=e.detail;this.emojiInserter.insert(t,this.contentEl),this.core.captureHistory(`emojiInsert`),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener(`poa-tooltip-insert`,e=>{let{title:t,content:n}=e.detail;!this.savedRange||!this.contentEl.contains(this.savedRange.startContainer)||(this.tooltipManager.insert(t,n,this.savedRange.cloneRange()),this.savedRange=null,this.core.captureHistory(`tooltipInsert`),this.statusBar.update(this.contentEl.innerHTML))}),this.shadow.addEventListener(`poa-tooltip-update`,e=>{let{id:t,title:n,content:r}=e.detail;this.tooltipManager.update(t,n,r),this.core.captureHistory(`tooltipUpdate`)}),this.shadow.addEventListener(`poa-tooltip-remove`,e=>{let{id:t}=e.detail;this.tooltipManager.remove(t),this.core.captureHistory(`tooltipRemove`),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener(`poa-tooltip-remove-all`,()=>{this.tooltipManager.removeAll(),this.core.captureHistory(`tooltipRemoveAll`),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener(`poa-tmpl-insert`,e=>{let{html:t,mode:n}=e.detail;if(n===`replace`)this.confirmDialog.show(`현재 내용이 모두 교체됩니다. 계속할까요?`).then(e=>{e&&(this.setHTML(t),this.core.captureHistory(`templateReplace`),this.templateDialog.close())});else{this.restoreSelection();let e=this.contentEl.ownerDocument.getSelection();if(e&&e.rangeCount>0){let n=e.getRangeAt(0);n.deleteContents();let r=n.createContextualFragment(t);n.insertNode(r),n.collapse(!1)}else this.contentEl.insertAdjacentHTML(`beforeend`,t);this.core.captureHistory(`templateAppend`),this.statusBar.update(this.contentEl.innerHTML)}}),this.contentEl.addEventListener(`poa-form-contextmenu`,e=>{let{el:t}=e.detail,n=this.formControlEditor.getConfig(t);n&&this.formControlDialog.open(n)}),this.contentEl.addEventListener(`poa-input-contextmenu`,e=>{let{el:t}=e.detail;this.inputPropertyDialog.open(t)}),this.addEventListener(`poa-input-props-apply`,()=>{this.core.captureHistory(`inputPropsEdit`),this.statusBar.update(this.contentEl.innerHTML)}),this.contentEl.addEventListener(`poa-input-resized`,()=>{this.core.captureHistory(`inputResize`),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener(`poa-image-insert`,e=>{let{attrs:t}=e.detail;try{this.imageInserter.insertFromUrl(t),this.core.captureHistory(`insertImage`),this.statusBar.update(this.contentEl.innerHTML),this.checkAltWarning()}catch{}}),this.shadow.addEventListener(`poa-img-size-change`,e=>{let{width:t,height:n}=e.detail,r=this.imageResizer.getActiveImage();r&&(r.style.width=`${t}px`,r.style.height=`${n}px`,this.imageResizer.syncOverlay(),this.core.captureHistory(`imageResize`),this.statusBar.update(this.contentEl.innerHTML))}),this.shadow.addEventListener(`poa-img-reset-size`,()=>{let e=this.imageResizer.getActiveImage();e&&(e.style.width=e.naturalWidth?`${e.naturalWidth}px`:``,e.style.height=e.naturalHeight?`${e.naturalHeight}px`:``,this.imageResizer.syncOverlay(),this.imageToolbar.update(e),this.core.captureHistory(`imageResize`),this.statusBar.update(this.contentEl.innerHTML))}),this.shadow.addEventListener(`poa-link-insert`,e=>{let{attrs:t}=e.detail;try{this.linkInserter.insertLink(t),this.core.captureHistory(`insertLink`),this.statusBar.update(this.contentEl.innerHTML)}catch{}}),this.shadow.addEventListener(`poa-link-update`,e=>{let{anchor:t,attrs:n}=e.detail;try{this.linkInserter.updateLink(t,n),this.core.captureHistory(`updateLink`),this.statusBar.update(this.contentEl.innerHTML)}catch{}}),this.shadow.addEventListener(`poa-bookmark-link-insert`,e=>{let{bookmarkId:t,text:n}=e.detail;try{this.linkInserter.insertLink({href:`#${t}`,text:n,target:`_self`}),this.core.captureHistory(`insertBookmarkLink`),this.statusBar.update(this.contentEl.innerHTML)}catch{}}),this.shadow.addEventListener(`poa-bookmark-create`,e=>{let{label:t}=e.detail;this.bookmarkManager.insert(t),this.core.captureHistory(`insertBookmark`),this.statusBar.update(this.contentEl.innerHTML),this.linkDialog.setBookmarks(this.bookmarkManager.getAll())}),this.shadow.addEventListener(`poa-bookmark-update`,e=>{let{id:t,label:n}=e.detail;try{this.bookmarkManager.update(t,n),this.core.captureHistory(`updateBookmark`),this.linkDialog.setBookmarks(this.bookmarkManager.getAll())}catch{}}),this.shadow.addEventListener(`poa-bookmark-delete`,e=>{let{id:t}=e.detail;this.bookmarkManager.remove(t),this.core.captureHistory(`deleteBookmark`),this.statusBar.update(this.contentEl.innerHTML),this.linkDialog.setBookmarks(this.bookmarkManager.getAll())}),this.shadow.addEventListener(`poa-datetime-insert`,e=>{let{text:t}=e.detail,n=this.contentEl.ownerDocument,r=n.getSelection();if(!r||r.rangeCount===0)return;let i=r.getRangeAt(0);i.deleteContents(),i.insertNode(n.createTextNode(t)),i.collapse(!1),r.removeAllRanges(),r.addRange(i),this.core.captureHistory(`insertDatetime`),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener(`poa-image-edit-confirm`,e=>{let{original:t,edited:n,attrs:r}=e.detail;this.contentEl.querySelectorAll(`img`).forEach(e=>{(e.src===t||e.getAttribute(`src`)===t)&&(n!==t&&(e.src=n),r&&(r.alt!==void 0&&(e.alt=r.alt),r.title!==void 0&&(e.title=r.title),r.width&&(e.style.width=r.width),r.height&&(e.style.height=r.height),r.border&&(e.style.border=r.border),(r.align===`left`||r.align===`right`)&&(e.style.float=r.align),r.id&&(e.id=r.id),r.className&&(e.className=r.className)))}),this.core.captureHistory(`imageEdit`),this.checkAltWarning()}),this.shadow.addEventListener(`poa-table-insert`,e=>{let{options:t,presetId:n}=e.detail,r=Rt.build(t,this.contentEl.ownerDocument);n&&nn(n,r),this.restoreSelection(),Rt.insert(r,this.contentEl),this.core.captureHistory(`insertTable`),this.statusBar.update(this.contentEl.innerHTML)}),this.shadow.addEventListener(`poa-cell-split`,e=>{let{cell:t,cols:n,rows:r}=e.detail,a=t.closest(`table`);a&&(W.splitCell(t,a,n,r),i())}),this.shadow.addEventListener(`poa-table-update`,e=>{let{options:t,table:n}=e.detail;Rt.applyOptions(n,t),this.core.captureHistory(`tableUpdate`),this.statusBar.update(this.contentEl.innerHTML)}),this.contentEl.addEventListener(`mousedown`,e=>{let t=this.findTableNode(e.target);t?(this.selectTable(t),this.imageResizer.getActiveImage()&&this.imageResizer.deactivate()):this.deselectTable();let n=t!==null;n&&!this.inTableContext?(this.inTableContext=!0,P.emit(F.MENUBAR_CHANGE,{tab:`table`})):!n&&this.inTableContext&&(this.inTableContext=!1,P.emit(F.MENUBAR_CHANGE,{tab:this.previousMenuTab}))}),this.contentEl.addEventListener(`dblclick`,e=>{let t=e.target;if(t.tagName===`IMG`&&!t.dataset.dir){let e=t;this.imageDialog.open(e.src,{alt:e.alt,title:e.title||void 0,width:e.style.width||void 0,height:e.style.height||void 0,border:e.style.border||void 0,align:e.style.float||void 0,id:e.id||void 0,className:e.className||void 0})}}),this.contentEl.addEventListener(`click`,e=>{let t=e.target.closest(`.poa-page-break`);if(t){e.preventDefault();let n=this.contentEl.ownerDocument,r=t.nextElementSibling,i=n.createRange();if(r)i.setStart(r,0);else{let e=n.createElement(`p`);e.appendChild(n.createElement(`br`)),t.after(e),i.setStart(e,0)}i.collapse(!0);let a=n.getSelection();a?.removeAllRanges(),a?.addRange(i);return}let n=e.target.closest(`a[href]:not(.poa-bookmark)`);n&&(e.preventDefault(),this.linkInserter.saveSelection(),this.bookmarkManager.saveSelection(),this.linkDialog.setBookmarks(this.bookmarkManager.getAll()),this.linkDialog.open(`link`,n))}),this.contentEl.addEventListener(`contextmenu`,e=>{let t=e.target.closest(`a[href]:not(.poa-bookmark)`);t&&(e.preventDefault(),e.stopPropagation(),this.showLinkContextMenu(t,e.clientX,e.clientY))}),this.contentEl.addEventListener(`keydown`,e=>{if((e.ctrlKey||e.metaKey)&&e.key===`f`){e.preventDefault(),this.findDialog.open(`find`);return}if((e.ctrlKey||e.metaKey)&&e.key===`h`){e.preventDefault(),this.findDialog.open(`replace`);return}if((e.ctrlKey||e.metaKey)&&(e.key===`=`||e.key===`+`)){e.preventDefault(),this.paperSizeManager?.zoomIn();return}if((e.ctrlKey||e.metaKey)&&e.key===`-`){e.preventDefault(),this.paperSizeManager?.zoomOut();return}if((e.ctrlKey||e.metaKey)&&e.key===`0`){e.preventDefault(),this.paperSizeManager?.resetZoom();return}this.formatPainter.handleKeydown(e),e.key===`Tab`&&this.listManager.handleTab(e)}),document.addEventListener(`selectionchange`,this.selectionHandler),this.contentEl.addEventListener(`blur`,()=>{let e=this.getActualRange();e&&this.contentEl.contains(e.startContainer)&&(this.savedRange=e)}),this.shadow.addEventListener(`mousedown`,e=>{if(this.contentEl.contains(e.target))return;let t=this.getActualRange();t&&this.contentEl.contains(t.startContainer)&&(this.savedRange=t.cloneRange())},!0);let s=()=>{let e=this.getActualRange();e&&this.contentEl.contains(e.startContainer)&&(this.savedRange=e)};this.contentEl.addEventListener(`mouseup`,s),this.contentEl.addEventListener(`mouseup`,()=>this.formatPainter.handleMouseUp()),this.contentEl.addEventListener(`keyup`,s),this.contentEl.addEventListener(`input`,()=>{this.statusBar.update(this.contentEl.innerHTML),this.fileManager.markDirty()}),this.contentEl.addEventListener(`beforeinput`,e=>{if(this.pendingStyles.size===0||e.inputType!==`insertText`||!e.data)return;e.preventDefault();let t=this.contentEl.ownerDocument,n=t.getSelection();if(!n||n.rangeCount===0){this.pendingStyles.clear();return}let r=n.getRangeAt(0);r.deleteContents();let i=t.createElement(`span`);this.pendingStyles.forEach((e,t)=>i.style.setProperty(t,e)),i.textContent=e.data,r.insertNode(i),r.setStart(i.firstChild,e.data.length),r.collapse(!0),n.removeAllRanges(),n.addRange(r),this.pendingStyles.clear(),this.statusBar.update(this.contentEl.innerHTML),this.fileManager.markDirty(),this.contentEl.dispatchEvent(new InputEvent(`input`,{bubbles:!0}))}),this.shadow.addEventListener(`poa-file-new`,()=>{(async()=>{this.fileManager.isDirty()&&!await this.confirmDialog.show(`저장되지 않은 변경사항이 있습니다. 계속할까요?`)||(this.fileManager.newDocument(),this.setHTML(``),this.core.captureHistory(`fileNew`))})()}),this.shadow.addEventListener(`poa-file-open`,()=>{this.fileManager.openFile().then(e=>{e&&(this.setHTML(e.html),this.core.captureHistory(`fileOpen`))})}),this.shadow.addEventListener(`poa-file-save`,()=>{this.fileManager.saveFile(this.getExportHTML())}),this.shadow.addEventListener(`poa-file-saveas`,()=>{this.fileManager.saveAsFile(this.getExportHTML())}),this.shadow.addEventListener(`poa-autosave-restore`,e=>{let{html:t}=e.detail;this.setHTML(t),this.core.captureHistory(`autoSaveRestore`)}),P.on(F.MENUBAR_CHANGE,({tab:e})=>{e!==`table`&&(this.previousMenuTab=e)}),this.statusBar.update(this.contentEl.innerHTML),this.syncToolbar()}disconnectedCallback(){document.removeEventListener(`selectionchange`,this.selectionHandler),this.clipboardHandler.unregister(),this.findReplace.clearMarks(),this.autoSave.stop(),this.fileManager.destroy(),this.cellMerger.detach(),this.tableSelector.detach(),this.tableNavigator.detach(),this.tableContextMenu.detach(),this.tableResizer.detach(),this.tableHandle.detach(),this.imageResizer.detach(),this.viewManager.detach(),this.tableWholeResizer.detach(),this.tableInlineToolbar.hide(),this.deselectTable(),this.hideImgContextMenu(),this.hideLinkContextMenu(),nr.removeHighlights(this.contentEl),this.formulaManager.detachAll(),this.formControlEditor.detach(),this.fieldInserter.detach(),this.core.unmount()}getHTML(){I(this.contentEl);let e=this.contentEl.cloneNode(!0);return e.querySelectorAll(`[data-poa-temp]`).forEach(e=>e.remove()),M.sanitize(e.innerHTML)}getExportHTML(){this.contentEl.querySelectorAll(`input.poa-field-input`).forEach(e=>{e.value&&e.setAttribute(`value`,e.value)});let e=this.contentEl.cloneNode(!0),t=Array.from(this.contentEl.querySelectorAll(`textarea.poa-field-input`)),n=Array.from(e.querySelectorAll(`textarea.poa-field-input`));return t.forEach((e,t)=>{n[t]&&(n[t].textContent=e.value)}),e.querySelectorAll(`[data-poa-temp]`).forEach(e=>e.remove()),ei.exportFields(M.sanitize(e.innerHTML,{ADD_ATTR:[`data-field-id`,`data-placeholder`,`data-label`,`data-prefix`,`data-suffix`,`data-multiline`,`data-font-size`,`data-text-align`,`data-font-family`,`data-size-fixed`,`data-raw-value`,`data-number-format`,`data-date-format`,`data-width`,`data-height`,`value`]}))}setHTML(e){this.contentEl.innerHTML=M.sanitize(e),this.contentEl.querySelectorAll(`td, th`).forEach(e=>{e.style.verticalAlign=`middle`}),this.savedRange=null,this.statusBar.update(this.contentEl.innerHTML)}enterUserMode(e=`문서`){this.contentEl.contentEditable=`false`,this.contentEl.dataset.userMode=`true`,this._activateUserModeFields(),this.shadow.querySelector(`poa-menubar`).applyUserMode(),this.shadow.querySelector(`poa-context-toolbar`).applyUserMode(),this.toolbar.applyUserMode(),new MutationObserver(()=>this._activateUserModeFields()).observe(this.contentEl,{childList:!0,subtree:!0});let t=document.createElement(`div`);t.className=`user-mode-save-bar`;let n=document.createElement(`button`);n.className=`user-mode-save-btn`,n.textContent=`📄 PDF로 저장`,n.addEventListener(`click`,()=>this._pdfExport(e)),t.appendChild(n),this.scrollContainer??this.contentEl.parentElement?this.contentEl.insertAdjacentElement(`afterend`,t):this.insertAdjacentElement(`afterend`,t)}_activateUserModeFields(){this.contentEl.querySelectorAll(`.poa-field input.poa-field-input, .poa-field textarea.poa-field-input`).forEach(e=>{e.removeAttribute(`readonly`),e.removeAttribute(`disabled`)}),this.contentEl.querySelectorAll(`input:not(.poa-field-input), textarea:not(.poa-field-input), select`).forEach(e=>e.removeAttribute(`disabled`))}_pdfExport(e){let t=document.createElement(`div`);t.textContent=`브라우저 인쇄 창에서 '대상'을 'PDF로 저장'으로 선택하세요.`,t.style.cssText=[`position:fixed`,`bottom:80px`,`left:50%`,`transform:translateX(-50%)`,`background:#1F2937`,`color:#fff`,`padding:10px 20px`,`border-radius:6px`,`font-size:13px`,`z-index:9999`,`white-space:nowrap`,`pointer-events:none`].join(`;`),document.body.appendChild(t),setTimeout(()=>t.remove(),2e3),I(this.contentEl);let n=this.contentEl.cloneNode(!0);n.querySelectorAll(`.poa-field`).forEach(e=>{let t=e.querySelector(`.poa-field-input`)?.value?.trim()??``,n=document.createElement(`span`);t?n.textContent=t:n.className=`pdf-empty-field`,e.replaceWith(n)}),n.querySelectorAll(`.user-mode-save-bar, [data-poa-temp], .poa-field-popup`).forEach(e=>e.remove()),n.querySelectorAll(`.poa-page-break`).forEach(e=>{e.style.pageBreakAfter=`always`,e.style.border=`none`});let r=`<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>${e}</title>
<style>
@page { size: A4 portrait; margin: 0; }
body { margin: 0; padding: 0; background: #fff; }
.poa-editor-content {
  width: 794px;
  padding: 96px;
  font-family: 바탕, serif;
  font-size: 11pt;
  line-height: 1.6;
  box-sizing: border-box;
}
table { border-collapse: collapse; width: 100%; }
td, th { border: 1px solid #000; padding: 4px 8px; }
h1,h2,h3 { margin: .6em 0 .3em; }
p { margin: .4em 0; }
.pdf-empty-field {
  display: inline-block;
  min-width: 80px;
  border-bottom: 1px solid #000;
}
.poa-page-break {
  page-break-after: always;
  border: none;
}
.poa-page-break-label { display: none; }
.poa-field-popup,
.poa-toolbar,
.poa-menubar,
.user-mode-save-bar,
.user-mode-badge { display: none !important; }
</style>
</head>
<body>${n.outerHTML}</body>
</html>`,i=document.createElement(`iframe`);i.style.cssText=`position:fixed;top:-9999px;left:-9999px;width:0;height:0`,document.body.appendChild(i);let a=i.contentDocument;if(!a){i.remove();return}a.open(),a.write(r),a.close(),i.onload=()=>{i.contentWindow?.focus(),i.contentWindow?.print(),setTimeout(()=>i.remove(),1e3)}}restoreSelection(){let e=this.contentEl.ownerDocument,t=this.getActualRange();if(t&&this.contentEl.contains(t.startContainer))return;if(!this.savedRange){this.contentEl.focus();return}let n=this.savedRange.cloneRange();this.contentEl.focus();try{let t=e.getSelection();if(!t)return;t.removeAllRanges(),t.addRange(n)}catch{this.savedRange=null}}async handleAction(e){let{type:t,value:n}=e.detail;switch(t!==`format`&&this.restoreSelection(),t){case`format`:{let e=n?Re[n]:void 0;e&&this.savedRange&&!this.savedRange.collapsed&&await this.core.applyFormatWithRange(e,this.savedRange);break}case`undo`:await this.core.undo(),this.savedRange=null;break;case`redo`:await this.core.redo(),this.savedRange=null;break;case`align`:{let e=n??`left`,t=this.imageResizer.getActiveImage(),r=this.formControlEditor.getSelectedInput();t?this.applyImageAlign(t,e):r?r.style.textAlign=e===`left`?``:e:this.getFocusedCell()?this.applyTextAlign(e):this.selectedTable?this.applyTableAlign(this.selectedTable,e):this.applyTextAlign(e),await this.core.captureHistory(`align:${e}`);break}case`indent`:this.applyIndent(1),await this.core.captureHistory(`indent`);break;case`outdent`:this.applyIndent(-1),await this.core.captureHistory(`outdent`);break;case`fontFamily`:this.applyInlineStyle(`font-family`,_i(n??``)),await this.core.captureHistory(`fontFamily`);break;case`fontSize`:this.applyInlineStyle(`font-size`,n??``),await this.core.captureHistory(`fontSize`);break;case`lineHeight`:this.applyBlockStyle(`line-height`,n??``),await this.core.captureHistory(`lineHeight`);break;case`letterSpacing`:this.applyInlineStyle(`letter-spacing`,n??``),await this.core.captureHistory(`letterSpacing`);break;case`foreColor`:this.applyInlineStyle(`color`,n??``),await this.core.captureHistory(`foreColor`);break;case`backColor`:this.applyInlineStyle(`background-color`,n??``),await this.core.captureHistory(`backColor`);break;case`find-replace`:this.findDialog.open(`find`);return;case`image`:this.imageInserter.saveSelection(),this.imageInsertDialog.open();return;case`table`:this.tableDialog.open();return;case`settings`:this.settingsDialog.show();return;case`file:new`:if(this.fileManager.isDirty()&&!await this.confirmDialog.show(`저장되지 않은 변경사항이 있습니다. 계속할까요?`))return;this.fileManager.newDocument(),this.setHTML(``),this.core.captureHistory(`fileNew`);return;case`file:open`:this.fileManager.openFile().then(e=>{e&&(this.setHTML(e.html),this.core.captureHistory(`fileOpen`))});return;case`file:save`:this.fileManager.saveFile(this.getExportHTML());return;case`file:saveas`:this.fileManager.saveAsFile(this.getExportHTML());return;case`file:print`:this.fileManager.printDocument(this.getExportHTML(),this.paperSizeManager?.getMargin());return;case`edit:cut`:{let e=this.contentEl.ownerDocument,t=e.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0);if(n.collapsed)return;let r=n.toString(),i=e.createElement(`div`);i.appendChild(n.cloneContents());let a=i.innerHTML;navigator.clipboard.write([new ClipboardItem({"text/plain":new Blob([r],{type:`text/plain`}),"text/html":new Blob([a],{type:`text/html`})})]).then(()=>{n.deleteContents(),this.core.captureHistory(`cut`)});return}case`edit:copy`:{let e=this.contentEl.ownerDocument,t=e.getSelection();if(!t||t.rangeCount===0)return;let n=t.getRangeAt(0);if(n.collapsed)return;let r=n.toString(),i=e.createElement(`div`);i.appendChild(n.cloneContents());let a=i.innerHTML;navigator.clipboard.write([new ClipboardItem({"text/plain":new Blob([r],{type:`text/plain`}),"text/html":new Blob([a],{type:`text/html`})})]);return}case`edit:paste`:navigator.clipboard.readText().then(e=>{this.restoreSelection(),this.insertPlainText(e),this.core.captureHistory(`paste`),this.statusBar.update(this.contentEl.innerHTML)});return;case`edit:paste-plain`:navigator.clipboard.readText().then(e=>{this.restoreSelection(),this.insertPlainText(e),this.core.captureHistory(`paste`),this.statusBar.update(this.contentEl.innerHTML)});return;case`edit:select-all`:{this.contentEl.focus();let e=this.contentEl.ownerDocument,t=e.createRange();t.selectNodeContents(this.contentEl);let n=e.getSelection();n?.removeAllRanges(),n?.addRange(t);return}case`table:table-props`:{let e=this.getFocusedTable();e&&this.tableDialog.open(e);return}case`table:split-cell`:case`table:split-h`:case`table:split-v`:{let e=this.getFocusedCell();e&&this.cellSplitDialog.open(e);return}case`table:align-left`:case`table:align-center`:case`table:align-right`:{let e=this.getFocusedTable();if(!e)return;this.tableNavigator.applyTableAlign(e,t.replace(`table:align-`,``)),await this.core.captureHistory(`tableAlign`);return}case`table:cell-props`:case`table:merge`:case`table:row-above`:case`table:row-below`:case`table:col-left`:case`table:col-right`:case`table:row-delete`:case`table:col-delete`:case`table:delete`:{let e=this.getFocusedCell(),n=e?.closest(`table`);e&&n&&this.tableNavigator.executeAction(t,e,n);return}case`format:clear`:this.formatPainter.clear(),await this.core.captureHistory(`formatClear`);break;case`insert:link`:this.linkInserter.saveSelection(),this.bookmarkManager.saveSelection(),this.linkDialog.setBookmarks(this.bookmarkManager.getAll()),this.linkDialog.open(`link`);return;case`insert:bookmark`:this.linkInserter.saveSelection(),this.bookmarkManager.saveSelection(),this.linkDialog.setBookmarks(this.bookmarkManager.getAll()),this.linkDialog.open(`bookmark`);return;case`insert:datetime`:this.linkDialog.open(`datetime`);return;case`view:design`:case`view:html`:case`view:preview`:case`view:text`:case`view:page`:{let e=t.replace(`view:`,``);this.viewManager.switchTo(e);return}case`view:fullscreen`:this.viewManager.toggleFullscreen(this);return;case`view:ruler`:this.viewManager.toggleRuler();return;case`view:grid`:this.viewManager.toggleGrid();return;case`view:hidden-border`:this.viewManager.toggleHiddenBorder();return;case`paper:zoom-in`:this.paperSizeManager?.zoomIn();return;case`paper:zoom-out`:this.paperSizeManager?.zoomOut();return;case`paper:zoom-reset`:this.paperSizeManager?.resetZoom();return;case`paper:size`:this.paperSizeManager?.setPaperSize(n??``);return;case`paper:zoom`:n&&this.paperSizeManager?.setZoom(parseInt(n,10));return;case`paper:margin`:if(n)try{this.paperSizeManager?.setMargin(JSON.parse(n))}catch{}return;case`format:painter-copy`:this.formatPainter.copy(!1);return;case`format:painter-paste`:this.formatPainter.paste(),await this.core.captureHistory(`formatPainterPaste`);break;case`format:ul`:this.listManager.toggleList(`ul`),await this.core.captureHistory(`formatUl`);break;case`format:ol`:this.listManager.toggleList(`ol`),await this.core.captureHistory(`formatOl`);break;case`format:sup`:this.listManager.toggleSuperSub(`sup`),await this.core.captureHistory(`formatSup`);break;case`format:sub`:this.listManager.toggleSuperSub(`sub`),await this.core.captureHistory(`formatSub`);break;case`misc:a11y`:this.runAccessibilityCheck();return;case`misc:privacy`:this.runPrivacyCheck();return;case`misc:calc`:this.openFormulaDialog();return;case`insert:video`:this.restoreSelection(),this.videoDialog.open(`video`);return;case`insert:embed`:this.restoreSelection(),this.videoDialog.open(`embed`);return;case`misc:form`:this.restoreSelection(),this.formControlDialog.open();return;case`misc:template`:this.templateDialog.open();return;case`misc:user-mode`:{let e=new mi().addTemplate(`preview_${Date.now()}`,this.getHTML(),null,!1,!0);window.open(ui(e.id),`_blank`);return}case`insert:signature`:this.signatureDialog.open();return;case`insert:emoji`:this.emojiDialog.open();return;case`insert:tooltip`:{let e=this.contentEl.ownerDocument.getSelection();if(!e||e.rangeCount===0||e.toString().trim()===``){this.toast.show(`툴팁을 추가할 텍스트를 선택하세요.`,`info`);return}this.savedRange=e.getRangeAt(0).cloneRange(),this.tooltipDialog.openAdd(e.toString());return}case`insert:tooltip-list`:this.tooltipDialog.openList(this.tooltipManager.getAll());return;case`insert:field`:{let e=n?ni[n]:void 0;if(!e){this.toast.show(`알 수 없는 양식 필드입니다.`,`error`);return}this.fieldInserter.insertField(e,this.savedRange),await this.core.captureHistory(`insertField`),this.statusBar.update(this.contentEl.innerHTML);return}case`insert:pagebreak`:_n(this.contentEl),this.fileManager.markDirty(),this.statusBar.update(this.contentEl.innerHTML);return;case`insert:hr`:case`insert:symbol`:case`insert:multi-image`:case`help:shortcuts`:case`help:guide`:case`help:about`:this.toast.show(`'${t}' 기능은 준비 중입니다.`,`info`);return}this.syncToolbar(),this.statusBar.update(this.contentEl.innerHTML)}insertPlainText(e){let t=this.contentEl.ownerDocument,n=t.getSelection();if(!n||n.rangeCount===0)return;let r=n.getRangeAt(0);r.deleteContents();let i=t.createTextNode(e);r.insertNode(i),r.setStartAfter(i),r.collapse(!0),n.removeAllRanges(),n.addRange(r),this.fileManager.markDirty()}applyInlineStyle(e,t){let n=this.contentEl.ownerDocument,r=n.getSelection();if(!r||r.rangeCount===0)return;let i=r.getRangeAt(0);if(i.collapsed){this.pendingStyles.set(e,t),this.pendingStylesJustSet=!0;return}this.pendingStyles.clear(),this.pendingStylesJustSet=!1;let a=n.createElement(`span`);a.style.setProperty(e,t);let o=i.extractContents();a.appendChild(o),i.insertNode(a),i.selectNodeContents(a),r.removeAllRanges(),r.addRange(i)}applyBlockStyle(e,t){let n=this.contentEl.ownerDocument.getSelection();!n||n.rangeCount===0||this.findBlockAncestor(n.getRangeAt(0).commonAncestorContainer).style.setProperty(e,t)}applyTextAlign(e){let t=this.contentEl.ownerDocument.getSelection();if(!t||t.rangeCount===0)return;let n=Ge(this.contentEl,t.getRangeAt(0));for(let t of n)t.style.textAlign=e===`left`?``:e}applyImageAlign(e,t){e.style.float=``,e.style.display=``,e.style.marginLeft=``,e.style.marginRight=``,t===`left`?(e.style.float=`left`,e.style.marginRight=`8px`):t===`right`?(e.style.float=`right`,e.style.marginLeft=`8px`):t===`center`&&(e.style.display=`block`,e.style.marginLeft=`auto`,e.style.marginRight=`auto`),requestAnimationFrame(()=>this.imageResizer.syncOverlay())}applyTableAlign(e,t){e.style.marginLeft=``,e.style.marginRight=``,t===`center`?(e.style.marginLeft=`auto`,e.style.marginRight=`auto`):t===`right`&&(e.style.marginLeft=`auto`,e.style.marginRight=`0`)}applyIndent(e){let t=this.contentEl.ownerDocument.getSelection();if(!t||t.rangeCount===0)return;let n=this.findBlockAncestor(t.getRangeAt(0).commonAncestorContainer),r=parseFloat(n.style.paddingLeft)||0,i=Math.max(0,r+e*hi);n.style.paddingLeft=i===0?``:`${i}em`}checkAltWarning(){let e=this.contentEl.querySelectorAll(`img:not([alt]), img[alt=""]`).length>0,t=this.shadow.getElementById(`alt-warning-banner`);e&&!t?(t=document.createElement(`div`),t.id=`alt-warning-banner`,t.style.cssText=`background:#fff3cd;color:#856404;padding:5px 12px;font-size:12px;border-top:1px solid #ffc107;`,t.textContent=`⚠ alt 텍스트가 없는 이미지가 있습니다. 접근성을 위해 설명을 추가하세요.`,this.contentEl.insertAdjacentElement(`afterend`,t)):!e&&t&&t.remove()}runAccessibilityCheck(){this.accessibilityDialog.startLoading(),setTimeout(()=>{let e=new Hn(this.contentEl).run();this.accessibilityDialog.show(e)},50)}runPrivacyCheck(){nr.removeHighlights(this.contentEl),this.privacyDialog.startLoading(),setTimeout(()=>{let e=new nr(this.contentEl).run();e.length>0&&nr.highlight(e),this.privacyDialog.show(e)},50)}openFormulaDialog(){let e=this.getFocusedCell();if(!e){this.toast.show(`표 안에 커서를 놓고 계산식을 설정하세요.`,`info`);return}let t=e.closest(`table`);if(!t)return;let n=e.dataset.formula?(()=>{try{return JSON.parse(e.dataset.formula)}catch{return null}})():null,r=Array.from(t.querySelectorAll(`tr`)),i=1,a=1;r.forEach((t,n)=>{let r=Array.from(t.querySelectorAll(`td, th`)).indexOf(e);r!==-1&&(i=n+1,a=r+1)});let o=this.tableSelector.getCellSelection(),s=o.length>1?fr.getSelectionBounds(t,o)??void 0:void 0;this.formulaDialog.open({table:t,cell:e,cellRow:i,cellCol:a,existingFormula:n??void 0,initialRange:s})}findBlockAncestor(e){let t=e;for(;t&&t!==this.contentEl;){if(t.nodeType===1&&gi.has(t.tagName.toLowerCase()))return t;t=t.parentNode}return this.contentEl}syncToolbar(){let e=this.core.canUndo(),t=this.core.canRedo(),n=this.getActualRange();if(!n||!this.contentEl.contains(n.startContainer)){this.toolbar.setHistoryState(e,t);return}let r=this.getFocusedCell()!==null||this.selectedTable!==null;r&&!this.inTableContext?(this.inTableContext=!0,P.emit(F.MENUBAR_CHANGE,{tab:`table`})):!r&&this.inTableContext&&(this.inTableContext=!1,P.emit(F.MENUBAR_CHANGE,{tab:this.previousMenuTab})),this.savedRange=n;let i=n.startContainer,a={bold:this.hasAncestorTag(i,`strong`),italic:this.hasAncestorTag(i,`em`),underline:this.hasAncestorTag(i,`u`),strike:this.hasAncestorTag(i,`s`),align:(()=>{let e=this.imageResizer.getActiveImage();return e?Ke(e):this.selectedTable?qe(this.selectedTable):this.getInlineStyle(i,`text-align`)||`left`})(),canUndo:e,canRedo:t,fontSize:this.getInlineStyle(i,`font-size`)||`12pt`,fontFamily:this.getInlineStyle(i,`font-family`)||`inherit`,lineHeight:this.getInlineStyle(i,`line-height`)||`1.5`,letterSpacing:this.getInlineStyle(i,`letter-spacing`)||`0px`,foreColor:this.rgbToHex(this.getComputedStyle(i,`color`))||`#000000`,backColor:`#ffff00`,inTable:r};this.toolbar.setState(a)}hasAncestorTag(e,t){let n=e;for(;n&&n!==this.contentEl;){if(n.nodeType===1&&n.tagName.toLowerCase()===t)return!0;n=n.parentNode}return!1}getInlineStyle(e,t){let n=e;for(;n&&n!==this.contentEl;){if(n.nodeType===1){let e=n.style.getPropertyValue(t);if(e)return e}n=n.parentNode}return``}getComputedStyle(e,t){let n=e?.nodeType===1?e:e?.parentElement??null;return n?window.getComputedStyle(n).getPropertyValue(t):``}rgbToHex(e){let t=e.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);return t?`#`+[t[1],t[2],t[3]].map(e=>parseInt(e).toString(16).padStart(2,`0`)).join(``):e.startsWith(`#`)?e:``}getActualRange(){let e=this.contentEl.ownerDocument.getSelection();return!e||e.rangeCount===0?null:e.getRangeAt(0)}getFocusedCell(){let e=this.getActualRange();if(!e)return null;let t=e.startContainer;for(;t&&t!==this.contentEl;){if(t.nodeType===Node.ELEMENT_NODE){let e=t.tagName.toLowerCase();if(e===`td`||e===`th`)return t;if(e===`table`)break}t=t.parentNode}return null}getFocusedTable(){return this.getFocusedCell()?.closest(`table`)??null}findTableNode(e){let t=e;for(;t&&t!==this.contentEl;){if(t.nodeType===Node.ELEMENT_NODE&&t.tagName===`TABLE`)return t;t=t.parentNode}return null}selectTable(e){this.selectedTable!==e&&(this.deselectTable(),this.selectedTable=e,e.classList.add(`poa-table-selected`),this.tableWholeResizer.attach(e),this.tableInlineToolbar.show(e,this.contentEl))}deselectTable(){this.selectedTable?.classList.remove(`poa-table-selected`),this.selectedTable=null,this.tableWholeResizer.detach(),this.tableInlineToolbar.hide()}static _stylesInjected=!1;static injectContentStyles(){if(e._stylesInjected)return;e._stylesInjected=!0;let t=document.createElement(`style`);t.id=`poa-editor-content-styles`,t.textContent=[`.poa-editor-content:empty::before {`,`  content: attr(data-placeholder);`,`  color: #aaa;`,`  pointer-events: none;`,`  display: block;`,`}`,`.poa-editor-content a[href]:not(.poa-bookmark) {`,`  position: relative;`,`}`,`.poa-editor-content a[href]:not(.poa-bookmark)::after {`,`  content: attr(href);`,`  position: absolute;`,`  top: 100%;`,`  left: 0;`,`  margin-top: 3px;`,`  background: #1a1a1a;`,`  color: #fff;`,`  padding: 3px 8px;`,`  border-radius: 3px;`,`  font-size: 11px;`,`  font-style: normal;`,`  text-decoration: none;`,`  white-space: nowrap;`,`  max-width: 320px;`,`  overflow: hidden;`,`  text-overflow: ellipsis;`,`  opacity: 0;`,`  pointer-events: none;`,`  transition: opacity 0.15s;`,`  z-index: 9999;`,`}`,`.poa-editor-content a[href]:not(.poa-bookmark):hover::after {`,`  opacity: 1;`,`}`,`.poa-editor-content a.poa-bookmark {`,`  color: #9e9e9e;`,`  font-size: 12px;`,`  border: 1px dashed #bdbdbd;`,`  border-radius: 2px;`,`  padding: 0 3px;`,`  cursor: default;`,`  user-select: none;`,`  -webkit-user-select: none;`,`}`,`.poa-editor-content table.poa-table-selected {`,`  outline: 2px solid #0078d7;`,`  outline-offset: -2px;`,`}`,`.poa-editor-content.poa-show-hidden-borders table,`,`.poa-editor-content.poa-show-hidden-borders td,`,`.poa-editor-content.poa-show-hidden-borders th {`,`  border: 1px dashed #bbb !important;`,`}`,`.poa-editor-content.poa-show-hidden-borders div,`,`.poa-editor-content.poa-show-hidden-borders p {`,`  outline: 1px dashed rgba(0,120,212,.25);`,`}`,`.poa-editor-content table {`,`  max-width: 100%;`,`  box-sizing: border-box;`,`}`,`.poa-editor-content td input, .poa-editor-content th input,`,`.poa-editor-content td textarea, .poa-editor-content th textarea,`,`.poa-editor-content td select, .poa-editor-content th select {`,`  max-width: 100%;`,`  box-sizing: border-box;`,`}`,`.poa-editor-content .poa-input-selected {`,`  outline: 2px solid #2563EB !important;`,`  outline-offset: 1px;`,`}`].join(`
`),document.head.appendChild(t)}showImgContextMenu(e,t,n){this.hideImgContextMenu();let r=document.createElement(`div`);r.dataset.poaImgMenu=`true`,r.style.cssText=`position:fixed;top:${n}px;left:${t}px;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:9999;padding:4px 0;min-width:150px;font-size:13px;`;let i=[{label:`이미지 속성`,action:()=>{this.imageDialog.open(e.src,{alt:e.alt,title:e.title||void 0,width:e.style.width||void 0,height:e.style.height||void 0,border:e.style.border||void 0,align:e.style.float||void 0,id:e.id||void 0,className:e.className||void 0})}},{label:`이미지 편집`,action:()=>{this.imageDialog.open(e.src,{})}},{label:`원본 크기로`,action:()=>{e.style.width=e.naturalWidth?`${e.naturalWidth}px`:``,e.style.height=e.naturalHeight?`${e.naturalHeight}px`:``,this.imageResizer.syncOverlay(),this.imageToolbar.update(e),this.core.captureHistory(`imageResize`)}},{label:`너비 맞춤 (100%)`,action:()=>{let t=this.contentEl.clientWidth;e.style.width=`${t}px`,e.style.height=``,this.imageResizer.syncOverlay(),this.imageToolbar.update(e),this.core.captureHistory(`imageResize`)}},{label:`이미지 삭제`,danger:!0,action:()=>{this.imageResizer.deactivate(),e.remove(),this.core.captureHistory(`imageDelete`),this.statusBar.update(this.contentEl.innerHTML),this.checkAltWarning()}}];for(let e of i){let t=document.createElement(`button`);t.textContent=e.label,t.style.cssText=`display:block;width:100%;padding:6px 14px;border:none;background:transparent;cursor:pointer;text-align:left;font-size:13px;color:${e.danger?`#d32f2f`:`#222`};`,t.addEventListener(`mouseenter`,()=>{t.style.background=`#f5f5f5`}),t.addEventListener(`mouseleave`,()=>{t.style.background=`transparent`}),t.addEventListener(`click`,()=>{e.action(),this.hideImgContextMenu()}),r.appendChild(t)}document.body.appendChild(r),this.imgContextMenu=r;let a=()=>{this.hideImgContextMenu(),document.removeEventListener(`mousedown`,a,{capture:!0})};setTimeout(()=>document.addEventListener(`mousedown`,a,{capture:!0,once:!0}),0)}hideImgContextMenu(){this.imgContextMenu?.remove(),this.imgContextMenu=null}showLinkContextMenu(e,t,n){this.hideLinkContextMenu();let r=document.createElement(`div`);r.dataset.poaLinkMenu=`true`,r.style.cssText=`position:fixed;top:${n}px;left:${t}px;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:9999;padding:4px 0;min-width:140px;font-size:13px;`;let i=[{label:`링크 수정`,action:()=>{this.linkInserter.saveSelection(),this.bookmarkManager.saveSelection(),this.linkDialog.setBookmarks(this.bookmarkManager.getAll()),this.linkDialog.open(`link`,e)}},{label:`링크 제거`,danger:!0,action:()=>{this.linkInserter.removeLink(e),this.core.captureHistory(`removeLink`),this.statusBar.update(this.contentEl.innerHTML)}},{label:`링크 열기`,action:()=>{window.open(e.href,e.target||`_blank`,`noopener,noreferrer`)}}];for(let e of i){let t=document.createElement(`button`);t.textContent=e.label,t.style.cssText=`display:block;width:100%;padding:6px 14px;border:none;background:transparent;cursor:pointer;text-align:left;font-size:13px;color:${e.danger?`#d32f2f`:`#222`};`,t.addEventListener(`mouseenter`,()=>{t.style.background=`#f5f5f5`}),t.addEventListener(`mouseleave`,()=>{t.style.background=`transparent`}),t.addEventListener(`click`,()=>{e.action(),this.hideLinkContextMenu()}),r.appendChild(t)}document.body.appendChild(r),this.linkContextMenu=r,setTimeout(()=>document.addEventListener(`mousedown`,()=>this.hideLinkContextMenu(),{capture:!0,once:!0}),0)}hideLinkContextMenu(){this.linkContextMenu?.remove(),this.linkContextMenu=null}},yi=class{async rotate(e,t){let n=await this.loadImage(e),r=t===90||t===270,i=r?n.naturalHeight:n.naturalWidth,a=r?n.naturalWidth:n.naturalHeight,o=this.createCanvas(i,a),s=o.getContext(`2d`);if(!s)throw Error(`Canvas 2D context를 가져올 수 없습니다.`);return s.translate(i/2,a/2),s.rotate(t*Math.PI/180),s.drawImage(n,-n.naturalWidth/2,-n.naturalHeight/2),o.toDataURL(`image/png`)}async flip(e,t){let n=await this.loadImage(e),r=this.createCanvas(n.naturalWidth,n.naturalHeight),i=r.getContext(`2d`);if(!i)throw Error(`Canvas 2D context를 가져올 수 없습니다.`);return t===`horizontal`?(i.translate(n.naturalWidth,0),i.scale(-1,1)):(i.translate(0,n.naturalHeight),i.scale(1,-1)),i.drawImage(n,0,0),r.toDataURL(`image/png`)}async crop(e,t){let n=await this.loadImage(e),r=this.createCanvas(t.width,t.height),i=r.getContext(`2d`);if(!i)throw Error(`Canvas 2D context를 가져올 수 없습니다.`);return i.drawImage(n,t.x,t.y,t.width,t.height,0,0,t.width,t.height),r.toDataURL(`image/png`)}createCanvas(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}loadImage(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`이미지 로드 실패`)),r.src=e})}},bi=new Set([`jpg`,`jpeg`,`png`,`gif`,`webp`,`svg`]),xi=20*1024*1024,Si=class{items=[];validateFiles(e,t=xi){let n=[],r=[],i=0;for(let a of e){let e=a.name.split(`.`).pop()?.toLowerCase()??``;if(!bi.has(e)){r.push(`${a.name}: 지원하지 않는 형식 (허용: jpg/jpeg/png/gif/webp/svg)`);continue}if(i+a.size>t){let e=Math.round(t/1024/1024);r.push(`총 업로드 용량이 ${e}MB를 초과합니다. (${a.name} 이후 파일 제외)`);break}i+=a.size,n.push(a)}return{valid:n,errors:r}}async upload(e,t){return this.items=e.map(e=>({file:e,status:`pending`,progress:0})),t.onProgress?.(this.snapshot()),(await Promise.allSettled(e.map((e,n)=>this.uploadOne(e,n,t)))).forEach((e,t)=>{e.status===`fulfilled`?(this.items[t].status=`done`,this.items[t].url=e.value,this.items[t].progress=100):(this.items[t].status=`error`,this.items[t].error=e.reason instanceof Error?e.reason.message:`업로드 실패`)}),t.onProgress?.(this.snapshot()),this.snapshot()}async uploadOne(e,t,n){this.items[t].status=`uploading`,n.onProgress?.(this.snapshot());let r=new FormData;r.append(n.fieldName??`file`,e);let i=await fetch(n.uploadUrl,{method:`POST`,headers:n.headers,body:r});if(!i.ok)throw Error(`HTTP ${i.status}`);let a=await i.json();if(!a.url)throw Error(`서버에서 URL을 반환하지 않았습니다.`);return this.items[t].progress=100,n.onProgress?.(this.snapshot()),a.url}snapshot(){return this.items.map(e=>({...e}))}},Ci=`
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
`,wi=class extends HTMLElement{shadow;targetCell=null;constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${Ci}</style>
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
</div>`;let e=this.shadow.getElementById(`cs-cols`),t=this.shadow.getElementById(`cs-rows`),n=this.shadow.getElementById(`btn-ok`),r=()=>{let r=parseInt(e.value,10)||1,i=parseInt(t.value,10)||1;n.disabled=r<=1&&i<=1};e.addEventListener(`input`,r),t.addEventListener(`input`,r),this.shadow.getElementById(`btn-close`).addEventListener(`click`,()=>this.close()),this.shadow.getElementById(`btn-cancel`).addEventListener(`click`,()=>this.close()),this.shadow.getElementById(`overlay`).addEventListener(`click`,e=>{e.target.id===`overlay`&&this.close()}),n.addEventListener(`click`,()=>this.confirm())}open(e){this.targetCell=e;let t=this.shadow.getElementById(`cs-cols`),n=this.shadow.getElementById(`cs-rows`),r=this.shadow.getElementById(`btn-ok`);t.value=`1`,n.value=`1`,r.disabled=!0,this.classList.add(`open`),t.focus(),t.select()}close(){this.classList.remove(`open`),this.targetCell=null}confirm(){if(!this.targetCell)return;let e=Math.max(1,parseInt(this.shadow.getElementById(`cs-cols`).value,10)||1),t=Math.max(1,parseInt(this.shadow.getElementById(`cs-rows`).value,10)||1);e<=1&&t<=1||(this.dispatchEvent(new CustomEvent(`poa-cell-split`,{bubbles:!0,composed:!0,detail:{cell:this.targetCell,cols:e,rows:t}})),this.close())}},Ti=`
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
.err-msg { color: #d32f2f; font-size: 12px; margin-top: 4px; display: none; }
.err-msg.show { display: block; }
`,Ei=class extends HTMLElement{shadow;activeTab=`video`;constructor(){super(),this.shadow=this.attachShadow({mode:`open`}),this.shadow.innerHTML=`<style>${Ti}</style>`}open(e=`video`){this.activeTab=e,this.setAttribute(`open`,``),this.render()}close(){this.removeAttribute(`open`)}render(){this.shadow.innerHTML=`<style>${Ti}</style>
<div class="overlay" id="overlay">
  <div class="dialog" id="dialog">
    <div class="header">
      <h2>미디어 삽입</h2>
      <button id="btn-close">✕</button>
    </div>

    <div class="tabs">
      <button class="tab-btn${this.activeTab===`video`?` active`:``}" data-tab="video">비디오 태그</button>
      <button class="tab-btn${this.activeTab===`embed`?` active`:``}" data-tab="embed">외부 동영상</button>
    </div>

    <div class="body">
      <!-- ── 비디오 태그 탭 ── -->
      <div class="tab-panel${this.activeTab===`video`?` active`:``}" id="panel-video">
        <div class="section">
          <div class="label">소스 URL</div>
          <input id="v-src" type="url" placeholder="https://example.com/video.mp4">
          <div class="err-msg" id="v-err"></div>
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
      <div class="tab-panel${this.activeTab===`embed`?` active`:``}" id="panel-embed">
        <div class="section">
          <div class="label">공유 URL</div>
          <input id="e-url" type="url" placeholder="https://youtube.com/watch?v=...">
          <div class="err-msg" id="e-err"></div>
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
</div>`,this.bindEvents()}bindEvents(){let e=this.shadow;e.getElementById(`btn-close`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`btn-cancel`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`overlay`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`dialog`)?.addEventListener(`click`,e=>e.stopPropagation()),e.querySelectorAll(`.tab-btn`).forEach(t=>{t.addEventListener(`click`,()=>{this.activeTab=t.dataset.tab,e.querySelectorAll(`.tab-btn`).forEach(e=>e.classList.remove(`active`)),e.querySelectorAll(`.tab-panel`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`),e.getElementById(`panel-${this.activeTab}`)?.classList.add(`active`)})}),e.getElementById(`v-autoplay`)?.addEventListener(`change`,t=>{let n=t.target.checked,r=e.getElementById(`v-muted`);r&&n&&(r.checked=!0)}),e.getElementById(`v-track-src`)?.addEventListener(`input`,t=>{let n=e.getElementById(`a11y-hint`);n&&(n.style.display=t.target.value?`none`:`flex`)}),e.getElementById(`e-url`)?.addEventListener(`input`,e=>{this.updatePreview(e.target.value)}),e.getElementById(`btn-confirm`)?.addEventListener(`click`,()=>this.confirm())}updatePreview(e){let t=this.shadow.getElementById(`preview-box`);if(!t)return;let n=hr(e);n?.thumbnailUrl?t.innerHTML=`<img src="${n.thumbnailUrl}" alt="미리보기">`:n?t.innerHTML=`<span class="empty-msg">${n.provider} 동영상 (미리보기 없음)</span>`:t.innerHTML=`<span class="empty-msg">URL을 입력하면 미리보기가 표시됩니다.</span>`}confirm(){let e=this.activeTab===`video`?this.buildVideoHtml():this.buildEmbedHtml();e&&(this.dispatchEvent(new CustomEvent(`poa-video-insert`,{bubbles:!0,composed:!1,detail:{html:e}})),this.close())}buildVideoHtml(){let e=this.shadow,t=e.getElementById(`v-src`)?.value.trim()??``;if(!t)return this._showError(`v-err`,`소스 URL을 입력하세요.`),null;let n=e.querySelector(`input[name="v-type"]:checked`)?.value??`video/mp4`,r=e.getElementById(`v-poster`)?.value.trim(),i=parseInt(e.getElementById(`v-width`)?.value??`640`,10),a=parseInt(e.getElementById(`v-height`)?.value??`360`,10),o=e.getElementById(`v-controls`)?.checked??!0,s=e.getElementById(`v-autoplay`)?.checked??!1,c=e.getElementById(`v-loop`)?.checked??!1,l=e.getElementById(`v-muted`)?.checked??!1,u=e.getElementById(`v-track-src`)?.value.trim(),d=e.getElementById(`v-track-lang`)?.value??`ko`;return gr({src:t,type:n,poster:r||void 0,width:i,height:a,controls:o,autoplay:s,loop:c,muted:l,trackSrc:u||void 0,trackSrclang:d})}_showError(e,t){let n=this.shadow.getElementById(e);n&&(n.textContent=t,n.classList.add(`show`))}buildEmbedHtml(){let e=this.shadow,t=hr(e.getElementById(`e-url`)?.value.trim()??``);if(!t)return this._showError(`e-err`,`지원하지 않는 URL입니다. YouTube, Vimeo, Dailymotion URL을 입력하세요.`),null;let n=parseInt(e.getElementById(`e-width`)?.value??`640`,10),r=parseInt(e.getElementById(`e-height`)?.value??`360`,10);return _r({embedUrl:t.embedUrl,width:n,height:r})}},Di={text:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
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
  </svg>`},Oi={text:`텍스트`,textarea:`여러 줄`,checkbox:`체크박스`,radio:`라디오`,select:`목록 선택`,button:`버튼`,date:`날짜 선택`},ki=[`text`,`textarea`,`checkbox`,`radio`,`select`,`button`,`date`],Ai=`
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
`;function Y(e,t,n=``){return`<div class="field">
    <label>${e}</label>${t}${n?`<div class="hint">${n}</div>`:``}
  </div>`}function X(e,t=``,n=`text`){return`<input type="${n}" id="${e}" placeholder="${t}">`}function ji(e,t){return`<select id="${e}">${t.map(([e,t])=>`<option value="${e}">${t}</option>`).join(``)}</select>`}var Mi=class extends HTMLElement{shadow;activeType=`text`;connectedCallback(){this.shadow=this.attachShadow({mode:`open`}),this.shadow.innerHTML=`<style>${Ai}</style>${this._tpl()}`,this._buildTypeCards(),this._bindEvents(),this._setType(`text`)}open(e){let t=this.shadow.getElementById(`dlg-title`),n=this.shadow.getElementById(`btn-confirm`);t.textContent=e?`입력 요소 편집`:`입력 요소 추가`,n.textContent=e?`수정하기`:`추가하기`,e?(this._setType(e.type),this._fillFields(e)):(this._setType(`text`),this._clearFields()),this.setAttribute(`open`,``),this.shadow.getElementById(`f-label`)?.focus()}close(){this.removeAttribute(`open`)}_tpl(){return`<div class="dlg">
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
      ${Y(`항목 이름`,X(`f-label`,`예) 이름, 이메일 주소…`),`사용자에게 보여지는 항목 설명입니다`)}
      ${Y(`안내 문구`,X(`f-text-ph`,`예) 홍길동`),`입력창 안에 표시되는 도움말입니다`)}
      ${this._adv(`
        <div class="chk-row" style="margin-bottom:10px">
          <input type="checkbox" id="f-aria-req"><label for="f-aria-req">필수 입력 항목으로 표시</label>
        </div>
        ${Y(`최대 글자 수`,X(`f-text-ml`,`제한 없음`,`number`))}
        ${Y(`기본값`,X(`f-text-val`,`미리 채울 내용`))}
        ${Y(`name 속성`,X(`f-name`,`자동 생성`))}
      `)}
    </div>`}_secTextarea(){return`<div class="specific-section" id="sec-textarea">
      ${Y(`항목 이름`,X(`f-ta-label`,`예) 내용, 자기소개…`))}
      ${Y(`안내 문구`,X(`f-ta-ph`,`예) 간단하게 소개해 주세요`))}
      ${Y(`줄 수`,`<input type="number" id="f-ta-rows" value="4" min="2" max="20" style="width:80px">`,`입력창의 기본 높이를 줄 수로 조정합니다`)}
      ${this._adv(`
        <div class="chk-row" style="margin-bottom:10px">
          <input type="checkbox" id="f-ta-req"><label for="f-ta-req">필수 입력 항목으로 표시</label>
        </div>
        ${Y(`name 속성`,X(`f-ta-name`,`자동 생성`))}
      `)}
    </div>`}_secCheckbox(){return`<div class="specific-section" id="sec-checkbox">
      ${Y(`체크박스 텍스트`,X(`f-cb-lbl`,`예) 개인정보 수집에 동의합니다`),`체크박스 옆에 표시되는 설명입니다`)}
      <div class="field">
        <div class="chk-row">
          <input type="checkbox" id="f-cb-checked"><label for="f-cb-checked">처음부터 체크된 상태로 표시</label>
        </div>
      </div>
      ${this._adv(`
        <div class="chk-row" style="margin-bottom:10px">
          <input type="checkbox" id="f-cb-req"><label for="f-cb-req">필수 체크 항목으로 표시</label>
        </div>
        ${Y(`name 속성`,X(`f-cb-name`,`자동 생성`))}
      `)}
    </div>`}_secRadio(){return`<div class="specific-section" id="sec-radio">
      ${Y(`그룹 제목`,X(`f-radio-label`,`예) 성별, 선호 연락 방법…`),`라디오 버튼 그룹 위에 표시되는 제목입니다`)}
      <div class="field">
        <label>선택지 목록</label>
        <div class="opt-list" id="radio-opts"></div>
        <button type="button" class="add-opt" id="add-radio-opt">+ 선택지 추가</button>
      </div>
      ${this._adv(`
        <div class="hint" style="margin-bottom:8px">기본 선택값은 각 선택지 행 오른쪽 ★ 버튼으로 지정하세요.</div>
        ${Y(`그룹 name 속성`,X(`f-radio-gn`,`자동 생성`))}
      `)}
    </div>`}_secSelect(){return`<div class="specific-section" id="sec-select">
      ${Y(`항목 이름`,X(`f-sel-label`,`예) 지역, 직군…`))}
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
        ${Y(`name 속성`,X(`f-sel-name`,`자동 생성`))}
      `)}
    </div>`}_secButton(){return`<div class="specific-section" id="sec-button">
      ${Y(`버튼 텍스트`,X(`f-btn-text`,`예) 제출, 확인, 다음`))}
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
          ${ji(`f-btn-style`,[[`default`,`기본 (회색)`],[`primary`,`강조 (파랑)`],[`danger`,`경고 (빨강)`]])}
        </div>
        ${Y(`name 속성`,X(`f-btn-name`,`자동 생성`))}
      `)}
    </div>`}_secDate(){return`<div class="specific-section" id="sec-date">
      ${Y(`항목 이름`,X(`f-date-label`,`예) 생년월일, 예약일…`))}
      <div class="field">
        <div class="chk-row">
          <input type="checkbox" id="f-date-req"><label for="f-date-req">필수 입력 항목으로 표시</label>
        </div>
      </div>
      ${this._adv(`
        ${Y(`선택 가능한 시작일`,X(`f-date-min`,`YYYY-MM-DD`))}
        ${Y(`선택 가능한 종료일`,X(`f-date-max`,`YYYY-MM-DD`))}
        ${Y(`기본 날짜`,X(`f-date-val`,`YYYY-MM-DD`))}
        ${Y(`name 속성`,X(`f-date-name`,`자동 생성`))}
      `)}
    </div>`}_buildTypeCards(){let e=this.shadow.getElementById(`type-grid`);for(let t of ki){let n=document.createElement(`button`);n.type=`button`,n.className=`type-card`,n.dataset.type=t,n.innerHTML=`${Di[t]}<span>${Oi[t]}</span>`,n.addEventListener(`click`,e=>{e.stopPropagation(),this._setType(t)}),e.appendChild(n)}}_bindEvents(){this.shadow.querySelector(`.x-btn`).addEventListener(`click`,()=>this.close()),this.shadow.getElementById(`btn-cancel`).addEventListener(`click`,()=>this.close()),this.shadow.getElementById(`btn-confirm`).addEventListener(`click`,()=>this._confirm()),this.shadow.getElementById(`add-radio-opt`).addEventListener(`click`,()=>{this._addRadioRow(),this._updatePreview()}),this.shadow.getElementById(`add-select-opt`).addEventListener(`click`,()=>{this._addSelectRow(),this._updatePreview()}),this.shadow.addEventListener(`click`,e=>{let t=e.target.closest(`[data-adv]`);t&&(t.classList.toggle(`open`),t.nextElementSibling?.classList.toggle(`show`))}),this.addEventListener(`click`,e=>{e.composedPath()[0]===this&&this.close()}),this.shadow.addEventListener(`input`,()=>this._updatePreview()),this.shadow.addEventListener(`change`,()=>this._updatePreview())}_setType(e){this.activeType=e,this.shadow.querySelectorAll(`.type-card`).forEach(t=>{t.classList.toggle(`active`,t.dataset.type===e)}),this.shadow.querySelectorAll(`.specific-section`).forEach(t=>{t.style.display=t.id===`sec-${e}`?`block`:`none`}),this._updatePreview()}_addRadioRow(e){let t=this.shadow.getElementById(`radio-opts`),n=document.createElement(`div`);n.className=`opt-row`;let r=document.createElement(`input`);r.type=`text`,r.className=`opt-label`,r.placeholder=`선택지 텍스트`,r.value=e?.label??``,r.addEventListener(`input`,()=>this._updatePreview());let i=document.createElement(`button`);i.type=`button`,i.title=`기본 선택`,i.style.cssText=`flex:none;width:28px;height:28px;border:1px solid #e5e7eb;border-radius:6px;background:none;cursor:pointer;font-size:14px;color:#d1d5db;`,i.textContent=`★`,e?.defaultChecked&&(i.style.color=`#f59e0b`,i.dataset.default=`1`),i.addEventListener(`click`,()=>{t.querySelectorAll(`button[title="기본 선택"]`).forEach(e=>{e.style.color=`#d1d5db`,delete e.dataset.default}),i.style.color=`#f59e0b`,i.dataset.default=`1`,this._updatePreview()});let a=document.createElement(`button`);a.type=`button`,a.className=`del-btn`,a.title=`삭제`,a.textContent=`✕`,a.addEventListener(`click`,()=>{n.remove(),this._updatePreview()}),n.appendChild(r),n.appendChild(i),n.appendChild(a),t.appendChild(n)}_addSelectRow(e){let t=this.shadow.getElementById(`select-opts`),n=document.createElement(`div`);n.className=`opt-row`;let r=document.createElement(`input`);r.type=`text`,r.className=`opt-label`,r.placeholder=`항목 텍스트`,r.value=e?.label??``,r.addEventListener(`input`,()=>this._updatePreview());let i=document.createElement(`button`);i.type=`button`,i.title=`기본 선택`,i.style.cssText=`flex:none;width:28px;height:28px;border:1px solid #e5e7eb;border-radius:6px;background:none;cursor:pointer;font-size:14px;color:#d1d5db;`,i.textContent=`★`,e?.selected&&(i.style.color=`#f59e0b`,i.dataset.default=`1`),i.addEventListener(`click`,()=>{t.querySelectorAll(`button[title="기본 선택"]`).forEach(e=>{e.style.color=`#d1d5db`,delete e.dataset.default}),i.style.color=`#f59e0b`,i.dataset.default=`1`,this._updatePreview()});let a=document.createElement(`button`);a.type=`button`,a.className=`del-btn`,a.title=`삭제`,a.textContent=`✕`,a.addEventListener(`click`,()=>{n.remove(),this._updatePreview()}),n.appendChild(r),n.appendChild(i),n.appendChild(a),t.appendChild(n)}_clearFields(){let e=(e,t)=>{let n=this.shadow.getElementById(e);n&&(n.value=t)},t=(e,t)=>{let n=this.shadow.getElementById(e);n&&(n.checked=t)};e(`f-label`,``),e(`f-text-ph`,``),e(`f-text-ml`,``),e(`f-text-val`,``),e(`f-name`,``),e(`f-ta-label`,``),e(`f-ta-ph`,``),e(`f-ta-rows`,`4`),e(`f-ta-name`,``),e(`f-cb-lbl`,``),e(`f-cb-name`,``),e(`f-radio-label`,``),e(`f-radio-gn`,``),e(`f-sel-label`,``),e(`f-sel-name`,``),e(`f-btn-text`,``),e(`f-btn-name`,``),e(`f-date-label`,``),e(`f-date-min`,``),e(`f-date-max`,``),e(`f-date-val`,``),e(`f-date-name`,``),t(`f-aria-req`,!1),t(`f-ta-req`,!1),t(`f-cb-checked`,!1),t(`f-cb-req`,!1),t(`f-sel-multi`,!1),t(`f-date-req`,!1);let n=this.shadow.querySelector(`input[name="btn-type"][value="button"]`);n&&(n.checked=!0);let r=this.shadow.getElementById(`f-btn-style`);r&&(r.value=`default`),this.shadow.getElementById(`radio-opts`).innerHTML=``,this._addRadioRow(),this._addRadioRow(),this.shadow.getElementById(`select-opts`).innerHTML=``,this._addSelectRow(),this._addSelectRow(),this.shadow.querySelectorAll(`[data-adv]`).forEach(e=>{e.classList.remove(`open`),e.nextElementSibling?.classList.remove(`show`)})}_fillFields(e){switch(this._clearFields(),e.type){case`text`:this._sv(`f-label`,e.label),this._sv(`f-text-ph`,e.placeholder),this._sv(`f-text-ml`,e.maxlength==null?``:String(e.maxlength)),this._sv(`f-text-val`,e.value),this._sv(`f-name`,e.name),this._sc(`f-aria-req`,e.ariaRequired);break;case`textarea`:this._sv(`f-ta-label`,e.label),this._sv(`f-ta-ph`,e.placeholder),this._sv(`f-ta-rows`,String(e.rows??4)),this._sv(`f-ta-name`,e.name),this._sc(`f-ta-req`,e.ariaRequired);break;case`checkbox`:this._sv(`f-cb-lbl`,e.checkLabel??e.label),this._sv(`f-cb-name`,e.name),this._sc(`f-cb-checked`,e.checked),this._sc(`f-cb-req`,e.ariaRequired);break;case`radio`:this._sv(`f-radio-label`,e.label),this._sv(`f-radio-gn`,e.groupName),this.shadow.getElementById(`radio-opts`).innerHTML=``,(e.options??[]).forEach(e=>this._addRadioRow(e)),e.options?.length||(this._addRadioRow(),this._addRadioRow());break;case`select`:this._sv(`f-sel-label`,e.label),this._sv(`f-sel-name`,e.name),this._sc(`f-sel-multi`,e.multiple),this.shadow.getElementById(`select-opts`).innerHTML=``,(e.options??[]).forEach(e=>this._addSelectRow(e)),e.options?.length||(this._addSelectRow(),this._addSelectRow());break;case`button`:this._sv(`f-btn-text`,e.text),this._sv(`f-btn-name`,e.name);let t=this.shadow.querySelector(`input[name="btn-type"][value="${e.btnType??`button`}"]`);t&&(t.checked=!0);let n=this.shadow.getElementById(`f-btn-style`);n&&(n.value=e.btnStyle??`default`);break;case`date`:this._sv(`f-date-label`,e.label),this._sv(`f-date-min`,e.min),this._sv(`f-date-max`,e.max),this._sv(`f-date-val`,e.value),this._sv(`f-date-name`,e.name),this._sc(`f-date-req`,e.ariaRequired);break}}_sv(e,t){let n=this.shadow.getElementById(e);n&&t!=null&&(n.value=t)}_sc(e,t){let n=this.shadow.getElementById(e);n&&(n.checked=t??!1)}_v(e){return(this.shadow.getElementById(e)?.value??``).trim()}_c(e){return this.shadow.getElementById(e)?.checked??!1}_buildConfig(){let e=br(this.activeType);switch(this.activeType){case`text`:return{type:`text`,label:this._v(`f-label`)||void 0,name:this._v(`f-name`)||void 0,id:e,placeholder:this._v(`f-text-ph`)||void 0,maxlength:Number(this._v(`f-text-ml`))||void 0,value:this._v(`f-text-val`)||void 0,ariaRequired:this._c(`f-aria-req`)||void 0,autoLabel:!0};case`textarea`:return{type:`textarea`,label:this._v(`f-ta-label`)||void 0,name:this._v(`f-ta-name`)||void 0,id:e,placeholder:this._v(`f-ta-ph`)||void 0,rows:Number(this._v(`f-ta-rows`))||4,ariaRequired:this._c(`f-ta-req`)||void 0,autoLabel:!0};case`checkbox`:return{type:`checkbox`,checkLabel:this._v(`f-cb-lbl`)||void 0,name:this._v(`f-cb-name`)||void 0,id:e,checked:this._c(`f-cb-checked`)||void 0,ariaRequired:this._c(`f-cb-req`)||void 0};case`radio`:{let t=[];this.shadow.getElementById(`radio-opts`).querySelectorAll(`.opt-row`).forEach(e=>{let n=e.querySelector(`.opt-label`).value.trim(),r=!!e.querySelector(`button[title="기본 선택"]`)?.dataset.default;n&&t.push({label:n,value:n,defaultChecked:r||void 0})});let n=this._v(`f-radio-gn`)||e;return{type:`radio`,label:this._v(`f-radio-label`)||void 0,name:n,groupName:n,id:e,options:t,autoLabel:!0}}case`select`:{let t=[];return this.shadow.getElementById(`select-opts`).querySelectorAll(`.opt-row`).forEach(e=>{let n=e.querySelector(`.opt-label`).value.trim(),r=!!e.querySelector(`button[title="기본 선택"]`)?.dataset.default;n&&t.push({label:n,value:n,selected:r||void 0})}),{type:`select`,label:this._v(`f-sel-label`)||void 0,name:this._v(`f-sel-name`)||void 0,id:e,multiple:this._c(`f-sel-multi`)||void 0,options:t,autoLabel:!0}}case`button`:{let t=this.shadow.querySelector(`input[name="btn-type"]:checked`)?.value??`button`,n=this.shadow.getElementById(`f-btn-style`)?.value??`default`;return{type:`button`,text:this._v(`f-btn-text`)||`버튼`,name:this._v(`f-btn-name`)||void 0,id:e,btnType:t,btnStyle:n}}case`date`:return{type:`date`,label:this._v(`f-date-label`)||void 0,name:this._v(`f-date-name`)||void 0,id:e,min:this._v(`f-date-min`)||void 0,max:this._v(`f-date-max`)||void 0,value:this._v(`f-date-val`)||void 0,ariaRequired:this._c(`f-date-req`)||void 0,autoLabel:!0}}}_updatePreview(){let e=this.shadow.getElementById(`preview-box`);if(e)try{let t=Sr(this._buildConfig());e.innerHTML=M.sanitize(t,{USE_PROFILES:{html:!0},ADD_ATTR:[`disabled`,`readonly`,`checked`,`selected`,`multiple`,`required`,`placeholder`,`maxlength`,`rows`,`cols`,`min`,`max`,`for`,`aria-required`,`aria-describedby`,`style`],FORBID_ATTR:[`onerror`,`onload`,`onclick`,`onmouseover`]})}catch{e.innerHTML=``}}_confirm(){let e=this._buildConfig();this.dispatchEvent(new CustomEvent(`poa-form-insert`,{bubbles:!0,composed:!0,detail:{config:e}})),this.close()}},Ni=`
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
`,Pi=class extends HTMLElement{shadow;mgr;expanded=new Set;selectedId=null;editingId=null;ctxMenu=null;connectedCallback(){this.shadow=this.attachShadow({mode:`open`}),this.shadow.innerHTML=`<style>${Ni}</style><div class="tree" id="tree"></div>`}setManager(e){this.mgr=e,e.getRoots().filter(e=>e.type===`folder`).forEach(e=>this.expanded.add(e.id)),this.render()}render(){if(!this.mgr)return;let e=this.shadow.getElementById(`tree`);e.innerHTML=``,this.mgr.getRoots().forEach(t=>e.appendChild(this._renderNode(t,0)));let t=document.createElement(`button`);t.className=`add-btn`,t.textContent=`📁 폴더 추가`,t.addEventListener(`click`,()=>this.addFolder(null)),e.appendChild(t)}getSelected(){return this.selectedId?this.mgr.getById(this.selectedId):null}addFolder(e){e&&this.expanded.add(e);let t=this.mgr.addFolder(`새 폴더`,e);this.editingId=t.id,this.render()}_renderNode(e,t){let n=document.createElement(`div`),r=document.createElement(`div`);r.className=`node-row${this.selectedId===e.id?` selected`:``}`,r.style.paddingLeft=`${8+t*16}px`;let i=document.createElement(`span`);e.type===`folder`?(i.className=`arrow`,i.textContent=this.expanded.has(e.id)?`▼`:`▶`):i.className=`arrow-spacer`;let a=document.createElement(`span`);if(a.className=`icon`,a.textContent=e.type===`folder`?`📁`:`📄`,r.appendChild(i),r.appendChild(a),this.editingId===e.id){let t=document.createElement(`input`);t.type=`text`,t.className=`inline-input`,t.value=e.name,t.addEventListener(`keydown`,n=>{n.key===`Enter`&&this._commitEdit(e.id,t.value),n.key===`Escape`&&(this.editingId=null,this.render()),n.stopPropagation()}),t.addEventListener(`blur`,()=>this._commitEdit(e.id,t.value)),r.appendChild(t),requestAnimationFrame(()=>{t.focus(),t.select()})}else{let t=document.createElement(`span`);t.className=`label`,t.textContent=e.name,r.appendChild(t)}return r.addEventListener(`click`,t=>{t.stopPropagation(),this._select(e)}),r.addEventListener(`dblclick`,t=>{t.stopPropagation(),e.type===`template`&&this._emit(`poa-tmpl-dblclick`,{node:e})}),r.addEventListener(`contextmenu`,t=>{t.preventDefault(),t.stopPropagation(),this._showCtx(e,t.clientX,t.clientY)}),n.appendChild(r),e.type===`folder`&&this.expanded.has(e.id)&&this.mgr.getChildren(e.id).forEach(e=>n.appendChild(this._renderNode(e,t+1))),n}_select(e){e.type===`folder`&&(this.expanded.has(e.id)?this.expanded.delete(e.id):this.expanded.add(e.id)),this.selectedId=e.id,this.render(),this._emit(`poa-tmpl-select`,{node:e})}_commitEdit(e,t){t.trim()&&this.mgr.rename(e,t.trim()),this.editingId=null,this.render()}_showCtx(e,t,n){this._hideCtx();let r=document.createElement(`div`);r.className=`ctx-menu`,r.style.left=`${t}px`,r.style.top=`${n}px`;let i=document.createElement(`button`);i.textContent=`이름 변경`,i.addEventListener(`click`,()=>{this._hideCtx(),this.editingId=e.id,this.render()});let a=document.createElement(`button`);if(a.textContent=`삭제`,a.className=`danger`,a.addEventListener(`click`,()=>{this._hideCtx(),this.mgr.delete(e.id),this.expanded.delete(e.id),this.selectedId===e.id&&(this.selectedId=null),this.render(),this._emit(`poa-tmpl-delete`,{id:e.id})}),r.appendChild(i),e.type===`template`){let t=document.createElement(`button`);t.textContent=`사용자 링크 복사`,t.addEventListener(`click`,()=>{this._hideCtx();let t=ui(e.id);navigator.clipboard.writeText(t).then(()=>{this._emit(`poa-tmpl-copy-link`,{id:e.id,url:t})}).catch(()=>{this._emit(`poa-tmpl-copy-link`,{id:e.id,url:t})})}),r.appendChild(t)}r.appendChild(a),this.shadow.appendChild(r),this.ctxMenu=r,setTimeout(()=>document.addEventListener(`click`,()=>this._hideCtx(),{once:!0}),0)}_hideCtx(){this.ctxMenu?.remove(),this.ctxMenu=null}_emit(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}},Fi=`
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

/* 토스트 알림 */
.tmpl-toast {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  background: #1F2937; color: #fff; font-size: 13px; border-radius: 8px;
  padding: 8px 18px; white-space: nowrap; z-index: 200;
  animation: tmpl-fadein .2s ease;
}
@keyframes tmpl-fadein { from { opacity: 0; transform: translateX(-50%) translateY(6px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
`,Ii=`
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
`,Li=class extends HTMLElement{shadow;mgr;tree;selected=null;_getEditorHTML=null;connectedCallback(){this.shadow=this.attachShadow({mode:`open`}),this.shadow.innerHTML=`<style>${Fi}</style>${Ii}`,this.mgr=new mi,this.tree=this.shadow.querySelector(`poa-template-tree`),this.tree.setManager(this.mgr),this._bind()}setup(e){this._getEditorHTML=e}open(){this.selected=null,this._refreshPreview(),this._fillFolderSelect(),this.tree.render(),this.setAttribute(`open`,``)}close(){this.removeAttribute(`open`)}_bind(){this.shadow.querySelector(`.x-btn`).addEventListener(`click`,()=>this.close()),this.addEventListener(`click`,e=>{e.composedPath()[0]===this&&this.close()}),this.shadow.getElementById(`btn-add-folder`).addEventListener(`click`,()=>{let e=this.tree.getSelected(),t=e?.type===`folder`?e.id:null;this.tree.addFolder(t)}),this.shadow.getElementById(`btn-save-tmpl`).addEventListener(`click`,()=>{this._fillFolderSelect(),this.shadow.getElementById(`save-name`).value=``,this.shadow.getElementById(`save-overlay`).classList.remove(`hidden`),setTimeout(()=>this.shadow.getElementById(`save-name`).focus(),50)}),this.shadow.getElementById(`save-cancel`).addEventListener(`click`,()=>{this.shadow.getElementById(`save-overlay`).classList.add(`hidden`)}),this.shadow.getElementById(`save-ok`).addEventListener(`click`,()=>this._doSave()),this.shadow.getElementById(`save-name`).addEventListener(`keydown`,e=>{e.key===`Enter`&&this._doSave()}),this.shadow.getElementById(`btn-append`).addEventListener(`click`,()=>this._apply(`append`)),this.shadow.getElementById(`btn-replace`).addEventListener(`click`,()=>this._apply(`replace`)),this.shadow.addEventListener(`poa-tmpl-copy-link`,()=>{this._showToast(`링크가 복사되었습니다.`)}),this.shadow.addEventListener(`poa-tmpl-select`,e=>{let{node:t}=e.detail;this.selected=t.type===`template`?t:null,this._refreshPreview()}),this.shadow.addEventListener(`poa-tmpl-dblclick`,e=>{let{node:t}=e.detail;this.selected=t,this._apply(`replace`)})}_refreshPreview(){let e=this.shadow.getElementById(`preview-frame`),t=this.shadow.getElementById(`preview-empty`),n=this.shadow.getElementById(`btn-append`),r=this.shadow.getElementById(`btn-replace`);if(!this.selected||this.selected.type!==`template`){e.classList.add(`hidden`),t.classList.remove(`hidden`),n.disabled=!0,r.disabled=!0;return}e.srcdoc=`<!doctype html><html><head><style>
       body{font-family:'맑은 고딕','Malgun Gothic',sans-serif;font-size:14px;
            padding:12px;margin:0;color:#222;line-height:1.6;}
       h1,h2,h3{margin:.5em 0;}p{margin:.4em 0;}
       ul,ol{margin:.4em 0;padding-left:1.5em;}hr{border:none;border-top:1px solid #e5e7eb;}
       </style></head><body>${String(M.sanitize(this.selected.content??``,{USE_PROFILES:{html:!0}}))}</body></html>`,e.classList.remove(`hidden`),t.classList.add(`hidden`),n.disabled=!1,r.disabled=!1}_apply(e){if(!this.selected?.content)return;let t=String(M.sanitize(this.selected.content,{USE_PROFILES:{html:!0}}));this.dispatchEvent(new CustomEvent(`poa-tmpl-insert`,{bubbles:!0,composed:!0,detail:{html:t,mode:e}})),e===`append`&&this.close()}_doSave(){let e=this.shadow.getElementById(`save-name`).value.trim();if(!e){this.shadow.getElementById(`save-name`).focus();return}let t=this.shadow.getElementById(`save-folder`).value||null,n=this.shadow.getElementById(`save-public`).checked,r=this._getEditorHTML?.()??``;this.mgr.addTemplate(e,r,t,n),this.tree.render(),this.shadow.getElementById(`save-overlay`).classList.add(`hidden`)}_showToast(e){let t=document.createElement(`div`);t.className=`tmpl-toast`,t.textContent=e,this.shadow.querySelector(`.dlg`).appendChild(t),setTimeout(()=>t.remove(),2200)}_fillFolderSelect(){let e=this.shadow.getElementById(`save-folder`);e.innerHTML=``;let t=this.mgr.getFolders().find(e=>!e.isPublic);for(let n of this.mgr.getFolders()){let r=document.createElement(`option`);r.value=n.id,r.textContent=n.name,n===t&&(r.selected=!0),e.appendChild(r)}}},Ri=`poa-signatures`,zi=10;function Bi(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`}function Z(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Vi(e){let{layout:t,fields:n,logo:r,headerColor:i=`#2563eb`}=e,a=n.displayName?`<strong style="font-size:15px;color:#111;">${Z(n.displayName)}</strong>`:``,o=[n.title,n.department].filter(Boolean).map(Z).join(` | `),s=n.company?`<span style="color:#555;">${Z(n.company)}</span>`:``,c=n.phone?`<span style="color:#888;font-size:12px;">T.</span>&nbsp;${Z(n.phone)}`:``,l=n.email?`<span style="color:#888;font-size:12px;">E.</span>&nbsp;${Z(n.email)}`:``,u=n.website?`<span style="color:#888;font-size:12px;">W.</span>&nbsp;${Z(n.website)}`:``,d=[o?`<span style="color:#555;">${o}</span>`:``,s,c,l,u].filter(Boolean),f=r?`<img src="${Z(r)}" alt="" style="max-width:80px;max-height:60px;display:block;">`:``,p=`font-size:14px;line-height:1.6;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;`,m=()=>[a,...d].filter(Boolean).join(`<br>`);switch(t){case 1:return`<table class="poa-signature" style="${p}"><tbody><tr><td style="padding:8px 0;vertical-align:top;">${m()}</td></tr></tbody></table>`;case 2:return r?`<table class="poa-signature" style="${p}"><tbody><tr><td style="padding:0 14px 0 0;vertical-align:middle;border-right:2px solid #e5e7eb;">${f}</td><td style="padding:0 0 0 14px;vertical-align:middle;">${m()}</td></tr></tbody></table>`:Vi({...e,layout:1});case 3:return r?`<table class="poa-signature" style="${p}"><tbody><tr><td style="text-align:center;padding-bottom:6px;">${f}</td></tr><tr><td style="padding:4px 0;">${m()}</td></tr></tbody></table>`:Vi({...e,layout:1});case 4:return`<table class="poa-signature" style="${p}"><tbody><tr><td style="padding:8px 0;vertical-align:top;">${a?a+`<br>`:``}<hr style="border:none;border-top:1px solid #aaa;margin:4px 0;">${d.join(`<br>`)}</td></tr></tbody></table>`;case 5:{let e=[a,n.department?`<span style="color:#555;">${Z(n.department)}</span>`:``].filter(Boolean).join(`<br>`),t=[n.title?`<span style="color:#555;">${Z(n.title)}</span>`:``,s].filter(Boolean).join(`<br>`),r=[c,l].filter(Boolean).join(`&nbsp;|&nbsp;`);return`<table class="poa-signature" style="${p}"><tbody><tr><td style="padding:4px 14px 4px 0;border-right:1px solid #ddd;vertical-align:top;">${e||`&nbsp;`}</td><td style="padding:4px 0 4px 14px;vertical-align:top;">${t||`&nbsp;`}</td></tr>`+(r?`<tr><td colspan="2" style="padding:6px 0 4px;border-top:1px solid #eee;font-size:13px;">${r}</td></tr>`:``)+`</tbody></table>`}case 6:{let e=[n.displayName?`<strong style="color:#fff;">${Z(n.displayName)}</strong>`:``,n.title?`<span style="color:rgba(255,255,255,.85);">${Z(n.title)}</span>`:``].filter(Boolean).join(`&nbsp;&nbsp;`),t=[n.department?`<span style="color:#555;">${Z(n.department)}</span>`:``,s,c,l,u].filter(Boolean);return`<table class="poa-signature" style="${p}border:1px solid ${Z(i)};"><tbody><tr><td style="background:${Z(i)};padding:8px 16px;">${e||`&nbsp;`}</td></tr><tr><td style="padding:8px 16px;">${t.join(`<br>`)||`&nbsp;`}</td></tr></tbody></table>`}default:return``}}var Hi=class{sigs=[];constructor(){this._load()}_load(){try{let e=localStorage.getItem(Ri);this.sigs=e?JSON.parse(e):[]}catch{this.sigs=[]}}_persist(){try{localStorage.setItem(Ri,JSON.stringify(this.sigs))}catch{}}getAll(){return[...this.sigs]}getById(e){return this.sigs.find(t=>t.id===e)??null}add(e){if(this.sigs.length>=zi)throw Error(`최대 ${zi}개까지 저장할 수 있습니다.`);let t={...e,id:Bi(),createdAt:Date.now(),updatedAt:Date.now()};return this.sigs.push(t),this._persist(),t}update(e,t){let n=this.sigs.find(t=>t.id===e);return n?(Object.assign(n,t,{updatedAt:Date.now()}),this._persist(),!0):!1}delete(e){let t=this.sigs.findIndex(t=>t.id===e);return t<0?!1:(this.sigs.splice(t,1),this._persist(),!0)}isFull(){return this.sigs.length>=zi}},Ui={1:`기본형`,2:`로고(좌)`,3:`로고(상)`,4:`구분선형`,5:`2단형`,6:`컬러헤더`},Wi=`
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
`,Gi=`
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
`,Ki=class extends HTMLElement{shadow;mgr;selectedId=null;currentLayout=1;currentLogo;currentHeaderColor=`#2563eb`;connectedCallback(){this.shadow=this.attachShadow({mode:`open`}),this.shadow.innerHTML=`<style>${Wi}</style>${Gi}`,this.mgr=new Hi,this._buildLayoutGrid(),this._bind()}open(){this.mgr=new Hi,this._renderList();let e=this.mgr.getAll();e.length>0?this._loadSignature(e[0].id):this._newSignature(),this.setAttribute(`open`,``)}close(){this.removeAttribute(`open`)}_buildLayoutGrid(){let e=this.shadow.getElementById(`layout-grid`);e.innerHTML=``,[1,2,3,4,5,6].forEach(t=>{let n=document.createElement(`button`);n.className=`layout-card${t===this.currentLayout?` active`:``}`,n.dataset.layout=String(t),n.innerHTML=`<span class="layout-num">${t}</span>${Ui[t]}`,n.addEventListener(`click`,()=>this._setLayout(t)),e.appendChild(n)})}_bind(){this.shadow.querySelector(`.x-btn`).addEventListener(`click`,()=>this.close()),this.addEventListener(`click`,e=>{e.composedPath()[0]===this&&this.close()}),this.shadow.getElementById(`btn-new`).addEventListener(`click`,()=>this._newSignature()),this.shadow.getElementById(`btn-delete`).addEventListener(`click`,()=>{if(!this.selectedId)return;this.mgr.delete(this.selectedId),this.selectedId=null,this._renderList();let e=this.mgr.getAll();e.length>0?this._loadSignature(e[0].id):this._newSignature()}),this.shadow.getElementById(`f-hdr-color`).addEventListener(`input`,e=>{this.currentHeaderColor=e.target.value,this._refreshPreview()});for(let e of[`f-name`,`f-title`,`f-dept`,`f-company`,`f-phone`,`f-email`,`f-website`,`f-signame`])this.shadow.getElementById(e).addEventListener(`input`,()=>this._refreshPreview());this.shadow.getElementById(`btn-logo`).addEventListener(`click`,()=>{this.shadow.getElementById(`logo-input`).click()}),this.shadow.getElementById(`btn-logo-rm`).addEventListener(`click`,()=>{this.currentLogo=void 0,this.shadow.getElementById(`logo-preview`).classList.add(`hidden`),this.shadow.getElementById(`logo-preview`).innerHTML=``,this._refreshPreview()}),this.shadow.getElementById(`logo-input`).addEventListener(`change`,e=>{let t=e.target.files?.[0];t&&this._handleLogoUpload(t)}),this.shadow.getElementById(`btn-save`).addEventListener(`click`,()=>this._doSave()),this.shadow.getElementById(`btn-insert`).addEventListener(`click`,()=>this._doInsert())}_renderList(){let e=this.shadow.getElementById(`sig-list`);e.innerHTML=``;for(let t of this.mgr.getAll()){let n=document.createElement(`div`);n.className=`sig-item${t.id===this.selectedId?` selected`:``}`,n.textContent=t.name||`(이름 없음)`,n.dataset.id=t.id,n.addEventListener(`click`,()=>this._loadSignature(t.id)),e.appendChild(n)}}_loadSignature(e){let t=this.mgr.getById(e);t&&(this.selectedId=e,this.currentLayout=t.layout,this.currentLogo=t.logo,this.currentHeaderColor=t.headerColor??`#2563eb`,this._val(`f-signame`,t.name),this._val(`f-name`,t.fields.displayName),this._val(`f-title`,t.fields.title),this._val(`f-dept`,t.fields.department),this._val(`f-company`,t.fields.company),this._val(`f-phone`,t.fields.phone),this._val(`f-email`,t.fields.email),this._val(`f-website`,t.fields.website),this.shadow.getElementById(`f-hdr-color`).value=this.currentHeaderColor,this._syncLayoutCards(),this._syncColorRow(),this._syncLogoPreview(),this._renderList(),this._refreshPreview())}_newSignature(){this.selectedId=null,this.currentLayout=1,this.currentLogo=void 0,this.currentHeaderColor=`#2563eb`,[`f-signame`,`f-name`,`f-title`,`f-dept`,`f-company`,`f-phone`,`f-email`,`f-website`].forEach(e=>this._val(e,``)),this.shadow.getElementById(`f-hdr-color`).value=`#2563eb`,this._syncLayoutCards(),this._syncColorRow(),this.shadow.getElementById(`logo-preview`).classList.add(`hidden`),this.shadow.getElementById(`logo-preview`).innerHTML=``,this._renderList(),this._refreshPreview(),setTimeout(()=>this.shadow.getElementById(`f-signame`).focus(),50)}_setLayout(e){this.currentLayout=e,this._syncLayoutCards(),this._syncColorRow(),this._refreshPreview()}_syncLayoutCards(){this.shadow.querySelectorAll(`.layout-card`).forEach(e=>{e.classList.toggle(`active`,e.dataset.layout===String(this.currentLayout))})}_syncColorRow(){this.shadow.getElementById(`color-row`).classList.toggle(`hidden`,this.currentLayout!==6)}_refreshPreview(){let e=Vi({layout:this.currentLayout,fields:this._collectFields(),logo:this.currentLogo,headerColor:this.currentHeaderColor}),t=M.sanitize(e,{FORCE_BODY:!1,ADD_DATA_URI_TAGS:[`img`],ALLOWED_TAGS:[`table`,`tbody`,`tr`,`td`,`strong`,`span`,`img`,`hr`,`br`],ALLOWED_ATTR:[`style`,`class`,`alt`,`src`,`colspan`]}),n=this.shadow.getElementById(`preview-box`);n.innerHTML=t||`<div class="preview-empty">정보를 입력하면 미리보기가 표시됩니다</div>`}_handleLogoUpload(e){let t=this.shadow.getElementById(`logo-error`);if(e.size>204800){t.textContent=`파일 크기가 200KB를 초과합니다. (${Math.round(e.size/1024)}KB)`,t.classList.remove(`hidden`);return}t.classList.add(`hidden`);let n=new FileReader;n.onload=()=>{this.currentLogo=n.result,this._syncLogoPreview(),this._refreshPreview()},n.readAsDataURL(e)}_syncLogoPreview(){let e=this.shadow.getElementById(`logo-preview`);this.currentLogo?(e.innerHTML=`<img src="${this.currentLogo}" alt="로고 미리보기">`,e.classList.remove(`hidden`)):(e.innerHTML=``,e.classList.add(`hidden`))}_doSave(){let e=this.shadow.getElementById(`f-signame`).value.trim();if(!e){this.shadow.getElementById(`f-signame`).focus();return}let t={name:e,layout:this.currentLayout,fields:this._collectFields(),logo:this.currentLogo,headerColor:this.currentHeaderColor};try{if(this.selectedId)this.mgr.update(this.selectedId,t);else{let e=this.mgr.add(t);this.selectedId=e.id}this._renderList()}catch(e){let t=this.shadow.getElementById(`logo-error`);t.textContent=e.message,t.classList.remove(`hidden`)}}_doInsert(){let e=Vi({layout:this.currentLayout,fields:this._collectFields(),logo:this.currentLogo,headerColor:this.currentHeaderColor});e&&(this.dispatchEvent(new CustomEvent(`poa-signature-insert`,{bubbles:!0,composed:!0,detail:{html:e}})),this.close())}_val(e,t){this.shadow.getElementById(e).value=t}_collectFields(){return{displayName:this.shadow.getElementById(`f-name`).value.trim(),title:this.shadow.getElementById(`f-title`).value.trim(),department:this.shadow.getElementById(`f-dept`).value.trim(),company:this.shadow.getElementById(`f-company`).value.trim(),phone:this.shadow.getElementById(`f-phone`).value.trim(),email:this.shadow.getElementById(`f-email`).value.trim(),website:this.shadow.getElementById(`f-website`).value.trim()}}},qi=`
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
`,Ji=class extends HTMLElement{shadow;inserter=new Nr;activeCatId=Ar[0].id;connectedCallback(){this.shadow=this.attachShadow({mode:`open`}),this.shadow.innerHTML=`<style>${qi}</style>
<div class="dlg">
  <div class="hdr"><h3>이모지</h3><button class="x-btn" aria-label="닫기">✕</button></div>
  <div class="search-wrap"><input class="search-input" id="search" type="text" placeholder="🔍 이모지 검색…"></div>
  <div class="body">
    <div class="emoji-area" id="emoji-area"></div>
    <div class="cat-bar" id="cat-bar"></div>
  </div>
</div>`,this._buildCatBar(),this._bind()}open(){this._renderCategory(this.activeCatId),this.setAttribute(`open`,``),setTimeout(()=>this.shadow.getElementById(`search`).focus(),50)}close(){this.removeAttribute(`open`)}_buildCatBar(){let e=this.shadow.getElementById(`cat-bar`);e.innerHTML=``;for(let t of Ar){let n=document.createElement(`button`);n.className=`cat-btn${t.id===this.activeCatId?` active`:``}`,n.title=t.label,n.textContent=t.icon,n.dataset.catId=t.id,n.addEventListener(`click`,()=>{this.activeCatId=t.id,this._syncCatBar(),this._renderCategory(t.id),this.shadow.getElementById(`search`).value=``}),e.appendChild(n)}}_syncCatBar(){this.shadow.querySelectorAll(`.cat-btn`).forEach(e=>{e.classList.toggle(`active`,e.dataset.catId===this.activeCatId)})}_renderCategory(e){let t=this.shadow.getElementById(`emoji-area`);t.innerHTML=``;let n=this.inserter.getRecent();if(n.length>0){this._appendSection(t,`최근 사용`,n);let e=document.createElement(`hr`);e.className=`divider`,t.appendChild(e)}let r=Ar.find(t=>t.id===e);r&&this._appendSection(t,r.label,r.emojis)}_renderSearch(e){let t=this.shadow.getElementById(`emoji-area`);t.innerHTML=``;let n=Mr(e);if(n.length===0){let n=document.createElement(`div`);n.className=`no-result`,n.textContent=`"${e}"에 대한 결과가 없습니다`,t.appendChild(n)}else this._appendSection(t,`검색 결과 (${n.length})`,n)}_appendSection(e,t,n){let r=document.createElement(`div`);r.className=`section-label`,r.textContent=t,e.appendChild(r);let i=document.createElement(`div`);i.className=`emoji-grid`;for(let e of n){let t=document.createElement(`button`);t.className=`emoji-btn`,t.textContent=e,t.title=e,t.addEventListener(`click`,()=>this._pickEmoji(e)),i.appendChild(t)}e.appendChild(i)}_bind(){this.shadow.querySelector(`.x-btn`).addEventListener(`click`,()=>this.close()),this.addEventListener(`click`,e=>{e.composedPath()[0]===this&&this.close()});let e=this.shadow.getElementById(`search`);e.addEventListener(`input`,()=>{let t=e.value.trim();t?this._renderSearch(t):this._renderCategory(this.activeCatId)}),e.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.stopPropagation(),this.close())})}_pickEmoji(e){this.dispatchEvent(new CustomEvent(`poa-emoji-insert`,{bubbles:!0,composed:!0,detail:{emoji:e}})),this.shadow.getElementById(`search`).value.trim()||this._renderCategory(this.activeCatId)}},Yi=`
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
`,Xi=class extends HTMLElement{shadow;mode=`add`;editId=null;entries=[];connectedCallback(){this.shadow=this.attachShadow({mode:`open`}),this.shadow.innerHTML=`<style>${Yi}</style>
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
</div>`,this._bind()}openAdd(e){this.mode=`add`,this.editId=null,this._val(`f-title`,``),this._val(`f-content`,``),this._showEditPanel(`툴팁 추가`,`추가`),this.shadow.getElementById(`anchor-wrap`).classList.remove(`hidden`),this.shadow.getElementById(`anchor-text`).textContent=`"${e}"`,this._updatePreview(),this.setAttribute(`open`,``),setTimeout(()=>this.shadow.getElementById(`f-title`).focus(),50)}openEdit(e){this.mode=`edit`,this.editId=e.id,this._val(`f-title`,e.title),this._val(`f-content`,e.content),this._showEditPanel(`툴팁 수정`,`저장`),this.shadow.getElementById(`anchor-wrap`).classList.remove(`hidden`),this.shadow.getElementById(`anchor-text`).textContent=`"${e.anchorText}"`,this._updatePreview(),this.setAttribute(`open`,``),setTimeout(()=>this.shadow.getElementById(`f-content`).focus(),50)}openList(e){this.mode=`list`,this.entries=e,this._showListPanel(),this._renderList(),this.setAttribute(`open`,``)}close(){this.removeAttribute(`open`)}_showEditPanel(e,t){this.shadow.getElementById(`dlg-title`).textContent=e,this.shadow.getElementById(`edit-panel`).classList.remove(`hidden`),this.shadow.getElementById(`list-panel`).classList.add(`hidden`),this.shadow.getElementById(`edit-footer`).classList.remove(`hidden`),this.shadow.getElementById(`list-footer`).classList.add(`hidden`),this.shadow.getElementById(`btn-ok`).textContent=t}_showListPanel(){this.shadow.getElementById(`dlg-title`).textContent=`툴팁 목록`,this.shadow.getElementById(`edit-panel`).classList.add(`hidden`),this.shadow.getElementById(`list-panel`).classList.remove(`hidden`),this.shadow.getElementById(`edit-footer`).classList.add(`hidden`),this.shadow.getElementById(`list-footer`).classList.remove(`hidden`)}_renderList(){let e=this.entries.length;this.shadow.getElementById(`list-summary`).textContent=`문서 내 툴팁 ${e}개`;let t=this.shadow.getElementById(`list-items`);if(t.innerHTML=``,e===0){let e=document.createElement(`div`);e.className=`list-empty`,e.textContent=`툴팁이 없습니다`,t.appendChild(e);return}for(let e of this.entries){let n=document.createElement(`div`);n.className=`tt-item`,n.innerHTML=`<div class="tt-anchor">"${e.anchorText}"</div><div class="tt-content">→ ${e.content}</div><div class="tt-actions"><button class="tt-edit-btn" data-id="${e.id}">수정</button><button class="tt-del-btn"  data-id="${e.id}">삭제</button></div>`,n.querySelector(`.tt-edit-btn`).addEventListener(`click`,()=>this.openEdit(e)),n.querySelector(`.tt-del-btn`).addEventListener(`click`,()=>{this.dispatchEvent(new CustomEvent(`poa-tooltip-remove`,{bubbles:!0,composed:!0,detail:{id:e.id}})),this.entries=this.entries.filter(t=>t.id!==e.id),this._renderList()}),t.appendChild(n)}}_updatePreview(){let e=this.shadow.getElementById(`f-title`).value.trim(),t=this.shadow.getElementById(`f-content`).value.trim(),n=this.shadow.getElementById(`preview-title`),r=this.shadow.getElementById(`preview-body`);n.textContent=e,n.classList.toggle(`hidden`,!e),r.textContent=t||`내용을 입력하세요`}_bind(){this.shadow.querySelector(`.x-btn`).addEventListener(`click`,()=>this.close()),this.addEventListener(`click`,e=>{e.composedPath()[0]===this&&this.close()}),this.shadow.getElementById(`btn-cancel`).addEventListener(`click`,()=>this.close()),this.shadow.getElementById(`btn-close-list`).addEventListener(`click`,()=>this.close()),this.shadow.getElementById(`btn-del-all`).addEventListener(`click`,()=>{this.dispatchEvent(new CustomEvent(`poa-tooltip-remove-all`,{bubbles:!0,composed:!0})),this.entries=[],this._renderList()}),this.shadow.getElementById(`btn-ok`).addEventListener(`click`,()=>this._doOk());let e=()=>this._updatePreview();this.shadow.getElementById(`f-title`).addEventListener(`input`,e),this.shadow.getElementById(`f-content`).addEventListener(`input`,e),this.shadow.getElementById(`f-content`).addEventListener(`keydown`,e=>{(e.ctrlKey||e.metaKey)&&e.key===`Enter`&&this._doOk(),e.key===`Escape`&&(e.stopPropagation(),this.close())})}_doOk(){let e=this.shadow.getElementById(`f-title`).value.trim(),t=this.shadow.getElementById(`f-content`).value.trim();if(!t){this.shadow.getElementById(`f-content`).focus();return}this.mode===`edit`&&this.editId?this.dispatchEvent(new CustomEvent(`poa-tooltip-update`,{bubbles:!0,composed:!0,detail:{id:this.editId,title:e,content:t}})):this.dispatchEvent(new CustomEvent(`poa-tooltip-insert`,{bubbles:!0,composed:!0,detail:{title:e,content:t}})),this.close()}_val(e,t){this.shadow.getElementById(e).value=t}},Zi=`
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
`,Qi=class extends HTMLElement{shadow;targetInput=null;connectedCallback(){this.shadow||(this.shadow=this.attachShadow({mode:`open`}),this.shadow.innerHTML=`<style>${Zi}</style>${this._tpl()}`,this._bindEvents())}open(e){this.shadow||this.connectedCallback(),this.targetInput=e,this._populate(e),this.setAttribute(`open`,``)}close(){this.removeAttribute(`open`)}_tpl(){return`<div class="dlg">
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
</div>`}_populate(e){let t=this.shadow,n=e.style.width,r=t.querySelectorAll(`input[name="w-mode"]`),i=t.getElementById(`w-px`),a=t.getElementById(`w-pct`);!n||n===`100%`?r[0].checked=!0:n.endsWith(`px`)?(r[1].checked=!0,i.value=parseFloat(n).toString()):n.endsWith(`%`)?(r[2].checked=!0,a.value=parseFloat(n).toString()):r[0].checked=!0,i.disabled=!r[1].checked,a.disabled=!r[2].checked;let o=e.style.marginLeft,s=e.style.marginRight,c=t.getElementById(`align`);o===`auto`&&s===`auto`?c.value=`center`:o===`auto`?c.value=`right`:c.value=`left`,t.getElementById(`text-align`).value=e.style.textAlign||``;let l=t.getElementById(`placeholder`);l.value=e.placeholder??``,t.getElementById(`required`).checked=e.required??!1,t.getElementById(`disabled`).checked=e.disabled??!1}_bindEvents(){this.shadow.querySelector(`.x-btn`).addEventListener(`click`,()=>this.close()),this.shadow.getElementById(`btn-cancel`).addEventListener(`click`,()=>this.close()),this.shadow.getElementById(`btn-apply`).addEventListener(`click`,()=>this._apply()),this.shadow.addEventListener(`change`,e=>{let t=e.target;if(t.name===`w-mode`){let e=t.value;this.shadow.getElementById(`w-px`).disabled=e!==`px`,this.shadow.getElementById(`w-pct`).disabled=e!==`pct`}}),this.addEventListener(`click`,e=>{e.composedPath()[0]===this&&this.close()})}_apply(){let e=this.targetInput;if(!e){this.close();return}let t=this.shadow,n=t.querySelector(`input[name="w-mode"]:checked`)?.value??`full`;if(n===`full`)e.style.width=`100%`,e.style.maxWidth=`100%`;else if(n===`px`){let n=parseFloat(t.getElementById(`w-px`).value);n>0&&(e.style.width=`${n}px`)}else{let n=parseFloat(t.getElementById(`w-pct`).value);n>0&&(e.style.width=`${n}%`)}let r=t.getElementById(`align`).value;e.style.display=`block`,e.style.marginLeft=r===`center`||r===`right`?`auto`:``,e.style.marginRight=r===`center`||r===`left`?`auto`:``,r===`left`&&(e.style.marginLeft=``,e.style.marginRight=`auto`),r===`right`&&(e.style.marginLeft=`auto`,e.style.marginRight=``),e.style.textAlign=t.getElementById(`text-align`).value,e.placeholder=t.getElementById(`placeholder`).value,e.required=t.getElementById(`required`).checked,e.disabled=t.getElementById(`disabled`).checked,this.dispatchEvent(new CustomEvent(`poa-input-props-apply`,{bubbles:!0,composed:!0,detail:{el:e}})),this.close()}},$i=[{id:`file`,label:`파일`},{id:`edit`,label:`편집`},{id:`insert`,label:`삽입`},{id:`view`,label:`보기`},{id:`table`,label:`표`},{id:`format`,label:`서식`},{id:`misc`,label:`기타`},{id:`help`,label:`도움말`}],ea=`
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
.tab[data-user-disabled] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
.user-mode-badge {
  margin-left: auto;
  align-self: center;
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid #BFDBFE;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
`,ta=new Set([`edit`,`insert`,`table`,`format`,`misc`]),na=class extends HTMLElement{shadow;_activeTab=`edit`;_userMode=!1;busHandler=({tab:e})=>{this._activeTab=e,this.updateActive()};constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){let e=$i.map(e=>`<button class="tab${e.id===this._activeTab?` active`:``}" data-tab="${e.id}">${e.label}</button>`).join(``);this.shadow.innerHTML=`<style>${ea}</style><div class="menubar">${e}</div>`,this.shadow.querySelector(`.menubar`).addEventListener(`mousedown`,e=>{e.preventDefault();let t=e.target.dataset.tab;t&&P.emit(F.MENUBAR_CHANGE,{tab:t})}),P.on(F.MENUBAR_CHANGE,this.busHandler)}disconnectedCallback(){P.off(F.MENUBAR_CHANGE,this.busHandler)}applyUserMode(){this._userMode=!0,ta.has(this._activeTab)&&P.emit(F.MENUBAR_CHANGE,{tab:`file`}),this._applyUserModeStyles()}_applyUserModeStyles(){if(!this._userMode)return;this.shadow.querySelectorAll(`.tab`).forEach(e=>{let t=e.dataset.tab;ta.has(t)&&(e.dataset.userDisabled=`true`)});let e=this.shadow.querySelector(`.menubar`);if(!e.querySelector(`.user-mode-badge`)){let t=document.createElement(`span`);t.className=`user-mode-badge`,t.textContent=`사용자 모드`,e.appendChild(t)}}updateActive(){this.shadow.querySelectorAll(`.tab`).forEach(e=>{e.classList.toggle(`active`,e.dataset.tab===this._activeTab)})}},ra=`
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
`,ia=`
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
`,aa=`
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
`,oa=`
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
`,sa=`
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
`,ca=`
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
`,la=`
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
`,ua=`
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
`,da=`
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
`,fa=`
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
`,pa=`
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
`,ma=`
<svg
  class="lucide lucide-circle-play"
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
  <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
  <circle cx="12" cy="12" r="10" />
</svg>
`,ha=`
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
`,ga=`
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
`,_a=`
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
`,va=`
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
`,ya=`
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
`,ba=`
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
`,xa=`
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
`,Sa=`
<svg
  class="lucide lucide-file-output"
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
  <path d="M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="m5 11-3 3" />
  <path d="m5 17-3-3h10" />
</svg>
`,Ca=`
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
`,wa=`
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
`,Ta=`
<svg
  class="lucide lucide-film"
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
  <path d="M7 3v18" />
  <path d="M3 7.5h4" />
  <path d="M3 12h18" />
  <path d="M3 16.5h4" />
  <path d="M17 3v18" />
  <path d="M17 7.5h4" />
  <path d="M17 16.5h4" />
</svg>
`,Ea=`
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
`,Da=`
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
`,Oa=`
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
`,ka=`
<svg
  class="lucide lucide-image-plus"
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
  <path d="M16 5h6" />
  <path d="M19 2v6" />
  <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  <circle cx="9" cy="9" r="2" />
</svg>
`,Aa=`
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
`,ja=`
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
`,Ma=`
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
`,Na=`
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
`,Pa=`
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
`,Fa=`
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
`,Ia=`
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
`,La=`
<svg
  class="lucide lucide-layout-template"
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
  <rect width="18" height="7" x="3" y="3" rx="1" />
  <rect width="9" height="7" x="3" y="14" rx="1" />
  <rect width="5" height="7" x="16" y="14" rx="1" />
</svg>
`,Ra=`
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
`,za=`
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
`,Ba=`
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
`,Va=`
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
`,Ha=`
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
`,Ua=`
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
`,Wa=`
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
`,Ga=`
<svg
  class="lucide lucide-message-circle"
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
  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
</svg>
`,Ka=`
<svg
  class="lucide lucide-message-square"
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
  <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
</svg>
`,qa=`
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
`,Ja=`
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
`,Ya=`
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
`,Xa=`
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
`,Za=`
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
`,Qa=`
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
`,$a=`
<svg
  class="lucide lucide-pen-line"
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
  <path d="M13 21h8" />
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
</svg>
`,eo=`
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
`,to=`
<svg
  class="lucide lucide-rectangle-ellipsis"
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
  <rect width="20" height="12" x="2" y="6" rx="2" />
  <path d="M12 12h.01" />
  <path d="M17 12h.01" />
  <path d="M7 12h.01" />
</svg>
`,no=`
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
`,ro=`
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
`,io=`
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
`,ao=`
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
`,oo=`
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
`,so=`
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
`,co=`
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
`,lo=`
<svg
  class="lucide lucide-separator-horizontal"
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
  <path d="m16 16-4 4-4-4" />
  <path d="M3 12h18" />
  <path d="m8 8 4-4 4 4" />
</svg>
`,uo=`
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
`,fo=`
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
`,po=`
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
`,mo=`
<svg
  class="lucide lucide-smile"
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
  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
  <line x1="9" x2="9.01" y1="9" y2="9" />
  <line x1="15" x2="15.01" y1="9" y2="9" />
</svg>
`,ho=`
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
`,go=`
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
`,_o=`
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
`,vo=`
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
`,yo=`
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
`,bo=`
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
`,xo=`
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
`,So=`
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
`,Co=`
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
`,wo=`
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
`,To=`
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
`,Eo=`
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
`,Do=`
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
`,Oo=`
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
`,ko=`
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
`,Ao=`
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
`,jo=`
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
`,Mo=`
<svg
  class="lucide lucide-user"
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
  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
</svg>
`;function Q(e){return e.replace(/width="24"/,`width="16"`).replace(/height="24"/,`height="16"`)}var $={bold:Q(ua),italic:Q(Na),underline:Q(Ao),strike:Q(_o),undo:Q(jo),redo:Q(no),alignLeft:Q(Do),alignCenter:Q(wo),alignRight:Q(To),alignJustify:Q(Eo),indent:Q(Va),outdent:Q(Ba),foreColor:Q(ca),backColor:Q(Oa),lineHeight:Q(la),letterSpacing:Q(Ya),fileNew:Q(Ca),fileOpen:Q(Ea),save:Q(oo),fileSaveAs:Q(Sa),print:Q(eo),settings:Q(uo),clock:Q(_a),cut:Q(so),copy:Q(ba),paste:Q(ga),pastePlain:Q(ha),selectAll:Q(go),search:Q(co),imageEdit:Q(ka),image:Q(Aa),images:Q(ja),videoTag:Q(Ta),embedVideo:Q(ma),link:Q(za),linkOff:Q(Ra),bookmark:Q(fa),signature:Q($a),emoji:Q(mo),tooltip:Q(Ga),tooltipList:Q(Ka),calendar:Q(pa),hr:Q(qa),symbol:Q(Xa),youtube:Q(Ja),pageBreak:Q(lo),template:Q(La),formField:Q(to),viewDesign:Q(Fa),viewHtml:Q(va),viewPreview:Q(xa),viewText:Q(ko),viewPage:Q(wa),fullscreen:Q(Wa),ruler:Q(ao),grid:Q(Da),hiddenBorder:Q(go),table:Q(Co),tableProps:Q(So),cellProps:Q(Ia),mergeCells:Q(bo),splitCell:Q(xo),rowAbove:Q(sa),rowBelow:Q(ia),colLeft:Q(aa),colRight:Q(oa),rowDelete:Q(io),colDelete:Q(ya),tableDelete:Q(Oo),painterCopy:Q(Za),painterPaste:Q(Qa),formatClear:Q(ro),ul:Q(Ua),ol:Q(Ha),sup:Q(yo),sub:Q(vo),a11y:Q(ra),privacy:Q(fo),form:Q(ho),calc:Q(po),userMode:Q(Mo),shortcuts:Q(Pa),guide:Q(da),about:Q(Ma)},No={"file:new":`fileNew`,"file:open":`fileOpen`,"file:save":`save`,"file:saveas":`fileSaveAs`,"file:print":`print`,settings:`settings`,"edit:cut":`cut`,"edit:copy":`copy`,"edit:paste":`paste`,"edit:paste-plain":`pastePlain`,"edit:select-all":`selectAll`,"find-replace":`search`,"edit:image-edit":`imageEdit`,image:`image`,"insert:multi-image":`images`,"insert:video":`videoTag`,"insert:embed":`embedVideo`,"insert:link":`link`,"insert:link-remove":`linkOff`,"insert:bookmark":`bookmark`,"insert:signature":`signature`,"insert:emoji":`emoji`,"insert:tooltip":`tooltip`,"insert:tooltip-list":`tooltipList`,"insert:datetime":`calendar`,"insert:hr":`hr`,"insert:symbol":`symbol`,"insert:pagebreak":`pageBreak`,"misc:template":`template`,"view:design":`viewDesign`,"view:html":`viewHtml`,"view:preview":`viewPreview`,"view:text":`viewText`,"view:page":`viewPage`,"view:fullscreen":`fullscreen`,"view:ruler":`ruler`,"view:grid":`grid`,"view:hidden-border":`hiddenBorder`,table:`table`,"table:table-props":`tableProps`,"table:cell-props":`cellProps`,"table:merge":`mergeCells`,"table:split-cell":`splitCell`,"table:row-above":`rowAbove`,"table:row-below":`rowBelow`,"table:col-left":`colLeft`,"table:col-right":`colRight`,"table:row-delete":`rowDelete`,"table:col-delete":`colDelete`,"table:delete":`tableDelete`,"table:align-left":`alignLeft`,"table:align-center":`alignCenter`,"table:align-right":`alignRight`,"format:painter-copy":`painterCopy`,"format:painter-paste":`painterPaste`,"format:clear":`formatClear`,"format:ul":`ul`,"format:ol":`ol`,"format:sup":`sup`,"format:sub":`sub`,"misc:a11y":`a11y`,"misc:privacy":`privacy`,"misc:form":`form`,"misc:calc":`calc`,"misc:user-mode":`userMode`,"help:shortcuts":`shortcuts`,"help:guide":`guide`,"help:about":`about`},Po={text:`T`,number:`#`,date:`📅`};function Fo(){let e=[`기본`,`계약`,`금액`,`보증`,`기타`],t=[],n=!0;for(let r of e){let e=ti.filter(e=>e.category===r);if(e.length!==0){n||t.push([``,`__sep__`]),t.push([r,`__cat__`]),n=!1;for(let n of e)t.push([n.label,`insert:field`,n.id,Po[n.type]])}}return t}var Io={file:[[[`새 문서`,`file:new`],[`열기`,`file:open`],[`저장`,`file:save`],[`다른 이름으로 저장`,`file:saveas`]],[[`인쇄`,`file:print`],[`환경설정`,`settings`]]],edit:[[[`잘라내기`,`edit:cut`],[`복사`,`edit:copy`],[`붙여넣기`,`edit:paste`],[`서식 없이 붙여넣기`,`edit:paste-plain`]],[[`찾기·바꾸기`,`find-replace`],[`이미지 편집`,`edit:image-edit`],[`전체 선택`,`edit:select-all`]]],insert:[[[`이미지`,`image`],[`다중 이미지`,`insert:multi-image`]],[[`비디오 태그`,`insert:video`],[`외부 동영상`,`insert:embed`]],[[`하이퍼링크`,`insert:link`],[`책갈피`,`insert:bookmark`]],[[`서명`,`insert:signature`],[`이모지`,`insert:emoji`]],[[`툴팁`,`insert:tooltip`],[`툴팁 관리`,`insert:tooltip-list`]],[[`날짜·시간`,`insert:datetime`],[`가로줄`,`insert:hr`],[`기호`,`insert:symbol`],[`페이지 구분선`,`insert:pagebreak`],[`템플릿`,`misc:template`]],[{dropdown:!0,id:`doc-field`,label:`양식 필드`,iconKey:`formField`,items:Fo()}]],view:[[[`디자인`,`view:design`],[`HTML`,`view:html`],[`미리보기`,`view:preview`],[`텍스트`,`view:text`],[`페이지`,`view:page`]],[[`전체화면`,`view:fullscreen`],[`눈금자`,`view:ruler`],[`그리드`,`view:grid`],[`숨김 테두리`,`view:hidden-border`]]],table:[[[`표 삽입`,`table`],[`표 속성`,`table:table-props`],[`셀 속성`,`table:cell-props`]],[[`셀 병합`,`table:merge`],[`셀 나누기`,`table:split-cell`]],[[`위에 행 삽입`,`table:row-above`],[`아래에 행 삽입`,`table:row-below`],[`왼쪽에 열 삽입`,`table:col-left`],[`오른쪽에 열 삽입`,`table:col-right`]],[[`행 삭제`,`table:row-delete`],[`열 삭제`,`table:col-delete`],[`표 삭제`,`table:delete`]],[[`표 왼쪽 정렬`,`table:align-left`],[`표 가운데 정렬`,`table:align-center`],[`표 오른쪽 정렬`,`table:align-right`]]],format:[[[`서식 복사`,`format:painter-copy`],[`서식 붙여넣기`,`format:painter-paste`],[`서식 제거`,`format:clear`]],[[`글머리 기호`,`format:ul`],[`글머리 번호`,`format:ol`]],[[`위 첨자`,`format:sup`],[`아래 첨자`,`format:sub`]]],misc:[[[`웹 접근성 체크`,`misc:a11y`],[`개인정보 체크`,`misc:privacy`]],[[`폼 컨트롤`,`misc:form`],[`계산식`,`misc:calc`],[`템플릿`,`misc:template`]],[[`사용자 모드로 보기`,`misc:user-mode`]]],help:[[[`단축키`,`help:shortcuts`],[`사용자 가이드`,`help:guide`],[`제품 정보`,`help:about`]]]},Lo=new Set([`view:design`,`view:html`,`view:preview`,`view:text`,`view:page`]),Ro=`
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

/* 드롭다운 */
.dropdown-wrap { position: relative; }
.dropdown-toggle::after { content: ' ▾'; font-size: 9px; }
.dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% + 2px); left: 0;
  min-width: 160px;
  background: #fff;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,.12);
  z-index: 9999;
  padding: 4px 0;
  max-height: 400px;
  overflow-y: auto;
}
.dropdown-menu.open { display: block; }
.drop-item {
  display: flex; align-items: center; gap: 8px;
  padding: 5px 12px;
  font-size: 12px; color: #374151;
  cursor: pointer; white-space: nowrap;
}
.drop-item:hover { background: #F3F4F6; }
.drop-cat {
  padding: 5px 12px 3px;
  font-size: 10px; font-weight: 700; color: #9CA3AF;
  letter-spacing: .06em; text-transform: uppercase;
  cursor: default; white-space: nowrap;
}
.drop-sep {
  border: none; border-top: 1px solid #F3F4F6; margin: 3px 0;
}
.type-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px;
  font-size: 10px; font-weight: 700; color: #6B7280;
  background: #F3F4F6; border-radius: 2px; flex-shrink: 0;
}
#menu-doc-field { width: 220px; }

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
`,zo=new Set([`file:new`,`file:open`,`settings`]),Bo=class extends HTMLElement{shadow;activeTab=`edit`;activeViewMode=`design`;outsideHandler=null;userMode=!1;busHandler=({tab:e})=>{this.activeTab=e,this.render()};viewHandler=({mode:e})=>{this.activeViewMode=e,this.activeTab===`view`&&this.render()};constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.render(),P.on(F.MENUBAR_CHANGE,this.busHandler),P.on(F.VIEW_CHANGE,this.viewHandler)}disconnectedCallback(){P.off(F.MENUBAR_CHANGE,this.busHandler),P.off(F.VIEW_CHANGE,this.viewHandler),this.closeAllDropdowns()}render(){this.closeAllDropdowns();let e=Io[this.activeTab]??[],t=[];for(let n=0;n<e.length;n++){n>0&&t.push(`<div class="sep"></div>`),t.push(`<div class="group">`);for(let r of e[n])if(r===null)t.push(`<div class="sep" style="margin:0 2px;"></div>`);else if(`dropdown`in r&&r.dropdown){let e=r.items.map(([e,t,n,r])=>t===`__sep__`?`<hr class="drop-sep">`:t===`__cat__`?`<div class="drop-cat">${e}</div>`:`<div class="drop-item" data-action="${t}"${n?` data-value="${n}"`:``}>${r?`<span class="type-icon">${r}</span>`:``}${e}</div>`).join(``),n=r.iconKey?$[r.iconKey]??``:``,i=n?`${n}<span>${r.label}</span>`:r.label;t.push(`<div class="dropdown-wrap" id="dd-${r.id}"><button class="btn dropdown-toggle" data-dropdown-id="${r.id}">${i}</button><div class="dropdown-menu" id="menu-${r.id}">${e}</div></div>`)}else{let[e,n,i,a]=r,o=i?` data-value="${i}"`:``,s=Lo.has(n)&&n===`view:${this.activeViewMode}`?` active`:``,c=a??e,l=No[n],u=l?$[l]:``,d=u?`${u}<span>${e}</span>`:e;t.push(`<button class="btn${s}" data-action="${n}"${o} data-tip="${c}">${d}</button>`)}t.push(`</div>`)}this.shadow.innerHTML=`<style>${Ro}</style><div class="ctx-bar">${t.join(``)}</div>`,this.userMode&&this._applyUserModeButtons(),this.shadow.querySelector(`.ctx-bar`).addEventListener(`mousedown`,e=>{let t=e.target,n=t.closest(`.dropdown-toggle`);if(n){let t=n.dataset.dropdownId;if(!t)return;e.preventDefault();let r=this.shadow.getElementById(`menu-${t}`);if(!r)return;let i=r.classList.contains(`open`);this.closeAllDropdowns(),i||(r.classList.add(`open`),this.setupOutsideClick(t));return}let r=t.closest(`.drop-item`);if(r){let t=r.dataset.action,n=r.dataset.value;if(!t)return;e.preventDefault(),this.closeAllDropdowns(),this.dispatchEvent(new CustomEvent(`poa-action`,{bubbles:!0,composed:!0,detail:{type:t,value:n}}));return}let i=t.closest(`.btn`);if(!i||i.disabled)return;let a=i.dataset.action;if(!a)return;e.preventDefault();let o=i.dataset.value;this.dispatchEvent(new CustomEvent(`poa-action`,{bubbles:!0,composed:!0,detail:{type:a,value:o}}))})}closeAllDropdowns(){this.shadow.querySelectorAll(`.dropdown-menu.open`).forEach(e=>e.classList.remove(`open`)),this.outsideHandler&&=(document.removeEventListener(`mousedown`,this.outsideHandler),null)}setupOutsideClick(e){this.outsideHandler=t=>{let n=this.shadow.getElementById(`dd-${e}`);n&&(t.composedPath().includes(n)||this.closeAllDropdowns())},document.addEventListener(`mousedown`,this.outsideHandler)}applyUserMode(){this.userMode=!0,this._applyUserModeButtons()}_applyUserModeButtons(){this.shadow.querySelectorAll(`.btn[data-action]`).forEach(e=>{let t=e.dataset.action??``;zo.has(t)&&(e.disabled=!0,e.title=(e.title||e.textContent?.trim()||``)+` (사용자 모드에서 비활성화)`)})}},Vo=[{label:`기본`,value:`inherit`},{label:`맑은 고딕`,value:`맑은 고딕, sans-serif`},{label:`나눔고딕`,value:`나눔고딕, sans-serif`},{label:`나눔명조`,value:`나눔명조, serif`},{label:`굴림`,value:`굴림, sans-serif`},{label:`돋움`,value:`돋움, sans-serif`},{label:`바탕`,value:`바탕, serif`},{label:`궁서`,value:`궁서, serif`},{label:`Arial`,value:`Arial, sans-serif`},{label:`Times New Roman`,value:`Times New Roman, serif`},{label:`Courier New`,value:`Courier New, monospace`},{label:`Georgia`,value:`Georgia, serif`},{label:`Verdana`,value:`Verdana, sans-serif`},{label:`Tahoma`,value:`Tahoma, sans-serif`}],Ho=[`8`,`9`,`10`,`11`,`12`,`14`,`16`,`18`,`20`,`24`,`28`,`32`,`36`,`48`,`72`],Uo=[`1`,`1.2`,`1.4`,`1.5`,`1.6`,`1.8`,`2.0`,`2.5`],Wo=[`0px`,`0.5px`,`1px`,`1.5px`,`2px`,`3px`,`4px`],Go=`
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
`,Ko=`
<div class="toolbar">
  <div class="group">
    <select class="sel-family" id="sel-family" title="글꼴"></select>
    <select class="sel-size"   id="sel-size"   title="글자 크기 (pt)"></select>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-bold"      data-tip="굵게 (Ctrl+B)">${$.bold}</button>
    <button class="btn" id="btn-italic"    data-tip="기울임 (Ctrl+I)">${$.italic}</button>
    <button class="btn" id="btn-underline" data-tip="밑줄 (Ctrl+U)">${$.underline}</button>
    <button class="btn" id="btn-strike"    data-tip="취소선">${$.strike}</button>
  </div>
  <div class="sep"></div>

  <div class="group">
    <div class="color-wrap" data-tip="글자색">
      <button class="btn color-btn" id="btn-fore" data-tip="글자색">
        <span class="c-icon">${$.foreColor}</span>
        <span class="c-bar" id="fore-bar" style="background:#000000"></span>
      </button>
      <input type="color" class="color-input" id="fore-input" value="#000000">
    </div>
    <div class="color-wrap">
      <button class="btn color-btn" id="btn-back" data-tip="배경 강조색">
        <span class="c-icon">${$.backColor}</span>
        <span class="c-bar" id="back-bar" style="background:#FBBF24"></span>
      </button>
      <input type="color" class="color-input" id="back-input" value="#FBBF24">
    </div>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-al-left"    data-tip="왼쪽 정렬">${$.alignLeft}</button>
    <button class="btn" id="btn-al-center"  data-tip="가운데 정렬">${$.alignCenter}</button>
    <button class="btn" id="btn-al-right"   data-tip="오른쪽 정렬">${$.alignRight}</button>
    <button class="btn" id="btn-al-justify" data-tip="양쪽 정렬">${$.alignJustify}</button>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-indent"  data-tip="들여쓰기">${$.indent}</button>
    <button class="btn" id="btn-outdent" data-tip="내어쓰기">${$.outdent}</button>
  </div>
  <div class="sep"></div>

  <div class="group">
    <select class="sel-lh" id="sel-lh" title="줄 간격"></select>
    <select class="sel-ls" id="sel-ls" title="자간"></select>
  </div>
  <div class="sep"></div>

  <div class="group">
    <button class="btn" id="btn-undo" data-tip="실행 취소 (Ctrl+Z)">${$.undo}</button>
    <button class="btn" id="btn-redo" data-tip="다시 실행 (Ctrl+Y)">${$.redo}</button>
  </div>
</div>
`,qo=class extends HTMLElement{shadow;constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${Go}</style>${Ko}`,this.populateSelects(),this.bindEvents()}populateSelects(){let e=this.shadow,t=e.getElementById(`sel-family`);for(let{label:e,value:n}of Vo){let r=document.createElement(`option`);r.value=n,r.textContent=e,t.appendChild(r)}let n=e.getElementById(`sel-size`);for(let e of Ho){let t=document.createElement(`option`);t.value=`${e}pt`,t.textContent=e,n.appendChild(t)}n.value=`12pt`;let r=e.getElementById(`sel-lh`);for(let e of Uo){let t=document.createElement(`option`);t.value=e,t.textContent=`줄간 ${e}`,r.appendChild(t)}r.value=`1.5`;let i=e.getElementById(`sel-ls`);for(let e of Wo){let t=document.createElement(`option`);t.value=e,t.textContent=`자간 ${e}`,i.appendChild(t)}i.value=`0px`}bindEvents(){let e=this.shadow,t=(e,t)=>{this.dispatchEvent(new CustomEvent(`poa-action`,{bubbles:!0,composed:!0,detail:{type:e,value:t}}))},n=(n,r)=>{e.getElementById(n)?.addEventListener(`mousedown`,e=>{e.preventDefault(),t(`format`,r)})};n(`btn-bold`,`bold`),n(`btn-italic`,`italic`),n(`btn-underline`,`underline`),n(`btn-strike`,`strike`),e.getElementById(`fore-input`)?.addEventListener(`change`,n=>{let r=n.target.value;e.getElementById(`fore-bar`).style.background=r,t(`foreColor`,r)}),e.getElementById(`back-input`)?.addEventListener(`change`,n=>{let r=n.target.value;e.getElementById(`back-bar`).style.background=r,t(`backColor`,r)});let r=(n,r)=>{e.getElementById(n)?.addEventListener(`mousedown`,e=>{e.preventDefault(),t(`align`,r)})};r(`btn-al-left`,`left`),r(`btn-al-center`,`center`),r(`btn-al-right`,`right`),r(`btn-al-justify`,`justify`),e.getElementById(`btn-indent`)?.addEventListener(`mousedown`,e=>{e.preventDefault(),t(`indent`)}),e.getElementById(`btn-outdent`)?.addEventListener(`mousedown`,e=>{e.preventDefault(),t(`outdent`)}),e.getElementById(`btn-undo`)?.addEventListener(`mousedown`,e=>{e.preventDefault(),t(`undo`)}),e.getElementById(`btn-redo`)?.addEventListener(`mousedown`,e=>{e.preventDefault(),t(`redo`)}),e.getElementById(`sel-family`).addEventListener(`change`,e=>t(`fontFamily`,e.target.value)),e.getElementById(`sel-size`).addEventListener(`change`,e=>t(`fontSize`,e.target.value)),e.getElementById(`sel-lh`).addEventListener(`change`,e=>t(`lineHeight`,e.target.value)),e.getElementById(`sel-ls`).addEventListener(`change`,e=>t(`letterSpacing`,e.target.value))}setState(e){let t=this.shadow,n=(e,n)=>{t.getElementById(e)?.classList.toggle(`active`,n)},r=(e,n)=>{let r=t.getElementById(e);r&&(r.disabled=n)};if(n(`btn-bold`,e.bold),n(`btn-italic`,e.italic),n(`btn-underline`,e.underline),n(`btn-strike`,e.strike),n(`btn-al-left`,e.align===`left`),n(`btn-al-center`,e.align===`center`),n(`btn-al-right`,e.align===`right`),n(`btn-al-justify`,e.align===`justify`),r(`btn-undo`,!e.canUndo),r(`btn-redo`,!e.canRedo),e.fontFamily){let n=e.fontFamily.replace(/['"]/g,``).replace(/\s*,\s*/g,`, `).trim();t.getElementById(`sel-family`).value=n}e.fontSize&&(t.getElementById(`sel-size`).value=e.fontSize),e.lineHeight&&(t.getElementById(`sel-lh`).value=e.lineHeight),e.letterSpacing&&(t.getElementById(`sel-ls`).value=e.letterSpacing),e.foreColor&&(t.getElementById(`fore-bar`).style.background=e.foreColor,t.getElementById(`fore-input`).value=e.foreColor),e.backColor&&(t.getElementById(`back-bar`).style.background=e.backColor,t.getElementById(`back-input`).value=e.backColor)}setHistoryState(e,t){let n=this.shadow,r=n.getElementById(`btn-undo`),i=n.getElementById(`btn-redo`);r&&(r.disabled=!e),i&&(i.disabled=!t)}applyUserMode(){let e=this.shadow.querySelector(`.toolbar`);e&&(e.style.opacity=`0.5`),this.shadow.querySelectorAll(`button, select, input`).forEach(e=>{e.disabled=!0})}},Jo=class extends HTMLElement{shadow;docClickHandler=null;constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){let e=ri.map(e=>`<option value="${e.id}">${e.id}</option>`).join(``),t=[50,60,70,80,90,100,110,120,130,140,150,175,200].map(e=>`<option value="${e}">${e}%</option>`).join(``),n=ii;this.shadow.innerHTML=`
<style>
:host { display: block; box-sizing: border-box; }
.bar {
  display: flex; align-items: center; gap: 8px;
  padding: 3px 12px;
  background: var(--poa-statusbar-bg, #f5f5f5);
  border-top: 1px solid var(--poa-toolbar-border, #ddd);
  font-size: 11px; color: var(--poa-statusbar-color, #777);
  user-select: none; -webkit-user-select: none;
  position: relative;
}
.sep { width: 1px; height: 14px; background: #ddd; margin: 0 4px; }
.poa-paper-select,
.poa-zoom-select {
  height: 20px; border: 1px solid #ccc; border-radius: 3px;
  font-size: 11px; background: #fff; color: #555;
  padding: 0 2px; cursor: pointer;
}
.poa-zoom-btn {
  width: 20px; height: 20px; border: 1px solid #ccc; border-radius: 3px;
  background: #fff; color: #555; font-size: 14px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; padding: 0; flex-shrink: 0;
}
.poa-zoom-btn:hover { background: #eef3ff; border-color: #aab; }
/* ── 여백 버튼 ─────────────────────────────────────── */
.poa-margin-btn {
  height: 20px; border: 1px solid #ccc; border-radius: 3px;
  background: #fff; color: #555; font-size: 11px;
  padding: 0 6px; cursor: pointer; flex-shrink: 0;
  white-space: nowrap;
}
.poa-margin-btn:hover { background: #eef3ff; border-color: #aab; }
/* ── 여백 팝오버 ────────────────────────────────────── */
.margin-popup {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 0;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 10px 12px;
  z-index: 200;
  min-width: 180px;
  font-size: 12px;
  color: #374151;
}
.margin-popup.hidden { display: none; }
.margin-popup-title {
  font-weight: 600; font-size: 11px; color: #6b7280;
  margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.04em;
}
.margin-row {
  display: flex; align-items: center; gap: 4px;
  margin-bottom: 5px;
}
.margin-row label {
  display: flex; align-items: center; gap: 4px;
  font-size: 12px; color: #374151; user-select: none;
  width: 20px; justify-content: flex-end; flex-shrink: 0;
}
.margin-input {
  width: 52px; height: 22px; padding: 0 4px;
  border: 1px solid #d1d5db; border-radius: 4px;
  font-size: 12px; text-align: right; box-sizing: border-box;
  color: #111;
}
.margin-input:focus { outline: none; border-color: #2563eb; }
.margin-unit { color: #9ca3af; font-size: 11px; }
.margin-apply-btn {
  margin-top: 8px; width: 100%; height: 26px;
  border: 1px solid #2563eb; border-radius: 4px;
  background: #2563eb; color: #fff; font-size: 12px;
  cursor: pointer;
}
.margin-apply-btn:hover { background: #1d4ed8; }
</style>
<div class="bar">
  <span id="char-count">0자</span>
  <span id="word-count">0단어</span>
  <div class="sep"></div>
  <select id="paper-select" class="poa-paper-select" title="용지 크기">
    ${e}
  </select>
  <button id="margin-btn" class="poa-margin-btn" title="여백 설정">여백</button>
  <div id="margin-popup" class="margin-popup hidden">
    <div class="margin-popup-title">여백 (mm)</div>
    <div class="margin-row">
      <label>상</label>
      <input type="number" id="m-top"    class="margin-input" min="0" max="150" step="1" value="${n.top}">
      <span class="margin-unit">mm</span>
    </div>
    <div class="margin-row">
      <label>하</label>
      <input type="number" id="m-bottom" class="margin-input" min="0" max="150" step="1" value="${n.bottom}">
      <span class="margin-unit">mm</span>
    </div>
    <div class="margin-row">
      <label>좌</label>
      <input type="number" id="m-left"   class="margin-input" min="0" max="150" step="1" value="${n.left}">
      <span class="margin-unit">mm</span>
    </div>
    <div class="margin-row">
      <label>우</label>
      <input type="number" id="m-right"  class="margin-input" min="0" max="150" step="1" value="${n.right}">
      <span class="margin-unit">mm</span>
    </div>
    <button id="m-apply" class="margin-apply-btn">적용</button>
  </div>
  <div class="sep"></div>
  <button id="zoom-out" class="poa-zoom-btn" title="축소 (Ctrl+-)">−</button>
  <select id="zoom-select" class="poa-zoom-select" title="확대/축소">
    ${t}
  </select>
  <button id="zoom-in" class="poa-zoom-btn" title="확대 (Ctrl+=)">+</button>
</div>`;let r=this.shadow.getElementById(`paper-select`),i=this.shadow.getElementById(`zoom-select`),a=this.shadow.getElementById(`zoom-in`),o=this.shadow.getElementById(`zoom-out`),s=this.shadow.getElementById(`margin-btn`),c=this.shadow.getElementById(`margin-popup`),l=this.shadow.getElementById(`m-top`),u=this.shadow.getElementById(`m-bottom`),d=this.shadow.getElementById(`m-left`),f=this.shadow.getElementById(`m-right`),p=this.shadow.getElementById(`m-apply`);r.value=`A4`,i.value=`100`,r.addEventListener(`change`,()=>{this.dispatchAction(`paper:size`,r.value)}),i.addEventListener(`change`,()=>{this.dispatchAction(`paper:zoom`,i.value)}),a.addEventListener(`click`,()=>this.dispatchAction(`paper:zoom-in`)),o.addEventListener(`click`,()=>this.dispatchAction(`paper:zoom-out`)),s.addEventListener(`click`,e=>{e.stopPropagation(),c.classList.toggle(`hidden`)}),c.addEventListener(`click`,e=>e.stopPropagation());let m=()=>{let e={top:Math.max(0,parseFloat(l.value)||0),bottom:Math.max(0,parseFloat(u.value)||0),left:Math.max(0,parseFloat(d.value)||0),right:Math.max(0,parseFloat(f.value)||0)};this.dispatchAction(`paper:margin`,JSON.stringify(e)),c.classList.add(`hidden`)};p.addEventListener(`click`,m),[l,u,d,f].forEach(e=>{e.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),m()),e.key===`Escape`&&c.classList.add(`hidden`)})}),this.docClickHandler=()=>{c.classList.add(`hidden`)},document.addEventListener(`click`,this.docClickHandler)}disconnectedCallback(){this.docClickHandler&&=(document.removeEventListener(`click`,this.docClickHandler),null)}update(e){let t=this.shadow.getElementById(`char-count`),n=this.shadow.getElementById(`word-count`);if(!t||!n)return;let r=new DOMParser().parseFromString(e,`text/html`).body.textContent??``,i=[...r.replace(/\s/g,``)].length,a=r.trim()===``?0:r.trim().split(/\s+/).length;t.textContent=`${i}자`,n.textContent=`${a}단어`}syncPaper(e){let{size:t,zoom:n,margin:r}=e.detail,i=this.shadow.getElementById(`paper-select`),a=this.shadow.getElementById(`zoom-select`);if(i&&(i.value=t.id),a&&(a.value=String(n)),r){let e=this.shadow.getElementById(`m-top`),t=this.shadow.getElementById(`m-bottom`),n=this.shadow.getElementById(`m-left`),i=this.shadow.getElementById(`m-right`);e&&(e.value=String(r.top)),t&&(t.value=String(r.bottom)),n&&(n.value=String(r.left)),i&&(i.value=String(r.right))}}dispatchAction(e,t){this.dispatchEvent(new CustomEvent(`poa-action`,{bubbles:!0,composed:!0,detail:{type:e,...t===void 0?{}:{value:t}}}))}},Yo=`
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
`;function Xo(e){return new Date(e).toLocaleString(`ko-KR`,{month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}var Zo=class extends HTMLElement{shadow;autoSave=null;constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${Yo}</style>
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
</div>`,this.bindEvents()}setAutoSave(e){this.autoSave=e}setFileManager(e){}async show(){await this.loadHistory(),this.setAttribute(`open`,``),this.shadow.getElementById(`btn-close`)?.focus()}close(){this.removeAttribute(`open`)}bindEvents(){let e=this.shadow;e.getElementById(`backdrop`)?.addEventListener(`click`,t=>{t.target===e.getElementById(`backdrop`)&&this.close()}),e.getElementById(`btn-close`)?.addEventListener(`click`,()=>this.close());let t=e=>{this.dispatchEvent(new CustomEvent(`poa-file-${e}`,{bubbles:!0,composed:!0})),this.close()};e.getElementById(`btn-new`)?.addEventListener(`click`,()=>t(`new`)),e.getElementById(`btn-open`)?.addEventListener(`click`,()=>t(`open`)),e.getElementById(`btn-save`)?.addEventListener(`click`,()=>t(`save`)),e.getElementById(`btn-saveas`)?.addEventListener(`click`,()=>t(`saveas`)),e.getElementById(`btn-clear`)?.addEventListener(`click`,async()=>{await this.autoSave?.clearAll(),await this.loadHistory()})}async loadHistory(){let e=this.shadow.getElementById(`history-list`);if(!e)return;if(e.innerHTML=``,!this.autoSave){e.innerHTML=`<li class="empty-msg">자동저장 미설정</li>`;return}let t=await this.autoSave.listSnapshots();if(t.length===0){e.innerHTML=`<li class="empty-msg">저장된 이력이 없습니다</li>`;return}for(let n of t){let t=document.createElement(`li`);t.className=`history-item`,t.innerHTML=`
        <span class="history-time">${Xo(n.savedAt)}</span>
        <button class="restore-btn" data-id="${String(n.id)}">복원</button>`,t.querySelector(`.restore-btn`).addEventListener(`click`,()=>{this.handleRestore(n)}),e.appendChild(t)}}handleRestore(e){this.dispatchEvent(new CustomEvent(`poa-autosave-restore`,{bubbles:!0,composed:!0,detail:{html:e.html}})),this.close()}},Qo=`
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
`,$o=`
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
`,es=class extends HTMLElement{shadow;debounceTimer=null;constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${Qo}</style>${$o}`,this.bindEvents()}open(e=`find`){this.setAttribute(`open`,``),this.setMode(e),setTimeout(()=>{this.shadow.getElementById(`inp-find`)?.focus()},50)}close(){this.removeAttribute(`open`),this.removeAttribute(`replace`),this.updateTabUI(!1),this.debounceTimer!==null&&(clearTimeout(this.debounceTimer),this.debounceTimer=null),this.clearInputState(),this.dispatch(`find-clear`,{})}updateResult(e,t){let n=this.shadow.getElementById(`count-label`),r=this.shadow.getElementById(`inp-find`);if(n){if(!((r?.value.trim().length??0)>0)){n.textContent=``,n.className=`count`,r?.classList.remove(`no-match`);return}e===0?(n.textContent=`0 / 0`,n.className=`count empty`,r?.classList.add(`no-match`)):(n.textContent=`${t+1} / ${e}`,n.className=`count`,r?.classList.remove(`no-match`))}}setMode(e){let t=e===`replace`;t?this.setAttribute(`replace`,``):this.removeAttribute(`replace`),this.updateTabUI(t)}updateTabUI(e){let t=this.shadow;t.getElementById(`tab-find`)?.classList.toggle(`active`,!e),t.getElementById(`tab-replace`)?.classList.toggle(`active`,e)}clearInputState(){let e=this.shadow.getElementById(`inp-find`),t=this.shadow.getElementById(`count-label`);e&&e.classList.remove(`no-match`),t&&(t.textContent=``,t.className=`count`)}bindEvents(){let e=this.shadow,t=e.getElementById(`inp-find`),n=e.getElementById(`inp-replace`),r=e.getElementById(`chk-case`),i=e.getElementById(`chk-word`),a=()=>({query:t.value,caseSensitive:r.checked,wholeWord:i.checked}),o=()=>{this.debounceTimer!==null&&clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(()=>{this.debounceTimer=null,this.dispatch(`find-search`,a())},300)},s=()=>{this.debounceTimer!==null&&(clearTimeout(this.debounceTimer),this.debounceTimer=null),this.dispatch(`find-search`,a())};e.getElementById(`tab-find`)?.addEventListener(`click`,()=>this.setMode(`find`)),e.getElementById(`tab-replace`)?.addEventListener(`click`,()=>this.setMode(`replace`)),e.getElementById(`btn-close`)?.addEventListener(`click`,()=>this.close()),t.addEventListener(`input`,o),t.addEventListener(`keydown`,e=>{if(e.key===`Enter`){e.preventDefault(),s(),e.shiftKey?this.dispatch(`find-prev`,{}):this.dispatch(`find-next`,{});return}e.key===`Escape`&&(e.preventDefault(),this.close())}),r.addEventListener(`change`,o),i.addEventListener(`change`,o),e.getElementById(`btn-prev`)?.addEventListener(`click`,()=>{s(),this.dispatch(`find-prev`,{})}),e.getElementById(`btn-next`)?.addEventListener(`click`,()=>{s(),this.dispatch(`find-next`,{})}),n.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.preventDefault(),this.close())}),e.getElementById(`btn-replace`)?.addEventListener(`click`,()=>this.dispatch(`find-replace`,{replacement:n.value})),e.getElementById(`btn-replace-all`)?.addEventListener(`click`,()=>this.dispatch(`find-replace-all`,{...a(),replacement:n.value}))}dispatch(e,t){this.dispatchEvent(new CustomEvent(`poa-${e}`,{bubbles:!0,composed:!0,detail:t}))}},ts=`
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
`,ns=class extends HTMLElement{shadow;editor=new yi;originalSrc=``;currentDataUrl=``;busy=!1;constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${ts}</style>
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
</div>`,this.bindEvents()}async open(e,t){this.originalSrc=e,this.currentDataUrl=e,this.busy=!1,this.switchTab(`canvas`),t&&this.fillProps(t),this.setAttribute(`open`,``),await this.renderPreview(e),this.shadow.getElementById(`btn-close`)?.focus()}close(){this.removeAttribute(`open`),this.originalSrc=``,this.currentDataUrl=``}switchTab(e){let t=this.shadow;t.querySelectorAll(`.tab-btn`).forEach(t=>t.classList.toggle(`active`,t.dataset.tab===e)),t.getElementById(`tc-canvas`)?.classList.toggle(`active`,e===`canvas`),t.getElementById(`tc-props`)?.classList.toggle(`active`,e===`props`)}fillProps(e){let t=(e,t)=>{this.shadow.getElementById(e).value=t??``};t(`p-alt`,e.alt),t(`p-title`,e.title),t(`p-width`,e.width),t(`p-height`,e.height),t(`p-border`,e.border),t(`p-id`,e.id),t(`p-class`,e.className),this.shadow.getElementById(`p-align`).value=e.align??``,this.shadow.getElementById(`err-p-alt`)?.classList.remove(`show`)}bindEvents(){let e=this.shadow;e.getElementById(`backdrop`)?.addEventListener(`click`,t=>{t.target===e.getElementById(`backdrop`)&&this.onCancel()}),e.getElementById(`btn-close`)?.addEventListener(`click`,()=>this.onCancel()),e.getElementById(`btn-cancel`)?.addEventListener(`click`,()=>this.onCancel()),e.getElementById(`btn-apply`)?.addEventListener(`click`,()=>this.onApply()),e.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>this.switchTab(e.dataset.tab))}),e.getElementById(`btn-rotate90`)?.addEventListener(`click`,()=>void this.applyOp(()=>this.editor.rotate(this.currentDataUrl,90))),e.getElementById(`btn-flip-h`)?.addEventListener(`click`,()=>void this.applyOp(()=>this.editor.flip(this.currentDataUrl,`horizontal`))),e.getElementById(`btn-flip-v`)?.addEventListener(`click`,()=>void this.applyOp(()=>this.editor.flip(this.currentDataUrl,`vertical`))),e.getElementById(`btn-reset`)?.addEventListener(`click`,async()=>{this.currentDataUrl=this.originalSrc,await this.renderPreview(this.originalSrc)})}async applyOp(e){if(!this.busy){this.busy=!0,this.setControlsDisabled(!0);try{this.currentDataUrl=await e(),await this.renderPreview(this.currentDataUrl)}catch{}finally{this.busy=!1,this.setControlsDisabled(!1)}}}async renderPreview(e){let t=this.shadow.getElementById(`preview`);if(!t)return;t.innerHTML=`<span class="loading">처리 중...</span>`;let n=document.createElement(`img`);n.alt=`미리보기`,await new Promise(t=>{n.onload=()=>t(),n.onerror=()=>t(),n.src=e}),t.innerHTML=``,t.appendChild(n)}setControlsDisabled(e){this.shadow.querySelectorAll(`.controls button, .btn-apply`).forEach(t=>{t.disabled=e})}readProps(){let e=e=>this.shadow.getElementById(e).value.trim();return{alt:e(`p-alt`)||void 0,title:e(`p-title`)||void 0,width:e(`p-width`)||void 0,height:e(`p-height`)||void 0,border:e(`p-border`)||void 0,align:this.shadow.getElementById(`p-align`).value||void 0,id:e(`p-id`)||void 0,className:e(`p-class`)||void 0}}onApply(){let e=this.readProps();if(this.shadow.getElementById(`tc-props`)?.classList.contains(`active`)&&!e.alt){this.shadow.getElementById(`err-p-alt`).classList.add(`show`),this.shadow.getElementById(`p-alt`).focus();return}let t=this.originalSrc,n=this.currentDataUrl;this.close(),this.dispatchEvent(new CustomEvent(`poa-image-edit-confirm`,{bubbles:!0,composed:!0,detail:{original:t,edited:n,attrs:e}}))}onCancel(){this.close(),this.dispatchEvent(new CustomEvent(`poa-image-edit-cancel`,{bubbles:!0,composed:!0}))}},rs=`
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
`;function is(e){return e<1024*1024?`${(e/1024).toFixed(1)}KB`:`${(e/1024/1024).toFixed(1)}MB`}var as=class extends HTMLElement{shadow;uploader=new Si;uploadConfig=null;selectedFiles=[];busy=!1;onErrorFn=null;setOnError(e){this.onErrorFn=e}constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${rs}</style>
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
</div>`,this.bindEvents()}setUploadConfig(e){this.uploadConfig=e}open(){this.reset(),this.setAttribute(`open`,``),this.shadow.getElementById(`inp-src`)?.focus()}close(){this.removeAttribute(`open`)}reset(){let e=this.shadow;e.getElementById(`inp-src`).value=``,e.getElementById(`inp-alt`).value=``,e.getElementById(`inp-title`).value=``,e.getElementById(`inp-width`).value=``,e.getElementById(`inp-height`).value=``,e.getElementById(`inp-border`).value=``,e.getElementById(`inp-id`).value=``,e.getElementById(`inp-class`).value=``,e.getElementById(`sel-align`).value=``,e.getElementById(`err-alt`)?.classList.remove(`show`),e.getElementById(`url-preview`)?.classList.remove(`show`),e.getElementById(`inp-single-alt`).value=``,e.getElementById(`inp-single-title`).value=``,e.getElementById(`inp-single-width`).value=``,e.getElementById(`inp-single-height`).value=``,e.getElementById(`inp-single-border`).value=``,e.getElementById(`sel-single-align`).value=``,e.getElementById(`single-preview-img`).src=``,e.getElementById(`err-single-alt`)?.classList.remove(`show`),e.getElementById(`inp-file-alt`).value=``,e.getElementById(`err-file-alt`)?.classList.remove(`show`),e.getElementById(`upload-list`).innerHTML=``,e.getElementById(`upload-summary`).textContent=``,e.getElementById(`upload-errors`).innerHTML=``,e.getElementById(`single-attrs`).style.display=`none`,e.getElementById(`multi-attrs`).style.display=`none`,this.selectedFiles=[],this.busy=!1,this.switchTab(`url`)}bindEvents(){let e=this.shadow;e.getElementById(`backdrop`)?.addEventListener(`click`,t=>{t.target===e.getElementById(`backdrop`)&&this.close()}),e.getElementById(`btn-close`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`btn-cancel`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`btn-confirm`)?.addEventListener(`click`,()=>void this.onConfirm()),e.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>this.switchTab(e.dataset.tab))}),e.getElementById(`inp-src`)?.addEventListener(`input`,()=>{this.updatePreview(),this.syncConfirmBtn()}),e.getElementById(`inp-alt`)?.addEventListener(`input`,()=>this.syncConfirmBtn());let t=e.getElementById(`file-drop`),n=e.getElementById(`inp-file`);t.addEventListener(`click`,()=>n.click()),t.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&n.click()}),t.addEventListener(`dragover`,e=>{e.preventDefault(),t.style.borderColor=`#1976d2`}),t.addEventListener(`dragleave`,()=>{t.style.borderColor=``}),t.addEventListener(`drop`,e=>{e.preventDefault(),t.style.borderColor=``;let n=Array.from(e.dataTransfer?.files??[]);this.handleFiles(n)}),n.addEventListener(`change`,()=>{this.handleFiles(Array.from(n.files??[])),n.value=``})}switchTab(e){let t=this.shadow;t.querySelectorAll(`.tab-btn`).forEach(t=>t.classList.toggle(`active`,t.dataset.tab===e)),t.querySelectorAll(`.panel`).forEach(t=>t.classList.toggle(`active`,t.id===`panel-${e}`)),this.syncConfirmBtn()}syncConfirmBtn(){let e=this.shadow,t=e.getElementById(`btn-confirm`);if(e.querySelector(`.panel.active`)?.id===`panel-url`){let n=e.getElementById(`inp-src`).value.trim(),r=e.getElementById(`inp-alt`).value.trim();t.disabled=!n||!r,t.textContent=`삽입`;return}t.textContent=e.getElementById(`single-attrs`).style.display===`none`?`업로드 · 삽입`:`삽입`,t.disabled=!1}updatePreview(){let e=this.shadow.getElementById(`inp-src`).value.trim(),t=this.shadow.getElementById(`url-preview`),n=this.shadow.getElementById(`preview-img`);e?(n.src=e,t.classList.add(`show`)):t.classList.remove(`show`)}handleFiles(e){let{valid:t,errors:n}=this.uploader.validateFiles(e);this.selectedFiles.push(...t),this.renderErrors(n);let r=this.shadow;if(this.selectedFiles.length===1){r.getElementById(`single-attrs`).style.display=`block`,r.getElementById(`multi-attrs`).style.display=`none`,r.getElementById(`upload-list`).innerHTML=``,r.getElementById(`upload-summary`).textContent=``;let e=new FileReader;e.onload=e=>{r.getElementById(`single-preview-img`).src=e.target?.result},e.readAsDataURL(this.selectedFiles[0])}else if(this.selectedFiles.length>1){r.getElementById(`single-attrs`).style.display=`none`,r.getElementById(`multi-attrs`).style.display=`block`,this.renderUploadList();let e=this.selectedFiles.reduce((e,t)=>e+t.size,0);r.getElementById(`upload-summary`).textContent=`${this.selectedFiles.length}개 파일 선택됨 (${is(e)} / 20MB)`}this.syncConfirmBtn()}renderUploadList(e){let t=this.shadow.getElementById(`upload-list`);t.innerHTML=(e??this.selectedFiles.map(e=>({file:e,status:`pending`,progress:0}))).map(e=>{let t={pending:`대기`,uploading:`업로드 중`,done:`완료`,error:`오류`},n=`status-${e.status}`,r=e.status===`error`?` — ${e.error??``}`:``;return`<li class="upload-item">
        <span class="upload-name">${e.file.name}</span>
        <span class="upload-status ${n}">${t[e.status]}${r}</span>
      </li>`}).join(``)}renderErrors(e){let t=this.shadow.getElementById(`upload-errors`);t.innerHTML=e.map(e=>`<li>${e}</li>`).join(``)}async onConfirm(){this.busy||(this.shadow.querySelector(`.panel.active`)?.id===`panel-url`?this.confirmUrl():await this.confirmUpload())}confirmUrl(){let e=this.shadow,t=e.getElementById(`inp-src`).value.trim(),n=e.getElementById(`inp-alt`).value.trim();if(!n){e.getElementById(`err-alt`).classList.add(`show`),e.getElementById(`inp-alt`).focus();return}e.getElementById(`err-alt`).classList.remove(`show`);let r={src:t,alt:n,title:e.getElementById(`inp-title`).value.trim()||void 0,width:e.getElementById(`inp-width`).value.trim()||void 0,height:e.getElementById(`inp-height`).value.trim()||void 0,border:e.getElementById(`inp-border`).value.trim()||void 0,align:e.getElementById(`sel-align`).value||void 0,id:e.getElementById(`inp-id`).value.trim()||void 0,className:e.getElementById(`inp-class`).value.trim()||void 0};this.dispatch(`poa-image-insert`,{attrs:r}),this.close()}async confirmUpload(){if(this.selectedFiles.length===0)return;let e=this.shadow;if(e.getElementById(`single-attrs`).style.display!==`none`){let t=e.getElementById(`inp-single-alt`).value.trim();if(!t){e.getElementById(`err-single-alt`).classList.add(`show`),e.getElementById(`inp-single-alt`).focus();return}e.getElementById(`err-single-alt`).classList.remove(`show`);let n={alt:t,title:e.getElementById(`inp-single-title`).value.trim()||void 0,width:e.getElementById(`inp-single-width`).value.trim()||void 0,height:e.getElementById(`inp-single-height`).value.trim()||void 0,border:e.getElementById(`inp-single-border`).value.trim()||void 0,align:e.getElementById(`sel-single-align`).value||void 0,src:``};this.busy=!0,e.getElementById(`btn-confirm`).disabled=!0;try{let e=this.selectedFiles[0];if(this.uploadConfig){let t=(await this.uploader.upload([e],{...this.uploadConfig,onProgress:e=>this.renderUploadList(e)}))[0];t?.status===`done`&&t.url&&this.dispatch(`poa-image-insert`,{attrs:{...n,src:t.url}})}else{let t=await this.readAsDataUrl(e);this.dispatch(`poa-image-insert`,{attrs:{...n,src:t}})}this.busy=!1,this.close()}catch(e){(this.onErrorFn??(e=>console.error(e)))(e instanceof Error?e.message:`파일 읽기에 실패했습니다.`),this.busy=!1,this.syncConfirmBtn()}return}let t=e.getElementById(`inp-file-alt`).value.trim();if(!t){e.getElementById(`err-file-alt`).classList.add(`show`),e.getElementById(`inp-file-alt`).focus();return}if(e.getElementById(`err-file-alt`).classList.remove(`show`),this.busy=!0,e.getElementById(`btn-confirm`).disabled=!0,!this.uploadConfig){try{for(let e of this.selectedFiles){let n=await this.readAsDataUrl(e);this.dispatch(`poa-image-insert`,{attrs:{src:n,alt:t}})}this.busy=!1,this.close()}catch(e){(this.onErrorFn??(e=>console.error(e)))(e instanceof Error?e.message:`파일 읽기에 실패했습니다.`),this.busy=!1,this.syncConfirmBtn()}return}let n=await this.uploader.upload(this.selectedFiles,{...this.uploadConfig,onProgress:e=>this.renderUploadList(e)});n.forEach(e=>{e.status===`done`&&e.url&&this.dispatch(`poa-image-insert`,{attrs:{src:e.url,alt:t}})}),n.some(e=>e.status===`error`)?(this.busy=!1,this.syncConfirmBtn()):(this.busy=!1,this.close())}readAsDataUrl(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=()=>n(Error(`"${e.name}" 파일 읽기에 실패했습니다.`)),r.readAsDataURL(e)})}dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}},os=10,ss=10,cs=22,ls=2,us=`
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
  grid-template-columns: repeat(${os}, ${cs}px);
  gap: ${ls}px;
  cursor: crosshair;
}
.gc {
  width: ${cs}px; height: ${cs}px;
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
.align-btn {
  height: 28px; padding: 0 10px;
  border: 1.5px solid #ccc; border-radius: 3px;
  font-size: 12px; cursor: pointer; background: #fff; color: #374151;
}
.align-btn.active {
  border-color: #1565c0; background: #e3f0ff; color: #1565c0; font-weight: 600;
}
.align-btn:hover:not(.active) { background: #f5f5f5; }
`,ds=class e extends HTMLElement{shadow;selectedPreset=`border-all`;gridCells=[];constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${us}</style>
<div class="overlay" id="overlay">
  <div class="dialog" role="dialog" aria-modal="true">
    <div class="dlg-hd">
      <span id="dlg-title">표</span>
      <button class="dlg-close" id="btn-close" title="닫기">✕</button>
    </div>
    <div class="dlg-body" id="dlg-body"></div>
  </div>
</div>`,this.shadow.getElementById(`btn-close`).addEventListener(`click`,()=>this.close()),this.shadow.getElementById(`overlay`).addEventListener(`click`,e=>{e.target.id===`overlay`&&this.close()})}open(e){this.classList.add(`open`);let t=this.shadow.getElementById(`dlg-body`),n=this.shadow.getElementById(`dlg-title`);e?(n.textContent=`표 속성`,this.renderProps(t,e)):(n.textContent=`표`,this.renderInsert(t))}close(){this.classList.remove(`open`),this.gridCells=[]}renderInsert(e){let t=e.ownerDocument;e.innerHTML=``;let n=t.createElement(`div`);n.className=`preset-grid`;for(let e of tn){let r=t.createElement(`div`);r.className=`preset-item`+(e.id===this.selectedPreset?` active`:``),r.dataset.pid=e.id,r.innerHTML=`${e.icon}<span class="preset-lbl">${e.label}</span>`,r.addEventListener(`click`,()=>this.selectPreset(e.id)),n.appendChild(r)}e.appendChild(n);let r=t.createElement(`hr`);r.className=`sep`,e.appendChild(r);let i=t.createElement(`div`);i.className=`grid-wrap`;let a=t.createElement(`div`);a.className=`grid-picker`,this.gridCells=[];for(let e=0;e<ss;e++)for(let n=0;n<os;n++){let r=t.createElement(`div`);r.className=`gc`,r.dataset.r=String(e),r.dataset.c=String(n),a.appendChild(r),this.gridCells.push(r)}let o=t.createElement(`div`);o.className=`grid-size`,o.textContent=``,a.addEventListener(`mousemove`,e=>{if(!e.target.closest(`.grid-picker`))return;let t=a.getBoundingClientRect(),n=cs+ls,r=Math.min(Math.floor((e.clientX-t.left)/n),os-1),i=Math.min(Math.floor((e.clientY-t.top)/n),ss-1);this.highlightGrid(i,r),o.textContent=`${r+1} × ${i+1}`}),a.addEventListener(`mouseleave`,()=>{this.highlightGrid(-1,-1),o.textContent=``}),a.addEventListener(`click`,e=>{let t=a.getBoundingClientRect(),n=cs+ls,r=Math.min(Math.floor((e.clientX-t.left)/n),os-1),i=Math.min(Math.floor((e.clientY-t.top)/n),ss-1);this.insertTable(i+1,r+1)}),i.appendChild(a),i.appendChild(o),e.appendChild(i)}selectPreset(e){this.selectedPreset=e,this.shadow.querySelectorAll(`.preset-item`).forEach(t=>{t.classList.toggle(`active`,t.dataset.pid===e)})}highlightGrid(e,t){for(let n of this.gridCells){let r=parseInt(n.dataset.r??`0`),i=parseInt(n.dataset.c??`0`);n.classList.toggle(`hl`,r<=e&&i<=t)}}insertTable(e,t){let n=tn.find(e=>e.id===this.selectedPreset)??tn[0],r={rows:e,cols:t,width:`100%`,align:`center`,...n.baseOptions};this.dispatchEvent(new CustomEvent(`poa-table-insert`,{bubbles:!0,composed:!0,detail:{options:r,presetId:n.id}})),this.close()}renderProps(t,n){let r=n.style.width||`100%`,i=e.rgbToHex(n.style.backgroundColor)||`#ffffff`,a=n.querySelector(`td,th`)?.style.border.match(/solid\s+(#[\da-fA-F]{3,6}|[a-z]+)/i),o=a?a[1]:`#000000`,s=`left`;n.style.marginLeft===`auto`&&n.style.marginRight===`auto`?s=`center`:n.style.marginLeft===`auto`&&(s=`right`);let c=(e,t,n)=>`<button class="align-btn${s===e?` active`:``}" data-align="${e}">${t} ${n}</button>`;t.innerHTML=`
<div class="props-form">
  <label class="p-lbl">너비</label>
  <input  class="p-inp" id="pp-w"  type="text"  value="${r}">
  <label class="p-lbl">테두리 색</label>
  <input  class="p-clr" id="pp-bc" type="color" value="${o}">
  <label class="p-lbl">배경색</label>
  <input  class="p-clr" id="pp-bg" type="color" value="${i}">
  <label class="p-lbl">표 정렬</label>
  <div id="pp-align-btns" style="display:flex;gap:5px;">
    ${c(`left`,`◀`,`왼쪽`)}
    ${c(`center`,`≡`,`가운데`)}
    ${c(`right`,`▶`,`오른쪽`)}
  </div>
</div>
<div class="props-actions">
  <button class="btn"             id="pp-cancel">취소</button>
  <button class="btn btn-primary" id="pp-ok">적용</button>
</div>`;let l=s;t.querySelector(`#pp-align-btns`).addEventListener(`click`,e=>{let n=e.target.closest(`.align-btn`);n&&(l=n.dataset.align,t.querySelectorAll(`.align-btn`).forEach(e=>{e.classList.toggle(`active`,e.dataset.align===l)}))}),t.querySelector(`#pp-cancel`).addEventListener(`click`,()=>this.close()),t.querySelector(`#pp-ok`).addEventListener(`click`,()=>{let e={width:t.querySelector(`#pp-w`).value.trim(),borderColor:t.querySelector(`#pp-bc`).value,bgColor:t.querySelector(`#pp-bg`).value,align:l};this.dispatchEvent(new CustomEvent(`poa-table-update`,{bubbles:!0,composed:!0,detail:{options:e,table:n}})),this.close()})}static rgbToHex(e){let t=e.match(/\d+/g);return!t||t.length<3?``:`#`+t.slice(0,3).map(e=>parseInt(e).toString(16).padStart(2,`0`)).join(``)}static colorToHex(t){return e.rgbToHex(t)||`#ffffff`}},fs=[{label:`날짜 (2025-05-05)`,fn:()=>new Date().toISOString().slice(0,10)},{label:`시간 (14:30:05)`,fn:()=>new Intl.DateTimeFormat(`ko-KR`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1}).format(new Date)},{label:`날짜·시간 (2025-05-05 14:30)`,fn:()=>{let e=new Date;return`${e.toISOString().slice(0,10)} ${new Intl.DateTimeFormat(`ko-KR`,{hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e)}`}},{label:`한국어 날짜 (2025년 5월 5일)`,fn:()=>new Intl.DateTimeFormat(`ko-KR`,{year:`numeric`,month:`long`,day:`numeric`}).format(new Date)},{label:`한국어 날짜·시간 (2025년 5월 5일 월요일 오후 2:30)`,fn:()=>new Intl.DateTimeFormat(`ko-KR`,{year:`numeric`,month:`long`,day:`numeric`,weekday:`long`,hour:`numeric`,minute:`2-digit`}).format(new Date)}],ps=`
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
`,ms=class extends HTMLElement{shadow;bookmarks=[];editingId=null;editingAnchor=null;constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${ps}</style>
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
</div>`,this.buildDatetimePresets(),this.bindEvents()}setBookmarks(e){this.bookmarks=e,this.isConnected&&this.renderBookmarkList()}open(e=`link`,t){if(this.reset(),this.editingAnchor=t??null,this.setAttribute(`open`,``),this.switchTab(e),e===`link`){if(t){let e=this.shadow;e.getElementById(`inp-href`).value=t.getAttribute(`href`)??``,e.getElementById(`inp-text`).value=t.textContent??``,e.getElementById(`inp-title`).value=t.title??``;let n=t.target===`_blank`?`_blank`:``;e.getElementById(`sel-target`).value=n,e.getElementById(`rel-hint`)?.classList.toggle(`show`,n===`_blank`),e.getElementById(`dialog-title`).textContent=`링크 수정`,e.getElementById(`btn-confirm`).textContent=`수정`}this.shadow.getElementById(`inp-href`)?.focus()}else e===`bookmark`&&this.shadow.getElementById(`inp-bm-label`)?.focus()}close(){this.removeAttribute(`open`),this.editingId=null,this.editingAnchor=null}reset(){let e=this.shadow;e.getElementById(`inp-href`).value=``,e.getElementById(`inp-text`).value=``,e.getElementById(`inp-title`).value=``,e.getElementById(`sel-target`).value=``,e.getElementById(`inp-bm-label`).value=``,e.getElementById(`err-href`)?.classList.remove(`show`),e.getElementById(`err-text`)?.classList.remove(`show`),e.getElementById(`rel-hint`)?.classList.remove(`show`),e.getElementById(`dialog-title`).textContent=`링크 삽입`,e.getElementById(`btn-confirm`).textContent=`삽입`,this.editingId=null,this.editingAnchor=null,this.renderBookmarkList()}bindEvents(){let e=this.shadow;e.getElementById(`backdrop`)?.addEventListener(`click`,t=>{t.target===e.getElementById(`backdrop`)&&this.close()}),e.getElementById(`btn-close`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`btn-cancel`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`btn-confirm`)?.addEventListener(`click`,()=>this.onConfirm()),e.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>this.switchTab(e.dataset.tab))}),e.getElementById(`sel-target`)?.addEventListener(`change`,()=>{let t=e.getElementById(`sel-target`).value===`_blank`;e.getElementById(`rel-hint`)?.classList.toggle(`show`,t)}),e.getElementById(`btn-bm-create`)?.addEventListener(`click`,()=>this.onBookmarkCreate()),e.getElementById(`inp-bm-label`)?.addEventListener(`keydown`,e=>{e.key===`Enter`&&this.onBookmarkCreate()})}switchTab(e){let t=this.shadow;t.querySelectorAll(`.tab-btn`).forEach(t=>t.classList.toggle(`active`,t.dataset.tab===e)),t.querySelectorAll(`.panel`).forEach(t=>t.classList.toggle(`active`,t.id===`panel-${e}`));let n={link:`링크 삽입`,bookmark:`책갈피 관리`,datetime:`날짜·시간 삽입`};t.getElementById(`dialog-title`).textContent=n[e];let r=t.getElementById(`btn-confirm`);e===`bookmark`?r.style.display=`none`:(r.style.display=``,r.textContent=`삽입`)}onConfirm(){this.shadow.querySelector(`.panel.active`)?.id===`panel-link`&&this.confirmLink()}confirmLink(){let e=this.shadow,t=e.getElementById(`inp-href`).value.trim(),n=e.getElementById(`inp-text`).value.trim(),r=e.getElementById(`inp-title`).value.trim(),i=e.getElementById(`sel-target`).value,a=!0,o=t.startsWith(`#`)?t.length>1:(()=>{try{return new URL(t),!0}catch{return!1}})();if(!t||!o?(e.getElementById(`err-href`).classList.add(`show`),e.getElementById(`inp-href`).focus(),a=!1):e.getElementById(`err-href`).classList.remove(`show`),n?e.getElementById(`err-text`).classList.remove(`show`):(e.getElementById(`err-text`).classList.add(`show`),a&&e.getElementById(`inp-text`).focus(),a=!1),!a)return;let s={href:t,text:n,title:r||void 0,target:i===`_blank`?`_blank`:`_self`};this.editingAnchor?this.dispatch(`poa-link-update`,{anchor:this.editingAnchor,attrs:s}):this.dispatch(`poa-link-insert`,{attrs:s}),this.close()}onBookmarkCreate(){let e=this.shadow.getElementById(`inp-bm-label`),t=e.value.trim();if(!t){e.focus();return}this.dispatch(`poa-bookmark-create`,{label:t}),e.value=``,e.focus()}renderBookmarkList(){let e=this.shadow.getElementById(`bm-list`);if(e){if(this.bookmarks.length===0){e.innerHTML=`<li class="bm-empty">책갈피가 없습니다.</li>`;return}e.innerHTML=this.bookmarks.map(e=>`
      <li class="bm-item" data-id="${e.id}">
        <span class="bm-label" title="${e.label}">${e.label}</span>
        <span class="bm-id">#${e.id}</span>
        <button class="btn sm" data-action="link" data-id="${e.id}" title="이 책갈피로 링크 삽입">링크</button>
        <button class="btn sm" data-action="edit" data-id="${e.id}" title="수정">수정</button>
        <button class="btn sm danger" data-action="delete" data-id="${e.id}" title="삭제">삭제</button>
      </li>
      ${this.editingId===e.id?`
      <li class="bm-item" style="padding:4px 0;">
        <div class="bm-edit-row" style="flex:1;">
          <input id="inp-bm-edit" type="text" value="${e.label}" placeholder="새 레이블">
          <button class="btn sm primary" data-action="save" data-id="${e.id}">저장</button>
          <button class="btn sm" data-action="cancel-edit">취소</button>
        </div>
      </li>`:``}
    `).join(``),e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-action]`);if(!t)return;let n=t.dataset.action,r=t.dataset.id??``;n===`link`?this.onBookmarkLink(r):n===`edit`?this.onBookmarkEditStart(r):n===`save`?this.onBookmarkSave(r):n===`delete`?this.onBookmarkDelete(r):n===`cancel-edit`&&(this.editingId=null,this.renderBookmarkList())},{once:!0})}}onBookmarkLink(e){let t=this.bookmarks.find(t=>t.id===e);t&&(this.dispatch(`poa-bookmark-link-insert`,{bookmarkId:e,text:t.label}),this.close())}onBookmarkEditStart(e){this.editingId=e,this.renderBookmarkList(),this.shadow.getElementById(`inp-bm-edit`)?.focus()}onBookmarkSave(e){let t=this.shadow.getElementById(`inp-bm-edit`),n=t?.value.trim()??``;if(!n){t?.focus();return}this.dispatch(`poa-bookmark-update`,{id:e,label:n}),this.editingId=null}onBookmarkDelete(e){this.dispatch(`poa-bookmark-delete`,{id:e})}buildDatetimePresets(){let e=this.shadow.getElementById(`dt-presets`);e&&(e.innerHTML=fs.map((e,t)=>`
      <div class="dt-preset">
        <span class="dt-preview" id="dt-prev-${t}"></span>
        <span class="dt-format">${e.label}</span>
        <button class="btn sm primary" data-preset="${t}">삽입</button>
      </div>
    `).join(``),this.refreshDatetimePreviews(),e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-preset]`);if(!t)return;let n=fs[parseInt(t.dataset.preset??`0`)]?.fn()??``;this.dispatch(`poa-datetime-insert`,{text:n}),this.close()}))}refreshDatetimePreviews(){fs.forEach((e,t)=>{let n=this.shadow.getElementById(`dt-prev-${t}`);n&&(n.textContent=e.fn())})}dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}},hs=`
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
`,gs=class extends HTMLElement{shadow;img=null;aspectLocked=!1;naturalW=0;naturalH=0;constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${hs}</style>
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
<button class="btn" id="btn-reset">원본크기</button>`,this.bindEvents()}show(e){this.img=e,this.naturalW=e.naturalWidth||Math.round(e.getBoundingClientRect().width),this.naturalH=e.naturalHeight||Math.round(e.getBoundingClientRect().height),this.aspectLocked=!1,this.shadow.getElementById(`cb-ratio`).checked=!1,this.setAttribute(`open`,``),this.updateInputsFromImg(),this.positionNear(e)}update(e){this.img===e&&(this.updateInputsFromImg(),this.positionNear(e))}hide(){this.img=null,this.removeAttribute(`open`)}bindEvents(){let e=this.shadow,t=e.getElementById(`inp-w`),n=e.getElementById(`inp-h`),r=e.getElementById(`cb-ratio`),i=e.getElementById(`btn-reset`);r.addEventListener(`change`,()=>{this.aspectLocked=r.checked}),t.addEventListener(`change`,()=>this.onWidthChange(t)),n.addEventListener(`change`,()=>this.onHeightChange(n)),t.addEventListener(`keydown`,e=>{e.key===`Enter`&&this.onWidthChange(t)}),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&this.onHeightChange(n)}),this.shadow.addEventListener(`mousedown`,e=>e.stopPropagation()),i.addEventListener(`click`,()=>{this.dispatchEvent(new CustomEvent(`poa-img-reset-size`,{bubbles:!0,composed:!0}))})}onWidthChange(e){if(!this.img)return;let t=parseInt(e.value,10);(isNaN(t)||t<20)&&(t=20,e.value=`20`);let n;if(this.aspectLocked&&this.naturalW>0&&this.naturalH>0){let e=Math.round(parseFloat(this.img.style.height)||this.img.getBoundingClientRect().height),r=Math.round(parseFloat(this.img.style.width)||this.img.getBoundingClientRect().width),i=r>0?e/r:this.naturalH/this.naturalW;n=Math.max(20,Math.round(t*i)),this.shadow.getElementById(`inp-h`).value=String(n)}else n=Math.round(parseFloat(this.img.style.height)||this.img.getBoundingClientRect().height);this.dispatchEvent(new CustomEvent(`poa-img-size-change`,{bubbles:!0,composed:!0,detail:{width:t,height:n}}))}onHeightChange(e){if(!this.img)return;let t=parseInt(e.value,10);(isNaN(t)||t<20)&&(t=20,e.value=`20`);let n;if(this.aspectLocked&&this.naturalW>0&&this.naturalH>0){let e=Math.round(parseFloat(this.img.style.height)||this.img.getBoundingClientRect().height),r=Math.round(parseFloat(this.img.style.width)||this.img.getBoundingClientRect().width),i=e>0?r/e:this.naturalW/this.naturalH;n=Math.max(20,Math.round(t*i)),this.shadow.getElementById(`inp-w`).value=String(n)}else n=Math.round(parseFloat(this.img.style.width)||this.img.getBoundingClientRect().width);this.dispatchEvent(new CustomEvent(`poa-img-size-change`,{bubbles:!0,composed:!0,detail:{width:n,height:t}}))}updateInputsFromImg(){if(!this.img)return;let e=this.img.getBoundingClientRect(),t=Math.round(parseFloat(this.img.style.width)||e.width),n=Math.round(parseFloat(this.img.style.height)||e.height);this.shadow.getElementById(`inp-w`).value=String(t),this.shadow.getElementById(`inp-h`).value=String(n)}positionNear(e){let t=e.getBoundingClientRect(),n=window.innerHeight-t.bottom>46?t.bottom+6:t.top-36-6;this.style.top=`${Math.max(0,n)}px`,this.style.left=`${Math.max(0,t.left)}px`}},_s=`
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
`,vs=`
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
`,ys=class extends HTMLElement{shadow;resolvePromise=null;constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${_s}</style>${vs}`,this.bindEvents()}show(e,t=`확인`){let n=this.shadow.getElementById(`dlg-title`),r=this.shadow.getElementById(`dlg-message`);return n&&(n.textContent=t),r&&(r.textContent=e),this.setAttribute(`open`,``),new Promise(e=>{this.resolvePromise=e})}close(e){this.removeAttribute(`open`),this.resolvePromise?.(e),this.resolvePromise=null}bindEvents(){this.shadow.getElementById(`btn-ok`)?.addEventListener(`click`,()=>this.close(!0)),this.shadow.getElementById(`btn-cancel`)?.addEventListener(`click`,()=>this.close(!1)),this.shadow.getElementById(`overlay`)?.addEventListener(`click`,e=>{e.target.id===`overlay`&&this.close(!1)}),this.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.preventDefault(),this.close(!1))})}},bs={error:`●`,warning:`▲`,info:`ℹ`},xs={error:`#DC2626`,warning:`#D97706`,info:`#2563EB`},Ss=`
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
`,Cs=class extends HTMLElement{shadow;issues=[];contentEl=null;rerunFn=null;currentFilter=`all`;constructor(){super(),this.shadow=this.attachShadow({mode:`open`})}connectedCallback(){this.shadow.innerHTML=`<style>${Ss}</style>
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
</div>`,this.bindEvents()}setup(e,t){this.contentEl=e,this.rerunFn=t}startLoading(){this.setAttribute(`open`,``),this.setAttribute(`loading`,``)}show(e){this.issues=e.issues,this.currentFilter=`all`,this.setAttribute(`open`,``),this.removeAttribute(`loading`),this.renderSummary(e),this.renderIssues(),this.syncFilterSelect()}close(){this.removeAttribute(`open`),this.removeAttribute(`loading`)}renderSummary(e){let t=this.shadow.getElementById(`summary-bar`);if(t){if(e.errorCount===0&&e.warningCount===0&&e.infoCount===0){t.innerHTML=`<span class="badge badge-pass">✓ 문제 없음</span>`;return}t.innerHTML=[e.errorCount>0?`<span class="badge badge-error">   ${bs.error}   오류 ${e.errorCount}개</span>`:``,e.warningCount>0?`<span class="badge badge-warning">${bs.warning} 경고 ${e.warningCount}개</span>`:``,e.infoCount>0?`<span class="badge badge-info">   ${bs.info}   정보 ${e.infoCount}개</span>`:``].join(``)}}renderIssues(){let e=this.shadow.getElementById(`issue-list`);if(!e)return;let t=this.shadow.getElementById(`btn-fix-all`),n=this.issues.some(e=>e.autoFix);if(t&&(t.disabled=!n),this.issues.length===0){e.innerHTML=`<div class="empty" style="display:block">
        <div class="empty-icon">✅</div>
        <div>접근성 문제가 없습니다!</div>
      </div>`;return}e.innerHTML=this.issues.map((e,t)=>this.renderCard(e,t)).join(``),this.applyFilter(),this.bindCardEvents()}renderCard(e,t){let n=xs[e.level],r=bs[e.level],i=this.buildFixPanelHTML(e,t);return`
<div class="issue-card" data-level="${e.level}" data-idx="${t}">
  <div class="issue-header">
    <span class="issue-icon" style="color:${n}">${r}</span>
    <span class="issue-title">${ws(e.title)}</span>
    <span class="issue-arrow">∨</span>
  </div>
  <div class="issue-body">
    <p class="issue-message">${ws(e.message)}</p>
    <div class="issue-actions">
      ${e.element?`<button class="btn btn-nav" data-idx="${t}">해당 요소로 이동</button>`:``}
      <button class="btn btn-fix" data-idx="${t}">직접 수정</button>
    </div>
    <div class="fix-panel" id="fp-${t}">${i}</div>
  </div>
</div>`}buildFixPanelHTML(e,t){return e.id===`img-alt-missing`||e.id===`img-alt-empty`?`<label>alt 텍스트</label>
        <div class="fix-row">
          <input type="text" class="fix-input" id="fi-${t}" placeholder="이미지 설명 입력">
          <button class="btn-apply" data-idx="${t}" data-action="set-alt">적용</button>
        </div>`:e.id===`table-caption-missing`?`<label>표 캡션</label>
        <div class="fix-row">
          <input type="text" class="fix-input" id="fi-${t}" placeholder="표 제목 입력">
          <button class="btn-apply" data-idx="${t}" data-action="set-caption">적용</button>
        </div>`:e.id===`link-vague-text`||e.id===`link-no-text`?`<label>링크 텍스트</label>
        <div class="fix-row">
          <input type="text" class="fix-input" id="fi-${t}" placeholder="링크 설명 입력">
          <button class="btn-apply" data-idx="${t}" data-action="set-link-text">적용</button>
        </div>`:e.autoFix?`<button class="btn-auto-fix" data-idx="${t}" data-action="auto-fix">자동 수정</button>`:`<span class="no-fix-msg">자동 수정을 지원하지 않습니다.</span>`}bindEvents(){this.shadow.getElementById(`btn-close`)?.addEventListener(`click`,()=>this.close()),this.shadow.getElementById(`overlay`)?.addEventListener(`click`,e=>{e.target.id===`overlay`&&this.close()}),this.shadow.getElementById(`filter-select`)?.addEventListener(`change`,e=>{this.currentFilter=e.target.value,this.applyFilter()}),this.shadow.getElementById(`btn-fix-all`)?.addEventListener(`click`,()=>this.doFixAll()),this.addEventListener(`keydown`,e=>{e.key===`Escape`&&(e.preventDefault(),this.close())})}bindCardEvents(){let e=this.shadow.getElementById(`issue-list`);e&&e.addEventListener(`click`,e=>{let t=e.target,n=t.closest(`.issue-header`);if(n){n.closest(`.issue-card`)?.classList.toggle(`expanded`);return}let r=t.closest(`.btn-nav`);if(r){let e=parseInt(r.dataset.idx??`-1`);this.navigateTo(this.issues[e]?.element??null);return}let i=t.closest(`.btn-fix`);if(i){let e=i.dataset.idx;this.shadow.getElementById(`fp-${e}`)?.classList.toggle(`open`);return}let a=t.closest(`.btn-apply`);if(a){let e=parseInt(a.dataset.idx??`-1`),t=a.dataset.action??``,n=this.shadow.getElementById(`fi-${e}`)?.value.trim()??``;this.applyFix(e,t,n);return}let o=t.closest(`[data-action="auto-fix"]`);if(o){let e=parseInt(o.dataset.idx??`-1`);this.applyFix(e,`auto-fix`,``)}})}navigateTo(e){!e||!this.contentEl||(e.scrollIntoView({behavior:`smooth`,block:`center`}),e.style.outline=`3px solid #F59E0B`,e.style.outlineOffset=`2px`,setTimeout(()=>{e.style.outline=``,e.style.outlineOffset=``},2e3))}applyFix(e,t,n){let r=this.issues[e];if(r){switch(t){case`set-alt`:r.element?.setAttribute(`alt`,n||`이미지`);break;case`set-caption`:{let e=r.element;if(e){let t=e.querySelector(`caption`);t||(t=e.ownerDocument.createElement(`caption`),e.prepend(t)),t.textContent=n||`표`}break}case`set-link-text`:r.element&&(r.element.textContent=n);break;case`auto-fix`:r.autoFix?.();break}this.rerunFn?.()}}doFixAll(){(this.currentFilter===`all`?this.issues:this.issues.filter(e=>e.level===this.currentFilter)).forEach(e=>e.autoFix?.()),this.rerunFn?.()}applyFilter(){this.shadow.querySelectorAll(`.issue-card`).forEach(e=>{let t=e.dataset.level;e.hidden=this.currentFilter!==`all`&&t!==this.currentFilter})}syncFilterSelect(){let e=this.shadow.getElementById(`filter-select`);e&&(e.value=`all`)}};function ws(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}var Ts={"very-high":`🔴`,high:`🟠`,medium:`🟡`},Es={"very-high":`매우높음`,high:`높음`,medium:`중간`},Ds=`
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
`,Os=class extends HTMLElement{shadow;items=[];filteredType=`all`;onModified=null;onConfirmFn=null;constructor(){super(),this.shadow=this.attachShadow({mode:`open`}),this.shadow.innerHTML=`<style>${Ds}</style><slot></slot>`}setup(e,t){this.onModified=e,this.onConfirmFn=t}startLoading(){this.setAttribute(`open`,``),this.shadow.innerHTML=`<style>${Ds}</style>
<div class="overlay">
  <div class="dialog">
    <div class="header">
      <h2>개인정보 검사</h2>
      <button id="btn-close">✕</button>
    </div>
    <div class="loading"><div class="spinner"></div>검사 중…</div>
  </div>
</div>`,this.shadow.getElementById(`btn-close`)?.addEventListener(`click`,()=>this.close())}show(e){this.items=e,this.filteredType=`all`,this.setAttribute(`open`,``),this.render()}close(){this.removeAttribute(`open`),this.items=[]}render(){let e=this.buildTypeOptions(),t=this.visibleMatches(),n=this.items.length;this.shadow.innerHTML=`<style>${Ds}</style>
<div class="overlay" id="overlay">
  <div class="dialog" id="dialog">
    <div class="header">
      <h2>개인정보 검사 결과</h2>
      <button id="btn-close">✕</button>
    </div>

    <div class="summary ${n===0?`clean`:``}">
      ${n===0?`✅ 개인정보가 발견되지 않았습니다.`:`⚠ 총 <strong>${n}개</strong>의 개인정보가 발견됐습니다.`}
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
    </div>`:``}

    <div class="list" id="list">
      ${n===0?`<div class="empty">검사할 내용이 없거나 개인정보가 없습니다.</div>`:t.map(e=>this.buildCard(e)).join(``)}
    </div>
  </div>
</div>`,this.bindEvents()}buildTypeOptions(){let e=new Map;for(let t of this.items)e.set(t.label,(e.get(t.label)??0)+1);return Array.from(e.entries()).map(([e,t])=>`<option value="${e}">${e} (${t})</option>`).join(``)}buildCard(e){return`
<div class="card" data-level="${e.riskLevel}" data-id="${e.id}">
  <div class="card-header" data-toggle="${e.id}">
    <span class="card-icon">${Ts[e.riskLevel]}</span>
    <span class="card-label">${e.label}</span>
    <span class="card-risk">${Es[e.riskLevel]}</span>
    <span class="card-toggle">∨</span>
  </div>
  <div class="card-body" id="body-${e.id}">
    <div class="raw-text">"${ks(e.raw)}"</div>
    <div class="location">위치: ${e.locationLabel}</div>
    <div class="card-actions">
      <button class="btn" data-action="navigate" data-id="${e.id}">이동</button>
      <button class="btn danger" data-action="delete" data-id="${e.id}">삭제</button>
      <button class="btn mask"   data-action="mask"   data-id="${e.id}">마스킹 (${ks(e.masked)})</button>
    </div>
  </div>
</div>`}visibleMatches(){return this.filteredType===`all`?this.items:this.items.filter(e=>e.label===this.filteredType)}bindEvents(){let e=this.shadow;e.getElementById(`btn-close`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`overlay`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`dialog`)?.addEventListener(`click`,e=>e.stopPropagation()),e.getElementById(`filter-type`)?.addEventListener(`change`,e=>{this.filteredType=e.target.value,this.renderList()}),e.getElementById(`btn-delete-all`)?.addEventListener(`click`,async()=>{await(this.onConfirmFn?.(`탐지된 ${this.visibleMatches().length}개 항목을 모두 삭제할까요?`)??Promise.resolve(!0))&&(nr.deleteAll(this.visibleMatches()),this.items=this.items.filter(e=>e.highlightEl!==null),this.onModified?.(),this.render())}),e.getElementById(`btn-mask-all`)?.addEventListener(`click`,()=>{nr.maskAll(this.visibleMatches()),this.items=this.items.filter(e=>e.highlightEl!==null),this.onModified?.(),this.render()}),e.querySelectorAll(`[data-toggle]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.toggle,r=e.getElementById(`body-${n}`),i=t.querySelector(`.card-toggle`);if(!r)return;let a=!r.classList.contains(`hidden`);r.classList.toggle(`hidden`,a),i&&(i.textContent=a?`›`:`∨`)})}),e.getElementById(`list`)?.addEventListener(`click`,e=>{let t=e.target.closest(`[data-action]`);if(!t)return;let n=t.dataset.id,r=this.items.find(e=>e.id===n);if(!r)return;let i=t.dataset.action;i===`navigate`?this.navigateTo(r):i===`delete`?(nr.deleteMatch(r),this.items=this.items.filter(e=>e.id!==n),this.onModified?.(),this.render()):i===`mask`&&(nr.maskMatch(r),this.items=this.items.filter(e=>e.id!==n),this.onModified?.(),this.render())})}renderList(){let e=this.shadow.getElementById(`list`);if(!e)return;let t=this.visibleMatches();e.innerHTML=t.length===0?`<div class="empty">해당 유형의 항목이 없습니다.</div>`:t.map(e=>this.buildCard(e)).join(``),e.querySelectorAll(`[data-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.toggle,n=this.shadow.getElementById(`body-${t}`),r=e.querySelector(`.card-toggle`);if(!n)return;let i=!n.classList.contains(`hidden`);n.classList.toggle(`hidden`,i),r&&(r.textContent=i?`›`:`∨`)})})}navigateTo(e){let t=e.highlightEl;if(!t)return;t.scrollIntoView({behavior:`smooth`,block:`center`});let n=t.style.outline;t.style.outline=`2px solid #F59E0B`,t.style.outlineOffset=`2px`,setTimeout(()=>{t.style.outline=n,t.style.outlineOffset=``},2e3)}};function ks(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}var As=`
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
`,js=class extends HTMLElement{shadow;currentTable=null;currentRow=1;currentCol=1;pickBar=null;constructor(){super(),this.shadow=this.attachShadow({mode:`open`}),this.shadow.innerHTML=`<style>${As}</style>`}open(e){this.currentTable=e.table,this.currentRow=e.cellRow,this.currentCol=e.cellCol,this.setAttribute(`open`,``),this.render(e.existingFormula,e.initialRange)}close(){this.removeAttribute(`open`),this.exitPickMode(),this.currentTable=null}applyRange(e,t,n,r){this.exitPickMode();let i=e=>this.shadow.getElementById(e),a=(e,t)=>{let n=i(e);n&&(n.value=String(t))};a(`sr`,e),a(`sc`,t),a(`er`,n),a(`ec`,r)}render(e,t){let n=e?.fn??`SUM`,r=e?.format??`integer`,i=e?.decimalPlaces??2,[a,o,s,c]=e?.range??t??[1,1,1,1],l=e?.targetRow??this.currentRow,u=e?.targetCol??this.currentCol,d=!e||e.targetRow===this.currentRow&&e.targetCol===this.currentCol,f=e?.style?.backgroundColor??`#ffffff`,p=e?.style?.color??`#000000`,m=(e,t)=>`<label><input type="radio" name="fn" value="${e}"${n===e?` checked`:``}> ${e} (${t})</label>`,h=(e,t)=>`<label><input type="radio" name="format" value="${e}"${r===e?` checked`:``}> ${t}</label>`;this.shadow.innerHTML=`<style>${As}</style>
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
          ${m(`SUM`,`합계`)}
          ${m(`AVERAGE`,`평균`)}
          ${m(`PRODUCT`,`곱셈`)}
          ${m(`SUBTRACT`,`뺄셈`)}
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
          <label>열 <input id="sc" type="number" min="1" value="${o}"></label>
          <span class="separator">→</span>
          <span>끝</span>
          <label>행 <input id="er" type="number" min="1" value="${s}"></label>
          <label>열 <input id="ec" type="number" min="1" value="${c}"></label>
        </div>
      </div>

      <!-- 결과 셀 -->
      <div class="section">
        <div class="section-title">결과 셀</div>
        <div class="radio-group">
          <label>
            <input type="radio" name="target" value="current"${d?` checked`:``}>
            현재 셀에 출력
          </label>
          <label>
            <input type="radio" name="target" value="other"${d?``:` checked`}>
            다른 셀 지정
          </label>
        </div>
        <div class="target-other-row" id="target-other-row" style="${d?`opacity:.4;pointer-events:none`:``}">
          <label>행 <input id="tr" type="number" min="1" value="${l}"></label>
          <label>열 <input id="tc" type="number" min="1" value="${u}"></label>
        </div>
      </div>

      <!-- 결과 포맷 -->
      <div class="section">
        <div class="section-title">결과 포맷</div>
        <div class="radio-row">
          ${h(`integer`,`정수`)}
          <label>
            <input type="radio" name="format" value="decimal"${r===`decimal`?` checked`:``}>
            소수점
            <span class="decimal-places-wrap">
              <input id="dp" type="number" min="0" max="10" value="${i}"> 자리
            </span>
          </label>
          ${h(`currency`,`통화 (₩)`)}
          ${h(`percent`,`퍼센트 (%)`)}
        </div>
      </div>

      <!-- 스타일 -->
      <div class="section">
        <div class="section-title">결과 셀 스타일 <span style="font-weight:400;color:#9CA3AF">(선택)</span></div>
        <div class="style-row">
          <label>배경색 <input type="color" id="bg-color" value="${f}"></label>
          <label>글자색 <input type="color" id="text-color" value="${p}"></label>
        </div>
      </div>
    </div>

    <div class="footer">
      <button class="btn" id="btn-cancel">취소</button>
      <button class="btn primary" id="btn-confirm">확인</button>
    </div>
  </div>
</div>`,this.bindEvents()}bindEvents(){let e=this.shadow;e.getElementById(`btn-close`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`btn-cancel`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`overlay`)?.addEventListener(`click`,()=>this.close()),e.getElementById(`dialog`)?.addEventListener(`click`,e=>e.stopPropagation()),e.querySelectorAll(`input[name="target"]`).forEach(t=>{t.addEventListener(`change`,()=>{let n=e.getElementById(`target-other-row`);n&&(t.value===`other`?(n.style.opacity=`1`,n.style.pointerEvents=`auto`):(n.style.opacity=`0.4`,n.style.pointerEvents=`none`))})}),e.getElementById(`btn-pick`)?.addEventListener(`click`,()=>{this.enterPickMode()}),e.getElementById(`btn-confirm`)?.addEventListener(`click`,()=>this.confirm())}confirm(){if(!this.currentTable)return;let e=e=>this.shadow.getElementById(e),t=t=>Math.max(1,parseInt(e(t)?.value??`1`,10)),n=this.shadow.querySelector(`input[name="fn"]:checked`)?.value??`SUM`,r=this.shadow.querySelector(`input[name="format"]:checked`)?.value??`integer`,i=this.shadow.querySelector(`input[name="target"]:checked`)?.value??`current`,a=parseInt(e(`dp`)?.value??`2`,10),o=e(`bg-color`)?.value??``,s=e(`text-color`)?.value??``,c=i===`current`?this.currentRow:t(`tr`),l=i===`current`?this.currentCol:t(`tc`),u={fn:n,range:[t(`sr`),t(`sc`),t(`er`),t(`ec`)],targetRow:c,targetCol:l,format:r,decimalPlaces:r===`decimal`?a:void 0,style:{backgroundColor:o===`#ffffff`?void 0:o,color:s===`#000000`?void 0:s}};this.dispatchEvent(new CustomEvent(`poa-formula-apply`,{bubbles:!0,composed:!1,detail:{formula:u,table:this.currentTable}})),this.close()}enterPickMode(){this.shadow.getElementById(`overlay`)?.classList.add(`pick-mode`);let e=document.createElement(`div`);e.style.cssText=[`position:fixed`,`top:20px`,`left:50%`,`transform:translateX(-50%)`,`background:#1F2937`,`color:#fff`,`padding:8px 18px`,`border-radius:6px`,`display:flex`,`align-items:center`,`gap:14px`,`z-index:100000`,`font-size:13px`,`font-family:system-ui,sans-serif`,`box-shadow:0 4px 12px rgba(0,0,0,.3)`].join(`;`),e.innerHTML=`
      <span>표에서 셀을 드래그하여 범위를 선택하세요</span>
      <button id="cancel-pick" style="
        background:#374151;border:none;color:#fff;padding:4px 10px;
        border-radius:4px;cursor:pointer;font-size:12px;
      ">취소</button>`,document.body.appendChild(e),this.pickBar=e,e.querySelector(`#cancel-pick`)?.addEventListener(`click`,()=>this.exitPickMode()),this.dispatchEvent(new CustomEvent(`poa-formula-start-pick`,{bubbles:!0}))}exitPickMode(){this.shadow.getElementById(`overlay`)?.classList.remove(`pick-mode`),this.pickBar?.remove(),this.pickBar=null}};customElements.get(`poa-menubar`)||customElements.define(`poa-menubar`,na),customElements.get(`poa-context-toolbar`)||customElements.define(`poa-context-toolbar`,Bo),customElements.get(`poa-toolbar`)||customElements.define(`poa-toolbar`,qo),customElements.get(`poa-status-bar`)||customElements.define(`poa-status-bar`,Jo),customElements.get(`poa-settings-dialog`)||customElements.define(`poa-settings-dialog`,Zo),customElements.get(`poa-find-replace-dialog`)||customElements.define(`poa-find-replace-dialog`,es),customElements.get(`poa-image-edit-dialog`)||customElements.define(`poa-image-edit-dialog`,ns),customElements.get(`poa-image-dialog`)||customElements.define(`poa-image-dialog`,as),customElements.get(`poa-table-dialog`)||customElements.define(`poa-table-dialog`,ds),customElements.get(`poa-cell-split-dialog`)||customElements.define(`poa-cell-split-dialog`,wi),customElements.get(`poa-link-dialog`)||customElements.define(`poa-link-dialog`,ms),customElements.get(`poa-image-toolbar`)||customElements.define(`poa-image-toolbar`,gs),customElements.get(`poa-confirm-dialog`)||customElements.define(`poa-confirm-dialog`,ys),customElements.get(`poa-accessibility-dialog`)||customElements.define(`poa-accessibility-dialog`,Cs),customElements.get(`poa-privacy-dialog`)||customElements.define(`poa-privacy-dialog`,Os),customElements.get(`poa-formula-dialog`)||customElements.define(`poa-formula-dialog`,js),customElements.get(`poa-video-dialog`)||customElements.define(`poa-video-dialog`,Ei),customElements.get(`poa-form-control-dialog`)||customElements.define(`poa-form-control-dialog`,Mi),customElements.get(`poa-template-tree`)||customElements.define(`poa-template-tree`,Pi),customElements.get(`poa-template-dialog`)||customElements.define(`poa-template-dialog`,Li),customElements.get(`poa-signature-dialog`)||customElements.define(`poa-signature-dialog`,Ki),customElements.get(`poa-emoji-dialog`)||customElements.define(`poa-emoji-dialog`,Ji),customElements.get(`poa-tooltip-dialog`)||customElements.define(`poa-tooltip-dialog`,Xi),customElements.get(`poa-input-property-dialog`)||customElements.define(`poa-input-property-dialog`,Qi),customElements.get(`poa-editor`)||customElements.define(`poa-editor`,vi);var Ms=class{mgr;constructor(e){this.container=e,this.mgr=new mi}renderTemplateSelector(){this.container.innerHTML=``;let e=document.createElement(`h2`);e.className=`user-mode-selector-title`,e.textContent=`양식 선택`,this.container.appendChild(e);let t=document.createElement(`div`);t.className=`user-mode-card-grid`;let n=this.mgr.getAll().filter(e=>e.type===`template`&&!e.isTemp);if(n.length===0){let e=document.createElement(`p`);e.style.cssText=`color:#9ca3af;font-size:14px;`,e.textContent=`저장된 템플릿이 없습니다.`,t.appendChild(e)}else for(let e of n)t.appendChild(this._buildCard(e));this.container.appendChild(t)}_buildCard(e){let t=document.createElement(`div`);t.className=`user-mode-card`;let n=document.createElement(`div`);n.className=`user-mode-card-icon`,n.textContent=`📄`;let r=document.createElement(`div`);return r.className=`user-mode-card-name`,r.textContent=e.name,t.appendChild(n),t.appendChild(r),t.addEventListener(`click`,()=>{window.location.href=ui(e.id)}),t}};if(si()===`user`){let e=ci();if(e){let t=new mi().getById(e),n=document.getElementById(`editor`);t?.content&&n.setHTML(t.content),n.enterUserMode(t?.name??`문서`)}else document.getElementById(`editor-root`).classList.add(`hidden`),document.body.classList.add(`user-mode`),new Ms(document.getElementById(`user-mode-root`)).renderTemplateSelector()}var Ns=document.getElementById(`editor`),Ps=document.getElementById(`output`),Fs=`<h2>poa-editor v1.0.0</h2>
<p>안녕하세요! <strong>poa-editor</strong>에 오신 것을 환영합니다.</p>
<p>텍스트를 선택하고 <em>툴바 버튼</em>으로 서식을 적용해보세요.</p>
<ul>
  <li>글머리 기호 목록</li>
  <li><strong>굵게</strong>, <em>기울임</em>, <u>밑줄</u></li>
  <li>글자색 · 배경색 · 글꼴 변경</li>
</ul>
<p>표 삽입 → 삽입 메뉴 → 표를 사용해보세요.</p>`;document.getElementById(`btn-get-html`).addEventListener(`click`,()=>{Ps.style.display=`block`,Ps.textContent=Ns.getHTML()}),document.getElementById(`btn-set-html`).addEventListener(`click`,()=>{Ns.setHTML(Fs),Ps.style.display=`none`}),document.getElementById(`btn-clear`).addEventListener(`click`,()=>{Ns.setHTML(``),Ps.style.display=`none`}),document.getElementById(`btn-find`).addEventListener(`click`,()=>{Ns.querySelector(`.poa-editor-content`)?.focus(),Ns.dispatchEvent(new KeyboardEvent(`keydown`,{key:`f`,ctrlKey:!0,bubbles:!0}))}),document.getElementById(`btn-replace`).addEventListener(`click`,()=>{Ns.querySelector(`.poa-editor-content`)?.focus(),Ns.dispatchEvent(new KeyboardEvent(`keydown`,{key:`h`,ctrlKey:!0,bubbles:!0}))}),document.getElementById(`btn-undo`).addEventListener(`click`,()=>{Ns.querySelector(`.poa-editor-content`)?.focus(),document.execCommand(`undo`)}),document.getElementById(`btn-redo`).addEventListener(`click`,()=>{Ns.querySelector(`.poa-editor-content`)?.focus(),document.execCommand(`redo`)}),si()!==`user`&&setTimeout(()=>Ns.setHTML(Fs),100);