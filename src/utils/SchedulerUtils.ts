/*
Please ignore this file/class, its horrible! AY, I SAID DON'T LOOK! NOOO!!!
 */

import {contains} from "./ArrayUtils";

// the function that all timeouts will execute
export let func: () => void
// all allowed timeouts that can execute a function after 10 seconds
export let allowed: number[] = []

// clear allowed timeouts
export function cancel() {
    allowed = []
}

// set the function that all timeouts will execute
export function setFunction(value: () => void) {
    func = value
}

// schedule the set function to be executed every 10 seconds
export function schedule() {
    createTimeout(generateId())
}

// generate a valid, unique id for every timeout
export function generateId() {
    let id = Math.random()
    let var2 = false
    while (var2) {
        var2 = false
        if (allowed.filter(value => value === id).length > 0) {
            var2 = true
            id = Math.random()
        }
    }
    return id
}

// recursive function to create a timeout for 10 seconds which will, if still allowed, execute the set function and call itself again
export function createTimeout(id: number) {
    allowed.push(id)
    setTimeout(function () {
        if (contains(allowed, id)) {
            func()

            // remove timeout id so the array won't overflow if someone has the website open for a very long time
            const idIndex = allowed.indexOf(id, 0)
            if (idIndex > -1) {
                allowed.splice(idIndex, 1)
            }

            createTimeout(generateId())
        }
    }, 5000)
}