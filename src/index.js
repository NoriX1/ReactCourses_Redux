import {createStore, combineReducers} from 'redux';
//People dropping off a form (Action Creators)
const createPolicy = (name, amount) => {
    return { //Action (a form in our analogy)
        type: 'CREATE_POLICY',
        payload: {
            name: name,
            amount: amount
        }
    };
};

const deletePolicy = (name) => {
    return {
        type: 'DELETE_POLICY',
        payload: {
            name: name
        }
    };
};

const createClaim = (name, amountOfMoneyToCollect) => {
    return {
        type: 'CREATE_CLAIM',
        payload: {
            name: name,
            amountOfMoneyToCollect: amountOfMoneyToCollect
        }
    };
};

//Reducers (Departments!)
const claimsHistory = (oldListOfClaims = [], action) => {
    if (action.type === 'CREATE_CLAIM') {
        // we care about this action (FORM!)
        // [... arr, secondArr] создаёт новый массив из [arr, secondArr]
        // Мы не можем использовать arr.push(), поскольку эта функция
        // модифицирует старый массив, а не создаёт новый.
        return [...oldListOfClaims, action.payload];
    }
    //we don`t care the action (form!)
    return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
    if (action.type === 'CREATE_CLAIM') {
        return bagOfMoney - action.payload.amountOfMoneyToCollect;
    } else if (action.type === 'CREATE_POLICY') {
        return bagOfMoney + action.payload.amount;
    }

    return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
    if (action.type === 'CREATE_POLICY') {
        return [...listOfPolicies, action.payload.name];
    } else if (action.type === 'DELETE_POLICY') {
        // arr.filter() возвращает новый массив, в качестве аргумента принимает 
        // callback функцию, которая в качестве параметра принимает элемент массива
        // в данном случае мы условием исключаем элемент из итогового массива
        return listOfPolicies.filter(name => name !== action.payload.name);
    }

    return listOfPolicies;
};

// После подключения библиотеки Redux
// Создаём объект store
const ourDepartments = combineReducers({
    accounting: accounting,
    claimsHistory: claimsHistory,
    policies: policies
});

const store = createStore(ourDepartments);

// Создаём action 'CREATE_POLICY' и передаём его в функцию dispatch
store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));
// dispatch автоматически обработает всех Reducers у которых есть
// action CREATE_POLICY (accounting, policies), 
// и выполнит действия CREATE_POLICY указанные в них

// Создаём action 'CREATE_CLAIM' и передаём его в функцию dispatch
store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 50));
// dispatch автоматически обработает всех Reducers у которых есть
// action CREATE_CLAIM (claimsHistory, accounting), и выполнит действия
// CREATE_CLAIM, указанные в них

// Создаём action 'DELETE_POLICY' и передаём его в функцию dispatch
store.dispatch(deletePolicy('Bob'));
// dispatch автоматически обработает всех Reducers у которых есть
// action DELETE_POLICY (policies), и выполнит действия DELETE_POLICY, 
// указанные в них

// Посмотреть состояние store на данный момент
console.log(store.getState());

