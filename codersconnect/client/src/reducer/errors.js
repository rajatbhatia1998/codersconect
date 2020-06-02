const initialState = {

}


export const errorReducer = (state=initialState,action)=>{
    switch(action.type){
        case "ERRORS_FOUND":
            return action.payload
        case "RESET_ERRORS":
            return{
                
            }
        default:
            return state
    }
}