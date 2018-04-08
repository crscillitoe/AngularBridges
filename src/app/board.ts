export class Board {
    width: number;
    height: number;
    numNodes: number;
    nodes: Array<MyNode>;

    constructor(width: number, height: number, numNodes: number) {
        this.width = width;
        this.height = height;
        this.nodes = new Array<MyNode>();
        this.generateBoard(numNodes);
    }

    private generateBoard(numNodes: number) {
        var chance = 4;
        var nodesToAdd = numNodes;

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
            if(LagCount > 500000) {
                nodesToAdd = 0;
            }
            var randomNode = tempNodes[this.randomInt(0, tempNodes.length - 1)];

            // Determine direction
            var diceRoll = this.randomInt(1, 4);

            //UP
            if(diceRoll === 1) {
                if(!randomNode.getUp()) {
                    if(randomNode.getY() - 1 > 2) {
                        var randomDistanceAway = this.randomInt(2, randomNode.getY() - 1);
                        var count;
                        var add = true;
                        for(count = randomNode.getY() - 1 ; count >= randomNode.getY() - randomDistanceAway ; count--) {
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

                            for(let n of tempNodes) {
                                var neighbor1 = new MyNode(tempNode.getX(), tempNode.getY());
                                var neighbor2 = new MyNode(tempNode.getX(), tempNode.getY() + 1);
                                var neighbor3 = new MyNode(tempNode.getX(), tempNode.getY() - 1);
                                var neighbor4 = new MyNode(tempNode.getX() + 1, tempNode.getY());
                                var neighbor5 = new MyNode(tempNode.getX() - 1, tempNode.getY());
                                var neighbors = new Array<MyNode>();
                                neighbors.push(neighbor1);
                                neighbors.push(neighbor2);
                                neighbors.push(neighbor3);
                                neighbors.push(neighbor4);
                                neighbors.push(neighbor5);
                                for(let n2 of neighbors) {
                                    if(n.getX() == n2.getX() && n.getY() == n2.getY()) {
                                        add = false;
                                    }
                                }
                            }

                            if(add) {
                                randomNode.setVal(randomNode.getVal() + numBridges);
                                tempNode.setVal(numBridges);
                                randomNode.setUp(true);
                                tempNode.setDown(true);
                                tempNodes.push(tempNode);
                                for(count = randomNode.getY() ; count >= tempNode.getY() ; count--) {
                                    occupiedSquares.push(new MyNode(randomNode.getX(), count));
                                }
                                nodesToAdd--;
                            }
                        }
                    }
                }
            } 
            //DOWN 
            else if(diceRoll === 2) {
                if(!randomNode.getDown()) {
                    if(randomNode.getY() + 1 < this.height - 2) {
                        var randomDistanceAway = this.randomInt(2, this.height - randomNode.getY());
                        var count;
                        var add = true;
                        for(count = randomNode.getY() + 1 ; count <= randomNode.getY() + randomDistanceAway ; count++) {
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
                            for(let n of tempNodes) {
                                var neighbor1 = new MyNode(tempNode.getX(), tempNode.getY());
                                var neighbor2 = new MyNode(tempNode.getX(), tempNode.getY() + 1);
                                var neighbor3 = new MyNode(tempNode.getX(), tempNode.getY() - 1);
                                var neighbor4 = new MyNode(tempNode.getX() + 1, tempNode.getY());
                                var neighbor5 = new MyNode(tempNode.getX() - 1, tempNode.getY());
                                var neighbors = new Array<MyNode>();
                                neighbors.push(neighbor1);
                                neighbors.push(neighbor2);
                                neighbors.push(neighbor3);
                                neighbors.push(neighbor4);
                                neighbors.push(neighbor5);
                                for(let n2 of neighbors) {
                                    if(n.getX() == n2.getX() && n.getY() == n2.getY()) {
                                        add = false;
                                    }
                                }
                            }
                            if(add) {
                                randomNode.setVal(randomNode.getVal() + numBridges);
                                tempNode.setVal(numBridges);
                                randomNode.setDown(true);
                                tempNode.setUp(true);
                                tempNodes.push(tempNode);
                                for(count = randomNode.getY() ; count <= tempNode.getY() ; count++) {
                                    occupiedSquares.push(new MyNode(randomNode.getX(), count));
                                }
                                nodesToAdd--;
                            }
                        }
                    }
                }
            } 
            //LEFT
            else if(diceRoll === 3) {
                if(!randomNode.getLeft()) {
                    if(randomNode.getX() - 1 > 2) {
                        var randomDistanceAway = this.randomInt(2, randomNode.getX() - 1);
                        var count;
                        var add = true;
                        for(count = randomNode.getX() - 1 ; count >= randomNode.getX() - randomDistanceAway ; count--) {
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
                            for(let n of tempNodes) {
                                var neighbor1 = new MyNode(tempNode.getX(), tempNode.getY());
                                var neighbor2 = new MyNode(tempNode.getX(), tempNode.getY() + 1);
                                var neighbor3 = new MyNode(tempNode.getX(), tempNode.getY() - 1);
                                var neighbor4 = new MyNode(tempNode.getX() + 1, tempNode.getY());
                                var neighbor5 = new MyNode(tempNode.getX() - 1, tempNode.getY());
                                var neighbors = new Array<MyNode>();
                                neighbors.push(neighbor1);
                                neighbors.push(neighbor2);
                                neighbors.push(neighbor3);
                                neighbors.push(neighbor4);
                                neighbors.push(neighbor5);
                                for(let n2 of neighbors) {
                                    if(n.getX() == n2.getX() && n.getY() == n2.getY()) {
                                        add = false;
                                    }
                                }
                            }
                            if(add) {
                                randomNode.setVal(randomNode.getVal() + numBridges);
                                tempNode.setVal(numBridges);
                                randomNode.setLeft(true);
                                tempNode.setRight(true);
                                tempNodes.push(tempNode);
                                for(count = randomNode.getX() ; count >= tempNode.getX() ; count--) {
                                    occupiedSquares.push(new MyNode(count, randomNode.getY()));
                                }
                                nodesToAdd--;
                            }
                        }
                    }
                }
            } 
            //RIGHT 
            else if(diceRoll === 4) {
                if(!randomNode.getRight()) {
                    if(randomNode.getX() + 1 < this.width - 2) {
                        var randomDistanceAway = this.randomInt(2, this.width - randomNode.getX());
                        var count;
                        var add = true;
                        for(count = randomNode.getX() + 1 ; count <= randomNode.getX() + randomDistanceAway ; count++) {
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
                            for(let n of tempNodes) {
                                var neighbor1 = new MyNode(tempNode.getX(), tempNode.getY());
                                var neighbor2 = new MyNode(tempNode.getX(), tempNode.getY() + 1);
                                var neighbor3 = new MyNode(tempNode.getX(), tempNode.getY() - 1);
                                var neighbor4 = new MyNode(tempNode.getX() + 1, tempNode.getY());
                                var neighbor5 = new MyNode(tempNode.getX() - 1, tempNode.getY());
                                var neighbors = new Array<MyNode>();
                                neighbors.push(neighbor1);
                                neighbors.push(neighbor2);
                                neighbors.push(neighbor3);
                                neighbors.push(neighbor4);
                                neighbors.push(neighbor5);
                                for(let n2 of neighbors) {
                                    if(n.getX() == n2.getX() && n.getY() == n2.getY()) {
                                        add = false;
                                    }
                                }
                            }
                            if(add) {
                                randomNode.setVal(randomNode.getVal() + numBridges);
                                tempNode.setVal(numBridges);
                                randomNode.setRight(true);
                                tempNode.setLeft(true);
                                tempNodes.push(tempNode);
                                for(count = randomNode.getX() ; count <= tempNode.getX() ; count++) {
                                    occupiedSquares.push(new MyNode(count, randomNode.getY()));
                                }
                                nodesToAdd--;
                            }
                        }
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
    up: boolean;
    right: boolean;
    left: boolean;
    down: boolean;

    constructor(x: number, y:number) {
        this.x = x;
        this.y = y;
        this.bridges = new Array<Bridge>();
        this.up = false;
        this.right = false;
        this.left = false;
        this.down = false;
    }

    setVal(val: number) {
        this.val = val;
    }

    setUp(b: boolean) {
        this.up = b;
    }

    setDown(b: boolean) {
        this.down = b;
    }

    setRight(b: boolean) {
        this.right = b;
    }

    setLeft(b: boolean) {
        this.left = b;
    }

    addBridge(bridge: Bridge) {
        this.bridges.push(bridge);
    }

    getX() { return this.x; }
    getY() { return this.y; }
    getVal() { return this.val; }
    getBridges() { return this.bridges; }
    getUp() { return this.up; }
    getDown() { return this.down; }
    getLeft() { return this.left; }
    getRight() { return this.right; }
}
