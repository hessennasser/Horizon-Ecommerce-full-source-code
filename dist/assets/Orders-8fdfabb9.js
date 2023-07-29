import{d as I,n as b,r as n,t as f,e as an,u as ln,c as rn,A as sn,j as M,D as dn,b as cn}from"./index-74d0d24f.js";import{B as ut}from"./Breadcrumbs-77bbe042.js";import"./Tooltip-6d459ae5.js";import"./index-2a1aa769.js";import"./index.esm-396e9f6c.js";import"./iconBase-c989d1dc.js";import"./floating-ui.dom.browser.min-b2afe59a.js";import"./index.esm-8bccb4d0.js";var X;function se(e,t){return e[t]}function We(e,t){return t.split(".").reduce((o,a)=>{const l=a.match(/[^\]\\[.]+/g);if(l&&l.length>1)for(let i=0;i<l.length;i++)return o[l[i]][l[i+1]];return o[a]},e)}function gn(e=[],t,o=0){return[...e.slice(0,o),t,...e.slice(o)]}function un(e=[],t,o="id"){const a=e.slice(),l=se(t,o);return l?a.splice(a.findIndex(i=>se(i,o)===l),1):a.splice(a.findIndex(i=>i===t),1),a}function pt(e){return e.map((t,o)=>{const a=Object.assign(Object.assign({},t),{sortable:t.sortable||!!t.sortFunction||void 0});return t.id||(a.id=o+1),a})}function be(e,t){return Math.ceil(e/t)}function ze(e,t){return Math.min(e,t)}(function(e){e.ASC="asc",e.DESC="desc"})(X||(X={}));const j=()=>null;function yt(e,t=[],o=[]){let a={},l=[...o];return t.length&&t.forEach(i=>{if(!i.when||typeof i.when!="function")throw new Error('"when" must be defined in the conditional style object and must be function');i.when(e)&&(a=i.style||{},i.classNames&&(l=[...l,...i.classNames]),typeof i.style=="function"&&(a=i.style(e)||{}))}),{style:a,classNames:l.join(" ")}}function ke(e,t=[],o="id"){const a=se(e,o);return a?t.some(l=>se(l,o)===a):t.some(l=>l===e)}function Ee(e,t){return t?e.findIndex(o=>me(o.id,t)):-1}function me(e,t){return e==t}function pn(e,t){const o=!e.toggleOnSelectedRowsChange;switch(t.type){case"SELECT_ALL_ROWS":{const{keyField:a,rows:l,rowCount:i,mergeSelections:s}=t,c=!e.allSelected,p=!e.toggleOnSelectedRowsChange;if(s){const R=c?[...e.selectedRows,...l.filter(u=>!ke(u,e.selectedRows,a))]:e.selectedRows.filter(u=>!ke(u,l,a));return Object.assign(Object.assign({},e),{allSelected:c,selectedCount:R.length,selectedRows:R,toggleOnSelectedRowsChange:p})}return Object.assign(Object.assign({},e),{allSelected:c,selectedCount:c?i:0,selectedRows:c?l:[],toggleOnSelectedRowsChange:p})}case"SELECT_SINGLE_ROW":{const{keyField:a,row:l,isSelected:i,rowCount:s,singleSelect:c}=t;return c?i?Object.assign(Object.assign({},e),{selectedCount:0,allSelected:!1,selectedRows:[],toggleOnSelectedRowsChange:o}):Object.assign(Object.assign({},e),{selectedCount:1,allSelected:!1,selectedRows:[l],toggleOnSelectedRowsChange:o}):i?Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length>0?e.selectedRows.length-1:0,allSelected:!1,selectedRows:un(e.selectedRows,l,a),toggleOnSelectedRowsChange:o}):Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length+1,allSelected:e.selectedRows.length+1===s,selectedRows:gn(e.selectedRows,l),toggleOnSelectedRowsChange:o})}case"SELECT_MULTIPLE_ROWS":{const{keyField:a,selectedRows:l,totalRows:i,mergeSelections:s}=t;if(s){const c=[...e.selectedRows,...l.filter(p=>!ke(p,e.selectedRows,a))];return Object.assign(Object.assign({},e),{selectedCount:c.length,allSelected:!1,selectedRows:c,toggleOnSelectedRowsChange:o})}return Object.assign(Object.assign({},e),{selectedCount:l.length,allSelected:l.length===i,selectedRows:l,toggleOnSelectedRowsChange:o})}case"CLEAR_SELECTED_ROWS":{const{selectedRowsFlag:a}=t;return Object.assign(Object.assign({},e),{allSelected:!1,selectedCount:0,selectedRows:[],selectedRowsFlag:a})}case"SORT_CHANGE":{const{sortDirection:a,selectedColumn:l,clearSelectedOnSort:i}=t;return Object.assign(Object.assign(Object.assign({},e),{selectedColumn:l,sortDirection:a,currentPage:1}),i&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:o})}case"CHANGE_PAGE":{const{page:a,paginationServer:l,visibleOnly:i,persistSelectedOnPageChange:s}=t,c=l&&s,p=l&&!s||i;return Object.assign(Object.assign(Object.assign(Object.assign({},e),{currentPage:a}),c&&{allSelected:!1}),p&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:o})}case"CHANGE_ROWS_PER_PAGE":{const{rowsPerPage:a,page:l}=t;return Object.assign(Object.assign({},e),{currentPage:l,rowsPerPage:a})}}}const bn=I`
	pointer-events: none;
	opacity: 0.4;
`,mn=b.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({disabled:e})=>e&&bn};
	${({theme:e})=>e.table.style};
`,hn=I`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`,wn=b.div`
	display: flex;
	width: 100%;
	${({fixedHeader:e})=>e&&hn};
	${({theme:e})=>e.head.style};
`,fn=b.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({theme:e})=>e.headRow.style};
	${({dense:e,theme:t})=>e&&t.headRow.denseStyle};
`,vt=(e,...t)=>I`
		@media screen and (max-width: ${599}px) {
			${I(e,...t)}
		}
	`,xn=(e,...t)=>I`
		@media screen and (max-width: ${959}px) {
			${I(e,...t)}
		}
	`,Cn=(e,...t)=>I`
		@media screen and (max-width: ${1280}px) {
			${I(e,...t)}
		}
	`,yn=e=>(t,...o)=>I`
				@media screen and (max-width: ${e}px) {
					${I(t,...o)}
				}
			`,ce=b.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({theme:e,headCell:t})=>e[t?"headCells":"cells"].style};
	${({noPadding:e})=>e&&"padding: 0"};
`,Rt=b(ce)`
	flex-grow: ${({button:e,grow:t})=>t===0||e?0:t||1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({maxWidth:e})=>e||"100%"};
	min-width: ${({minWidth:e})=>e||"100px"};
	${({width:e})=>e&&I`
			min-width: ${e};
			max-width: ${e};
		`};
	${({right:e})=>e&&"justify-content: flex-end"};
	${({button:e,center:t})=>(t||e)&&"justify-content: center"};
	${({compact:e,button:t})=>(e||t)&&"padding: 0"};

	/* handle hiding cells */
	${({hide:e})=>e&&e==="sm"&&vt`
    display: none;
  `};
	${({hide:e})=>e&&e==="md"&&xn`
    display: none;
  `};
	${({hide:e})=>e&&e==="lg"&&Cn`
    display: none;
  `};
	${({hide:e})=>e&&Number.isInteger(e)&&yn(e)`
    display: none;
  `};
`,vn=I`
	div:first-child {
		white-space: ${({wrapCell:e})=>e?"normal":"nowrap"};
		overflow: ${({allowOverflow:e})=>e?"visible":"hidden"};
		text-overflow: ellipsis;
	}
`,Rn=b(Rt).attrs(e=>({style:e.style}))`
	${({renderAsCell:e})=>!e&&vn};
	${({theme:e,isDragging:t})=>t&&e.cells.draggingStyle};
	${({cellStyle:e})=>e};
`;var Sn=n.memo(function({id:e,column:t,row:o,rowIndex:a,dataTag:l,isDragging:i,onDragStart:s,onDragOver:c,onDragEnd:p,onDragEnter:R,onDragLeave:u}){const{style:h,classNames:P}=yt(o,t.conditionalCellStyles,["rdt_TableCell"]);return n.createElement(Rn,{id:e,"data-column-id":t.id,role:"cell",className:P,"data-tag":l,cellStyle:t.style,renderAsCell:!!t.cell,allowOverflow:t.allowOverflow,button:t.button,center:t.center,compact:t.compact,grow:t.grow,hide:t.hide,maxWidth:t.maxWidth,minWidth:t.minWidth,right:t.right,width:t.width,wrapCell:t.wrap,style:h,isDragging:i,onDragStart:s,onDragOver:c,onDragEnd:p,onDragEnter:R,onDragLeave:u},!t.cell&&n.createElement("div",{"data-tag":l},function(S,C,H,y){if(!C)return null;if(typeof C!="string"&&typeof C!="function")throw new Error("selector must be a . delimited string eg (my.property) or function (e.g. row => row.field");return H&&typeof H=="function"?H(S,y):C&&typeof C=="function"?C(S,y):We(S,C)}(o,t.selector,t.format,a)),t.cell&&t.cell(o,a,t,e))}),St=n.memo(function({name:e,component:t="input",componentOptions:o={style:{}},indeterminate:a=!1,checked:l=!1,disabled:i=!1,onClick:s=j}){const c=t,p=c!=="input"?o.style:(u=>Object.assign(Object.assign({fontSize:"18px"},!u&&{cursor:"pointer"}),{padding:0,marginTop:"1px",verticalAlign:"middle",position:"relative"}))(i),R=n.useMemo(()=>function(u,...h){let P;return Object.keys(u).map(S=>u[S]).forEach((S,C)=>{typeof S=="function"&&(P=Object.assign(Object.assign({},u),{[Object.keys(u)[C]]:S(...h)}))}),P||u}(o,a),[o,a]);return n.createElement(c,Object.assign({type:"checkbox",ref:u=>{u&&(u.indeterminate=a)},style:p,onClick:i?j:s,name:e,"aria-label":e,checked:l,disabled:i},R,{onChange:j}))});const En=b(ce)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;function On({name:e,keyField:t,row:o,rowCount:a,selected:l,selectableRowsComponent:i,selectableRowsComponentProps:s,selectableRowsSingle:c,selectableRowDisabled:p,onSelectedRow:R}){const u=!(!p||!p(o));return n.createElement(En,{onClick:h=>h.stopPropagation(),className:"rdt_TableCell",noPadding:!0},n.createElement(St,{name:e,component:i,componentOptions:s,checked:l,"aria-checked":l,onClick:()=>{R({type:"SELECT_SINGLE_ROW",row:o,isSelected:l,keyField:t,rowCount:a,singleSelect:c})},disabled:u}))}const kn=b.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({theme:e})=>e.expanderButton.style};
`;function Dn({disabled:e=!1,expanded:t=!1,expandableIcon:o,id:a,row:l,onToggled:i}){const s=t?o.expanded:o.collapsed;return n.createElement(kn,{"aria-disabled":e,onClick:()=>i&&i(l),"data-testid":`expander-button-${a}`,disabled:e,"aria-label":t?"Collapse Row":"Expand Row",role:"button",type:"button"},s)}const Pn=b(ce)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({theme:e})=>e.expanderCell.style};
`;function Hn({row:e,expanded:t=!1,expandableIcon:o,id:a,onToggled:l,disabled:i=!1}){return n.createElement(Pn,{onClick:s=>s.stopPropagation(),noPadding:!0},n.createElement(Dn,{id:a,row:e,expanded:t,expandableIcon:o,disabled:i,onToggled:l}))}const $n=b.div`
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.expanderRow.style};
	${({extendedRowStyle:e})=>e};
`;var jn=n.memo(function({data:e,ExpanderComponent:t,expanderComponentProps:o,extendedRowStyle:a,extendedClassNames:l}){const i=["rdt_ExpanderRow",...l.split(" ").filter(s=>s!=="rdt_TableRow")].join(" ");return n.createElement($n,{className:i,extendedRowStyle:a},n.createElement(t,Object.assign({data:e},o)))}),De,Be,bt;(function(e){e.LTR="ltr",e.RTL="rtl",e.AUTO="auto"})(De||(De={})),function(e){e.LEFT="left",e.RIGHT="right",e.CENTER="center"}(Be||(Be={})),function(e){e.SM="sm",e.MD="md",e.LG="lg"}(bt||(bt={}));const In=I`
	&:hover {
		${({highlightOnHover:e,theme:t})=>e&&t.rows.highlightOnHoverStyle};
	}
`,Fn=I`
	&:hover {
		cursor: pointer;
	}
`,Tn=b.div.attrs(e=>({style:e.style}))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.rows.style};
	${({dense:e,theme:t})=>e&&t.rows.denseStyle};
	${({striped:e,theme:t})=>e&&t.rows.stripedStyle};
	${({highlightOnHover:e})=>e&&In};
	${({pointerOnHover:e})=>e&&Fn};
	${({selected:e,theme:t})=>e&&t.rows.selectedHighlightStyle};
`;function An({columns:e=[],conditionalRowStyles:t=[],defaultExpanded:o=!1,defaultExpanderDisabled:a=!1,dense:l=!1,expandableIcon:i,expandableRows:s=!1,expandableRowsComponent:c,expandableRowsComponentProps:p,expandableRowsHideExpander:R,expandOnRowClicked:u=!1,expandOnRowDoubleClicked:h=!1,highlightOnHover:P=!1,id:S,expandableInheritConditionalStyles:C,keyField:H,onRowClicked:y=j,onRowDoubleClicked:w=j,onRowMouseEnter:x=j,onRowMouseLeave:E=j,onRowExpandToggled:v=j,onSelectedRow:F=j,pointerOnHover:A=!1,row:O,rowCount:k,rowIndex:Y,selectableRowDisabled:_=null,selectableRows:W=!1,selectableRowsComponent:Q,selectableRowsComponentProps:$,selectableRowsHighlight:oe=!1,selectableRowsSingle:ge=!1,selected:ae,striped:le=!1,draggingColumnId:Pe,onDragStart:He,onDragOver:$e,onDragEnd:je,onDragEnter:V,onDragLeave:we}){const[U,fe]=n.useState(o);n.useEffect(()=>{fe(o)},[o]);const Z=n.useCallback(()=>{fe(!U),v(!U,O)},[U,v,O]),Ie=A||s&&(u||h),Fe=n.useCallback(D=>{D.target&&D.target.getAttribute("data-tag")==="allowRowEvents"&&(y(O,D),!a&&s&&u&&Z())},[a,u,s,Z,y,O]),xe=n.useCallback(D=>{D.target&&D.target.getAttribute("data-tag")==="allowRowEvents"&&(w(O,D),!a&&s&&h&&Z())},[a,h,s,Z,w,O]),Te=n.useCallback(D=>{x(O,D)},[x,O]),q=n.useCallback(D=>{E(O,D)},[E,O]),ee=se(O,H),{style:Ce,classNames:ye}=yt(O,t,["rdt_TableRow"]),Ae=oe&&ae,Le=C?Ce:{},Me=le&&Y%2==0;return n.createElement(n.Fragment,null,n.createElement(Tn,{id:`row-${S}`,role:"row",striped:Me,highlightOnHover:P,pointerOnHover:!a&&Ie,dense:l,onClick:Fe,onDoubleClick:xe,onMouseEnter:Te,onMouseLeave:q,className:ye,selected:Ae,style:Ce},W&&n.createElement(On,{name:`select-row-${ee}`,keyField:H,row:O,rowCount:k,selected:ae,selectableRowsComponent:Q,selectableRowsComponentProps:$,selectableRowDisabled:_,selectableRowsSingle:ge,onSelectedRow:F}),s&&!R&&n.createElement(Hn,{id:ee,expandableIcon:i,expanded:U,row:O,onToggled:Z,disabled:a}),e.map(D=>D.omit?null:n.createElement(Sn,{id:`cell-${D.id}-${ee}`,key:`cell-${D.id}-${ee}`,dataTag:D.ignoreRowClick||D.button?null:"allowRowEvents",column:D,row:O,rowIndex:Y,isDragging:me(Pe,D.id),onDragStart:He,onDragOver:$e,onDragEnd:je,onDragEnter:V,onDragLeave:we}))),s&&U&&n.createElement(jn,{key:`expander-${ee}`,data:O,extendedRowStyle:Le,extendedClassNames:ye,ExpanderComponent:c,expanderComponentProps:p}))}const Ln=b.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({sortActive:e})=>e?"opacity: 1":"opacity: 0"};
	${({sortDirection:e})=>e==="desc"&&"transform: rotate(180deg)"};
`,Mn=({sortActive:e,sortDirection:t})=>f.createElement(Ln,{sortActive:e,sortDirection:t},"▲"),_n=b(Rt)`
	${({button:e})=>e&&"text-align: center"};
	${({theme:e,isDragging:t})=>t&&e.headCells.draggingStyle};
`,Nn=I`
	cursor: pointer;
	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			transform: 'translate3d(0, 0, 0)';
			${({sortActive:e})=>e?"opacity: 1":"opacity: 0"};
			color: inherit;
			font-size: 18px;
			height: 18px;
			width: 18px;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 95ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	${({sortActive:e})=>!e&&I`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`,zn=b.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({disabled:e})=>!e&&Nn};
`,Wn=b.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;var Bn=n.memo(function({column:e,disabled:t,draggingColumnId:o,selectedColumn:a={},sortDirection:l,sortIcon:i,sortServer:s,pagination:c,paginationServer:p,persistSelectedOnSort:R,selectableRowsVisibleOnly:u,onSort:h,onDragStart:P,onDragOver:S,onDragEnd:C,onDragEnter:H,onDragLeave:y}){n.useEffect(()=>{typeof e.selector=="string"&&console.error(`Warning: ${e.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`)},[]);const[w,x]=n.useState(!1),E=n.useRef(null);if(n.useEffect(()=>{E.current&&x(E.current.scrollWidth>E.current.clientWidth)},[w]),e.omit)return null;const v=()=>{if(!e.sortable&&!e.selector)return;let $=l;me(a.id,e.id)&&($=l===X.ASC?X.DESC:X.ASC),h({type:"SORT_CHANGE",sortDirection:$,selectedColumn:e,clearSelectedOnSort:c&&p&&!R||s||u})},F=$=>n.createElement(Mn,{sortActive:$,sortDirection:l}),A=()=>n.createElement("span",{className:[l,"__rdt_custom_sort_icon__"].join(" ")},i),O=!(!e.sortable||!me(a.id,e.id)),k=!e.sortable||t,Y=e.sortable&&!i&&!e.right,_=e.sortable&&!i&&e.right,W=e.sortable&&i&&!e.right,Q=e.sortable&&i&&e.right;return n.createElement(_n,{"data-column-id":e.id,className:"rdt_TableCol",headCell:!0,allowOverflow:e.allowOverflow,button:e.button,compact:e.compact,grow:e.grow,hide:e.hide,maxWidth:e.maxWidth,minWidth:e.minWidth,right:e.right,center:e.center,width:e.width,draggable:e.reorder,isDragging:me(e.id,o),onDragStart:P,onDragOver:S,onDragEnd:C,onDragEnter:H,onDragLeave:y},e.name&&n.createElement(zn,{"data-column-id":e.id,"data-sort-id":e.id,role:"columnheader",tabIndex:0,className:"rdt_TableCol_Sortable",onClick:k?void 0:v,onKeyPress:k?void 0:$=>{$.key==="Enter"&&v()},sortActive:!k&&O,disabled:k},!k&&Q&&A(),!k&&_&&F(O),typeof e.name=="string"?n.createElement(Wn,{title:w?e.name:void 0,ref:E,"data-column-id":e.id},e.name):e.name,!k&&W&&A(),!k&&Y&&F(O)))});const Gn=b(ce)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;function Vn({headCell:e=!0,rowData:t,keyField:o,allSelected:a,mergeSelections:l,selectedRows:i,selectableRowsComponent:s,selectableRowsComponentProps:c,selectableRowDisabled:p,onSelectAllRows:R}){const u=i.length>0&&!a,h=p?t.filter(C=>!p(C)):t,P=h.length===0,S=Math.min(t.length,h.length);return n.createElement(Gn,{className:"rdt_TableCol",headCell:e,noPadding:!0},n.createElement(St,{name:"select-all-rows",component:s,componentOptions:c,onClick:()=>{R({type:"SELECT_ALL_ROWS",rows:h,rowCount:S,mergeSelections:l,keyField:o})},checked:a,indeterminate:u,disabled:P}))}function Et(e=De.AUTO){const t=typeof window=="object",[o,a]=n.useState(!1);return n.useEffect(()=>{if(t)if(e!=="auto")a(e==="rtl");else{const l=!(!window.document||!window.document.createElement),i=document.getElementsByTagName("BODY")[0],s=document.getElementsByTagName("HTML")[0],c=i.dir==="rtl"||s.dir==="rtl";a(l&&c)}},[e,t]),o}const Un=b.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({theme:e})=>e.contextMenu.fontColor};
	font-size: ${({theme:e})=>e.contextMenu.fontSize};
	font-weight: 400;
`,Yn=b.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`,mt=b.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: inherit;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	display: flex;
	${({rtl:e})=>e&&"direction: rtl"};
	${({theme:e})=>e.contextMenu.style};
	${({theme:e,visible:t})=>t&&e.contextMenu.activeStyle};
`;function Qn({contextMessage:e,contextActions:t,contextComponent:o,selectedCount:a,direction:l}){const i=Et(l),s=a>0;return o?n.createElement(mt,{visible:s},n.cloneElement(o,{selectedCount:a})):n.createElement(mt,{visible:s,rtl:i},n.createElement(Un,null,((c,p,R)=>{if(p===0)return null;const u=p===1?c.singular:c.plural;return R?`${p} ${c.message||""} ${u}`:`${p} ${u} ${c.message||""}`})(e,a,i)),n.createElement(Yn,null,t))}const qn=b.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	${({theme:e})=>e.header.style}
`,Jn=b.div`
	flex: 1 0 auto;
	color: ${({theme:e})=>e.header.fontColor};
	font-size: ${({theme:e})=>e.header.fontSize};
	font-weight: 400;
`,Kn=b.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`,Xn=({title:e,actions:t=null,contextMessage:o,contextActions:a,contextComponent:l,selectedCount:i,direction:s,showMenu:c=!0})=>n.createElement(qn,{className:"rdt_TableHeader",role:"heading","aria-level":1},n.createElement(Jn,null,e),t&&n.createElement(Kn,null,t),c&&n.createElement(Qn,{contextMessage:o,contextActions:a,contextComponent:l,direction:s,selectedCount:i}));function Ot(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function"){var l=0;for(a=Object.getOwnPropertySymbols(e);l<a.length;l++)t.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(e,a[l])&&(o[a[l]]=e[a[l]])}return o}const Zn={left:"flex-start",right:"flex-end",center:"center"},eo=b.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({align:e})=>Zn[e]};
	flex-wrap: ${({wrapContent:e})=>e?"wrap":"nowrap"};
	${({theme:e})=>e.subHeader.style}
`,to=e=>{var{align:t="right",wrapContent:o=!0}=e,a=Ot(e,["align","wrapContent"]);return n.createElement(eo,Object.assign({align:t,wrapContent:o},a))},no=b.div`
	display: flex;
	flex-direction: column;
`,oo=b.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({responsive:e,fixedHeader:t})=>e&&I`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${t?"auto":"hidden"};
			min-height: 0;
		`};

	${({fixedHeader:e=!1,fixedHeaderScrollHeight:t="100vh"})=>e&&I`
			max-height: ${t};
			-webkit-overflow-scrolling: touch;
		`};

	${({theme:e})=>e.responsiveWrapper.style};
`,ht=b.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${e=>e.theme.progress.style};
`,ao=b.div`
	position: relative;
	width: 100%;
	${({theme:e})=>e.tableWrapper.style};
`,lo=b(ce)`
	white-space: nowrap;
	${({theme:e})=>e.expanderCell.style};
`,ro=b.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({theme:e})=>e.noData.style};
`,io=()=>f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},f.createElement("path",{d:"M7 10l5 5 5-5z"}),f.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),so=b.select`
	cursor: pointer;
	height: 24px;
	max-width: 100%;
	user-select: none;
	padding-left: 8px;
	padding-right: 24px;
	box-sizing: content-box;
	font-size: inherit;
	color: inherit;
	border: none;
	background-color: transparent;
	appearance: none;
	direction: ltr;
	flex-shrink: 0;

	&::-ms-expand {
		display: none;
	}

	&:disabled::-ms-expand {
		background: #f60;
	}

	option {
		color: initial;
	}
`,co=b.div`
	position: relative;
	flex-shrink: 0;
	font-size: inherit;
	color: inherit;
	margin-top: 1px;

	svg {
		top: 0;
		right: 0;
		color: inherit;
		position: absolute;
		fill: currentColor;
		width: 24px;
		height: 24px;
		display: inline-block;
		user-select: none;
		pointer-events: none;
	}
`,go=e=>{var{defaultValue:t,onChange:o}=e,a=Ot(e,["defaultValue","onChange"]);return n.createElement(co,null,n.createElement(so,Object.assign({onChange:o,defaultValue:t},a)),n.createElement(io,null))},r={columns:[],data:[],title:"",keyField:"id",selectableRows:!1,selectableRowsHighlight:!1,selectableRowsNoSelectAll:!1,selectableRowSelected:null,selectableRowDisabled:null,selectableRowsComponent:"input",selectableRowsComponentProps:{},selectableRowsVisibleOnly:!1,selectableRowsSingle:!1,clearSelectedRows:!1,expandableRows:!1,expandableRowDisabled:null,expandableRowExpanded:null,expandOnRowClicked:!1,expandableRowsHideExpander:!1,expandOnRowDoubleClicked:!1,expandableInheritConditionalStyles:!1,expandableRowsComponent:function(){return f.createElement("div",null,"To add an expander pass in a component instance via ",f.createElement("strong",null,"expandableRowsComponent"),". You can then access props.data from this component.")},expandableIcon:{collapsed:f.createElement(()=>f.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},f.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),f.createElement("path",{d:"M0-.25h24v24H0z",fill:"none"})),null),expanded:f.createElement(()=>f.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},f.createElement("path",{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}),f.createElement("path",{d:"M0-.75h24v24H0z",fill:"none"})),null)},expandableRowsComponentProps:{},progressPending:!1,progressComponent:f.createElement("div",{style:{fontSize:"24px",fontWeight:700,padding:"24px"}},"Loading..."),persistTableHead:!1,sortIcon:null,sortFunction:null,sortServer:!1,striped:!1,highlightOnHover:!1,pointerOnHover:!1,noContextMenu:!1,contextMessage:{singular:"item",plural:"items",message:"selected"},actions:null,contextActions:null,contextComponent:null,defaultSortFieldId:null,defaultSortAsc:!0,responsive:!0,noDataComponent:f.createElement("div",{style:{padding:"24px"}},"There are no records to display"),disabled:!1,noTableHead:!1,noHeader:!1,subHeader:!1,subHeaderAlign:Be.RIGHT,subHeaderWrap:!0,subHeaderComponent:null,fixedHeader:!1,fixedHeaderScrollHeight:"100vh",pagination:!1,paginationServer:!1,paginationServerOptions:{persistSelectedOnSort:!1,persistSelectedOnPageChange:!1},paginationDefaultPage:1,paginationResetDefaultPage:!1,paginationTotalRows:0,paginationPerPage:10,paginationRowsPerPageOptions:[10,15,20,25,30],paginationComponent:null,paginationComponentOptions:{},paginationIconFirstPage:f.createElement(()=>f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},f.createElement("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),f.createElement("path",{fill:"none",d:"M24 24H0V0h24v24z"})),null),paginationIconLastPage:f.createElement(()=>f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},f.createElement("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),f.createElement("path",{fill:"none",d:"M0 0h24v24H0V0z"})),null),paginationIconNext:f.createElement(()=>f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},f.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),f.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),null),paginationIconPrevious:f.createElement(()=>f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},f.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),f.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),null),dense:!1,conditionalRowStyles:[],theme:"default",customStyles:{},direction:De.AUTO,onChangePage:j,onChangeRowsPerPage:j,onRowClicked:j,onRowDoubleClicked:j,onRowMouseEnter:j,onRowMouseLeave:j,onRowExpandToggled:j,onSelectedRowsChange:j,onSort:j,onColumnOrderChange:j},uo={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},po=b.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${({theme:e})=>e.pagination.style};
`,Oe=b.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({theme:e})=>e.pagination.pageButtonsStyle};
	${({isRTL:e})=>e&&"transform: scale(-1, -1)"};
`,bo=b.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${vt`
    width: 100%;
    justify-content: space-around;
  `};
`,kt=b.span`
	flex-shrink: 1;
	user-select: none;
`,mo=b(kt)`
	margin: 0 24px;
`,ho=b(kt)`
	margin: 0 4px;
`;var wo=n.memo(function({rowsPerPage:e,rowCount:t,currentPage:o,direction:a=r.direction,paginationRowsPerPageOptions:l=r.paginationRowsPerPageOptions,paginationIconLastPage:i=r.paginationIconLastPage,paginationIconFirstPage:s=r.paginationIconFirstPage,paginationIconNext:c=r.paginationIconNext,paginationIconPrevious:p=r.paginationIconPrevious,paginationComponentOptions:R=r.paginationComponentOptions,onChangeRowsPerPage:u=r.onChangeRowsPerPage,onChangePage:h=r.onChangePage}){const P=(()=>{const $=typeof window=="object";function oe(){return{width:$?window.innerWidth:void 0,height:$?window.innerHeight:void 0}}const[ge,ae]=n.useState(oe);return n.useEffect(()=>{if(!$)return()=>null;function le(){ae(oe())}return window.addEventListener("resize",le),()=>window.removeEventListener("resize",le)},[]),ge})(),S=Et(a),C=P.width&&P.width>599,H=be(t,e),y=o*e,w=y-e+1,x=o===1,E=o===H,v=Object.assign(Object.assign({},uo),R),F=o===H?`${w}-${t} ${v.rangeSeparatorText} ${t}`:`${w}-${y} ${v.rangeSeparatorText} ${t}`,A=n.useCallback(()=>h(o-1),[o,h]),O=n.useCallback(()=>h(o+1),[o,h]),k=n.useCallback(()=>h(1),[h]),Y=n.useCallback(()=>h(be(t,e)),[h,t,e]),_=n.useCallback($=>u(Number($.target.value),o),[o,u]),W=l.map($=>n.createElement("option",{key:$,value:$},$));v.selectAllRowsItem&&W.push(n.createElement("option",{key:-1,value:t},v.selectAllRowsItemText));const Q=n.createElement(go,{onChange:_,defaultValue:e,"aria-label":v.rowsPerPageText},W);return n.createElement(po,{className:"rdt_Pagination"},!v.noRowsPerPage&&C&&n.createElement(n.Fragment,null,n.createElement(ho,null,v.rowsPerPageText),Q),C&&n.createElement(mo,null,F),n.createElement(bo,null,n.createElement(Oe,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":x,onClick:k,disabled:x,isRTL:S},s),n.createElement(Oe,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":x,onClick:A,disabled:x,isRTL:S},p),!C&&Q,n.createElement(Oe,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":E,onClick:O,disabled:E,isRTL:S},c),n.createElement(Oe,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":E,onClick:Y,disabled:E,isRTL:S},i)))});const ne=(e,t)=>{const o=n.useRef(!0);n.useEffect(()=>{o.current?o.current=!1:e()},t)};var fo=function(e){return function(t){return!!t&&typeof t=="object"}(e)&&!function(t){var o=Object.prototype.toString.call(t);return o==="[object RegExp]"||o==="[object Date]"||function(a){return a.$$typeof===xo}(t)}(e)},xo=typeof Symbol=="function"&&Symbol.for?Symbol.for("react.element"):60103;function he(e,t){return t.clone!==!1&&t.isMergeableObject(e)?de((o=e,Array.isArray(o)?[]:{}),e,t):e;var o}function Co(e,t,o){return e.concat(t).map(function(a){return he(a,o)})}function wt(e){return Object.keys(e).concat(function(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter(function(o){return t.propertyIsEnumerable(o)}):[]}(e))}function ft(e,t){try{return t in e}catch{return!1}}function yo(e,t,o){var a={};return o.isMergeableObject(e)&&wt(e).forEach(function(l){a[l]=he(e[l],o)}),wt(t).forEach(function(l){(function(i,s){return ft(i,s)&&!(Object.hasOwnProperty.call(i,s)&&Object.propertyIsEnumerable.call(i,s))})(e,l)||(ft(e,l)&&o.isMergeableObject(t[l])?a[l]=function(i,s){if(!s.customMerge)return de;var c=s.customMerge(i);return typeof c=="function"?c:de}(l,o)(e[l],t[l],o):a[l]=he(t[l],o))}),a}function de(e,t,o){(o=o||{}).arrayMerge=o.arrayMerge||Co,o.isMergeableObject=o.isMergeableObject||fo,o.cloneUnlessOtherwiseSpecified=he;var a=Array.isArray(t);return a===Array.isArray(e)?a?o.arrayMerge(e,t,o):yo(e,t,o):he(t,o)}de.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(o,a){return de(o,a,t)},{})};var vo=de;const xt={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)"},background:{default:"#FFFFFF"},context:{background:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},divider:{default:"rgba(0,0,0,.12)"},button:{default:"rgba(0,0,0,.54)",focus:"rgba(0,0,0,.12)",hover:"rgba(0,0,0,.12)",disabled:"rgba(0, 0, 0, .18)"},selected:{default:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},highlightOnHover:{default:"#EEEEEE",text:"rgba(0, 0, 0, 0.87)"},striped:{default:"#FAFAFA",text:"rgba(0, 0, 0, 0.87)"}},Ct={default:xt,light:xt,dark:{text:{primary:"#FFFFFF",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(0,0,0,.12)"},background:{default:"#424242"},context:{background:"#E91E63",text:"#FFFFFF"},divider:{default:"rgba(81, 81, 81, 1)"},button:{default:"#FFFFFF",focus:"rgba(255, 255, 255, .54)",hover:"rgba(255, 255, 255, .12)",disabled:"rgba(255, 255, 255, .18)"},selected:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},highlightOnHover:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},striped:{default:"rgba(0, 0, 0, .87)",text:"#FFFFFF"}}};function Ro(e,t,o,a){const[l,i]=n.useState(()=>pt(e)),[s,c]=n.useState(""),p=n.useRef("");ne(()=>{i(pt(e))},[e]);const R=n.useCallback(y=>{var w,x,E;const{attributes:v}=y.target,F=(w=v.getNamedItem("data-column-id"))===null||w===void 0?void 0:w.value;F&&(p.current=((E=(x=l[Ee(l,F)])===null||x===void 0?void 0:x.id)===null||E===void 0?void 0:E.toString())||"",c(p.current))},[l]),u=n.useCallback(y=>{var w;const{attributes:x}=y.target,E=(w=x.getNamedItem("data-column-id"))===null||w===void 0?void 0:w.value;if(E&&p.current&&E!==p.current){const v=Ee(l,p.current),F=Ee(l,E),A=[...l];A[v]=l[F],A[F]=l[v],i(A),t(A)}},[t,l]),h=n.useCallback(y=>{y.preventDefault()},[]),P=n.useCallback(y=>{y.preventDefault()},[]),S=n.useCallback(y=>{y.preventDefault(),p.current="",c("")},[]),C=function(y=!1){return y?X.ASC:X.DESC}(a),H=n.useMemo(()=>l[Ee(l,o==null?void 0:o.toString())]||{},[o,l]);return{tableColumns:l,draggingColumnId:s,handleDragStart:R,handleDragEnter:u,handleDragOver:h,handleDragLeave:P,handleDragEnd:S,defaultSortDirection:C,defaultSortColumn:H}}var So=n.memo(function(e){const{data:t=r.data,columns:o=r.columns,title:a=r.title,actions:l=r.actions,keyField:i=r.keyField,striped:s=r.striped,highlightOnHover:c=r.highlightOnHover,pointerOnHover:p=r.pointerOnHover,dense:R=r.dense,selectableRows:u=r.selectableRows,selectableRowsSingle:h=r.selectableRowsSingle,selectableRowsHighlight:P=r.selectableRowsHighlight,selectableRowsNoSelectAll:S=r.selectableRowsNoSelectAll,selectableRowsVisibleOnly:C=r.selectableRowsVisibleOnly,selectableRowSelected:H=r.selectableRowSelected,selectableRowDisabled:y=r.selectableRowDisabled,selectableRowsComponent:w=r.selectableRowsComponent,selectableRowsComponentProps:x=r.selectableRowsComponentProps,onRowExpandToggled:E=r.onRowExpandToggled,onSelectedRowsChange:v=r.onSelectedRowsChange,expandableIcon:F=r.expandableIcon,onChangeRowsPerPage:A=r.onChangeRowsPerPage,onChangePage:O=r.onChangePage,paginationServer:k=r.paginationServer,paginationServerOptions:Y=r.paginationServerOptions,paginationTotalRows:_=r.paginationTotalRows,paginationDefaultPage:W=r.paginationDefaultPage,paginationResetDefaultPage:Q=r.paginationResetDefaultPage,paginationPerPage:$=r.paginationPerPage,paginationRowsPerPageOptions:oe=r.paginationRowsPerPageOptions,paginationIconLastPage:ge=r.paginationIconLastPage,paginationIconFirstPage:ae=r.paginationIconFirstPage,paginationIconNext:le=r.paginationIconNext,paginationIconPrevious:Pe=r.paginationIconPrevious,paginationComponent:He=r.paginationComponent,paginationComponentOptions:$e=r.paginationComponentOptions,responsive:je=r.responsive,progressPending:V=r.progressPending,progressComponent:we=r.progressComponent,persistTableHead:U=r.persistTableHead,noDataComponent:fe=r.noDataComponent,disabled:Z=r.disabled,noTableHead:Ie=r.noTableHead,noHeader:Fe=r.noHeader,fixedHeader:xe=r.fixedHeader,fixedHeaderScrollHeight:Te=r.fixedHeaderScrollHeight,pagination:q=r.pagination,subHeader:ee=r.subHeader,subHeaderAlign:Ce=r.subHeaderAlign,subHeaderWrap:ye=r.subHeaderWrap,subHeaderComponent:Ae=r.subHeaderComponent,noContextMenu:Le=r.noContextMenu,contextMessage:Me=r.contextMessage,contextActions:D=r.contextActions,contextComponent:Dt=r.contextComponent,expandableRows:ve=r.expandableRows,onRowClicked:Ge=r.onRowClicked,onRowDoubleClicked:Ve=r.onRowDoubleClicked,onRowMouseEnter:Ue=r.onRowMouseEnter,onRowMouseLeave:Ye=r.onRowMouseLeave,sortIcon:Pt=r.sortIcon,onSort:Ht=r.onSort,sortFunction:Qe=r.sortFunction,sortServer:_e=r.sortServer,expandableRowsComponent:$t=r.expandableRowsComponent,expandableRowsComponentProps:jt=r.expandableRowsComponentProps,expandableRowDisabled:qe=r.expandableRowDisabled,expandableRowsHideExpander:Je=r.expandableRowsHideExpander,expandOnRowClicked:It=r.expandOnRowClicked,expandOnRowDoubleClicked:Ft=r.expandOnRowDoubleClicked,expandableRowExpanded:Ke=r.expandableRowExpanded,expandableInheritConditionalStyles:Tt=r.expandableInheritConditionalStyles,defaultSortFieldId:At=r.defaultSortFieldId,defaultSortAsc:Lt=r.defaultSortAsc,clearSelectedRows:Xe=r.clearSelectedRows,conditionalRowStyles:Mt=r.conditionalRowStyles,theme:Ze=r.theme,customStyles:et=r.customStyles,direction:ue=r.direction,onColumnOrderChange:_t=r.onColumnOrderChange,className:Nt}=e,{tableColumns:tt,draggingColumnId:nt,handleDragStart:ot,handleDragEnter:at,handleDragOver:lt,handleDragLeave:rt,handleDragEnd:it,defaultSortDirection:zt,defaultSortColumn:Wt}=Ro(o,_t,At,Lt),[{rowsPerPage:J,currentPage:N,selectedRows:Ne,allSelected:st,selectedCount:dt,selectedColumn:B,sortDirection:re,toggleOnSelectedRowsChange:Bt},te]=n.useReducer(pn,{allSelected:!1,selectedCount:0,selectedRows:[],selectedColumn:Wt,toggleOnSelectedRowsChange:!1,sortDirection:zt,currentPage:W,rowsPerPage:$,selectedRowsFlag:!1,contextMessage:r.contextMessage}),{persistSelectedOnSort:ct=!1,persistSelectedOnPageChange:Re=!1}=Y,gt=!(!k||!Re&&!ct),Gt=q&&!V&&t.length>0,Vt=He||wo,Ut=n.useMemo(()=>((g={},m="default",L="default")=>{const z=Ct[m]?m:L;return vo({table:{style:{color:(d=Ct[z]).text.primary,backgroundColor:d.background.default}},tableWrapper:{style:{display:"table"}},responsiveWrapper:{style:{}},header:{style:{fontSize:"22px",color:d.text.primary,backgroundColor:d.background.default,minHeight:"56px",paddingLeft:"16px",paddingRight:"8px"}},subHeader:{style:{backgroundColor:d.background.default,minHeight:"52px"}},head:{style:{color:d.text.primary,fontSize:"12px",fontWeight:500}},headRow:{style:{backgroundColor:d.background.default,minHeight:"52px",borderBottomWidth:"1px",borderBottomColor:d.divider.default,borderBottomStyle:"solid"},denseStyle:{minHeight:"32px"}},headCells:{style:{paddingLeft:"16px",paddingRight:"16px"},draggingStyle:{cursor:"move"}},contextMenu:{style:{backgroundColor:d.context.background,fontSize:"18px",fontWeight:400,color:d.context.text,paddingLeft:"16px",paddingRight:"8px",transform:"translate3d(0, -100%, 0)",transitionDuration:"125ms",transitionTimingFunction:"cubic-bezier(0, 0, 0.2, 1)",willChange:"transform"},activeStyle:{transform:"translate3d(0, 0, 0)"}},cells:{style:{paddingLeft:"16px",paddingRight:"16px",wordBreak:"break-word"},draggingStyle:{}},rows:{style:{fontSize:"13px",fontWeight:400,color:d.text.primary,backgroundColor:d.background.default,minHeight:"48px","&:not(:last-of-type)":{borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:d.divider.default}},denseStyle:{minHeight:"32px"},selectedHighlightStyle:{"&:nth-of-type(n)":{color:d.selected.text,backgroundColor:d.selected.default,borderBottomColor:d.background.default}},highlightOnHoverStyle:{color:d.highlightOnHover.text,backgroundColor:d.highlightOnHover.default,transitionDuration:"0.15s",transitionProperty:"background-color",borderBottomColor:d.background.default,outlineStyle:"solid",outlineWidth:"1px",outlineColor:d.background.default},stripedStyle:{color:d.striped.text,backgroundColor:d.striped.default}},expanderRow:{style:{color:d.text.primary,backgroundColor:d.background.default}},expanderCell:{style:{flex:"0 0 48px"}},expanderButton:{style:{color:d.button.default,fill:d.button.default,backgroundColor:"transparent",borderRadius:"2px",transition:"0.25s",height:"100%",width:"100%","&:hover:enabled":{cursor:"pointer"},"&:disabled":{color:d.button.disabled},"&:hover:not(:disabled)":{cursor:"pointer",backgroundColor:d.button.hover},"&:focus":{outline:"none",backgroundColor:d.button.focus},svg:{margin:"auto"}}},pagination:{style:{color:d.text.secondary,fontSize:"13px",minHeight:"56px",backgroundColor:d.background.default,borderTopStyle:"solid",borderTopWidth:"1px",borderTopColor:d.divider.default},pageButtonsStyle:{borderRadius:"50%",height:"40px",width:"40px",padding:"8px",margin:"px",cursor:"pointer",transition:"0.4s",color:d.button.default,fill:d.button.default,backgroundColor:"transparent","&:disabled":{cursor:"unset",color:d.button.disabled,fill:d.button.disabled},"&:hover:not(:disabled)":{backgroundColor:d.button.hover},"&:focus":{outline:"none",backgroundColor:d.button.focus}}},noData:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:d.text.primary,backgroundColor:d.background.default}},progress:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:d.text.primary,backgroundColor:d.background.default}}},g);var d})(et,Ze),[et,Ze]),Yt=n.useMemo(()=>Object.assign({},ue!=="auto"&&{dir:ue}),[ue]),T=n.useMemo(()=>{if(_e)return t;if(B!=null&&B.sortFunction&&typeof B.sortFunction=="function"){const g=B.sortFunction,m=re===X.ASC?g:(L,z)=>-1*g(L,z);return[...t].sort(m)}return function(g,m,L,z){return m?z&&typeof z=="function"?z(g.slice(0),m,L):g.slice(0).sort((d,Se)=>{let K,G;if(typeof m=="string"?(K=We(d,m),G=We(Se,m)):(K=m(d),G=m(Se)),L==="asc"){if(K<G)return-1;if(K>G)return 1}if(L==="desc"){if(K>G)return-1;if(K<G)return 1}return 0}):g}(t,B==null?void 0:B.selector,re,Qe)},[_e,B,re,t,Qe]),pe=n.useMemo(()=>{if(q&&!k){const g=N*J,m=g-J;return T.slice(m,g)}return T},[N,q,k,J,T]),Qt=n.useCallback(g=>{te(g)},[]),qt=n.useCallback(g=>{te(g)},[]),Jt=n.useCallback(g=>{te(g)},[]),Kt=n.useCallback((g,m)=>Ge(g,m),[Ge]),Xt=n.useCallback((g,m)=>Ve(g,m),[Ve]),Zt=n.useCallback((g,m)=>Ue(g,m),[Ue]),en=n.useCallback((g,m)=>Ye(g,m),[Ye]),ie=n.useCallback(g=>te({type:"CHANGE_PAGE",page:g,paginationServer:k,visibleOnly:C,persistSelectedOnPageChange:Re}),[k,Re,C]),tn=n.useCallback(g=>{const m=be(_||pe.length,g),L=ze(N,m);k||ie(L),te({type:"CHANGE_ROWS_PER_PAGE",page:L,rowsPerPage:g})},[N,ie,k,_,pe.length]);if(q&&!k&&T.length>0&&pe.length===0){const g=be(T.length,J),m=ze(N,g);ie(m)}ne(()=>{v({allSelected:st,selectedCount:dt,selectedRows:Ne.slice(0)})},[Bt]),ne(()=>{Ht(B,re,T.slice(0))},[B,re]),ne(()=>{O(N,_||T.length)},[N]),ne(()=>{A(J,N)},[J]),ne(()=>{ie(W)},[W,Q]),ne(()=>{if(q&&k&&_>0){const g=be(_,J),m=ze(N,g);N!==m&&ie(m)}},[_]),n.useEffect(()=>{te({type:"CLEAR_SELECTED_ROWS",selectedRowsFlag:Xe})},[h,Xe]),n.useEffect(()=>{if(!H)return;const g=T.filter(L=>H(L)),m=h?g.slice(0,1):g;te({type:"SELECT_MULTIPLE_ROWS",keyField:i,selectedRows:m,totalRows:T.length,mergeSelections:gt})},[t,H]);const nn=C?pe:T,on=Re||h||S;return n.createElement(an,{theme:Ut},!Fe&&(!!a||!!l)&&n.createElement(Xn,{title:a,actions:l,showMenu:!Le,selectedCount:dt,direction:ue,contextActions:D,contextComponent:Dt,contextMessage:Me}),ee&&n.createElement(to,{align:Ce,wrapContent:ye},Ae),n.createElement(oo,Object.assign({responsive:je,fixedHeader:xe,fixedHeaderScrollHeight:Te,className:Nt},Yt),n.createElement(ao,null,V&&!U&&n.createElement(ht,null,we),n.createElement(mn,{disabled:Z,className:"rdt_Table",role:"table"},!Ie&&(!!U||T.length>0&&!V)&&n.createElement(wn,{className:"rdt_TableHead",role:"rowgroup",fixedHeader:xe},n.createElement(fn,{className:"rdt_TableHeadRow",role:"row",dense:R},u&&(on?n.createElement(ce,{style:{flex:"0 0 48px"}}):n.createElement(Vn,{allSelected:st,selectedRows:Ne,selectableRowsComponent:w,selectableRowsComponentProps:x,selectableRowDisabled:y,rowData:nn,keyField:i,mergeSelections:gt,onSelectAllRows:qt})),ve&&!Je&&n.createElement(lo,null),tt.map(g=>n.createElement(Bn,{key:g.id,column:g,selectedColumn:B,disabled:V||T.length===0,pagination:q,paginationServer:k,persistSelectedOnSort:ct,selectableRowsVisibleOnly:C,sortDirection:re,sortIcon:Pt,sortServer:_e,onSort:Qt,onDragStart:ot,onDragOver:lt,onDragEnd:it,onDragEnter:at,onDragLeave:rt,draggingColumnId:nt})))),!T.length&&!V&&n.createElement(ro,null,fe),V&&U&&n.createElement(ht,null,we),!V&&T.length>0&&n.createElement(no,{className:"rdt_TableBody",role:"rowgroup"},pe.map((g,m)=>{const L=se(g,i),z=function(G=""){return typeof G!="number"&&(!G||G.length===0)}(L)?m:L,d=ke(g,Ne,i),Se=!!(ve&&Ke&&Ke(g)),K=!!(ve&&qe&&qe(g));return n.createElement(An,{id:z,key:z,keyField:i,"data-row-id":z,columns:tt,row:g,rowCount:T.length,rowIndex:m,selectableRows:u,expandableRows:ve,expandableIcon:F,highlightOnHover:c,pointerOnHover:p,dense:R,expandOnRowClicked:It,expandOnRowDoubleClicked:Ft,expandableRowsComponent:$t,expandableRowsComponentProps:jt,expandableRowsHideExpander:Je,defaultExpanderDisabled:K,defaultExpanded:Se,expandableInheritConditionalStyles:Tt,conditionalRowStyles:Mt,selected:d,selectableRowsHighlight:P,selectableRowsComponent:w,selectableRowsComponentProps:x,selectableRowDisabled:y,selectableRowsSingle:h,striped:s,onRowExpandToggled:E,onRowClicked:Kt,onRowDoubleClicked:Xt,onRowMouseEnter:Zt,onRowMouseLeave:en,onSelectedRow:Jt,draggingColumnId:nt,onDragStart:ot,onDragOver:lt,onDragEnd:it,onDragEnter:at,onDragLeave:rt})}))))),Gt&&n.createElement("div",null,n.createElement(Vt,{onChangePage:ie,onChangeRowsPerPage:tn,rowCount:_||T.length,currentPage:N,rowsPerPage:J,direction:ue,paginationRowsPerPageOptions:oe,paginationIconLastPage:ge,paginationIconFirstPage:ae,paginationIconNext:le,paginationIconPrevious:Pe,paginationComponentOptions:$e})))});const Io=()=>{const{i18n:e}=ln(),t=localStorage.getItem("sellerLogged"),o=JSON.parse(localStorage.getItem("sellerToken")),a=rn();if(!t)return a("/seller-login"),null;const{mainRequest:l}=n.useContext(sn),[i,s]=n.useState([]),[c,p]=n.useState(!1),[R,u]=n.useState([]),h=async()=>{p(!0);try{const w=await l.post(`${cn}/vendor/order`,{token:o});s(w.data),u(w.data),console.log(w.data)}catch(w){console.log(w)}finally{p(!1)}};n.useEffect(()=>{h()},[o,t]);const P=w=>{const x=parseInt(w),v=(A=>{switch(A){case 0:return e.language==="en"?"Under Revision":"قيد المراجعة";case 1:return e.language==="en"?"Prepared":"قيد التحضير";case 2:return e.language==="en"?"At the Store":"قيد التخزين";case 3:return e.language==="en"?"At the Delivery Stage":"قيد مرحلة التوصيل";case 4:return e.language==="en"?"Delivered":"تم التوصيل";default:return""}})(x),F=x===0?"orange":x===1?"blue":x===2?"green":x===3?"purple":x===4?"teal":"black";return M.jsx("span",{style:{backgroundColor:F},className:"text-white p-2 rounded-xl shadow-lg",children:v})},S=[{name:"Order ID",selector:"id",sortable:!0},{name:"Product ID",selector:"product_id",sortable:!0},{name:"Product Name",selector:"product.title.en",sortable:!0},{name:"Product Price",selector:"product.price",sortable:!0},{name:"Quantity",selector:"quantity",sortable:!0},{name:"Total Price",selector:"total_price",sortable:!0},{name:"User ID",selector:"user_id",sortable:!0},{name:"Date",selector:"date",sortable:!0},{name:e.language==="en"?"Status":"الحالة",selector:"status",sortable:!0,cell:w=>P(w.status)}],C=[{name:"رقم الطلب",selector:"id",sortable:!0},{name:"رقم المنتج",selector:"product_id",sortable:!0},{name:"اسم المنتج",selector:"product.title.ar",sortable:!0},{name:"سعر المنتج",selector:"product.price",sortable:!0},{name:"الكمية",selector:"quantity",sortable:!0},{name:"السعر الكلي",selector:"total_price",sortable:!0},{name:"رقم المستخدم",selector:"user_id",sortable:!0},{name:"التاريخ",selector:"date",sortable:!0},{name:e.language==="en"?"Status":"الحالة",selector:"status",sortable:!0,cell:w=>P(w.status)}],H=e.language==="en"?S:C,y=w=>{const x=w.target.value;if(x.trim()==="")u(i);else{const E=i.filter(v=>v.id.toString().includes(x)||v.product_id.toString().includes(x)||v.user_id.toString().includes(x));u(E)}};return M.jsx("div",{className:"container py-10 min-h-[40dvh]",children:c?M.jsxs("div",{className:"flex flex-col items-center justify-center",children:[M.jsx("h2",{className:"text-xl font-bold",children:e.language==="en"?"Loading...":"جاري التحميل..."}),M.jsx(dn,{visible:!0,height:"160",width:"160",ariaLabel:"dna-loading",wrapperStyle:{},wrapperClass:"dna-wrapper"})]}):(i==null?void 0:i.length)>0?M.jsxs("div",{children:[M.jsx("div",{className:"mb-10 flex flex-col items-start gap-2 sm:flex-row sm:items-center justify-between",children:M.jsx(ut,{})}),M.jsx("input",{type:"text",placeholder:"Search by Order ID, Product ID, or User ID...",onChange:y,className:"px-4 py-2 w-full mb-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"}),M.jsx(So,{columns:H,data:R})]}):M.jsxs(M.Fragment,{children:[M.jsx(ut,{}),M.jsx("div",{className:"flex flex-col items-center justify-center",children:M.jsx("h1",{className:"text-2xl font-bold text-red-600",children:e.language==="en"?"You Don't Have Any Orders Yet!":"ليس لديك اي طلبات بعد"})})]})})};export{Io as default};
