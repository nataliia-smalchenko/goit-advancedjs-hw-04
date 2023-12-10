import{S as p,i as y,a as b}from"./assets/vendor-f67ecabd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const w="37184762-fd326293791c817732540ec51",s={form:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loadBtn:document.querySelector(".load-more")};let d;s.form.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget;d=e.elements.searchQuery.value,L(d),e.reset()});s.loadBtn.addEventListener("click",()=>{v(d)});const u=new p(".gallery > .photo-card > a");let l,f;async function L(t){if(s.loadBtn.hidden=!0,s.gallery.innerHTML="",l=1,t=t.trim(),!t){n("error","Please, enter text to search and try again.");return}try{const e=await g(t);f=Math.ceil(e.data.totalHits/40);const a=e.data.hits;a.length?(n("info",`Hooray! We found ${e.data.totalHits} images.`),s.gallery.innerHTML=m(a),u.refresh(),l<f?s.loadBtn.hidden=!1:n("info","We're sorry, but you've reached the end of search results.")):n("error","Sorry, there are no images matching your search query. Please try again.")}catch{n("error","Oops! Something went wrong! Please try again.")}}async function v(t){s.loadBtn.hidden=!0,l+=1;try{const a=(await g(t)).data.hits;s.gallery.insertAdjacentHTML("beforeend",m(a)),u.refresh(),l<f?s.loadBtn.hidden=!1:n("info","We're sorry, but you've reached the end of search results.")}catch{n("error","Oops! Something went wrong! Please try again.")}}function m(t){return t.map(({webformatURL:e,largeImageURL:a,tags:c,likes:r,views:o,comments:i,downloads:h})=>`<div class="photo-card">
        <a class="gallery-link" href="${a}">
          <img class="gallery-image" src="${e}" alt="${c}" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <br />
              ${r}
            </p>
            <p class="info-item">
              <b>Views</b>
              <br />
              ${o}
            </p>
            <p class="info-item">
              <b>Comments</b>
              <br />
              ${i}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <br />
              ${h}
            </p>
          </div>
        </a>
      </div>`).join("")}function n(t,e){let a;t==="error"?a="#f58e82":a="#9dfab5",y.show({messageColor:"#262121",backgroundColor:a,messageSize:"18px",position:"bottomRight",progressBar:!1,animateInside:!1,transitionIn:"fadeIn",transitionOut:"fadeOut",timeout:3e3,targetFirst:!1,message:e})}function g(t){return b.get("https://pixabay.com/api/",{params:{key:w,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:l,per_page:40}})}
//# sourceMappingURL=commonHelpers.js.map
