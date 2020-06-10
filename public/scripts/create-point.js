//estados
function populatesUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json()}).then((states) => {
        for( const state of states)
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    });
}
//executa estados
populatesUFs();

//cidades
function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text;
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    
    //limpa o campo na hora de escolher uma nova UF
    citySelect.innerHTML = "<option value=''>Selecione a Cidade</option>";
    citySelect.disabled = true;
    
    
    //pega as cidades
    fetch(url).then(res => res.json()).then(cities =>{

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }
        citySelect.disabled = false;
    });
}



//eventos de selecionar cidade e estado
document.querySelector("select[name=uf]").addEventListener("change",getCities);

//Items de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");
for(const items of itemsToCollect){
    items.addEventListener("click", handleSelectedItem);

}
//input hidden
const collectedItems = document.querySelector("input[name=items]");

//array selecionador de item
let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;
    //add or remove a class
   itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;
    
    //selecionar item pelo index
    const alreadySelected = selectedItems.findIndex( item =>{
        const ItemFound = item == itemId;
        return ItemFound;
    });

    //caso esteja selecionado
    if(alreadySelected >= 0){
        const fillteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });
        selectedItems = fillteredItems;
    }else{
        selectedItems.push(itemId);
    }

    //atualiza o campo escondido
    collectedItems.value = selectedItems;
 
}