export const tmpl = `
    <div class="input-wrapper">    
      <input 
        type="{{type}}" 
        class="input js-input {{class}} {{classError}}"
        @change="handlerInput" 
        placeholder="{{placeholder}}" 
        value="{{value}}" 
        name="{{name}}"
      />      
      <div class="input__messageError js-input-message {{classErrorMessage}}">
        <div  class="input__messageText">{{messageError}}</div>
      </div>
    </div>
`;
