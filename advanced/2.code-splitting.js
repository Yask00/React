// DYNAMIC IMPORT SYNTAX

// BEFORE
import { add } from './math';
console.log(add(16, 26));

// AFTER
import("./math").then(math => {
    console.log(math.add(16, 26));
});