﻿// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'img/';
// 0:順番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 3;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;

// Maximum number of result rows before being broken off into another table.
var maxRows = 35;

// * タイトル情報（編集可能。最後の行に”,”を付けないようにしてください）
var int_Colspan = 3;
var ary_TitleData = [
  "Team J",
  "Team K3",
  "Team T"
];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）, 
//   "タイトルID"（先頭から0, 1, 2...）, 
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
  [1, "Ariella Callista Ichwan",    [1,0,0,0,0,0], "J/ariel.jpg"],
  [1, "Aurel Mayori",         [1,0,0,0,0,0], "J/aurel_mayori.jpg"],
  [1, "Azizi Asadel",      [1,0,0,0,0,0], "J/azizi_asadel.jpg"],
  [1, "Cindy Hapsari Maharani Pujiantoro Putri",     [1,0,0,0,0,0], "J/cindy_hapsari.jpg"],
  [1, "Diani Amalia",          [1,0,0,0,0,0], "J/diani.jpg"],
  [1, "Eve Antoinette Ichwan",        [1,0,0,0,0,0], "J/eve_antoinette.jpg"], 
  [1, "Feni Fitriani.jpg",        [1,0,0,0,0,0], "J/feni_fitriani.jpg"],   
  [1, "Made Ayu Vania Aurellia",      [1,0,0,0,0,0], "J/made_ayu_vania_aurellia.jpg"],   
  [1, "Michelle Christo Kusnadi",     [1,0,0,0,0,0], "J/michelle_christo_kusnadi.jpg"],
  [1, "Nadila Cindi Wantari",          [1,0,0,0,0,0], "J/nadila_cindi_wantari.jpg"],
  [1, "Riska Amelia Putri",        [1,0,0,0,0,0], "J/riska_amelia_putri.jpg"],
  [1, "Rona Ariesta Anggraeni",       [1,0,0,0,0,0], "J/rona_ariesta_anggraeni.jpg"],
  [1, "Sania Julia Montolalu",       [1,0,0,0,0,0], "J/sania_julia.jpg"],
  [1, "Anastasta Narwastu Tety Handuran",         [0,1,0,0,0,0], "K3/anastasya_narwastu_tety_handuran.jpg"],  
  [1, "Angelina Christy W.",       [0,1,0,0,0,0], "K3/angelina_christy.jpg"],  
  [1, "Anindita Rahma Cahyadi",    [0,1,0,0,0,0], "K3/aninditha_rahma_cahyadi.jpg"],  
  [1, "Beby Chaesara Anadila",       [0,1,0,0,0,0], "K3/beby_chaseara_anadila.jpg"],
  [1, "Gita Sekar Andarini",       [0,1,0,0,0,0], "K3/gita_sekar_andarini.jpg"],
  [1, "Helisma Mauludzunia Putri",     [0,1,0,0,0,0], "K3/helisma_putri.jpg"], 
  [1, "Jennifer Rachel Natasya",    [0,1,0,0,0,0], "K3/jennifer_rachel_natasya.jpg"],
  [1, "Kandiya Rafa Maulidita",     [0,1,0,0,0,0], "K3/kandiya_rafa_maulidita.jpg"],
  [1, "M.G.N. Desy. P.G.",        [0,1,0,0,0,0], "K3/maria_genoveva_natalia_desy_purnamasari_gunawan.jpg"],
  [1, "Mutiara Azzahra",          [0,1,0,0,0,0], "K3/mutiara_azzahra.jpg"],
  [1, "Nurhayati",        [0,1,0,0,0,0], "K3/nurhayati.jpg"],
  [1, "Ratu Vienny Fitrilya",       [0,1,0,0,0,0], "K3/ratu_vienny_fitrilya.jpg"],
  [1, "Shani Indira Natio",         [0,1,0,0,0,0], "K3/shani_indira_natio.jpg"],
  [1, "Shania Gracia",        [0,1,0,0,0,0], "K3/shania_gracia.jpg"],
  [1, "Viviyona Apriani",       [0,1,0,0,0,0], "K3/viviyona_apriani.jpg"],
  [1, "Yessica Tamara",      [0,1,0,0,0,0], "K3/yessica_cintaku.jpg"],
  [1, "Koba",               [0,0,1,0,0,0], "bm/koba.jpg"]
];
