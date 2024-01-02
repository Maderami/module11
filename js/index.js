// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minweight = document.querySelector('.minweight__input');
const maxweight = document.querySelector('.maxweight__input');
let priority = ['желтый', 'зеленый', 'розово-красный', 'светло-коричневый', 'фиолетовый' ];
// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
function display(arr){
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.replaceChildren();
  let li;
  let kindli;
  let colorli;
  let weightli;
 
  for (let i = 0; i < arr.length; i++) {
    li = document.createElement('li');
        switch (arr[i].color) {
          case 'фиолетовый': li.className = 'fruit__item fruit_violet'; break;
          case 'зеленый': li.className = 'fruit__item fruit_green'; break;
          case 'розово-красный': li.className = 'fruit__item fruit_carmazin'; break;
          case 'желтый': li.className = 'fruit__item fruit_yellow'; break;
          case 'светло-коричневый': li.className = 'fruit__item fruit_lightbrown'; break;
        }
        fruitsList.appendChild(li);
    
        let div = document.createElement('div');
        div.className = 'fruit__info';
        li.appendChild(div);
    
        colorli = document.createElement('div');
        colorli.innerHTML = arr[i].color;
        div.appendChild(colorli);
    
        kindli = document.createElement('div');
        kindli.innerHTML = arr[i].kind;
        div.appendChild(kindli);
    
        weightli = document.createElement('div');
        weightli.innerHTML = arr[i].weight;
        div.appendChild(weightli);
  }
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = (arr) => {
  let result = [];
  let result1 = [];
  let index = 0;
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (arr.length > 0) {
 
      let indFruitRND = getRandomInt(0, arr.length-1);
      result[index] = arr[indFruitRND];
      
      arr.splice(indFruitRND, 1);
      index += 1;
 
  }
  result.sort(() => Math.random() - 0.5);
  fruits = result;
  if(arr != fruits){
    alert('Список удалось перемешать');
  }else{
    alert('Список не получилось перемешать');
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits(fruits);
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
function filterFruits (arr) {
  let results = [];
  for (let i = 0; i < arr.length; i++) {
      results[i] = arr[i];
  }
  if (minweight.value == '' || maxweight.value == ''){
      alert('Недостаточно данных');
  }else{
  fruits = results.filter(item => (
      (item.weight >= minweight.value) && (item.weight <= maxweight.value)
  ));}
 
};

filterButton.addEventListener('click', () => {
  filterFruits(fruits);
  display(fruits);
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  if(priority.indexOf(a.color) > priority.indexOf(b.color)){
    return true;}
    else{
      return false;
    };
};

const sortAPI = {
  bubbleSort(arr) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparationColor(arr[j], arr[j+1])) { 
                // делаем обмен элементов
                let temp = arr[j+1]; 
                arr[j+1] = arr[j]; 
                arr[j] = temp; 
            }
        }
    }                    
  },
// функция обмена элементов
  swap(firstIndex, secondIndex){
  const temp = fruits[firstIndex];
  fruits[firstIndex] = fruits[secondIndex];
  fruits[secondIndex] = temp;
   } ,

// функция разделитель
partition(left, right) {
  var pivot = fruits[Math.floor((right + left) / 2)],
      i1 = left,
      j1 = right;
  while (i1 <= j1) {
      while (comparationColor(pivot, fruits[i1])) {
          i1++;
      }
      while (comparationColor(fruits[j1], pivot)) {
          j1--;
      }
      if (i1 <= j1) {
        sortAPI.swap(i1, j1);
          i1++;
          j1--;
      }
  }
  return i1;
},
  quickSort(left, right) {
    // TODO: допишите функцию быстрой сортировки
    var index;
    if (fruits.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? fruits.length - 1 : right;
        index = sortAPI.partition( left, right);
        if (left < index - 1) {
            sortAPI.quickSort(left, (index - 1));
        }
        if (index < right) {
          sortAPI.quickSort(index, right);
        }
    }
    return fruits;
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKindLabel.textContent == 'bubbleSort'){
     sortKindLabel.textContent = 'quickSort';
     sortKind = 'quickSort';
  }else if (sortKindLabel.textContent == 'quickSort'){
    sortKindLabel.textContent = 'bubbleSort';
    sortKind = 'bubbleSort';
  }

});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const start = new Date().getTime();
  if (sortKind == 'bubbleSort') {
      sort = sortAPI[sortKind];
      sortAPI.bubbleSort(fruits);
  }else{
    sortAPI.quickSort(fruits);
  }
 
  const end = new Date().getTime();
  sortTimeLabel.textContent = `${end - start} ms`;
  display(fruits);
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (weightInput.value == '' || kindInput.value == '' || colorInput.value == ''){
      alert('не хватает данных');  
  } else {
    let newFruits = {kind: kindInput.value, color: colorInput.value, weight: weightInput.value}
    fruits[fruits.length] = newFruits;
    display();
  }
  
});
