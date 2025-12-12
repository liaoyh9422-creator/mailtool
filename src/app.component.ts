import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from './services/crypto.service';
import { RewardCategory, GeneratedOutput, Item } from './models/reward.model';

const specialItemsList: Item[] = [
  { id: 5, name: '特别金币箱子' }, { id: 8, name: '特别强化箱' }, { id: 9, name: '刺客时装' }, { id: 10, name: '恶魔时装' }, { id: 11, name: '黑猫时装' }, { id: 12, name: '吸血蝙蝠领养证' }, { id: 13, name: '暗黑狐狸领养证' }, { id: 14, name: '龙宝宝领养证' }, { id: 15, name: '猎人邀请函' }, { id: 16, name: '高级猎人邀请函' }, { id: 17, name: '最上级猎人邀请函' }, { id: 21, name: '里长名字变更卷' }, { id: 22, name: '猎人名字变更卷' }, { id: 23, name: '猎人外貌变更卷' }, { id: 24, name: '经验加成卷' }, { id: 26, name: '道具掉落加成卷' }, { id: 30, name: '限量时装套装' }, { id: 31, name: '暗黑狐狸情侣套装' }, { id: 33, name: '爆升卷套装' }, { id: 37, name: '随机加成道具' }, { id: 38, name: '奇怪的糖果' }, { id: 39, name: '爽快的气泡水' }, { id: 40, name: '酥脆的牛角包' }, { id: 41, name: '韩服时装' }, { id: 42, name: '超厉害的宝箱' }, { id: 43, name: '捡宝小猪召唤卷' }, { id: 45, name: '捡宝猫咪召唤卷' }, { id: 46, name: '英雄猎人邀请函' }, { id: 47, name: '随机性格变更书' }, { id: 50, name: '特级猎人邀请函' }, { id: 51, name: '超稀有猎人邀请函' }, { id: 70, name: '传说猎人邀请函' }, { id: 71, name: '守护天使时装' }, { id: 72, name: '白色制服时装' }, { id: 75, name: '剑斗士大师时装' }, { id: 76, name: '剑斗士时装' }, { id: 78, name: '捡宝龙召唤卷' }, { id: 79, name: '觉醒的结晶' }, { id: 82, name: '纳凉特辑时装' }, { id: 83, name: '厨师时装' }, { id: 84, name: '日本校服时装' }, { id: 85, name: '海滩时装' }, { id: 86, name: '活动礼物箱子' }, { id: 87, name: '装备回收卷' }, { id: 91, name: '万圣节时装' }, { id: 92, name: '南瓜精灵召唤卷' }, { id: 99, name: '圣诞老人时装' }, { id: 100, name: '鲁道夫时装' }, { id: 101, name: '南极企鹅召唤卷' }, { id: 102, name: '转职重置秘药' }, { id: 103, name: '模糊的觉醒石' }, { id: 104, name: '15强装备强化卷轴' }, { id: 105, name: '20强装备强化卷轴' }, { id: 106, name: '最上级品质卷轴' }, { id: 107, name: '剑斗士的代币碎片' }, { id: 108, name: '大师的代币碎片' }, { id: 109, name: '大天使的剑时装' }, { id: 110, name: '大天使的锤时装' }, { id: 111, name: '大天使的弓时装' }, { id: 112, name: '大天使的法杖时装' }, { id: 113, name: '胡萝卜武器时装' }, { id: 114, name: '冰棍武器时装' }, { id: 115, name: '海马武器时装' }, { id: 116, name: '糖棒武器时装' }, { id: 117, name: '蝴蝶翅膀时装' }, { id: 118, name: '魔鬼翅膀时装' }, { id: 119, name: '精灵翅膀时装' }, { id: 120, name: '庭院舞会时装' }, { id: 121, name: '武术家时装' }, { id: 122, name: '蛋糕时装' }, { id: 123, name: '小黑暗灵魂包' }, { id: 124, name: '大黑暗灵魂包' }, { id: 125, name: '特别的黑暗灵魂包' }, { id: 126, name: '小秘法书包' }, { id: 127, name: '大秘法书包' }, { id: 128, name: '特别的秘法书包' }, { id: 129, name: '古代的时装' }, { id: 130, name: '村长的宝箱' }, { id: 133, name: '每日特别机会' }, { id: 135, name: '自然力广告宝箱' }, { id: 137, name: '捡宝章鱼召唤卷' }, { id: 138, name: '红色制服时装' }, { id: 153, name: '小熊时装' }, { id: 155, name: '小丑鱼召唤卷' }, { id: 156, name: '假期时装' }, { id: 157, name: '恐怖的印章' }, { id: 158, name: '地狱的印章' }, { id: 159, name: '黑暗的印章' }, { id: 160, name: '欺瞒的印章' }, { id: 161, name: '黑暗之王的印章' }, { id: 162, name: '四大天王磨牙召唤券' }, { id: 164, name: '强力的属性清除卷轴' }, { id: 166, name: '风衣时装' }, { id: 167, name: '蓝色召唤卷' }, { id: 168, name: '加百利翅膀时装' }, { id: 169, name: '发光的硬币' }, { id: 171, name: '粉红兔时装' }, { id: 172, name: '生姜饼干时装' }, { id: 173, name: '西红柿时装' }, { id: 174, name: '菠萝时装' }, { id: 175, name: '花时装' }, { id: 176, name: '小朋友时装' }, { id: 177, name: '海贼时装' }, { id: 178, name: '牛仔时装' }, { id: 179, name: '粉红校服时装' }, { id: 180, name: '晚会时装' }, { id: 181, name: '北方之王时装' }, { id: 182, name: '力量之刃时装' }, { id: 183, name: '顶级武器时装' }, { id: 184, name: '小提琴武器时装' }, { id: 185, name: '力量之锤时装' }, { id: 186, name: '锤子武器时装' }, { id: 187, name: '电吉他武器时装' }, { id: 188, name: '力量之弓时装' }, { id: 189, name: '剪刀武器时装' }, { id: 190, name: '竖琴武器时装' }, { id: 191, name: '力量领主时装' }, { id: 192, name: '扳手武器时装' }, { id: 193, name: '麦克风武器时装' }, { id: 194, name: '捡宝章鱼召唤券' }, { id: 195, name: '捡宝猫头鹰召唤券' }, { id: 196, name: '学院校服时装' }, { id: 198, name: '假日时装' }, { id: 199, name: '雪人召唤券' }, { id: 200, name: '冬季礼服时装' }, { id: 201, name: '黄金守护天使的铠甲时装' }, { id: 202, name: '黄金守护天使的印章' }, { id: 203, name: '黄金守护天使的翅膀时装' }, { id: 204, name: '大天使的甲胄时装' }, { id: 205, name: '伙伴 : 金币小鸭' }, { id: 206, name: '伙伴 : 金币浣熊' }, { id: 207, name: '伙伴 : 金币小狗' }, { id: 209, name: '新年时装' }, { id: 210, name: '下级探险箱子' }, { id: 211, name: '中级探险箱子' }, { id: 212, name: '上级探险箱子' }, { id: 229, name: '黄金雕像' }, { id: 230, name: '特别的黄金雕像' }, { id: 233, name: '春天礼服时装' }, { id: 234, name: '红色蝴蝶召唤券' }, { id: 236, name: '广告省略券' }, { id: 237, name: '广告省略券箱子' }, { id: 238, name: '大广告省略券箱子' }, { id: 246, name: '守护者时装' }, { id: 247, name: '白金时装' }, { id: 249, name: '粉红游泳圈时装' }, { id: 250, name: '捡宝鲸鱼召唤卷' }, { id: 251, name: '超稀有 觉醒石' }, { id: 252, name: '英雄 觉醒石' }, { id: 253, name: '传说 觉醒石' }, { id: 254, name: '胜者的翅膀' }, { id: 263, name: '胜者的印章' }, { id: 269, name: '古代的特别技能书堆' }, { id: 277, name: '终极觉醒石' }, { id: 279, name: '伙伴 : 白虎' }, { id: 285, name: '秋季时尚时装' }, { id: 286, name: '王冠鹦鹉召唤卷' }, { id: 287, name: '乌列尔的甲胄时装' }, { id: 291, name: '南瓜魔法师时装' }, { id: 292, name: '小幽灵 伙伴召唤券' }, { id: 294, name: '年末派对时装' }, { id: 295, name: '铃铛 召唤券' }, { id: 297, name: '圣诞妖精时装' }, { id: 298, name: '征服者的剑时装' }, { id: 299, name: '征服者的锤时装' }, { id: 300, name: '征服者的弓时装' }, { id: 301, name: '征服者的拐杖时装' }, { id: 302, name: '征服者时装' }, { id: 303, name: '黑豹 伙伴召唤券' }, { id: 306, name: '黑虎时装' }, { id: 307, name: '黑虎 伙伴召唤券' }, { id: 309, name: '甜蜜糖果时装' }, { id: 310, name: '捡宝兔子召唤卷' }, { id: 311, name: '统治者的剑时装' }, { id: 312, name: '统治者的镰刀时装' }, { id: 313, name: '统治者的弓时装' }, { id: 314, name: '统治者的拐杖时装' }, { id: 315, name: '统治者时装' }, { id: 316, name: '棕色博美领养证' }, { id: 317, name: '黑猫领养证' }, { id: 320, name: '太初的印章' }, { id: 321, name: '神圣Ⅲ强装备强化卷轴' }, { id: 322, name: '神圣Ⅴ强装备强化卷轴' }, { id: 324, name: '小小魔像领养证' }, { id: 325, name: '黄色三剑客伙伴召唤券' }, { id: 332, name: '夏日航海时装' }, { id: 333, name: '多莉鱼召唤卷' }, { id: 336, name: '猛龙伙伴召唤券' }, { id: 353, name: '超级大师联赛时装' }, { id: 354, name: '超级大师的剑时装' }, { id: 355, name: '超级大师的锤子时装' }, { id: 356, name: '超级大师的弓时装' }, { id: 357, name: '超级大师的拐杖时装' }, { id: 358, name: '超级大师的翅膀时装' }, { id: 360, name: '蓝色孵化小龙召唤券' }, { id: 361, name: '战斗猛龙伙伴召唤券' }, { id: 362, name: '白雪兔子领养证' }, { id: 363, name: '属性清除次数重置券' }, { id: 367, name: '宇宙兔子时装' }, { id: 368, name: '飞鼠召唤券' }, { id: 372, name: '黑魔女时装' }, { id: 378, name: '小小死神伙伴召唤券' }, { id: 379, name: '魔女猫咪召唤券' }, { id: 383, name: '北极狐伙伴召唤券' }, { id: 384, name: '银喉长尾山雀召唤券' }, { id: 408, name: '鲁道夫伙伴召唤券' }, { id: 409, name: '圣诞企鹅召唤券' }, { id: 412, name: '筋肉兔子伙伴召唤券' }, { id: 413, name: '黑兔召唤券' }, { id: 415, name: '假期西装时装' }, { id: 416, name: '捡宝饼干召唤券' }, { id: 417, name: '黑色兔子时装' }, { id: 418, name: '捡宝白龙召唤券' }, { id: 420, name: '毒九头蛇奖励箱子' }, { id: 421, name: '巫妖领主奖励箱子' }, { id: 422, name: '毒九头蛇时装' }, { id: 423, name: '巫妖领主时装' }, { id: 427, name: '可可伙伴召唤券' }, { id: 432, name: '3周年纪念箱子' }, { id: 433, name: '紫色时装箱子' }, { id: 436, name: '猫女仆时装' }, { id: 437, name: '僵尸时装' }, { id: 438, name: '青蛙时装' }, { id: 439, name: '王子与公主时装' }, { id: 440, name: '睡衣时装' }, { id: 441, name: '大恶魔的剑时装' }, { id: 442, name: '大恶魔的锤时装' }, { id: 443, name: '大恶魔的弓时装' }, { id: 444, name: '大恶魔的拐杖时装' }, { id: 445, name: '香肠武器时装' }, { id: 446, name: '羊肋骨武器时装' }, { id: 447, name: '椒盐卷饼武器时装' }, { id: 448, name: '瑞士卷武器时装' }, { id: 449, name: '饭盒背包时装' }, { id: 450, name: '爱心气球时装' }, { id: 451, name: '医院点滴时装' }, { id: 452, name: '捡宝虎鲸召唤券' }, { id: 453, name: '捡宝企鹅召唤券' }, { id: 454, name: '黄腰太阳鸟召唤券' }, { id: 455, name: '水母召唤券' }, { id: 456, name: '捡宝蜜蜂召唤券' }, { id: 463, name: '春游时装' }, { id: 464, name: '樱花蝴蝶召唤券' }, { id: 474, name: '夏日假日时装' }, { id: 475, name: '捡宝小河豚召唤券' }, { id: 476, name: '冤魂的印章' }, { id: 477, name: '魔王城走廊钥匙' }, { id: 478, name: '挑战者的剑时装' }, { id: 479, name: '挑战者的锤时装' }, { id: 480, name: '挑战者的弓时装' }, { id: 481, name: '挑战者的拐杖时装' }, { id: 482, name: '挑战者时装' }, { id: 483, name: '光芒的翅膀' }, { id: 484, name: '冤魂火翅膀' }, { id: 489, name: '超级大师的印章' }, { id: 497, name: '泰迪熊伙伴召唤券' }, { id: 498, name: '捡宝月兔召唤券' }, { id: 502, name: '橡子时装' }, { id: 503, name: '捡宝松鼠召唤券' }, { id: 504, name: '拉斐尔的甲胄时装' }, { id: 507, name: '猫咪死神伙伴召唤券' }, { id: 508, name: '村长的秘密箱子' }, { id: 510, name: '混沌的龙翅膀时装' }, { id: 511, name: '霜翅膀时装' }, { id: 512, name: '梦色翅膀时装' }, { id: 513, name: '橙色睡衣时装' }, { id: 514, name: '蜜蜂时装' }, { id: 515, name: '老式校服时装' }, { id: 516, name: '可爱的剑时装' }, { id: 517, name: '可爱的锤时装' }, { id: 518, name: '可爱的弓时装' }, { id: 519, name: '可爱魔法棍时装' }, { id: 520, name: '叉子武器时装' }, { id: 521, name: '鲷鱼烧武器时装' }, { id: 522, name: '鲜虾武器时装' }, { id: 523, name: '棉花糖武器时装' }, { id: 524, name: '幽灵气球时装' }, { id: 525, name: '南瓜气球时装' }, { id: 526, name: '冬季贵族时装' }, { id: 529, name: '灰色魔王翅膀时装' }, { id: 530, name: '深红色魔王翅膀时装' }, { id: 531, name: '深红色魔王印章' }, { id: 533, name: '圣诞猫时装' }, { id: 534, name: '捡宝礼物箱子召唤券' }, { id: 537, name: '白色驯鹿伙伴召唤券' }, { id: 538, name: '捡宝雪花召唤券' }, { id: 544, name: '青龙时装' }, { id: 547, name: '守护的翅膀时装' }, { id: 548, name: '生日派对时装' }, { id: 555, name: '青龙剑时装' }, { id: 556, name: '青龙锤时装' }, { id: 557, name: '青龙弓时装' }, { id: 558, name: '青龙领主时装' }, { id: 559, name: '捡宝青龙召唤券' }, { id: 562, name: '捡宝粉企召唤券' }, { id: 569, name: '薰衣草野餐时装' }, { id: 570, name: '捡寳仓鼠召唤券' }, { id: 583, name: '发光的蛋' }, { id: 585, name: '灵魂结晶' }, { id: 586, name: '平凡的成长石' }, { id: 587, name: '发光的成长石' }, { id: 588, name: '灿烂的成长石' }, { id: 590, name: '黄色小鸭时装' }, { id: 591, name: '捡宝黄色小鸭召唤券' }, { id: 595, name: '雪人王奖励箱子' }, { id: 596, name: '熔岩龙奖励箱子' }, { id: 597, name: '小雪人伙伴召唤券' }, { id: 598, name: '熔岩伙伴召唤券' }, { id: 599, name: '冰冻兔召唤券' }, { id: 600, name: '龙蛋召唤券' }, { id: 601, name: '雪人王时装' }, { id: 602, name: '熔岩龙时装' }, { id: 604, name: '休闲蓝色时装' }, { id: 605, name: '捡宝丝带熊召唤券' }, { id: 609, name: '小鸡篮子时装' }, { id: 610, name: '捡宝柿子召唤券' }, { id: 615, name: '蜡烛伙伴召唤券' }, { id: 616, name: '捡宝神奇可可召唤券' }, { id: 619, name: '恐怖糖剑时装' }, { id: 620, name: '南瓜锤时装' }, { id: 621, name: '蝙蝠弓时装' }, { id: 622, name: '扫帚拐杖时' }, { id: 628, name: '华丽派对时装' }, { id: 629, name: '捡宝杯子蛋糕召唤券' }, { id: 632, name: '冬季雪橇伙伴召唤券' }, { id: 633, name: '捡宝松果召唤券' }, { id: 651, name: '月之刃时装' }, { id: 652, name: '月之锤时装' }, { id: 653, name: '月之弓时装' }, { id: 654, name: '月之杖时装' }, { id: 655, name: '捡宝日出召唤券' }, { id: 660, name: '青蛇礼服时装' }, { id: 661, name: '特别猎人外貌变更券' }, { id: 662, name: '5周年纪念箱' }, { id: 664, name: '5周年派对气球时装' }, { id: 665, name: '5周年派对时装' }, { id: 667, name: '小鸡雨衣时装' }, { id: 670, name: '堕落飞船票券' }, { id: 671, name: '下级骑宠装备箱' }, { id: 672, name: '中级骑宠装备箱' }, { id: 673, name: '上级骑宠装备箱' }, { id: 674, name: '平凡的魔法石' }, { id: 675, name: '闪耀的魔法石' }, { id: 676, name: '璀璨的魔法石' }, { id: 678, name: '春季庆典时装' }, { id: 679, name: '捡宝曼德拉草召唤卷' }, { id: 680, name: '尊贵翅膀时装' }, { id: 681, name: '尊贵时装' }, { id: 691, name: '柴犬伙伴召唤券' }, { id: 692, name: '捡宝来只狗召唤券' }, { id: 693, name: '武器的刻印' }, { id: 694, name: '项链的刻印' }, { id: 695, name: '戒指的刻印' }, { id: 696, name: '帽子的刻印' }, { id: 697, name: '盔甲的刻印' }, { id: 698, name: '手套的刻印' }, { id: 699, name: '鞋子的刻印' }, { id: 700, name: '腰带的刻印' }, { id: 705, name: '紫色魔王翅膀时装' }, { id: 706, name: '紫色魔王印章' }, { id: 707, name: '猛毒装备材料包' }, { id: 708, name: '黑暗装备材料包' }, { id: 709, name: '冰河装备材料包' }, { id: 710, name: '烈焰装备材料包' }, { id: 711, name: '猎人转职活动箱' }, { id: 712, name: '猎人装备制作活动箱' }, { id: 713, name: '猎人装备强化活动箱' }, { id: 714, name: '原始碎片包' }, { id: 715, name: '太初碎片包' }, { id: 716, name: '混沌碎片包' }, { id: 718, name: '蓝色度假时装' }, { id: 719, name: '捡宝寄居蟹召唤券' }, { id: 720, name: '村长变更券' }, { id: 725, name: '全能VIP通行证30天' }, { id: 726, name: '宝石&EXP优惠30天' }, { id: 727, name: '副本&狩猎优惠30天' }, { id: 728, name: '装备&符文仓库优惠30天' }, { id: 729, name: '跳过广告优惠30天' }, { id: 730, name: '战斗奖励优惠30天' }, { id: 731, name: '猎人邀请优惠30天' }, { id: 742, name: '红龙召唤券' }, { id: 743, name: '利维坦伙伴召唤券' }, { id: 744, name: '橘狐领养证' }, { id: 748, name: '红龙召唤券' }, { id: 749, name: '利维坦伙伴召唤券' }, { id: 750, name: '橘狐领养证' }, { id: 751, name: '巨大黄金雕像' }, { id: 752, name: '皇家骑士时装' }, { id: 753, name: '皇家骑士剑时装' }, { id: 754, name: '皇家骑士锤时装' }, { id: 755, name: '皇家骑士弓时装' }, { id: 756, name: '皇家骑士杖时装' }, { id: 757, name: '皇家骑士翅膀时装' }, { id: 758, name: '皇家骑士印章' }, { id: 762, name: '全能VIP通行证3天' }, { id: 763, name: '宝石&EXP优惠3天' }, { id: 764, name: '副本&狩猎优惠3天' }, { id: 765, name: '装备&符文仓库优惠3天' }, { id: 766, name: '跳过广告优惠3天' }, { id: 767, name: '战斗奖励优惠3天' }, { id: 768, name: '猎人邀请优惠3天' }, { id: 770, name: '地狱使者时装' }, { id: 771, name: '捡宝夜猫头鹰召唤券' }, { id: 772, name: '地狱燕尾服时装' }, { id: 773, name: '地狱史莱姆召唤券' }, { id: 777, name: '官虎伙伴召唤券' }, { id: 783, name: '南瓜背包时装' }, { id: 784, name: '撿寶小熊軟糖召喚券' }, { id: 786, name: '万圣节捣蛋鬼时装' }, { id: 788, name: '冰角时装' }, { id: 789, name: '捡宝冰晶召唤券' }
];

const specialItemsMap = new Map(specialItemsList.map(item => [item.id, item.name]));
const commonSpecialItemIds = [9, 10, 11, 71, 72, 75, 76, 82, 83, 84, 85, 91, 99, 100, 120, 121, 122, 138, 153, 156, 166, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 196, 200, 201, 204, 233, 246, 247, 249, 285, 287, 291, 294, 297, 302, 306, 309, 315, 332, 353, 367, 372, 415, 417, 422, 423, 436, 437, 438, 439, 440, 463, 474, 482, 502, 504, 513, 514, 515, 526, 533, 544, 569, 590, 601, 602, 604, 628, 660, 678, 718, 752, 770, 109, 110, 111, 112, 113, 114, 115, 116, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 298, 299, 300, 301, 311, 312, 313, 314, 354, 355, 356, 357, 441, 442, 443, 444, 445, 446, 447, 448, 478, 479, 480, 481, 516, 517, 518, 519, 520, 521, 522, 523, 555, 556, 557, 558, 651, 652, 653, 654, 753, 754, 755, 756, 117, 118, 119, 203, 254, 358, 449, 450, 451, 483, 484, 510, 511, 512, 529, 530, 609, 705, 757, 157, 158, 159, 160, 161, 202, 255, 320, 476, 489, 531, 706, 758];
const commonSpecialItems = commonSpecialItemIds.map(id => ({ id, name: specialItemsMap.get(id) || 'Unknown Item' })).filter(item => item.name !== 'Unknown Item');


const INITIAL_REWARD_DATA: RewardCategory[] = [
  {
    type: 0,
    name: '0 (普通物品)',
    allowMultiple: true,
    items: [
      { id: 1, name: '麻布料' }, { id: 2, name: '羊毛布料' }, { id: 3, name: '丝绸布料' }, { id: 4, name: '魔法布料' }, { id: 5, name: '地狱布料' }, { id: 6, name: '粗皮料' }, { id: 7, name: '普通皮料' }, { id: 8, name: '柔软皮料' }, { id: 9, name: '高级皮料' }, { id: 10, name: '最高级皮料' }, { id: 11, name: '梧桐木块' }, { id: 12, name: '接骨木块' }, { id: 13, name: '星光木块' }, { id: 14, name: '黑夜木块' }, { id: 15, name: '绿山楂木块' }, { id: 16, name: '鋯石' }, { id: 17, name: '红宝石' }, { id: 18, name: '蓝宝石' }, { id: 19, name: '绿宝石' }, { id: 20, name: '钻石' }, { id: 21, name: '青铜矿石' }, { id: 22, name: '锡矿石' }, { id: 23, name: '铁矿石' }, { id: 24, name: '秘银矿石' }, { id: 25, name: '鈦矿石' }, { id: 26, name: '银' }, { id: 27, name: '真银' }, { id: 28, name: '金' }, { id: 29, name: '白金' }, { id: 30, name: '纯金' }, { id: 31, name: '凤凰羽翼' }, { id: 32, name: '小狼人毛' }, { id: 33, name: '小狼人精髓' }, { id: 34, name: '狼人毛' }, { id: 35, name: '狼人精髓' }, { id: 36, name: '狼人队长毛' }, { id: 37, name: '狼人队长精髓' }, { id: 38, name: '疯狂狼人毛' }, { id: 39, name: '疯狂狼人精髓' }, { id: 40, name: '狂暴狼人毛' }, { id: 41, name: '狂暴狼人精髓' }, { id: 42, name: '小半兽人牙' }, { id: 43, name: '小半兽人精髓' }, { id: 44, name: '半兽人牙' }, { id: 45, name: '半兽人精髓' }, { id: 46, name: '莫西干半兽人牙' }, { id: 47, name: '莫西干半兽人精髓' }, { id: 48, name: '红色战争部落半兽人牙' }, { id: 49, name: '红色战争部落半兽人精髓' }, { id: 50, name: '暗黑刀锋部落半兽人牙' }, { id: 51, name: '暗黑刀锋部落半兽人精髓' }, { id: 52, name: '瞎了的独眼巨人眼睛' }, { id: 53, name: '瞎了的独眼巨人精髓' }, { id: 54, name: '独眼巨人眼睛' }, { id: 55, name: '独眼巨人精髓' }, { id: 56, name: '眼神锐利的独眼巨人眼睛' }, { id: 57, name: '眼神锐利的独眼巨人精髓' }, { id: 58, name: '眼神悲伤的独眼巨人眼睛' }, { id: 59, name: '眼神悲伤的独眼巨人精髓' }, { id: 60, name: '眼神凶狠的独眼巨人眼睛' }, { id: 61, name: '眼神凶狠的独眼巨人精髓' }, { id: 62, name: '骷髏侦察兵骨块' }, { id: 63, name: '骷髏侦察兵精髓' }, { id: 64, name: '骷髏骨块' }, { id: 65, name: '骷髏精髓' }, { id: 66, name: '骷髏突袭兵骨块' }, { id: 67, name: '骷髏突袭兵精髓' }, { id: 68, name: '骷髏分队长骨块' }, { id: 69, name: '骷髏分队长精髓' }, { id: 70, name: '骷髏队长骨块' }, { id: 71, name: '骷髏队长精髓' }, { id: 72, name: '小半巫妖心臟' }, { id: 73, name: '小半巫妖' }, { id: 74, name: '半巫妖心臟' }, { id: 75, name: '半巫妖精髓' }, { id: 76, name: '老半巫妖心臟' }, { id: 77, name: '老半巫妖精髓' }, { id: 78, name: '充满魔力的半巫妖心臟' }, { id: 79, name: '充满魔力的半巫妖精髓' }, { id: 80, name: '千年半巫妖心臟' }, { id: 81, name: '千年半巫妖精髓' }, { id: 82, name: '拿著铜斧头的死神' }, { id: 83, name: '拿著铜斧头的死神精髓' }, { id: 84, name: '死神镰刀' }, { id: 85, name: '死神精髓' }, { id: 86, name: '拿著铁斧头的死神镰刀' }, { id: 87, name: '拿著铁斧头的死神精髓' }, { id: 88, name: '拿著银斧头的死神镰刀' }, { id: 89, name: '拿著银斧头的死神精髓' }, { id: 90, name: '拿著金斧头的死神镰刀' }, { id: 91, name: '拿著金斧头的死神精髓' }, { id: 92, name: '吸血鬼牙齿' }, { id: 93, name: '吸血鬼精髓' }, { id: 94, name: '吸血鬼男爵牙齿' }, { id: 95, name: '吸血鬼男爵精髓' }, { id: 96, name: '吸血鬼伯爵牙齿' }, { id: 97, name: '吸血鬼伯爵精髓' }, { id: 98, name: '吸血鬼公爵牙齿' }, { id: 99, name: '吸血鬼公爵精髓' }, { id: 100, name: '吸血鬼王牙齿' }, { id: 101, name: '吸血鬼王精髓' }, { id: 102, name: '魅魔翅膀' }, { id: 103, name: '魅魔精髓' }, { id: 104, name: '红髮魅魔翅膀' }, { id: 105, name: '红髮魅魔精髓' }, { id: 106, name: '蓝色魅魔翅膀' }, { id: 107, name: '蓝色魅魔精髓' }, { id: 108, name: '黄髮魅魔翅膀' }, { id: 109, name: '黄髮魅魔精髓' }, { id: 110, name: '血光翅膀魅魔翅膀' }, { id: 111, name: '血光翅膀魅魔精髓' }, { id: 112, name: '懒惰的恶魔角' }, { id: 113, name: '懒惰的恶魔精髓' }, { id: 114, name: '嫉妒心强的恶魔角' }, { id: 115, name: '嫉妒心强的恶魔精髓' }, { id: 116, name: '骄傲的恶魔角' }, { id: 117, name: '骄傲的恶魔精髓' }, { id: 118, name: '贪心的恶魔角' }, { id: 119, name: '贪心的恶魔精髓' }, { id: 120, name: '愤怒的恶魔角' }, { id: 121, name: '愤怒的恶魔精髓' }, { id: 122, name: '泰坦头盔碎片' }, { id: 123, name: '泰坦精髓' }, { id: 124, name: '巨型旁观者眼睛' }, { id: 125, name: '巨型旁观者精髓' }, { id: 126, name: '巴风特角' }, { id: 127, name: '巴风特精髓' }, { id: 128, name: '炎魔心臟' }, { id: 129, name: '炎魔精髓' }, { id: 130, name: '黑龙麟' }, { id: 131, name: '黑龙精髓' }, { id: 137, name: '光之石' }, { id: 138, name: '黑暗之石' }, { id: 139, name: '久远的魔法粉末' }, { id: 140, name: '魔法粉末' }, { id: 141, name: '贵重的魔法粉末' }, { id: 142, name: '稀有的魔法粉末' }, { id: 143, name: '古代魔法粉末' }, { id: 144, name: '吃剩的橙子' }, { id: 145, name: '熟大麦' }, { id: 146, name: '变质葡萄' }, { id: 147, name: '黏黏的液体' }, { id: 148, name: '被污染的水' }, { id: 149, name: '潮湿的面粉' }, { id: 150, name: '发霉的水果' }, { id: 151, name: '发霉的肉' }, { id: 152, name: '臭味番茄' }, { id: 153, name: '恶臭肉' }, { id: 154, name: '强化原石' }, { id: 155, name: '改良原石' }, { id: 156, name: '最低级强化石' }, { id: 157, name: '低级强化石' }, { id: 158, name: '中级强化石' }, { id: 159, name: '高级强化石' }, { id: 160, name: '最高级强化石' }, { id: 161, name: '最低级改良石' }, { id: 162, name: '低级改良石' }, { id: 163, name: '中级改良石' }, { id: 164, name: '高级改良石' }, { id: 165, name: '最高级改良石' }, { id: 166, name: '古代盔甲碎片' }, { id: 167, name: '古代手套碎片' }, { id: 168, name: '古代颈甲碎片' }, { id: 169, name: '古代武器碎片' }, { id: 170, name: '古代宝石碎片' }, { id: 171, name: '原始盔甲碎片' }, { id: 172, name: '原始手套碎片' }, { id: 173, name: '原始颈甲碎片' }, { id: 174, name: '原始武器碎片' }, { id: 175, name: '原始宝石碎片' }, { id: 176, name: '魔力精髓' }, { id: 177, name: '天使的眼泪' }, { id: 178, name: '希望之石' }, { id: 179, name: '月光木块' }, { id: 180, name: '精钢矿石' }, { id: 181, name: '发光布料' }, { id: 182, name: '发光皮料' }, { id: 183, name: '鈹镁晶石' }, { id: 184, name: '发光的魔法粉末' }, { id: 185, name: '吃剩的食物袋' }, { id: 186, name: '漏气的气泡水' }, { id: 187, name: '撕碎的毯子' }, { id: 188, name: '发光的盐' }, { id: 189, name: '符文粉' }, { id: 190, name: '魔王城传送门卷轴' }, { id: 191, name: '属性清除卷轴' }, { id: 192, name: '强化水晶 I' }, { id: 193, name: '神圣之石 I' }, { id: 194, name: '强化水晶 II' }, { id: 195, name: '神圣之石 II' }, { id: 196, name: '强化水晶 III' }, { id: 197, name: '神圣之石 III' }, { id: 198, name: '强化水晶 IV' }, { id: 199, name: '神圣之石 IV' }, { id: 200, name: '强化水晶 V' }, { id: 201, name: '神圣之石 V' }, { id: 202, name: '古代的毁灭者技能书' }, { id: 203, name: '古代的剑圣技能书' }, { id: 204, name: '古代的守护者技能书' }, { id: 205, name: '古代的审判官技能书' }, { id: 206, name: '古代的吟游诗人技能书' }, { id: 207, name: '古代的侦察兵技能书' }, { id: 208, name: '古代的魔咒师技能书' }, { id: 209, name: '古代的黑暗领主技能书' }, { id: 210, name: '古代的特别技能书' }, { id: 211, name: '毁灭者花纹碎片' }, { id: 212, name: '剑圣花纹碎片' }, { id: 213, name: '守护者花纹碎片' }, { id: 214, name: '审判官花纹碎片' }, { id: 215, name: '吟游诗人花纹碎片' }, { id: 216, name: '侦察兵花纹碎片' }, { id: 217, name: '魔咒师花纹碎片' }, { id: 218, name: '黑暗领主花纹碎片' }, { id: 219, name: '特别的花纹碎片' }, { id: 220, name: '古龙的成长石I' }, { id: 221, name: '古龙的成长石II' }, { id: 222, name: '古龙的成长石III' }, { id: 223, name: '古龙的成长石IV' }, { id: 224, name: '大恶魔的成长石I' }, { id: 225, name: '大恶魔的成长石II' }, { id: 226, name: '大恶魔的成长石III' }, { id: 227, name: '大恶魔的成长石IV' }, { id: 228, name: '美杜莎的成长石I' }, { id: 229, name: '美杜莎的成长石II' }, { id: 230, name: '美杜莎的成长石III' }, { id: 231, name: '美杜莎的成长石IV' }, { id: 232, name: '霜巨人的成长石I' }, { id: 233, name: '霜巨人的成长石II' }, { id: 234, name: '霜巨人的成长石III' }, { id: 235, name: '霜巨人的成长石IV' }, { id: 236, name: '精灵的成长石I' }, { id: 237, name: '精灵的成长石II' }, { id: 238, name: '精灵的成长石III' }, { id: 239, name: '精灵的成长石IV' }, { id: 240, name: '妖精的成长石I' }, { id: 241, name: '妖精的成长石II' }, { id: 242, name: '妖精的成长石III' }, { id: 243, name: '妖精的成长石IV' }, { id: 244, name: '地狱恶灵的成长石I' }, { id: 245, name: '地狱恶灵的成长石II' }, { id: 246, name: '地狱恶灵的成长石III' }, { id: 247, name: '地狱恶灵的成长石IV' }, { id: 248, name: '伊夫利特的成长石I' }, { id: 249, name: '伊夫利特的成长石II' }, { id: 250, name: '伊夫利特的成长石III' }, { id: 251, name: '伊夫利特的成长石IV' }, { id: 252, name: '冰虫的成长石I' }, { id: 253, name: '冰虫的成长石II' }, { id: 254, name: '冰虫的成长石III' }, { id: 255, name: '冰虫的成长石IV' }, { id: 256, name: '九头蛇的成长石I' }, { id: 257, name: '九头蛇的成长石II' }, { id: 258, name: '九头蛇的成长石III' }, { id: 259, name: '九头蛇的成长石IV' }, { id: 260, name: '利维坦的成长石I' }, { id: 261, name: '利维坦的成长石II' }, { id: 262, name: '利维坦的成长石III' }, { id: 263, name: '利维坦的成长石IV' }, { id: 264, name: '剑斗士的成长石' }, { id: 265, name: '玻璃' }, { id: 266, name: '布' }, { id: 267, name: '木材' }, { id: 268, name: '精铁' }, { id: 269, name: '砖头' }, { id: 270, name: '黏合剂' }, { id: 271, name: '绳子' }, { id: 272, name: '螺丝钉' }, { id: 273, name: '燃烧的熔岩石' }, { id: 274, name: '冰冻的雪花' }, { id: 275, name: '被污染的种子' }, { id: 276, name: '褪色的大理石' }, { id: 277, name: '青金石' }, { id: 278, name: '太初盔甲碎片' }, { id: 279, name: '太初手套碎片' }, { id: 280, name: '太初颈甲碎片' }, { id: 281, name: '蓝丝黛尔石' }, { id: 282, name: '日光木块' }, { id: 283, name: '金黄皮料' }, { id: 284, name: '甜甜的糖果' }, { id: 285, name: '泰坦硬币' }, { id: 286, name: '旁观者硬币' }, { id: 287, name: '巴风特硬币' }, { id: 288, name: '炎魔硬币' }, { id: 289, name: '黑龙硬币' }, { id: 290, name: '加百列的古代硬币' }, { id: 291, name: '加百列的原始硬币' }, { id: 292, name: '乌列尔的太初硬币' }, { id: 293, name: '太初宝石碎片' }, { id: 294, name: '变石' }, { id: 295, name: '闪闪发光的神圣之石' }, { id: 296, name: '拐杖糖' }, { id: 297, name: '太初武器碎片' }, { id: 298, name: '日光纯金' }, { id: 299, name: '古代的破坏者技能书' }, { id: 300, name: '古代的施刑者技能书' }, { id: 301, name: '古代的特级弓手技能书' }, { id: 302, name: '古代的梦想家技能书' }, { id: 303, name: '破坏者花纹碎片' }, { id: 304, name: '施刑者花纹碎片' }, { id: 305, name: '特级弓手花纹碎片' }, { id: 306, name: '梦想家花纹碎片' }, { id: 307, name: '冠军成长石' }, { id: 308, name: '毒九头蛇的精髓' }, { id: 309, name: '巫妖领主的精髓' }, { id: 310, name: '克朗石' }, { id: 311, name: '混沌的木头碎片' }, { id: 312, name: '地狱恶魔皮革' }, { id: 313, name: '黑色钻石' }, { id: 314, name: '地狱火花纯金' }, { id: 315, name: '混沌的魔法粉末' }, { id: 316, name: '混沌的盔甲碎片' }, { id: 317, name: '混沌的手套碎片' }, { id: 318, name: '混沌的颈甲碎片' }, { id: 319, name: '混沌的宝石碎片' }, { id: 320, name: '混沌的武器碎片' }, { id: 321, name: '拉斐尔的混沌硬币' }, { id: 322, name: '混沌灵魂' }, { id: 323, name: '太初的暗黑卷轴' }, { id: 324, name: '混沌的暗黑卷轴' }, { id: 325, name: '雪人王的精髓' }, { id: 326, name: '熔岩龙的精髓' }, { id: 327, name: '超越的突破石' }, { id: 328, name: '剑皇徽章' }, { id: 329, name: '战斗指挥官徽章' }, { id: 330, name: '神圣骑士徽章' }, { id: 331, name: '大祭司徽章' }, { id: 332, name: '神射手徽章' }, { id: 333, name: '星射手徽章' }, { id: 334, name: '魔力领主徽章' }, { id: 335, name: '对立师徽章' }, { id: 336, name: '伟大英雄的徽章' }, { id: 337, name: '英雄的记忆碎片' }, { id: 338, name: '粉色丝光布' }, { id: 339, name: '马卡龙' }, { id: 340, name: '龙舌兰' }, { id: 341, name: '金色毯子' }, { id: 342, name: '胆矾' }, { id: 343, name: '深渊木块' }, { id: 344, name: '深渊恶魔皮革' }, { id: 345, name: '玫瑰榴石' }, { id: 346, name: '深渊火花纯金' }, { id: 347, name: '深渊魔法粉末' }, { id: 348, name: '深渊盔甲碎片' }, { id: 349, name: '深渊手套碎片' }, { id: 350, name: '深渊颈甲碎片' }, { id: 351, name: '深渊宝石碎片' }, { id: 352, name: '深渊武器碎片' }, { id: 353, name: '炽天使的深渊硬币' }, { id: 354, name: '深渊灵魂' }, { id: 355, name: '深渊暗黑卷轴' }, { id: 356, name: '角斗成长石' }
    ],
  },
  {
    type: 1,
    name: '1 (特殊道具)',
    allowMultiple: true,
    items: specialItemsList,
  },
  {
    type: 2,
    name: '2 (货币)',
    allowMultiple: false,
    items: [
      { id: 0, name: '宝石' },
      { id: 1, name: '自然之力' },
      { id: 2, name: '金币' },
    ],
  },
  {
    type: 3,
    name: '3 (常用特殊背包)',
    allowMultiple: true,
    items: commonSpecialItems
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class AppComponent {
  private cryptoService = inject(CryptoService);
  private nextMailId = 100000000;

  rewardData = signal<RewardCategory[]>(INITIAL_REWARD_DATA);

  selectedRewardType = signal<number>(this.rewardData()[0].type);
  selectedCategory = computed(() => this.rewardData().find(c => c.type === this.selectedRewardType()));
  
  selectedItems = signal<Set<number>>(new Set());
  
  // General quantity
  quantity = signal<number>(99999);
  quantityInput = signal<string>('99999');
  quantityError = signal<string | null>(null);

  // Specific quantity for common items (type 3)
  commonQuantity = signal<number>(6);
  commonQuantityInput = signal<string>('6');
  commonQuantityError = signal<string | null>(null);

  searchTerm = signal<string>('');
  
  generatedOutputs = signal<GeneratedOutput[]>([]);
  isLoading = signal<boolean>(false);
  toastMessage = signal<string | null>(null);

  filteredItems = computed<Item[]>(() => {
    const category = this.selectedCategory();
    const term = this.searchTerm().toLowerCase();
    if (!category) return [];
    if (!term) return category.items;

    return category.items.filter(item => 
      item.name.toLowerCase().includes(term) || String(item.id).includes(term)
    );
  });

  onTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRewardType.set(Number(selectElement.value));
    this.selectedItems.set(new Set()); // Reset selection
    this.searchTerm.set(''); // Reset search
  }

  onItemSelect(itemId: number, isChecked: boolean): void {
    this.selectedItems.update(currentSet => {
      const newSet = new Set(currentSet);
      if (isChecked) {
        if (!this.selectedCategory()?.allowMultiple) {
          newSet.clear();
        }
        newSet.add(itemId);
      } else {
        newSet.delete(itemId);
      }
      return newSet;
    });
  }
  
  onQuantityChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.quantityInput.set(value);

    if (value.trim() === '') {
      this.quantityError.set('数量必须是正整数。');
      return;
    }
    
    const num = Number(value);

    if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
      this.quantityError.set('数量必须是正整数。');
    } else {
      this.quantityError.set(null);
      this.quantity.set(num);
    }
  }

  onCommonQuantityChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.commonQuantityInput.set(value);

    if (value.trim() === '') {
      this.commonQuantityError.set('数量必须是 6 到 25 之间的整数。');
      return;
    }

    const num = Number(value);

    if (isNaN(num) || !Number.isInteger(num) || num < 6 || num > 25) {
      this.commonQuantityError.set('数量必须是 6 到 25 之间的整数。');
    } else {
      this.commonQuantityError.set(null);
      this.commonQuantity.set(num);
    }
  }

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  generateRewards(itemIds: number[], rewardType: number, quantity?: number): void {
    if (itemIds.length === 0) {
      return;
    }
    this.isLoading.set(true);

    // Use timeout to allow UI to update with loading state
    setTimeout(() => {
      const category = this.rewardData().find((c) => c.type === rewardType);
      if (!category) {
        this.isLoading.set(false);
        return;
      }

      const listItems: any[] = [];
      const startingMailId = this.nextMailId;
      const count = quantity ?? this.quantity();

      for (const itemId of itemIds) {
        const currentMailId = this.nextMailId;
        const expireTimestamp =
          Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

        listItems.push({
          reward: {
            rewardType: rewardType,
            num: itemId,
            count: count,
          },
          value1: '',
          value2: '',
          expire_at: String(expireTimestamp),
          id: currentMailId,
          title: 'sangsung_cn',
          content: '福利奖励',
        });
        this.nextMailId++;
      }

      const rewardPayload = {
        List: listItems,
        ResultCode: 0,
        ResultMsg: 'OK',
      };

      const jsonString = JSON.stringify(rewardPayload);
      const encryptedData = this.cryptoService.encrypt(jsonString);
      
      const finalOutput = [
        {
          data: encryptedData,
          ResultCode: 0,
          ResultMsg: 'OK',
        },
      ];

      let batchItemName = `批量奖励 (${itemIds.length} 项)`;
      if (itemIds.length === 1) {
        const itemName =
          category.items.find((i) => i.id === itemIds[0])?.name ||
          'Unknown Item';
        batchItemName = `${itemName}`;
      }

      const newOutput: GeneratedOutput = {
        id: startingMailId,
        itemName: batchItemName,
        text: JSON.stringify(finalOutput, null, 2),
        copied: false,
      };

      this.generatedOutputs.update((current) => [newOutput, ...current]);
      this.isLoading.set(false);
    }, 50);
  }

  handleGenerate(): void {
    this.generateRewards(Array.from(this.selectedItems()), this.selectedRewardType());
  }
  
  oneKeyAdd(type: number): void {
      const category = this.rewardData().find(c => c.type === type);
      if (category) {
          const allItemIds = category.items.map(item => item.id);
          if (type === 3) {
            this.generateRewards(allItemIds, type, this.commonQuantity());
          } else {
            this.generateRewards(allItemIds, type);
          }
      }
  }

  clearOutput(): void {
    this.generatedOutputs.set([]);
  }

  showToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3000);
  }

  copyToClipboard(output: GeneratedOutput): void {
    navigator.clipboard.writeText(output.text).then(() => {
      this.showToast('已复制到剪贴板!');
      this.generatedOutputs.update(outputs => outputs.map(o => 
          o.id === output.id ? { ...o, copied: true } : o
      ));
      setTimeout(() => {
           this.generatedOutputs.update(outputs => outputs.map(o => 
              o.id === output.id ? { ...o, copied: false } : o
          ));
      }, 2000);
    });
  }
}