type matrix2d = number[][];

export default function multiplyMatrix (a: matrix2d, b: matrix2d): matrix2d{
    let c: matrix2d = [];
    let ncA = a[0].length, nlB = b.length;
    let errorMessage = `Number of columns in matrix A is different of the
    the number of lines in matrix B`;

    if (ncA != nlB) throw new Error(errorMessage);
    else {
        let nlC = a.length, ncC = b[0].length;
        // Initialize a multidimensional array with 0's
        c = new Array(nlC).fill(0).map(() => new Array(ncC).fill(0));

        for (let i = 0; i < nlC; i++) {
            for (let l = 0; l < ncC; l++) {
                for (let k = 0; k < ncA; k++) {
                    c[i][l] = c[i][l] + (a[i][k] * b[k][l]);
                }
            }
        }
    }
    
    return c;
}