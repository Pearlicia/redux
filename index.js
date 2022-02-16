// Library Code
function createStore () {
    // The store should have four parts
    // 1. The state
    // 2. Get the state.
    // 3. Listen to changes on the state
    // 4. Update the state

    // Rules to increase the predictability of  
    // state within the store

    // Rule #1 Only an event can change the state of the store
    
    // Rule #2 The function that returns the new state 
    // needs to be a pure function 
    
    // Pure Function
    // 1. Returns the same result if the same arguments are passed in
    // 2. Depends solely on the arguments passed in to them
    // 3. Does not produce side effects (no interaction with the outside world, eg network request, external state)


    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = todos(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
    
}

// App Code
function todos (state = [], action) {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo])
    }

    return state
}

const store = createStore()
store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})

store.subscribe(() => {
    console.log('The state changed.')
})