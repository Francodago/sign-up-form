const validateForm=formSelector=>{
const formElement = document.querySelector(formSelector);


const validationOptions =[
    {
        attribute:'minLength',
        isValid: input=> input.value && input.value.length>=parseInt(input.minLength, 10),
        errorMessage: (input,label) =>`${label.textContent} needs to be at least ${input.minLength} characters`
    },
    {
        attribute:'custommaxLength',
        isValid: input=> input.value && input.value.length<=parseInt(input.getAttribute('custommaxlength'), 10),
        errorMessage: (input,label) =>`${label.textContent} needs to be no more than ${input.getAttribute('custommaxlength',)} characters`
    },
    {
        attribute:'pattern',
        isValid:input =>{
            const patternRegex=new RegExp(input.pattern);
            return patternRegex.test(input.value);
        },
         errorMessage: (input,label) =>` Not a valid ${label.textContent}`
    },
    {
        attribute:'match',
        isValid: input=>{
            const matchSelector=input.getAttribute('match');
            const matchedElement =document.querySelector(`#${matchSelector}`);
            return matchedElement && matchedElement.value.trim()===input.value.trim()

        },
        errorMessage:(input, label)=>{
            const matchSelector=input.getAttribute('match');
            const matchedElement =document.querySelector(`#${matchSelector}`);
            const matchedLabel =matchedElement.parentElement.parentElement.querySelector('label');
            return `${label.textContent} should match ${matchedLabel.textContent}`;
        }
    },
    {
    attribute:'required',
    isValid: input=> input.value.trim()!=='',
    errorMessage: (input,label) =>`${label.textContent} is required`

     }

];
const validateSingleFormGoup= formGroup=>{
const label =formGroup.querySelector('label');
const input =formGroup.querySelector('input');
const errorContainer =formGroup.querySelector('.error');

let formGroupError = false

for(const option of validationOptions){
  if(input.hasAttribute(option.attribute) && !option.isValid(input)){
    errorContainer.textContent=option.errorMessage(input, label);

    input.classList.add('input-error');
    input.classList.remove('input-success');
    formGroupError=true;
  }
}
if (!formGroupError){
    errorContainer.textContent='';
    input.classList.add('input-success');
    input.classList.remove('input-error');
}

};




formElement.setAttribute('novalidate', '');

Array.from(formElement.elements).forEach(element => {
    element.addEventListener('blur', event => {
      const formGroup = event.target.closest('.formGroup');
      if (formGroup) {
        validateSingleFormGoup(formGroup);
      }
    });
  });

formElement.addEventListener('submit',(e)=>{
e.preventDefault();
validateAllFormGroups(formElement);
} );
const validateAllFormGroups=formValidate =>{
const formGroups =Array.from(formValidate.querySelectorAll('.formGroup'));
formGroups.forEach(formGroup =>{
   validateSingleFormGoup(formGroup);
})
}
};
validateForm('#registration-form');