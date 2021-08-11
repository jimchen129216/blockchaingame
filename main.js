///<reference path="./pixi.js.d.ts" />

window.ethereum.enable();

const sound = new Howl({
    src: ['/music/click1.mp3']
});
const sound2 = new Howl({
    src: ['/music/bgm1.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.3
});

var IsSettingOK = false;

var app = new PIXI.Application(1280,720,{backgroundColor : 0xcce6fff});
document.getElementById("myDiv").appendChild(app.view);

var ui_label_AccountInfo = new PIXI.Text("");
app.stage.addChild(ui_label_AccountInfo);

var ui_label_TicketsInfo = new PIXI.Text("");
app.stage.addChild(ui_label_TicketsInfo);
ui_label_TicketsInfo.y=60;

function InitGame(){
    if(typeof web3 !== "undefined"){
        IsSettingOK = true;
        InitButtonEvent();
        InitEventWatching();
    }
    else{
        alert("請使用 web3 插件！");
    }
}

function UpdateUI(){
    if(IsSettingOK == false) return;
    ui_label_AccountInfo.text = "玩家ID: " + web3.eth.defaultAccount;

    app.stage.removeChild(scene_Register);
    app.stage.removeChild(scene_Vote);

    voteContractAtLocal.GetVoteResult(function(err,res){
        if(!err){
            ui_lable_voteCount_cat.text = res[0].toString();
            ui_lable_voteCount_dog.text = res[1].toString();

            if(!(res[0]==0 && res[1]==0)){
                graphics.clear();
                var totalCount = Number(res[0])+Number(res[1]);
                var cp = (res[0] / totalCount);
                var cpFix = cp.toFixed(2);
                var i = app.screen.width * cp;
                graphics.beginFill(0x3399ff,0.5);
                graphics.drawRoundedRect(0,550,i,50,0);
                graphics.endFill();
                graphics.beginFill(0xff6699,0.5);
                graphics.drawRoundedRect(i,550,app.screen.width-i,50,0);
                graphics.endFill();

                ui_lable_percent_cat.text = parseInt(cpFix*100) + "%";
                ui_lable_percent_dog.text = parseInt((1-cpFix)*100) + "%";
            }else{
                graphics.clear();
                ui_lable_percent_cat.text = 0+"%";
                ui_lable_percent_dog.text = 0+"%";
            }   
        }
    });

    voteContractAtLocal.GetIsRegistered(function(err,res){
        if(!err){
            if(res == true){
                //檢視票券資訊
                voteContractAtLocal.GetMyTickets(function(err,res){
                    if(!err){
                        ui_label_TicketsInfo.text = "玩家擁有票數: " + res.toString();
                    }
                });
                app.stage.addChild(scene_Vote);
            }else{
                //請玩家註冊
                ui_label_TicketsInfo.text = "";
                //註冊畫面
                app.stage.addChild(scene_Register);
            }
        }
    });
}

const text_style_big = new PIXI.TextStyle({
    fontSize:48,
    lineJoin: "bevel",
    stroke: "white",
    strokeThickness: 2
});
const text_style_mid = new PIXI.TextStyle({
    fontSize:24,
    lineJoin: "bevel",
    stroke: "white",
    strokeThickness: 2
});
const text_style_small = new PIXI.TextStyle({
    fontSize:14,
    lineJoin: "bevel",
    stroke: "white",
    strokeThickness: 2
});


var scene_Register = new PIXI.Container();
var ui_lable_RegisterInfo = new PIXI.Text("註冊可以獲得500張票卷!參與投票，贏得更多票卷以換取獎品!!!",text_style_mid);
ui_lable_RegisterInfo.anchor.set(0.5);
ui_lable_RegisterInfo.x = app.view.width/2;
ui_lable_RegisterInfo.y = app.view.height/2-50;
var ui_bt_Register = PIXI.Sprite.from("/assets/register.png");
ui_bt_Register.anchor.set(0,5);
ui_bt_Register.x = app.view.width/2;
ui_bt_Register.y = app.view.height/2+50;
ui_bt_Register.interactive=true;
ui_bt_Register.buttonMode=true;
scene_Register.addChild(ui_lable_RegisterInfo);
scene_Register.addChild(ui_bt_Register)

var scene_Vote = new PIXI.Container();
var graphics = new PIXI.Graphics();
scene_Vote.addChild(graphics);

var sprite_cat = new PIXI.Sprite.from("/assets/cat.png");
sprite_cat.anchor.set(0.5);
sprite_cat.x = app.screen.width/3;
sprite_cat.y = app.screen.height/3;
sprite_cat.scale.set(0.5);

var sprite_dog = new PIXI.Sprite.from("/assets/dog.png");
sprite_dog.anchor.set(0.5);
sprite_dog.x = app.screen.width*2/3;
sprite_dog.y = app.screen.height/3;
sprite_dog.scale.set(0.5);

var ui_lable_voteCount_cat = new PIXI.Text("0",text_style_big);
ui_lable_voteCount_cat.x = sprite_cat.x;
ui_lable_voteCount_cat.y = sprite_cat.y + 150;
ui_lable_voteCount_cat.anchor.set(.5);
var ui_lable_voteCount_dog = new PIXI.Text("0",text_style_big);
ui_lable_voteCount_dog.x = sprite_dog.x;
ui_lable_voteCount_dog.y = sprite_dog.y + 150;
ui_lable_voteCount_dog.anchor.set(.5);


var ui_bt_vote_cat = new PIXI.Sprite.from("/assets/vote.png");
ui_bt_vote_cat.x = sprite_cat.x;
ui_bt_vote_cat.y = ui_lable_voteCount_cat.y+75;
ui_bt_vote_cat.anchor.set(.5);
ui_bt_vote_cat.interactive=true;
ui_bt_vote_cat.buttonMode=true;
ui_bt_vote_cat.sound = sound;

var ui_bt_vote_dog = new PIXI.Sprite.from("/assets/vote.png");
ui_bt_vote_dog.x = sprite_dog.x;
ui_bt_vote_dog.y = ui_lable_voteCount_dog.y+75;
ui_bt_vote_dog.anchor.set(.5);
ui_bt_vote_dog.interactive=true;
ui_bt_vote_dog.buttonMode=true;
ui_bt_vote_dog.sound = sound;

var BGM= new PIXI.Texture.from("/assets/music_on.png");
ui_bt_bgm = new PIXI.Sprite(BGM);
ui_bt_bgm.x = 1220;
ui_bt_bgm.y = 660;
ui_bt_bgm.interactive=true;
ui_bt_bgm.buttonMode=true;
ui_bt_bgm.sound = sound2;

var ui_lable_percent_cat = new PIXI.Text("0%",text_style_mid)
ui_lable_percent_cat.anchor.set(0,.5);
ui_lable_percent_cat.x = 25;
ui_lable_percent_cat.y = 575;

var ui_lable_percent_dog = new PIXI.Text("0%",text_style_mid)
ui_lable_percent_dog.anchor.set(1,0.5);
ui_lable_percent_dog.x = app.screen.width-25;
ui_lable_percent_dog.y = 575;

scene_Vote.addChild(ui_bt_vote_cat);
scene_Vote.addChild(ui_bt_vote_dog);
scene_Vote.addChild(ui_lable_voteCount_cat);
scene_Vote.addChild(ui_lable_voteCount_dog);
scene_Vote.addChild(ui_lable_percent_cat);
scene_Vote.addChild(ui_lable_percent_dog);
scene_Vote.addChild(sprite_cat);
scene_Vote.addChild(sprite_dog);
scene_Vote.addChild(ui_bt_bgm);

var ui_bt_Reset = new PIXI.Sprite.from("assets/reset.png");
ui_bt_Reset.x = app.screen.width;
ui_bt_Reset.y = app.screen.height;
ui_bt_Reset.anchor.set(1,1);
ui_bt_Reset.interactive = true;
ui_bt_Reset.buttonMode = true;

function InitButtonEvent(){
    ui_bt_Register.on('click',function(){
        voteContractAtLocal.Register(function(err){
            if(!err){
                var interval_CheckRegistered = setInterval(function(){
                    voteContractAtLocal.GetIsRegistered(function(err,res){
                        if(res == true){
                            UpdateUI();
                            clearInterval(interval_CheckRegistered);
                        }
                    })
                },100); 
            }
        });
    });
    ui_bt_vote_cat.on('click',function(){
        ui_bt_vote_cat.sound.play();
        CallVote(1);
    });

    ui_bt_vote_dog.on('click',function(){
        ui_bt_vote_dog.sound.play();
        CallVote(2);
    });

    var x=1;
    ui_bt_bgm.on('click',function(){
        var turn_off = new PIXI.Texture.from("/assets/music_off.png");
        var turn_on = new PIXI.Texture.from("/assets/music_on.png");
        if(x==1){
            x=0;
            ui_bt_bgm.texture= turn_off;
            sound2.pause();
        }
        else
        {
            x=1;
            ui_bt_bgm.texture= turn_on;
            sound2.play();
        }
    });
    
    ui_bt_Reset.on('click',function(){
        var candidate_1 = prompt("候選人1號的名稱");
        var candidate_2 = prompt("候選人2號的名稱");
        voteContractAtLocal.EndVoteAndCreateNewVote(candidate_1,candidate_2,function(err){
            if(!err){
                console.log("結束投票");
            }
        });
    });
}

function CallVote(_candidateNumber){
    var num = prompt("要投多少票?",0);
    console.log(num);
    if(Number.isInteger(parseInt(num))){
        if(num>0){
            voteContractAtLocal.GetMyTickets(function(err,res){
                if(!err){
                    if(parseInt(res)>=num){
                        voteContractAtLocal.Vote(_candidateNumber,num,function(err){
                           // UpdateUI();
                        });
                    }else{
                        alert("票數不足");
                    }
                }
            });
        }else{
            alert("數值不能為負數或零");
        }
    }else{
        alert("數值需要為整數!!!");
    }
}

function InitEventWatching(){
    var eventNewVoteResult = voteContractAtLocal.eventNewVoteResult();
    eventNewVoteResult.watch(function(err,res){
        if(!err){
            UpdateUI();
            //ui_lable_voteCount_cat.text = res.args.VoteCount_1;
            //ui_lable_voteCount_dog.text = res.args.VoteCount_2;
        }
    });
    //追蹤帳號狀態的事件
    var preAccount = "";
    var interval_CheckAccount = setInterval(function(){
    //檢查帳號是否切換
        if(preAccount !== web3.eth.defaultAccount){
         //帳號切換後，更新前一筆帳號，並檢查是否為使用者，以及更新UI
            preAccount = web3.eth.defaultAccount;
            console.log("帳號切換");
            CheckOwner();
            UpdateUI();
        }
    },100);
}

function CheckOwner(){
    voteContractAtLocal.GetOwner(function(err,res){
        if(!err){
            if(web3.eth.defaultAccount == res){
                app.stage.addChild(ui_bt_Reset);
                //放置快捷按鈕
            }else{
                app.stage.removeChild(ui_bt_Reset);
                //移除快捷按鈕
            }
        }
    });
}

InitGame();