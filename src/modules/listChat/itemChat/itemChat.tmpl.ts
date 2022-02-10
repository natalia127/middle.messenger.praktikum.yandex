export const itemChat: string = `<li>
<div></div>
<div class="listChat__itemWrapper">
  <div class="listChat__item">
    <span class="listChat__name">{{ name }}</span>
    <span  class="listChat__lastMessage">{{lastMessage}}</span>
    {% if countUnRead %}
      <div class="listChat__nMessage">{{countUnRead}}</div>
    {% endif %}
  </div>
</div>
</li>`;
