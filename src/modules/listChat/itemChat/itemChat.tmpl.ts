export const itemChat: string = `<li>
<div></div>
<div class="listChat__itemWrapper">
  <div class="listChat__item">
    <span class="listChat__name">{{ name }}</span>
    <span  class="listChat__lastMessage">{{lastMessage}}</span>

    <div t-if="countUnRead" class="listChat__nMessage">{{countUnRead}}</div>

  </div>
</div>
</li>`;
