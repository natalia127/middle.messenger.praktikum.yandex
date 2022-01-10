https://laughing-snyder-d3215b.netlify.app/ - сайт на netlify

https://www.figma.com/file/Sx4KbB1vRZtBblFGB0iT0z/chat-yandex?node-id=0%3A1 - прототипы макетов

npm run start для запуска node сервера на порту 3000
npm run build для сборки
npm run dev для разработки

Предварительная Верстка чата + шаблонизатор из строки в полноценную dom структруру без использования innerHtml
 инструкция к шаблонизотору:
 {{ value }} -переменная из контекста компонента
 {% listChat %} - вставить дочерний компонент, так же необходимо объявить его в експорте компонента в свойстве children, например вот так
  export  default {
    blockTemplate,
    context,
    children: {
      listChat
    }
  }

  где blockTemplate - основная строка с шаблном html, 
  context - контекст компонента
  
  Для настраиваемых компонентов в шаблоне строки возможна настройка контекста
  настраиваемые сейчас - это input, button, avatar

  пример

    {%
      Input
      context: {
        placeholder: 'e-mail',
        class: 'input--outbord',
        name: 'email', 
        value: email,
        type: 'email'
      }
    %}

    Input - объявление дочернего компонента
    в контексте все значения в ковычках вставятся как строка, 
    значения без ковычек возьмутся из контекста родителя. в данном случае - это value: email,


    в шаблоназаторе реализовна блок if else
    пример
      "{% if isChange %}
        <div class="avatar__edit"></div>
      {% endif %}"

    isChange - поле из контекста

      "{% if isChange %}
        <div class="avatar__edit"></div>
      {% else %}"
       <div > Другой блок</div>
      {% endif %}"


папку pageHtml - сделала для демо в netlify. с введением полноценного роутинга будет удалена
