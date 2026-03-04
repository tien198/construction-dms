import{A as e,D as t,I as n,J as r,O as i,St as a,X as o,Y as s,at as c,bt as l,j as u,o as d,ot as f,rt as p}from"./index-wPoGjghO.js";function m(e){return s(`MuiCircularProgress`,e)}r(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDeterminate`,`circleIndeterminate`,`circleDisableShrink`]);var h=a(l()),g=p(),_=44,v=f`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,y=f`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,b=typeof v==`string`?null:c`
        animation: ${v} 1.4s linear infinite;
      `,x=typeof y==`string`?null:c`
        animation: ${y} 1.4s ease-in-out infinite;
      `,S=t=>{let{classes:r,variant:i,color:a,disableShrink:o}=t;return n({root:[`root`,i,`color${e(a)}`],svg:[`svg`],track:[`track`],circle:[`circle`,`circle${e(i)}`,o&&`circleDisableShrink`]},m,r)},C=u(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(t,n)=>{let{ownerState:r}=t;return[n.root,n[r.variant],n[`color${e(r.color)}`]]}})(i(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:b||{animation:`${v} 1.4s linear infinite`}},...Object.entries(e.palette).filter(d()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),w=u(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),T=u(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(t,n)=>{let{ownerState:r}=t;return[n.circle,n[`circle${e(r.variant)}`],r.disableShrink&&n.circleDisableShrink]}})(i(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:x||{animation:`${y} 1.4s ease-in-out infinite`}}]}))),E=u(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(i(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),D=h.forwardRef(function(e,n){let r=t({props:e,name:`MuiCircularProgress`}),{className:i,color:a=`primary`,disableShrink:s=!1,enableTrackSlot:c=!1,size:l=40,style:u,thickness:d=3.6,value:f=0,variant:p=`indeterminate`,...m}=r,h={...r,color:a,disableShrink:s,size:l,thickness:d,value:f,variant:p,enableTrackSlot:c},v=S(h),y={},b={},x={};if(p===`determinate`){let e=2*Math.PI*((_-d)/2);y.strokeDasharray=e.toFixed(3),x[`aria-valuenow`]=Math.round(f),y.strokeDashoffset=`${((100-f)/100*e).toFixed(3)}px`,b.transform=`rotate(-90deg)`}return(0,g.jsx)(C,{className:o(v.root,i),style:{width:l,height:l,...b,...u},ownerState:h,ref:n,role:`progressbar`,...x,...m,children:(0,g.jsxs)(w,{className:v.svg,ownerState:h,viewBox:`${_/2} ${_/2} ${_} ${_}`,children:[c?(0,g.jsx)(E,{className:v.track,ownerState:h,cx:_,cy:_,r:(_-d)/2,fill:`none`,strokeWidth:d,"aria-hidden":`true`}):null,(0,g.jsx)(T,{className:v.circle,style:y,ownerState:h,cx:_,cy:_,r:(_-d)/2,fill:`none`,strokeWidth:d})]})})});export{D as t};