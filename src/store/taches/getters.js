/*
export function someGetter (state) {
}
*/
export function tachesAll(state) {
    console.log("GETTER tachesAll ", state.taches)
    return state.taches
}