https://github.com/natalia127/middle.messenger.praktikum.yandex/pull/3

https://www.figma.com/file/Sx4KbB1vRZtBblFGB0iT0z/chat-yandex?node-id=0%3A1 - прототипы макетов

npm run start - для запуска node сервера на порту 3000
npm run build - для сборки
npm run dev - для разработки
npm run test - для запуска тестов

Переделала структуру шаблона для шаблонизатора 

Пример
      <div>
        <div class="form__errorSendMessage">{{ value }}</div>
        <Button />
      </div>
 {{ value }} -переменная из контекста компонента

 Button - компонент. в шаблоне обязательно с большой буквы. Поддерживается только одиночный тег. То есть минимальная настройка - это, например - <Button />
 В компоненте, наследуемым от Block, обязательно передать в конструктор объект components. Вот так - 
 components: {
    Button
 } 
 подробнее ниже, где описана стурктура компонентов Block

 Button здесь это класс, а не экзампляр класса!

 где имя компонента совпадает с именем переданным в объект components
 то есть возможна такая структура шаблона и объекта components
      <div>
        <div class="form__errorSendMessage">{{ value }}</div>
        <MyButton />
      </div>

 components: {
    MyButton: Button
 }


Для передачи данных в компонент используется следующая структрура
        <Component 
          ::value=valueText
          ::value2=getvalueText
          ::class='form__button'
          @click="handlerClick"
        />

для передачи пропсов нужно написать ::<имя_пропса> и далее
или текст в ковычках или имя переменной или метода из контекста

метода берутся из объекта methods родительского компонента
переменные из объекта data

Прослушиваемые события дочернего компнента описываются начиная с @<имясобытия>= и имя метода в ковычках

аналогичную структуру можно добавить на любой тег в шаблоне, но передача порпсов через {{ value }} предпочтительней чем через :: 

Если передан метод, в пропс, то нужно самостоятельно инициировать условия его обновления. То есть, если обновится одна из состовляющих внутри метода, он не запустится сам, чтобы обновить пропс.

Еще один пример шаблонизатора 
      <div>
        <Button ::value='valueText1'/>
        <Button ::value='valueText2' />
      </div>
после рендера это будут два отдельных экземпляра блок. При передаче в объект components ничего не меняется

Для htmlElement, которые должны скрываться по условию, есть атрибут t-if t-else
пример использования
<div>
  <div t-if="isValid"></div>
  <div t-else=""></div>
</div>
isValid - возьмется из переданного контекста
один из блоков не соответсвующий условию скроектся через display: none
t-else указывается с пустыми ковычками


Блок и его структура
создаем новый класс и наследуем его от Block
в констуркторе описываем структуру данных 
вот так например

    const info = {
      data: {
        value: 'Sign In',
        ...props
      },
      components: {
        Input,
        Button
      },
      methods: {
        signIn(e: Event) {
          e.preventDefault();
          validateAndSend(this, authController, 'signIn');
        },
        goSignUp() {
          router.go(EPATH.SIGNUP);
        }
      }
    };

где props, переданные данные извне
в props, например могут быть переопределены значения переменных. В данном случае значение value может быть переопределено извне

data (выбрала неудачное имя, нужно было оставить как props) внутри класса используется как this.props

обяъект components - здесь переданы все используемые дочерние компоненты. Переданы в виде классов.
Инициализация (new Component) происходит на этапе рендера документа.

methods - объект содержащий обработчики событий или изменяемые данные по какому то условию.

Так же констурктор может содержать доп логику, например подписка на store и т.д.

вне конструктора методы наследников Block - это:
Обязательный метод render - который возвращает стурктуру шаблона

необязательные хуки 
dispatchComponentDidMount - инициирует рендер компонент
componentDidMount - будет вызван до рендера компонента

componentReadyUse - будет вызван когда компонетн уже отрендерен на странице. Использую для смены классов в html, например.

componentBeforeRendering - до рендера но после componentDidMount

componentDidUpdate - вызывается при обновлнии props, доступны объекты oldProps и newProps
необходимо вернуть true или false для разрешения дальнейшего render компонента


Roter - экземпляр синглтон. Необходим для рендера страницы без перезагрузки. Созадется при запуске приложения. В данном случае в конструкторе класса App

далее
через метод use регестируется route.
например router.use('./', Component);
теперь по пути './' откроется html структура компонента - Component

так же доступны переходы вперед назад аналогично history api.

Через метод router.setCallbackDidTransition можно указать колбэк, которые будет выполняться до переходна на новый роут
в приложении в этом колбэке происходит проверка авторизован пользователь или нет .


Экземпляры controller - отвечают за общение с бэком и стором приложения

Экземпляры Store - наследуются от EventBus. Содержат в себе модель нужного объекта. При обновлении store оповещают, подписывщихся на них об обновлении.

