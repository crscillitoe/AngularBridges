export class Board {
    width: number;
    height: number;
    nodes: Array<MyNode>;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.nodes = new Array<MyNode>();
        this.generateBoard();
    }

    private generateBoard() {
        var chance = 4;
        var nodesToAdd = Math.floor(Math.sqrt((this.width * this.height)) * 2);

        var firstX = this.randomInt(1, this.width);
        var firstY = this.randomInt(1, this.height);

        var tempNodes = new Array<MyNode>();
        var occupiedSquares = new Array<MyNode>();

        let tempNode = new MyNode(firstX, firstY);
        tempNode.setVal(0);
        tempNodes.push(tempNode);

        var LagCount = 0;
        nodesToAdd--;
        while(nodesToAdd > 0) {
            LagCount++;
            if(LagCount > 50000) {
                nodesToAdd = 0;
            }
            var randomNode = tempNodes[this.randomInt(0, tempNodes.length - 1)];

            // Determine direction
            var diceRoll = this.randomInt(1, 4);

            //UP
            if(diceRoll === 1) {
                if(randomNode.getY() - 1 > 2) {
                    var randomDistanceAway = this.randomInt(2, randomNode.getY() - 1);
                    var count;
                    var add = true;
                    for(count = randomNode.getY() - 1 ; count > randomNode.getY() - randomDistanceAway ; count--) {
                        for(let n of occupiedSquares) {
                            if(n.getX() == randomNode.getX() && n.getY() == count) {
                                add = false;
                            }
                        }

                        for(let n of tempNodes) {
                            if(n.getX() == randomNode.getX() && n.getY() == count) {
                                add = false;
                            }
                        }
                    }
                    if(add) {
                        var numBridges = this.randomInt(1,2);
                        let tempNode = new MyNode(randomNode.getX(), randomNode.getY() - randomDistanceAway);
                        randomNode.setVal(randomNode.getVal() + numBridges);
                        tempNode.setVal(numBridges);
                        tempNodes.push(tempNode);
                        console.log(tempNode);
                        for(count = randomNode.getY() ; count >= tempNode.getY() ; count--) {
                            occupiedSquares.push(new MyNode(randomNode.getX(), count));
                        }
                        nodesToAdd--;
                    }
                }
            } 
            //DOWN 
            else if(diceRoll === 2) {
                if(randomNode.getY() + 1 < this.height - 2) {
                    var randomDistanceAway = this.randomInt(2, this.height - randomNode.getY());
                    var count;
                    var add = true;
                    for(count = randomNode.getY() + 1 ; count < randomNode.getY() + randomDistanceAway ; count++) {
                        for(let n of occupiedSquares) {
                            if(n.getX() == randomNode.getX() && n.getY() == count) {
                                add = false;
                            }
                        }

                        for(let n of tempNodes) {
                            if(n.getX() == randomNode.getX() && n.getY() == count) {
                                add = false;
                            }
                        }
                    }
                    if(add) {
                        var numBridges = this.randomInt(1,2);
                        let tempNode = new MyNode(randomNode.getX(), randomNode.getY() + randomDistanceAway);
                        randomNode.setVal(randomNode.getVal() + numBridges);
                        tempNode.setVal(numBridges);
                        tempNodes.push(tempNode);
                        console.log(tempNode);
                        for(count = randomNode.getY() ; count <= tempNode.getY() ; count++) {
                            occupiedSquares.push(new MyNode(randomNode.getX(), count));
                        }
                        nodesToAdd--;
                    }
                }

            } 
            //LEFT
            else if(diceRoll === 3) {
                if(randomNode.getX() - 1 > 2) {
                    var randomDistanceAway = this.randomInt(2, randomNode.getX() - 1);
                    var count;
                    var add = true;
                    for(count = randomNode.getX() - 1 ; count > randomNode.getX() - randomDistanceAway ; count--) {
                        for(let n of occupiedSquares) {
                            if(n.getX() == count && n.getY() == randomNode.getY()) {
                                add = false;
                            }
                        }

                        for(let n of tempNodes) {
                            if(n.getX() == count && n.getY() == randomNode.getY()) {
                                add = false;
                            }
                        }
                    }
                    if(add) {
                        var numBridges = this.randomInt(1,2);
                        let tempNode = new MyNode(randomNode.getX() - randomDistanceAway, randomNode.getY());
                        randomNode.setVal(randomNode.getVal() + numBridges);
                        tempNode.setVal(numBridges);
                        tempNodes.push(tempNode);
                        console.log(tempNode);
                        for(count = randomNode.getX() ; count >= tempNode.getX() ; count--) {
                            occupiedSquares.push(new MyNode(count, randomNode.getY()));
                        }
                        nodesToAdd--;
                    }
                }
            } 
            //RIGHT 
            else if(diceRoll === 4) {
                if(randomNode.getX() + 1 < this.width - 2) {
                    var randomDistanceAway = this.randomInt(2, this.width - randomNode.getX());
                    var count;
                    var add = true;
                    for(count = randomNode.getX() + 1 ; count < randomNode.getX() + randomDistanceAway ; count++) {
                        for(let n of occupiedSquares) {
                            if(n.getX() == count && n.getY() == randomNode.getY()) {
                                add = false;
                            }
                        }

                        for(let n of tempNodes) {
                            if(n.getX() == count && n.getY() == randomNode.getY()) {
                                add = false;
                            }
                        }
                    }
                    if(add) {
                        var numBridges = this.randomInt(1,2);
                        let tempNode = new MyNode(randomNode.getX() + randomDistanceAway, randomNode.getY());
                        randomNode.setVal(randomNode.getVal() + numBridges);
                        tempNode.setVal(numBridges);
                        tempNodes.push(tempNode);
                        console.log(tempNode);
                        for(count = randomNode.getX() ; count <= tempNode.getX() ; count++) {
                            occupiedSquares.push(new MyNode(count, randomNode.getY()));
                        }
                        nodesToAdd--;
                    }
                }
            }
        }
        for(let n of tempNodes) {
            this.addNode(n);
        }
    }

    private randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    private testAddingNodes() {
        let node1 = new MyNode(this.width, this.height);
        node1.setVal(5);

        let node2 = new MyNode(this.width, 1);
        node2.setVal(4);

        let node3 = new MyNode(1, this.height);
        node3.setVal(2);

        let node4 = new MyNode(1, 1);
        node4.setVal(1);

        this.addNode(node1);
        this.addNode(node2);
        this.addNode(node3);
        this.addNode(node4);
    }

    addNode(node: MyNode) {
        this.nodes.push(node);
    }

    getWidth() { return this.width; }
    getHeight() { return this.height; }
    getNodes() { return this.nodes; }
}

export class Bridge {
    n1: MyNode;
    n2: MyNode;
    num: number;

    constructor(n1: MyNode, n2: MyNode, num: number) {
        this.n1 = n1;
        this.n2 = n2;
        this.num = num;
    }

    setNum(num: number) {
        this.num = num;
    }

    getN1() { return this.n1; }
    getN2() { return this.n2; }
    getNum() { return this.num; }
}

export class MyNode {
    x: number;
    y: number;
    val: number;
    bridges: Array<Bridge>;

    constructor(x: number, y:number) {
        this.x = x;
        this.y = y;
        this.bridges = new Array<Bridge>();
    }

    setVal(val: number) {
        this.val = val;
    }

    addBridge(bridge: Bridge) {
        this.bridges.push(bridge);
    }

    getX() { return this.x; }
    getY() { return this.y; }
    getVal() { return this.val; }
    getBridges() { return this.bridges; }
}
