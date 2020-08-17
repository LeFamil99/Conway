const canvas = document.getElementById('vlad');
//const p = document.getElementById('test')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;
const pen = canvas.getContext('2d');


let spacing = 25;
pen.lineWidth = 1;
let mousedown = false;
let mousex = 0;
let mousey = 0;
let curmousex = 0;
let curmousey = 0;
let offset = [0, 0]
let j = 0;
let move = false;
let squares = [];
let live = 0;


const draw = (pos) => {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    //Draw the lines
    for (let i = pos[0] % spacing; i <= window.innerWidth; i += spacing) {
        pen.beginPath();
        pen.moveTo(i, 0);
        pen.lineTo(i, window.innerHeight);
        pen.stroke();
    }
    for (let i = pos[1] % spacing; i <= window.innerHeight; i += spacing) {
        pen.beginPath();
        pen.moveTo(0, i);
        pen.lineTo(window.innerWidth, i);
        pen.stroke();
    }

    //Draw the black squares
    for (let i = 0; i < squares.length; i++) {
        pen.fillRect(squares[i][0] + offset[0], squares[i][1] + offset[1], spacing, spacing)
    }



}

const square = e => {
    const realPos = [Math.floor((e.clientX + offset[0] * -1) / spacing) * 25, Math.floor((e.clientY + offset[1] * -1) / spacing) * 25]
    //alert(squares.includes([0, 0]))
    let colored = false;
    let index;
    for (let i = 0; i < squares.length; i++) {
        if (realPos[0] === squares[i][0] && realPos[1] === squares[i][1]) {
            colored = true;
            index = i
        }
    }


    if (colored) {
        squares.splice(index, 1);
    } else {
        squares.push(realPos)
    }

}

const update = () => {
    let newOnes = []
    let deadOnes = []
    for (let i = squares.length - 1; i >= 0; i--) {
        const adj = checkAdj(squares[i]);
        let blacked = []
        let whites = []
        for (let j = 0; j < adj.length; j++) {
            for (let k = 0; k < squares.length; k++) {
                if (adj[j][0] === squares[k][0] && adj[j][1] === squares[k][1]) {
                    blacked.push(j)
                } 
            }
            if (!blacked.includes(j)) {
                whites.push(adj[j])
            }
        }
        //alert(whites)

        for (let m = 0; m < whites.length; m++) {
            
            adj2 = checkAdj(whites[m])
            let tot = 0;
            for (let j = 0; j < adj2.length; j++) {
                for (let k = 0; k < squares.length; k++) {
                    if (adj2[j][0] === squares[k][0] && adj2[j][1] === squares[k][1]) {
                        tot++;
                    } 
                }
            }

            if (tot === 3) {
                let found = false
                for (let j = 0; j < newOnes.length; j++) {
                    if (whites[m][0] === newOnes[j][0] && whites[m][1] === newOnes[j][1]) {
                        found = true;
                    }
                }
                if (!found) {
                    newOnes.push(whites[m])
                    //alert(whites[m])
                }
                
            }
        }


        if (blacked.length < 2 || blacked.length >= 4) {
            deadOnes.push(i)
            //alert(deadOnes)
            
        }

    }
    for (let j = 0; j < deadOnes.length; j++) {
        squares.splice(deadOnes[j], 1)
    }
    for (let j = 0; j < newOnes.length; j++) {
        squares.push(newOnes[j])
    }
}

//Returns all adjacent squares
checkAdj = coor => {
    let array = [];
    array.push([coor[0] + spacing, coor[1] + spacing])
    array.push([coor[0] + spacing, coor[1] + 0])
    array.push([coor[0] + spacing, coor[1] + -spacing])
    array.push([coor[0] + 0, coor[1] + spacing])
    array.push([coor[0] + 0, coor[1] + -spacing])
    array.push([coor[0] + -spacing, coor[1] + spacing])
    array.push([coor[0] + -spacing, coor[1] + 0])
    array.push([coor[0] + -spacing, coor[1] + -spacing])
    return array
}

const actualPos = e => {
    offset[0] += e.clientX - mousex;
    offset[1] += e.clientY - mousey;
    mousex = e.clientX;
    mousey = e.clientY;
}

/*const relPos = arr => {
    arr[0] = arr[0] % spacing
    arr[1] = arr[1] % spacing
    return arr
}*/

draw([0, 0])

setInterval(() => {
    if (live % 2) {
        update();
    }
    draw(offset)
}, 1)


document.onmousemove = function (e) {
    var event = e || window.event;
    if (mousedown) {
        move = true;
        actualPos(event)
    }
    //p.innerHTML = offset + ' ' + squares;
}

document.addEventListener('mousedown', () => {
    mousex = event.clientX
    mousey = event.clientY
    mousedown = true;
    document.body.style.cursor = 'grab'
})

document.addEventListener('mouseup', () => {
    document.body.style.cursor = 'default'
    if (!move) {
        square(event)
    }
    mousedown = false;
    move = false
})

document.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }
    if (event.keyCode == 32) {
        update();
    }
    if (event.keyCode == 17) {
        live++
    }
    // do something
});



/*let mouseDownCount = 0;
let mousex = 0;
let mousey = 0;
let curmousex = 0;
let curmousey = 0;
let offset = [0, 0]
let j = 0;
let move = false;



const vladivlad = function (event) {
    //alert('ah')
    //if (mousedown === true) {
    /*mouseDownCount++;
    if (mouseDownCount === 1) {
        mousex = event.clientX
        mousey = event.clientY
    }
    //alert(event.clientX)
    if (move) {
        move = true;
        offset[0] -= curmousex - mousex;
        offset[1] += curmousey - mousey;
        mousex = curmousex;
        mousey = curmousey;
        p.innerHTML = offset + ' ' + curmousex + ' ' + mousex + ' ' + curmousey + ' ' + mousey;
    //alert('ah');

    } 

    // }


}

setInterval(() => {
    vladivlad();
    pen.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = offset[0] % spacing; i <= window.innerWidth; i += spacing) {
        pen.beginPath();
        pen.moveTo(i, 0);
        pen.lineTo(i, window.innerHeight);
        pen.stroke();
    }
    for (let i = offset[1] % spacing; i <= window.innerHeight; i += spacing) {
        pen.beginPath();
        pen.moveTo(0, i);
        pen.lineTo(window.innerWidth, i);
        pen.stroke();
    }
}, 5)

/*for (let i = j; i <= window.innerWidth; i += spacing) {
    pen.moveTo(i, 0);
    pen.lineTo(i, window.innerHeight);
    pen.stroke();
}
for (let i = j; i <= window.innerHeight; i += spacing) {
    pen.moveTo(0, i);
    pen.lineTo(window.innerWidth, i);
    pen.stroke();
}
pen.clearRect(0, 0, window.innerWidth, window.innerHeight);





document.addEventListener('mouseup', () => {
    //alert(event.clientX)
    document.body.style.cursor = 'default'
    mousedown = false;
    mouseDownCount = 0;
    move = false;
    /*offset[0] -= event.clientX - mousex
    offset[1] += event.clientY - mousey
    removeEventListener('mousemove', vladivlad(event));
    //document.onmousemove = function(e) {
    var event = e || window.event;
    window.mouseX = event.clientX;
    window.mouseY = event.clientY;
    //alert(offset)
    //alert(curmousex)
    //alert(curmousey)
})

document.addEventListener('mousedown', () => {
    //alert(event.clientX)
    mousedown = true;
    document.body.style.cursor = 'grab'
    mousex = event.clientX
    mousey = event.clientY
    addEventListener('mousemove', vladivlad(event))
})
*/





