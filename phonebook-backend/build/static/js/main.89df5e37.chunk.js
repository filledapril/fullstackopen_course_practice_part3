(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,n,t){e.exports=t(51)},50:function(e,n,t){},51:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),u=t(18),r=t.n(u),o=t(19),l=t(2),i=function(e){var n=e.searchName,t=e.handleChange;return c.a.createElement("div",null,"filter shown with",c.a.createElement("input",{value:n,onChange:t}))},m=function(e){return c.a.createElement("div",null,c.a.createElement("form",{onSubmit:e.addPerson},c.a.createElement("div",null,"name: ",c.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),c.a.createElement("div",null,"number: ",c.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"add"))))},d=function(e){var n=e.showNumber,t=e.removeName;return c.a.createElement("div",null,n.map(function(e){return c.a.createElement("div",{key:e.id},e.name,e.number,c.a.createElement("button",{onClick:function(){return t(e.id)}},"Delete"))}))},s=function(e){var n=e.message;return null===n?null:c.a.createElement("div",{className:"added"},n)},f=t(4),h=t.n(f),b="/api/persons",v=function(){return h.a.get(b).then(function(e){return e.data})},E=function(e){return h.a.post(b,e).then(function(e){return e.data})},w=function(e){return h.a.delete("".concat(b,"/").concat(e)).then(function(e){return e.data})},g=function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then(function(e){return e.data})},p=(t(50),function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],r=Object(a.useState)(""),f=Object(l.a)(r,2),h=f[0],b=f[1],p=Object(a.useState)(""),j=Object(l.a)(p,2),N=j[0],O=j[1],C=Object(a.useState)(""),y=Object(l.a)(C,2),S=y[0],k=y[1],T=Object(a.useState)(null),D=Object(l.a)(T,2),P=D[0],x=D[1],A=Object(a.useState)(null),J=Object(l.a)(A,2),L=J[0],R=J[1],B=Object(a.useState)(null),I=Object(l.a)(B,2),q=I[0],z=I[1];Object(a.useEffect)(function(){v().then(function(e){u(e)})},[]),console.log("render",t.length,"persons");var F=""===S?t:t.filter(function(e){return e.name.toLowerCase().includes(S.toLowerCase())});return c.a.createElement("div",null,c.a.createElement("h2",null,"Phonebook"),c.a.createElement(i,{searchName:S,handleChange:function(e){k(e.target.value)}}),c.a.createElement("h2",null,"Add a new"),c.a.createElement(s,{message:q}),c.a.createElement(m,{addPerson:function(e){e.preventDefault();var n={name:h,number:N,id:h};t.some(function(e){return e.name===h})?alert("".concat(h," is already exist in phonebook")):E(n).then(function(e){u(t.concat(e)),b(""),O(""),x("Added ".concat(h," - ").concat(N)),setTimeout(function(){x(null)},5e3)});var a=t.find(function(e){return e.name===h});if(a&&window.confirm("Replace ".concat(a.number," with ").concat(N,"?"))){var c=Object(o.a)({},a,{number:N}),r=a.id;g(r,c).then(function(e){u(t.map(function(n){return n.id!==r?n:e}))}).catch(function(e){z("".concat(r," was already deleted from server")),setTimeout(function(){z(null)},5e3)}),b(""),O("")}},newName:h,handleNameChange:function(e){console.log(e.target.value),b(e.target.value)},newNumber:N,handleNumberChange:function(e){O(e.target.value)}}),c.a.createElement(s,{message:P}),c.a.createElement("h2",null,"Numbers"),c.a.createElement(s,{message:L}),c.a.createElement(d,{showNumber:F,removeName:function(e){window.confirm("Do you really want to delete ".concat(e,"?"))&&w(e).then(function(){u(t.filter(function(n){return n.id!==e})),R("".concat(e," delete successful")),setTimeout(function(){R(null)},5e3)}).catch(function(n){R("".concat(e," was already deleted")),setTimeout(function(){R(null)},5e3),u(t.filter(function(n){return n.id!==e}))})}}))});r.a.createRoot(document.getElementById("root")).render(c.a.createElement(p,null))}},[[20,1,2]]]);
//# sourceMappingURL=main.89df5e37.chunk.js.map