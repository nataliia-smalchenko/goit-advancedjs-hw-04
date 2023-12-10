import{S as y,a as f,i as b}from"./assets/vendor-f67ecabd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const m="37184762-fd326293791c817732540ec51",s={form:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loadBtn:document.querySelector(".load-more")};let d;s.form.addEventListener("submit",a=>{a.preventDefault();const e=a.currentTarget;d=e.elements.searchQuery.value,w(d),e.reset()});s.loadBtn.addEventListener("click",()=>{L(d)});const u=new y(".gallery > .photo-card > a");let i,p;async function w(a){s.loadBtn.hidden=!0,s.gallery.innerHTML="",i=1;try{const e=await f.get("https://pixabay.com/api/",{params:{key:m,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:40}});p=Math.ceil(e.data.totalHits/40),c("info",`Hooray! We found ${e.data.totalHits} images.`);const o=e.data.hits;o.length?(s.gallery.innerHTML=g(o),u.refresh(),s.loadBtn.hidden=!1):c("error","Sorry, there are no images matching your search query. Please try again.")}catch{c("error","Oops! Something went wrong! Please try again.")}}async function L(a){s.loadBtn.hidden=!0,i+=1;try{const o=(await f.get("https://pixabay.com/api/",{params:{key:m,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:40}})).data.hits;s.gallery.insertAdjacentHTML("beforeend",g(o)),u.refresh(),i<p&&(s.loadBtn.hidden=!1)}catch{c("error","Oops! Something went wrong! Please try again.")}}function g(a){return a.map(({webformatURL:e,largeImageURL:o,tags:l,likes:t,views:r,comments:n,downloads:h})=>`<div class="photo-card">
        <a class="gallery-link" href="${o}">
          <img class="gallery-image" src="${e}" alt="${l}" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <br />
              ${t}
            </p>
            <p class="info-item">
              <b>Views</b>
              <br />
              ${r}
            </p>
            <p class="info-item">
              <b>Comments</b>
              <br />
              ${n}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <br />
              ${h}
            </p>
          </div>
        </a>
      </div>`).join("")}function c(a,e){let o;a==="error"?o="#f58e82":o="#9dfab5",b.show({messageColor:"#262121",backgroundColor:o,messageSize:"18px",position:"bottomRight",progressBar:!1,animateInside:!1,transitionIn:"fadeIn",transitionOut:"fadeOut",timeout:3e3,targetFirst:!1,message:e})}
//# sourceMappingURL=commonHelpers.js.map
