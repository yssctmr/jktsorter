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
  "Team T",
  "Academy Class A",
  "Academy Class B",
  "Graduates (test)(belum ada isinya)",
  "Generasi 1",
  "Generasi 2",
  "Generasi 3",
  "Generasi 4",
  "Generasi 5",
  "Generasi 6",
  "Generasi 7",
  "Generasi 8"
];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）, 
//   "タイトルID"（先頭から0, 1, 2...）, 
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
  [1, "Ariella Callista Ichwan",    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "J/ariel.jpg"],
  [1, "Aurel Mayori",         [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "J/aurel_mayori.jpg"],
  [1, "Azizi Asadel",      [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "J/azizi_asadel.jpg"],
  [1, "Cindy Hapsari Maharani Pujiantoro Putri",     [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "J/cindy_hapsari.jpg"],
  [1, "Diani Amalia",          [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "J/diani.jpg"],
  [1, "Eve Antoinette Ichwan",        [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "J/eve_antoinette.jpg"], 
  [1, "Feni Fitriyanti",        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "J/feni_fitriyanti.jpg"],
  [1, "Fransiska Saraswati Puspa Dewi",          [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "J/fransisca_saraswati_puspa_dewi.jpg"],
  [1, "Frieska Anastasia Laksani",        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "J/frieska_anastasia_laksani.jpg"], 
  [1, "Gabriella Margareth W.",        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "J/gabriella.jpg"], 
  [1, "Ni Made Ayu Vania Aurellia",      [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "J/made_ayu_vania_aurellia.jpg"],   
  [1, "Michelle Christo Kusnadi",     [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "J/michelle_christo_kusnadi.jpg"],
  [1, "Nadila Cindi Wantari",          [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "J/nadila_cindi_wantari.jpg"],
  [1, "Riska Amelia Putri",        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "J/riska_amelia_putri.jpg"],
  [1, "Rona Ariesta Anggraeni",       [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "J/rona_ariesta_anggraeni.jpg"],
  [1, "Sania Julia Montolalu",       [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "J/sania_julia.jpg"],
  
  [1, "Anastasya Narwastu Tety Handuran",         [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0], "K3/anastasya_narwastu_tety_handuran.jpg"],  
  [1, "Angelina Christy W.",       [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0], "K3/angelina_christy.jpg"],  
  [1, "Anindita Rahma Cahyadi",    [0,1,1,0,0,0,0,1,0,0,0,0,0,0,0], "K3/aninditha_rahma_cahyadi.jpg"],  
  [1, "Beby Chaesara Anadila",       [0,1,0,0,0,0,1,0,0,0,0,0,0,0,0], "K3/beby_chaseara_anadila.jpg"],
  [1, "Gita Sekar Andarini",       [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0], "K3/gita_sekar_andarini.jpg"],
  [1, "Helisma Mauludzunia Putri",     [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0], "K3/helisma_putri.jpg"], 
  [1, "Jennifer Rachel Natasya",    [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "K3/jennifer_rachel_natasya.jpg"],
  [1, "Kandiya Rafa Maulidita",     [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0], "K3/kandiya_rafa_maulidita.jpg"],
  [1, "M.G.N. Desy. P.G.",        [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "K3/maria_genoveva_natalia_desy_purnamasari_gunawan.jpg"],
  [1, "Mutiara Azzahra",          [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0], "K3/mutiara_azzahra.jpg"],
  [1, "Nurhayati",        [0,1,0,0,0,0,0,0,0,0,1,0,0,0,0], "K3/nurhayati.jpg"],
  [1, "Ratu Vienny Fitrilya",       [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "K3/ratu_vienny_fitrilya.jpg"],
  [1, "Shani Indira Natio",         [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "K3/shani_indira_natio.jpg"],
  [1, "Shania Gracia",        [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], "K3/shania_gracia.jpg"],
  [1, "Viviyona Apriani",       [0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], "K3/viviyona_apriani.jpg"],
  [1, "Yessica Tamara",      [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0], "K3/yessica_cintaku.jpg"],
  
  [1, "Adhisty Zara Kusumawardhani",      [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0], "T/adhisty_zara.jpg"],
  [1, "Adriani Elisabeth",           [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], "T/adriani_elizabeth.jpg"],
  [1, "Ayana Shahab",      [0,0,1,0,0,0,1,0,0,0,0,0,0,0,0], "T/ayana_shahab.jpg"],
  [1, "Fidly Imanda Azzahra",           [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], "T/fidly_immanda_azzahra.jpg"],
  [1, "Gabriel Angelina",           [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0], "T/gabriel_angelina.jpg"],
  [1, "Gabryela Marcelina",      [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0], "T/gabryela_marcelina.jpg"],
  [1, "Hasyakyla Utami Kusumawardhani",           [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0], "T/haskyla_utami.jpg"],
  [1, "Jinan Safa Safira",           [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], "T/jinan_safa_safira.jpg"],
  [1, "Melati Putri Rahel Sesilia",      [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], "T/melati_putri_rahel.jpg"],
  [1, "Nabila Fitriana",           [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0], "T/nabila_fitriana.jpg"],
  [1, "Puti Nadhira Azalia",           [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0], "T/puti_nadhira.jpg"],
  [1, "Rinanda Syahputri",           [0,0,1,0,0,0,0,0,0,0,0,1,0,0,0], "T/rinanda.jpg"],
  [1, "Sonia Natalia",           [0,0,1,0,0,0,1,0,0,0,0,0,0,0,0], "T/sonia_natalia.jpg"],
  [1, "Syahfira Angela Nurhaliza",      [0,0,1,0,0,0,0,0,1,0,0,0,0,0,0], "T/syahfira_angela_nurhaliza.jpg"],
  [1, "Tan Zhi Hui Celine",           [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0], "T/tan_zhi_hui_celine.jpg"],
  [1, "Thalia Ivanka Elizabeth Frederik",           [0,0,1,0,0,0,0,1,0,0,0,0,0,0,0], "T/thalia_ivanka_elizabeth.jpg"],
  
  [1, "Aiko Harumi",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/Aiko_Harumi.jpg"],
  [1, "Amaninah Afiqah",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/amaninah_afiqah.jpg"],
  [1, "Amira Fatin",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/amira_fatin.jpg"],
  [1, "Cindy Nugroho",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/cindy_nugroho.jpg"],
  [1, "Cornelia Vanisa",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/cornelia_vanisa.jpg"],
  [1, "Devytha Maharani",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/devytha_maharani.jpg"],
  [1, "Dhea Angelia",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/Dhea_Angelia.jpg"],
  [1, "Eriena Kartika",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/eriena.jpg"],
  [1, "Febi Komaril",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/Febi.jpg"],
  [1, "Febrina Diponegoro",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/febrina.jpg"],
  [1, "Febriola Sinambela",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/febriola_sinambela.jpg"],
  [1, "Fiony Alveria Tantri",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/fiony.jpg"],
  [1, "Flora Shafiq",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/flora.jpg"],
  [1, "Freyana Shifa Jayawardhana",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/freija.jpg"],
  [1, "Gabriella Stevany H.",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/gabriella_vany.jpg"],
  [1, "Jessica Chandra",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/Jessica_chandra.jpg"],
  [1, "Jesslyn Callista",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/Jesslyn_callista.jpg"],
  [1, "Keisya Ramadhani",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/keisya.jpg"],
  [1, "Lulu Salsabila",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/lululululu.jpg"],
  [1, "Pamela Krysanthe",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/pamela.jpg"],
  [1, "Nyimas Ratu Rafa",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/ratu.jpg"],
  [1, "Reva Adriana",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/reva_p.jpg"],
  [1, "Reva Fidela",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/reva_f.jpg"],
  [1, "Salma Annisa",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/salma_p.jpg"],
  [1, "Shalza Grasita",           [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], "AcademyA/shalza.jpg"],
  [1, "Umega Maulana Sinambela",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/umega.jpg"],
  [1, "Viona Fadrin",           [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0], "AcademyA/vivi.jpg"],
  [1, "Zahra Nur",           [0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], "AcademyA/zahra.jpg"],
  
  [1, "Allisa Astri",           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "grads/allisa_astri.jpg"],
  [1, "Allisa Galliamova",           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "grads/mova.jpg"],
  [1, "Cleopatra",           [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "grads/cleo.jpg"],
];
