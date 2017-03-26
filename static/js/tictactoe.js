var Board = {
    board : [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    
    temp_board : [" ", " ", " ", " ", " ", " ", " ", " ", " "],

    check_win : function(curr_player) {
        var wins = (this.board[0]== curr_player & this.board[1]==curr_player & this.board[2]== curr_player) | (this.board[3] == curr_player & this.board[4]==curr_player & this.board[5]== curr_player) | (this.board[6] == curr_player & this.board[7]==curr_player & this.board[8]== curr_player) | (this.board[0]== curr_player & this.board[3]==curr_player & this.board[6]== curr_player) | (this.board[1]== curr_player & this.board[4]==curr_player & this.board[7]== curr_player) | (this.board[2]== curr_player & this.board[5]==curr_player & this.board[8]== curr_player) | (this.board[0]== curr_player & this.board[4]==curr_player & this.board[8]== curr_player) | (this.board[2]== curr_player & this.board[4]==curr_player & this.board[6]== curr_player);
        
        if (wins == true) {
            console.log("win");
            //alert(curr_player + " wins");
            //tictactoe.new_game();
        }
        
        return wins;
    },
    
    check_tempwin : function(curr_player) {
        var wins = (this.temp_board[0]== curr_player & this.temp_board[1]==curr_player & this.temp_board[2]== curr_player) | (this.temp_board[3] == curr_player & this.temp_board[4]==curr_player & this.temp_board[5]== curr_player) | (this.temp_board[6] == curr_player & this.temp_board[7]==curr_player & this.temp_board[8]== curr_player) | (this.temp_board[0]== curr_player & this.temp_board[3]==curr_player & this.temp_board[6]== curr_player) | (this.temp_board[1]== curr_player & this.temp_board[4]==curr_player & this.temp_board[7]== curr_player) | (this.temp_board[2]== curr_player & this.temp_board[5]==curr_player & this.temp_board[8]== curr_player) | (this.temp_board[0]== curr_player & this.temp_board[4]==curr_player & this.temp_board[8]== curr_player) | (this.temp_board[2]== curr_player & this.temp_board[4]==curr_player & this.temp_board[6]== curr_player);
        
        if (wins == true) {
            console.log("t win");
        }
        
        return wins;
    },

    check_draw : function(user, computer) {
        if ( (this.empty_moves(1) == []) & (this.check_tempwin(user) == false) & (this.check_tempwin(computer) == false) ) {
            return true;
        } else { return false; }
    },
    
    check_full_draw : function() {
        if (this.empty_moves(0) == []) {
            console.log("draw");
            alert("It's a draw");
            return true;
        } else {
            return false;
        }
    },

    is_empty : function(node, mode) {
        if (mode == 0) {
            if (this.board[node] == " ") { return true; }
            else { return false; }
        } else {
            if (this.temp_board[node] == " ") { return true; }
            else { return false; }
        }
        
    },

    empty_moves : function(mode) {
        var moves = [];
        for (var i=0; i<9; i++) {
            if (this.is_empty(i, mode)) {
                moves.push(i);
            }
        }
        return moves;
    },

    move : function(user, node) {
        var check_empty = this.is_empty(node,0);
        if ( (node >= 0) & (node < 9) & (check_empty == true) ) {
            this.board[node] = user;
            this.temp_board[node] = user;
        } else {
            console.log("choose another button");
        }
        
        var win;
        if (this.check_win(user) == true) {
            alert(user + " wins!");
            win = true;
        } else {
            win = false;
        }
        console.log("hi: " + this.board);
        return [this.board, win];
    },
    
    temp_move : function(user, node) {
        var check_empty = this.is_empty(node,1);
        if ( (node >= 0) & (node < 9) & (check_empty == true) ) {
            this.temp_board[node] = user;
        } else {
            //error
        }

        var win = this.check_tempwin(user);
    },

    /*copy_temp : function() {
        var b_buf = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        for (var i; i<9; i++) {
            b_buf.board[i] = this.board[i];
        }
        return b_buf;
    }, */
    
    del_move : function(player, node) {
        var check_empty = this.is_empty(node,1);
        if ( (node >= 0) & (node < 9) & (check_empty == false) ) {
            this.temp_board[node] = " ";
        }
    },

    minimax : function(node, user) {
        var val = [];
        var all_val = [];
        this.getmaxscore = function(bufval) {
            var bufval = bufval;
            var curr_max = -100;
            var best = [];

            if (bufval == []) {
                return [-1, -1];
            }

            for (var i = 0; i<bufval.length; i++) {
                curr_max = Math.max (curr_max, bufval[i][1]);
                if (curr_max == -100) {
                    alert("max error");
                } 
                if (bufval[i][1] == curr_max) {
                    best = bufval[i];
                }
            }
            console.log("best1: " + best);
            return best;
        }

        this.getminscore = function(bufval) {
            var bufval = bufval;
            var curr_min = 100;
            var best = [];

            if (bufval == []) {
                return [1,-1]
            }

            for (var i = 0; i<bufval.length; i++) {
                curr_min = Math.min (curr_min, bufval[i][1]);
                if (curr_min == 100) {
                    alert("min error");
                } 
                if (bufval[i][1] == curr_min) {
                    best = bufval[i];
                }
            }
            console.log("best2: " + best);
            return best;
        }
        
        this.max_val = function(node, user, computer, score, depth) {
            console.log("main: " + this.board);
            console.log("b_buf: " + this.temp_board);
            var m_buf = this.empty_moves(1);
            //console.log("m: " + m_buf);
            var score = score;
            console.log("score: " + score);
            var depth = depth;
            console.log("depth: " + depth);
            all_val = [];
            
            for (var i=0; i< m_buf.length; i++) {
                this.temp_move(computer, m_buf[i]);
                
                if ( this.check_tempwin("O") ) {
                    score = 10-depth;
                    val = [ m_buf[i], score ];
                    console.log("_val_: " + val);
                    all_val.push(val);
                    this.del_move("O", m_buf[i]);
                }
                else if ( this.check_draw("X","O") ) {
                    val = [ m_buf[i], 0 ];
                    all_val.push(val);
                    this.del_move("O", m_buf[i]);
                }
                else {
                    depth++;
                    var buf = this.min_val(m_buf[i], "X", "O", score, depth);
                    val = [ m_buf[i], buf[i] ];
                    all_val.push(val);
                    this.del_move("O", m_buf[i]);
                }
            }
            console.log("val: " + all_val);
            var maxscore = this.getmaxscore(all_val);
            return maxscore;
        }
        
        this.min_val = function(node, user, computer, score, depth) {
            console.log("main: " + this.board);
            console.log("b_buf: " + this.temp_board);
            var m_buf = this.empty_moves(1);
            //console.log("m: " + m_buf);
            var score = score;
            var depth = depth;
            all_val = [];
            
            for (var i=0; i< m_buf.length; i++) {
                this.temp_move("X", m_buf[i]);
                
                if ( this.check_tempwin("X") ) {
                    score = depth-10;
                    val = [ m_buf[i], score ];
                    all_val.push(val);
                    this.del_move("X", m_buf[i]);
                }
                else if ( this.check_draw("X","O") ) {
                    val = [ m_buf[i], 0 ];
                    all_val.push(val);
                    this.del_move("X", m_buf[i]);
                }
                else {
                    depth++;
                    var buf = this.max_val(m_buf[i], "X","O", score, depth);
                    val = [ m_buf[i], buf[i] ];
                    all_val.push(val);
                }
            }
            
            var minscore = this.getminscore(all_val);
            
            return minscore;
        }
        
        var minimax_val = this.max_val(node,"X", "O", 0,0);
        console.log("before: " + this.board);
        this.temp_board = this.board;
        console.log("after: " + this.board);
        return minimax_val[0];
    }

}

var player = true;
var tictactoe = {
    changeValue : function(btn) {
        if (btn == 0) {
            document.form.button0.innerHTML = "X";
        }
        else if (btn == 1) {
            document.form.button1.innerHTML = "X";
        }
        else if (btn == 2) {
            document.form.button2.innerHTML = "X";
        }
        else if (btn == 3) {
            document.form.button3.innerHTML = "X";
        }
        else if (btn == 4) {
            document.form.button4.innerHTML = "X";
        }
        else if (btn == 5) {
            document.form.button5.innerHTML = "X";
        }
        else if (btn == 6) {
            document.form.button6.innerHTML = "X";
        }
        else if (btn == 7) {
            document.form.button7.innerHTML = "X";
        }
        else if (btn == 8) {
            document.form.button8.innerHTML = "X";
        }
        buf = Board.move("X", btn);
        check = buf[1];
        
        if ( (check == true) | (Board.check_full_draw() == true) ) {
            this.new_game();
        } else {
            player = !player;
            tictactoe.comp_player(btn);
        }
        
    },
    
    new_game : function() {
        Board.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        Board.temp_board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        document.form.button0.innerHTML = " ";
        document.form.button1.innerHTML = " ";
        document.form.button2.innerHTML = " ";
        document.form.button3.innerHTML = " ";
        document.form.button4.innerHTML = " ";
        document.form.button5.innerHTML = " ";
        document.form.button6.innerHTML = " ";
        document.form.button7.innerHTML = " ";
        document.form.button8.innerHTML = " ";
        
    },
    
    choose_rand : function() {
        rand = Math.floor( (Math.random()*8) + 1 );
        if (Board.is_empty(rand,0) == false) {
            this.choose_rand();
        } else {
            return rand;
        }
    },
    
    comp_player : function(node) {
        player = !player;
        var move_ = Board.minimax(node, "X");
        //move_ = this.choose_rand();
        //console.log(move_)
        var buf;
        var check;
        switch (move_) {
            case 0:
                document.getElementById("button0").innerHTML = "O";
                buf = Board.move("O", 0);
                check = buf[1];
                break;
            case 1:
                document.getElementById("button1").innerHTML = "O";
                buf = Board.move("O", 1);
                check = buf[1];
                break;
            case 2:
                document.getElementById("button2").innerHTML = "O";
                buf = Board.move("O", 2);
                check = buf[1];
                break;
            case 3:
                document.getElementById("button3").innerHTML = "O";
                buf = Board.move("O", 3);
                check = buf[1];
                break;
            case 4:
                document.getElementById("button4").innerHTML = "O";
                buf = Board.move("O", 4);
                check = buf[1];
                break;
            case 5:
                document.getElementById("button5").innerHTML = "O";
                buf = Board.move("O", 5);
                check = buf[1];
                break;
            case 6:
                document.getElementById("button6").innerHTML = "O";
                buf = Board.move("O", 6);
                check = buf[1];
                break;
            case 7:
                document.getElementById("button7").innerHTML = "O";
                buf = Board.move("O", 7);
                check = buf[1];
                break;
            case 8:
                document.getElementById("button8").innerHTML = "O";
                buf = Board.move("O", 8);
                check = buf[1];
                break;
            defalt:
                alert("switch error");
        }

        if (check == true) {
            this.new_game();
        } else if (Board.check_full_draw() == true) {
            this.new_game();
        } else {
            player = !player;
        }
    }
}