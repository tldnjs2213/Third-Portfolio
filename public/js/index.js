/**************************** 컴마씌우기 ****************************/

let comma_func = (num) => {
	return (num = num.toLocaleString());
};

/**************************** 컴마지우기 ****************************/

let remove_comma = (num) => {
	return (num = parseInt(num.replace(',', '')));
};

/**************************** Sleep함수 ****************************/
function sleep(ms) {
	const wakeUpTime = Date.now() + ms;
	while (Date.now() < wakeUpTime) {}
}
/**************************** main_section ****************************/
let container_main = document.querySelector('.container_main');
let container_select = document.querySelector('.container_select');
let time_temp = true;
let main_func = (() => {
	let main_bg_count = [0, 1, 2];

	let change_main_bg = () => {
		main_bg_count.push(main_bg_count.shift());
		container_main.style.backgroundImage = 'url("../img/main_bg_' + main_bg_count[0] + '.jpg")';
	};

	setInterval(change_main_bg, 5000);

	container_main.addEventListener('click', () => {
		container_main.style.display = 'none';
		container_select.style.display = 'block';

		time_temp = true;
		timerOn = (countNum) => {
			timeMinus = () => {
				if (time_temp) countNum--;
				if (countNum < 1) {
					clearInterval(timeHome);
					location.href = './';
				}
				document.querySelector('.reset_count').innerHTML = countNum;
			};
			let timeHome = setInterval(timeMinus, 1000);
		};
		timerOn(Number(120));
	});
})();
/**************************** main section ****************************/
$.ajax({
	url: '/categories',
	dataType: 'json',
}).done(function (json) {
	console.log(json.categories);
	json.categories.forEach((category) => {
		$('#categories').append(`<li id="category-${category.id}">${category.name}</li>`);
	});

	let item_category = document.querySelectorAll('.menu_area > div');
	let header_banner = document.querySelector('.slide_box');
	let selected_underline = document.querySelector('.selected_underline');
	let underline_position = document.querySelectorAll('.header_nav li');

	underline_position.forEach((v, i) => {
		v.addEventListener('click', (e) => {
			if (e.target == underline_position[0]) {
				header_banner.style.left = '0';
				selected_underline.style.left = '0';
			} else if (e.target == underline_position[1]) {
				header_banner.style.left = '-700px';
				selected_underline.style.left = '140px';
			} else if (e.target == underline_position[2]) {
				header_banner.style.left = '-1400px';
				selected_underline.style.left = '280px';
			} else if (e.target == underline_position[3]) {
				header_banner.style.left = '-2100px';
				selected_underline.style.left = '420px';
			} else if (e.target == underline_position[4]) {
				header_banner.style.left = '-2800px';
				selected_underline.style.left = '560px';
			}
			underline_position.forEach((v) => v.classList.remove('selected'));
			item_category.forEach((v) => (v.style.display = 'none'));
			v.classList.add('selected');
			item_category[i].style.display = 'flex';
			console.log(i);
			switch (i) {
				case 0:
					make_type_food(1);
					break;
				case 1:
					make_type_food(2);
					break;
				case 2:
					make_type_food(3);
					break;
				case 3:
					make_type_food(4);
					break;
				case 4:
					make_type_food(5);
					break;
			}
		});
	});
});

let inner_right = document.querySelectorAll('.inner_right');

class Make_item_box {
	constructor(menu_box, img, name, price, this_obj, new_badge, fav_badge, category_id, classname) {
		this.menu_box = menu_box;
		this.img = img;
		this.name = name;
		this.price = Number(price);
		this.this_obj = this_obj;
		this.new_badge = new_badge;
		this.fav_badge = fav_badge;
		this.category_id = category_id;
		this.classname = classname;
	}

	make_box() {
		// BADGE 뿌리기
		let badge;
		if (this.new_badge) {
			badge = '<span class="new_badge">NEW</span>';
		} else if (this.fav_badge) {
			badge = '<span class="best_badge">BEST</span>';
		} else {
			badge = '';
		}
		this.menu_box.innerHTML += `<figure class ="category_id${this.category_id} item_box${this.classname}">
              <div class="img_box">
				        <img src="${this.img}"/>
              </div>
							<figcaption>
								<h4 class="this_item_name">${this.name}</h4>
								<span class="this_item_price">${comma_func(this.price)}</span>
							</figcaption>
              ${badge}
						</figure>`;
	}
}

let menu_box = document.querySelectorAll('.menu_box');
//let temp_item = [];
let option_array = [];
let check_item = '';
let v_index = '';
const make_type_food = (type) => {
	console.log('test');
	//menu_box[type-1].innerHTML = '';
	menu_box[0].innerHTML = '';
	menu_box[1].innerHTML = '';
	menu_box[2].innerHTML = '';
	menu_box[3].innerHTML = '';
	menu_box[4].innerHTML = '';
	$.ajax({
		url: `/categories/${type}`,
		dataType: 'json',
	}).done(function (data) {
		console.log(data);
		data.foods.forEach((food, index) => {
			new Make_item_box(
				menu_box[type - 1],
				`/img/${food.image}`,
				food.name,
				food.price,
				food,
				food.is_new,
				food.is_fav,
				food.category_id,
				eval(type * 100 + index)
				//index
			).make_box();
		});
		selectItem(type);
	});
};

make_type_food(1);

/*************************** 아이템 클릭시 ***************************/
let count = 0;

selectItem = (field) => {
	let option_design = document.querySelector('.option_design');
	//let item_box = document.querySelectorAll("[class *= item_box]");
	let item_box = null;
	let now_item;

	let all_option_list = document.querySelectorAll('.option_design > ul > li');
	let shot_option_list = document.querySelector('.option_design > ul > li:nth-child(2)');
	let sugar_option_list = document.querySelector('.option_design > ul > li:nth-child(4)');
	let takeout_option_list = document.querySelector('.option_design > ul > li:last-child');
	let order_product_name = document.querySelector('.product_name');
	let rgba_wrap = document.querySelector('.rgba_wrap');
	let option_price = document.querySelector('.option_price');
	let shot_option_price = 0;
	let size_option_price = 0;

	switch (field) {
		case 1:
			item_box = document.querySelectorAll(`.item_new > [class *= item_box]`);
			break;
		case 2:
			item_box = document.querySelectorAll(`.item_coffee > [class *= item_box]`);
			break;
		case 3:
			item_box = document.querySelectorAll(`.item_beverage > [class *= item_box]`);
			break;
		case 4:
			item_box = document.querySelectorAll(`.item_food > [class *= item_box]`);
			break;
		case 5:
			item_box = document.querySelectorAll(`.item_ice_cream > [class *= item_box]`);
			break;
	}
	console.log(item_box.length);
	console.log(item_box);

	item_box.forEach((v, i, a) => {
		v.addEventListener('click', () => {
			let class_check = v.getAttribute('class');
			console.log(class_check);
			console.log(class_check.substring(0, 12));

			now_item = v;
			check_item = now_item;
			console.log(now_item);

			ice_select.forEach((v, i, a) => {
				for (let i = 0; i < a.length; i++) {
					a[i].style.backgroundColor = 'transparent';
					a[i].style.color = '#fff';
				}
			});

			shot_select.forEach((v, i, a) => {
				for (let i = 0; i < a.length; i++) {
					a[i].style.backgroundColor = 'transparent';
					a[i].style.color = '#fff';
				}
			});

			size_select.forEach((v, i, a) => {
				for (let i = 0; i < a.length; i++) {
					a[i].style.backgroundColor = 'transparent';
					a[i].style.color = '#fff';
				}
			});

			sugar_select.forEach((v, i, a) => {
				for (let i = 0; i < a.length; i++) {
					a[i].style.backgroundColor = 'transparent';
					a[i].style.color = '#fff';
				}
			});

			cup_select.forEach((v, i, a) => {
				for (let i = 0; i < a.length; i++) {
					a[i].style.backgroundColor = 'transparent';
					a[i].style.color = '#fff';
				}
			});

			option_design.style.display = 'block'; // 옵션창뿌리기
			rgba_wrap.style.display = 'block';

			/* 현재메뉴이름 보여주기 */
			let temp_classname = now_item.className;
			let class_name = temp_classname.substring(13, temp_classname.length);
			let now_item_name = document.querySelector(`.${class_name} > figcaption > h4`);
			order_product_name.innerHTML = now_item_name.innerHTML;
			all_option_list.forEach((v) => (v.style.display = 'block'));
			time_temp = false;
			// let all_option_figure = document.querySelectorAll('.option_design > ul > li > .figure_box > figure');
			// let all_option_btn = document.querySelectorAll(
			// 	'.option_design > ul > li > .figure_box > figure > figcaption > button'
			// );
			// 카테고리에 따라 옵션 따로 넣어주자
			switch (class_check.substring(0, 12)) {
				case 'category_id2':
					ice_option = '';
					shot_option = '';
					size_option = '';
					sugar_option = '';
					cup_option = '';
					break;
				case 'category_id3':
					all_option_list.forEach((v) => (v.style.display = 'block'));
					shot_option_list.style.display = 'none';
					sugar_option_list.style.display = 'none';
					ice_option = '';
					shot_option = '없음';
					size_option = '';
					sugar_option = '없음';
					cup_option = '';
					break;
				case 'category_id4':
					all_option_list.forEach((v) => (v.style.display = 'none'));
					takeout_option_list.style.display = 'block';
					ice_option = '없음';
					shot_option = '없음';
					size_option = '없음';
					sugar_option = '없음';
					cup_option = '';
					break;
				case 'category_id5':
					all_option_list.forEach((v) => (v.style.display = 'none'));
					takeout_option_list.style.display = 'block';
					ice_option = '없음';
					shot_option = '없음';
					size_option = '없음';
					sugar_option = '없음';
					cup_option = '';
					break;
			}
			/* 현재옵션가격 */
			shot_option_price = 0;
			size_option_price = 0;
			option_price.innerHTML = comma_func(shot_option_price + size_option_price);

			// all_option_btn.forEach((v) => {
			// 	v.style.background = 'transparent';
			// 	v.style.color = '#fff';
			// });
			// all_option_figure.forEach((v, i) => {
			// 	v.addEventListener('click', () => {
			// 		// alert(1);
			// 		all_option_btn.forEach((v1, i1) => {
			// 			v1.style.backgroundColor = 'transparent';
			// 			v1.style.color = '#fff';
			// 			// console.log(v1);
			// 		});
			// 	});
			// });

			let option_design_scroll = document.querySelector('.option_design ul');
			option_design_scroll.scrollTop = 0;
		});
	});

	/*************************** 옵션창에서 놀거 ***************************/

	let ice_select = document.querySelectorAll(
		'.option_design > ul > li > .figure_box > figure > figcaption > .ice_select'
	);
	let shot_select = document.querySelectorAll(
		'.option_design > ul > li > .figure_box > figure > figcaption > .shot_select'
	);
	let size_select = document.querySelectorAll(
		'.option_design > ul > li > .figure_box > figure > figcaption > .size_select'
	);
	let sugar_select = document.querySelectorAll(
		'.option_design > ul > li > .figure_box > figure > figcaption > .sugar_select'
	);
	let cup_select = document.querySelectorAll(
		'.option_design > ul > li > .figure_box > figure > figcaption > .cup_select'
	);

	let ice_option = '';
	let shot_option = '';
	let size_option = '';
	let sugar_option = '';
	let cup_option = '';

	// 얼음 옵션 선택
	let all_option_figure_li1 = document.querySelectorAll('.option_design > ul > li:first-child > .figure_box > figure');
	all_option_figure_li1.forEach((v, i, a) => {
		v.addEventListener('click', () => {
			ice_select.forEach((v1, i1, a1) => {
				for (let i1 = 0; i1 < a1.length; i1++) {
					a1[i1].style.backgroundColor = 'transparent';
					a1[i1].style.color = '#fff';
				}
			});
			ice_select[i].style.backgroundColor = '#ffcc79';
			ice_select[i].style.color = '#403030';

			ice_option = ice_select[i].innerHTML;
		});
	});

	// 샷 옵션 선택
	let all_option_figure_li2 = document.querySelectorAll('.option_design > ul > li:nth-child(2) > .figure_box > figure');
	all_option_figure_li2.forEach((v, i, a) => {
		v.addEventListener('click', () => {
			shot_select.forEach((v1, i1, a1) => {
				for (let i1 = 0; i1 < a1.length; i1++) {
					a1[i1].style.backgroundColor = 'transparent';
					a1[i1].style.color = '#fff';
				}
			});
			shot_select[i].style.backgroundColor = '#ffcc79';
			shot_select[i].style.color = '#403030';
			// shot_option = v.innerHTML;

			shot_option = shot_select[i].innerHTML;
			// console.log(shot_option);

			switch (i) {
				case 0:
					shot_option_price = 0;
					break;
				case 1:
					shot_option_price = 500;
					break;
				case 2:
					shot_option_price = 1000;
					break;
			}
			option_price.innerHTML = comma_func(shot_option_price + size_option_price);
		});
	});

	// 사이즈 옵션 선택
	let all_option_figure_li3 = document.querySelectorAll('.option_design > ul > li:nth-child(3) > .figure_box > figure');
	all_option_figure_li3.forEach((v, i, a) => {
		v.addEventListener('click', () => {
			size_select.forEach((v1, i1, a1) => {
				for (let i1 = 0; i1 < a1.length; i1++) {
					a1[i1].style.backgroundColor = 'transparent';
					a1[i1].style.color = '#fff';
				}
			});
			size_select[i].style.backgroundColor = '#ffcc79';
			size_select[i].style.color = '#403030';
			// size_option = v.innerHTML;

			size_option = size_select[i].innerHTML;

			switch (i) {
				case 0:
					size_option_price = 0;
					break;
				case 1:
					size_option_price = 600;
					break;
			}
			option_price.innerHTML = comma_func(shot_option_price + size_option_price);
		});
	});

	// 당도 옵션 선택
	let all_option_figure_li4 = document.querySelectorAll('.option_design > ul > li:nth-child(4) > .figure_box > figure');
	all_option_figure_li4.forEach((v, i, a) => {
		v.addEventListener('click', () => {
			sugar_select.forEach((v1, i1, a1) => {
				for (let i1 = 0; i1 < a1.length; i1++) {
					a1[i1].style.backgroundColor = 'transparent';
					a1[i1].style.color = '#fff';
				}
			});
			sugar_select[i].style.backgroundColor = '#ffcc79';
			sugar_select[i].style.color = '#403030';

			sugar_option = sugar_select[i].innerHTML;
		});
	});

	// take-out 옵션 선택
	let all_option_figure_li5 = document.querySelectorAll('.option_design > ul > li:last-child > .figure_box > figure');
	all_option_figure_li5.forEach((v, i, a) => {
		v.addEventListener('click', () => {
			cup_select.forEach((v1, i1, a1) => {
				for (let i1 = 0; i1 < a1.length; i1++) {
					a1[i1].style.backgroundColor = 'transparent';
					a1[i1].style.color = '#fff';
				}
			});
			cup_select[i].style.backgroundColor = '#ffcc79';
			cup_select[i].style.color = '#403030';

			cup_option = cup_select[i].innerHTML;
		});
	});

	let option_footer_btn = document.querySelectorAll('.option_footer > button');
	option_footer_btn[0].addEventListener('click', () => {
		option_design.style.display = 'none'; // 옵션창 제거
		rgba_wrap.style.display = 'none';
		time_temp = true;
	});
	// 20220321 PMJ
	// let count = 0;
	// let coffee_item;
	let coffee_item_list;

	/*************************** 옵션담기 눌렀을때***************************/

	option_footer_btn[1].addEventListener('click', () => {
		// 옵션 선택안했을때 디폴트값
		if (ice_option == '') ice_option = '보통';
		if (shot_option == '') shot_option = '기본';
		if (size_option == '') size_option = '스탠다드';
		if (sugar_option == '') sugar_option = '보통';
		if (cup_option == '') cup_option = '매장';
		//
		time_temp = true;
		if (now_item != check_item) {
			console.log('different!');
			return;
		}

		console.log(shot_option);
		console.log();
		let little_array = [ice_option, shot_option, size_option, sugar_option, cup_option];
		option_array.push(little_array); // 현재 옵션담기
		//console.log(now_item);
		console.log(option_array); // 전체옵션 들어있음, 리스트 인덱스로 맞춰서 빼야됨
		//console.log(temp_item);
		option_design.style.display = 'none';
		rgba_wrap.style.display = 'none';
		// v_class_name.substring(11, v_class_name.length)
		let inform_box = document.querySelector('.coffee_list');
		let temp_classname = now_item.className;
		let classname = temp_classname.substring(13, temp_classname.length);
		//console.log(classname);
		let item_name = document.querySelector(`.${classname} > figcaption > .this_item_name`);
		let item_price = document.querySelector(`.${classname} > figcaption > .this_item_price`);

		let result_price = remove_comma(item_price.innerHTML) + remove_comma(option_price.innerHTML);

		if (item_name) {
			inform_box.innerHTML += `
      <li class="coffee_item${count}">
        <div class="item_title_box">
          <div class="item_name">${item_name.innerHTML}</div>
          <div class="item_option"><button>옵션</button></div>
        </div>
        <div class="item_btn_box">
          <div class="item_button"><i class="xi-caret-down-circle-o xi-x"></i></div>
          <div class="item_count">1</div>
          <div class="item_button"><i class="xi-caret-up-circle-o xi-x"></i></div>
        </div>
        <div class="item_money">${comma_func(result_price)}</div>
        <div class="item_button"><i class="xi-close-circle-o xi-x"></i></div>
      </li>`;
			// console.log(inform_box.innerHTML);
			/********************** menu & list scroll event **********************/

			let menu_area = document.querySelector('.menu_area');
			let pay_reset_btn = document.querySelector('.pay_reset_btn');
			if (!inform_box.innerHTML == '') {
				inform_box.style.height = '150px';
				menu_area.style.height = '464px';
				pay_reset_btn.style.display = 'flex';
			}

			let inform_box_li = document.querySelectorAll('.coffee_list li');
			// console.log(inform_box_li);
			menu_area.addEventListener('scroll', () => {
				if (!inform_box.innerHTML == '') {
					inform_box.style.height = '100px';
					menu_area.style.height = '514px';
					pay_reset_btn.style.display = 'flex';
				}
			});

			inform_box.addEventListener('scroll', () => {
				inform_box.style.height = '150px';
				menu_area.style.height = '464px';
				pay_reset_btn.style.display = 'flex';
			});

			pay_reset_btn.addEventListener('click', () => {
				inform_box.innerHTML = '';
				inform_box.style.height = '0';
				menu_area.style.height = '614px';
				pay_reset_btn.style.display = 'none';
				inner_right[0].innerHTML = '0';
				inner_right[1].innerHTML = '0';
				// option_array = [];
			});
			inner_right[0].innerHTML = Number(inner_right[0].innerHTML) + 1;
			let inner_right_money = remove_comma(inner_right[1].innerHTML);
			none_comma_result_money = inner_right_money + Number(result_price);
			inner_right[1].innerHTML = comma_func(none_comma_result_money);
			count++;
		}
		/*************************** 주문내역 가지고놀기***************************/

		coffee_item_list = document.querySelectorAll('[class *= coffee_item]');
		console.log(coffee_item_list);
		coffee_item_list.forEach((v, i, a) => {
			v.addEventListener('mouseover', () => {
				let now_coffee_list = v;
				let v_class_name = v.className;
				console.log(v_class_name);
				let v_index = Number(v_class_name.substring(11, v_class_name.length)); // 지금 주문리스트 인덱스
				// 20220321 PMJ
				// v_index = i;
				let inform_btn = document.querySelectorAll(`.${v_class_name} .item_button`);
				let item_count = document.querySelector(`.${v_class_name} > .item_btn_box > .item_count`);
				// let item_money = document.querySelector(`.${v_class_name} > .item_money`);
				let count_value = Number(item_count.innerHTML);
				let menu_area = document.querySelector('.menu_area');
				let inform_box = document.querySelector('.coffee_list');

				inform_btn[0].addEventListener('click', () => {
					if (item_count.innerHTML == 1) {
						item_count.innerHTML = 1;
					} else item_count.innerHTML = --count_value;
					change_count_money();
				});
				inform_btn[1].addEventListener('click', () => {
					item_count.innerHTML = ++count_value;
					change_count_money();
				});
				inform_btn[2].addEventListener('click', () => {
					console.log(now_coffee_list);
					console.log(v_index);
					now_coffee_list.remove();
					//option_array.splice(v_index, 1);
					//console.log(option_array);
					//console.log(now_coffee_list);
					//v_index = v_index-1;
					coffee_item_list = document.querySelectorAll('[class *= coffee_item]');
					change_count_money();
					if (inform_box.innerHTML == '') {
						inform_box.style.height = '0';
						menu_area.style.height = '614px';
						pay_reset_btn.style.display = 'none';
					}
				});

				let change_count_money = () => {
					let all_count = document.querySelectorAll('.item_count');
					let all_money = document.querySelectorAll('.item_money');
					let result_count = 0;
					let result_money = 0;
					all_count.forEach((v, i, a) => {
						let none_comma_money = remove_comma(all_money[i].innerHTML);
						result_count += Number(v.innerHTML);
						result_money += Number(v.innerHTML) * none_comma_money;
					});
					inner_right[0].innerHTML = result_count;
					inner_right[1].innerHTML = comma_func(result_money);
				};

				let item_option_btn = document.querySelector(`.${v_class_name} > .item_title_box > .item_option > button`);
				let option_show = document.querySelector(`.option_show`);

				/*************************** 리스트 옵션버튼 클릭할때***************************/
				item_option_btn.addEventListener('click', () => {
					option_show.style.opacity = 1;
					option_show.style.left = '150px';

					let option_check = document.querySelectorAll('.option_show > ul > li > .option_check');
					console.log(option_check);
					console.log(option_array);
					console.log(v_index);
					// if(option_list_num != ''){
					//   v_index = option_list_num;
					// console.log(v_index);
					// }
					option_check.forEach((v, i, a) => {
						//console.log(option_array);
						v.innerHTML = option_array[v_index][i];
						//console.log(v.innerHTML);
					});
				});

				item_option_btn.addEventListener('mouseout', () => {
					option_show.style.left = '-150px';
					option_show.style.opacity = 0;
				});
			});
		});
	});

	/*************************** 주문하기 버튼 클릭할때***************************/

	let order_button = document.querySelector('.pay_right_area');
	let container_order = document.querySelector('.container_order');
	let result_money = document.querySelector('.result_money');
	let sum_money = 0;
	let recipt_box_ul = document.querySelector('.order_list_receipt_text > ul');
	let inform_box = document.querySelector('.coffee_list');

	let order_list_box = document.querySelector('.order_list_box ul');

	coffee_item_list = document.querySelectorAll('[class *= coffee_item]');

	order_button.addEventListener('click', () => {
		if (!inform_box.innerHTML == '') {
			container_select.style.display = 'none';
			container_order.style.display = 'block';
			time_temp = false;
		} else if (inform_box.innerHTML == '') {
			container_select.style.display = 'block';
			container_order.style.display = 'none';
			time_temp = true;
		}

		// let order_list_box = document.querySelector('.order_list_box ul');
		sum_money = 0;

		console.log(coffee_item_list);
		// 220321 PMJ
		order_list_box.innerHTML = '';
		recipt_box_ul.innerHTML = '';

		coffee_item_list.forEach((v, i, a) => {
			let v_class_name = v.className;
			console.log(v_class_name);
			let v_index = Number(v_class_name.substring(11, v_class_name.length));
			// let index_number = i;
			// console.log(index_number);
			/* 옵션 없음이면 다지우고 새로 담아줌 */
			let result_option = [];
			// let a = result_option.join(', ');

			option_array[v_index].forEach((v, i, a) => {
				if (v != '없음') {
					result_option.push(v);
				}
			});
			let v_class_index = Number(v_class_name.substring(11, v_class_name.length));
			// let menu_name = document.querySelector(`.coffee_item${v_index} > .item_name`);
			let menu_name = document.querySelector(`.coffee_item${v_class_index} > .item_title_box > .item_name`);
			// let menu_count = document.querySelector(`.coffee_item${v_index} > .item_count`);
			let menu_count = document.querySelector(`.coffee_item${v_class_index} > .item_btn_box > .item_count`);
			let menu_money = document.querySelector(`.coffee_item${v_class_index} > .item_money`);
			let result_option_join = result_option.join(', ');

			let menu_cul_money = remove_comma(menu_money.innerHTML) * menu_count.innerHTML;
			menu_cul_money = comma_func(menu_cul_money);

			order_list_box.innerHTML += `
      <li>
        <div class="span_box"><span>${menu_name.innerHTML}</span><span>${menu_count.innerHTML}</span><span>${menu_cul_money}</span></div>
        <div class="order_list_option"> 옵션:  ${result_option_join}</div>
      </li>`;

			recipt_box_ul.innerHTML += `
      <li>
        <div class="span_box"><span>${menu_name.innerHTML}</span><span>${menu_count.innerHTML}</span><span>${menu_cul_money}</span></div>
        <div class="order_list_option"> 옵션:  ${result_option_join}</div>
      </li>`;

			let none_comma_money = remove_comma(menu_money.innerHTML);
			sum_money += none_comma_money * menu_count.innerHTML;
			console.log(sum_money);
			// console.log(i);
		});

		result_money.innerHTML = comma_func(sum_money);
	});

	let prev_btn = document.querySelector('.prev_btn');

	prev_btn.addEventListener('click', () => {
		container_order.style.display = 'none';
		container_select.style.display = 'block';
		recipt_box_ul.innerHTML = '';
		time_temp = true;
	});

	//주문내역박스 띄우는 함수
	let order_list_receipt_box_func = () => {
		let order_list_receipt_box = document.querySelector('.order_list_receipt_box');
		payment_box.style.display = 'none';
		order_list_receipt_box.style.display = 'block';
		let result_money2 = document.querySelector('.result_money2');
		let now_use_point2 = document.querySelector('.now_use_point2');
		let receive_point = document.querySelector('.receive_point');
		let save_point = document.querySelector('.save_point');
		let point_used_money = comma_func(sum_money - use_point);
		let receive_point_value;
		let temp_receive_point_value;
		now_use_point2.innerHTML = `${comma_func(use_point)}`;
		result_money2.innerHTML = point_used_money;

		//폰번호 11자리가 맞으면 적립 아니면 0원
		receive_point_value = coupon_array.length == 11 ? parseInt((sum_money - use_point) * 0.05) : 0;
		receive_point_value < 0 && (receive_point_value = 0);
		console.log(receive_point_value);
		console.log(use_point);
		if (temp_receive_point_value > receive_point_value) {
			receive_point_value = temp_receive_point_value;
		}

		let save_point_value = user_point - use_point + receive_point_value;
		receive_point.innerHTML = '&nbsp' + comma_func(receive_point_value);

		save_point.innerHTML = '&nbsp' + comma_func(save_point_value);
		console.log('test');
		console.log(coupon_array);
		sleep(3);
		fetch(`/users/order?phone=${phone_number}&point=${use_point}&save=${receive_point_value}`)
			.then((res) => res.json())
			.then((data) => console.log(data));

		temp_receive_point_value = receive_point_value;
	};
	//  카드결제페이지
	let pay_box = document.querySelectorAll('.pay_box');
	let point_save_box = document.querySelector('.point_save_box');
	let payment_box = document.querySelector('.payment_box');
	let previous_area = document.querySelector('.previous_btn');
	let add_point_btn_check = false;

	pay_box[0].addEventListener('click', () => {
		// 전화번호가 없을 경우
		if (phone_number.length < 11) {
			point_save_box.style.display = 'flex';
			rgba_wrap.style.display = 'block';

			let close_btn = document.querySelector('.btn_box > .close_btn');
			let add_point_btn = document.querySelector('.btn_box > .add_point_btn');
			// 포인트 입력을 하기 싫은 경우
			close_btn.addEventListener('click', () => {
				point_save_box.style.display = 'none';
				payment_box.style.display = 'block';
				let previous_btn = document.querySelectorAll('.previous_btn > .card_box_btn');
				previous_btn[0].addEventListener('click', () => {
					payment_box.style.display = 'none';
					rgba_wrap.style.display = 'none';
				});

				previous_btn[1].addEventListener('click', () => {
					let card_charge_img = document.querySelector('.card_charge_img');
					card_charge_img.style.animation = 'card 3s infinite';
					let text_box = document.querySelector('.charge_text > span');
					text_box.innerHTML = '"결제가 진행중입니다.<br>잠시만 기다려 주세요."';
					let small_charge_text = document.querySelector('.small_charge_text');
					small_charge_text.style.visibility = 'visible';
					previous_area.style.visibility = 'hidden';
					console.log('1');
					setTimeout(order_list_receipt_box_func, 3000);
				});
			});
			// 포인트 입력을 하고 싶은 경우
			add_point_btn.addEventListener('click', () => {
				point_save_box.style.display = 'none';
				rgba_wrap.style.display = 'block';
				coupon_array = [];
				number_visible.innerHTML = '';
				add_point_btn_check = true;

				use_point = 0;
				use_point_area.innerHTML = use_point;

				coupon_input_box.style.display = 'flex';

				let number_input_box = document.querySelector('.number_input_box');
				let test_number = document.querySelector('.test_number');

				number_input_box.addEventListener('mouseover', () => {
					test_number.style.visibility = 'visible';
				});

				number_input_box.addEventListener('mouseout', () => {
					test_number.style.visibility = 'hidden';
				});

				let select_btn = document.querySelectorAll('.coupon_input_box > .confirmation_box > .select_btn');
				let new_membership_box = document.querySelector('.new_membership_box');
				let identify_btn = document.querySelector('.identify_btn');
				// 포인트 적립을 하기 싫은 경우
				select_btn[0].addEventListener('click', () => {
					coupon_input_box.style.display = 'none';
					rgba_wrap.style.display = 'none';
				});
				// 포인트 적립을 하고 싶은 경우
				select_btn[1].addEventListener('click', () => {
					coupon_input_box.style.display = 'none';
					phone_number = phone_number.replace(/\-/g, '');
					point_detailed.style.display = 'flex';
					coupon_input_box.style.display = 'none';
					// 비동기로 폰 넘버를 보내 DB에 있는 폰 번호를 조회해 DB에 폰 번호가 있으면 포인트 값을 가져오고 1000보다 크면 잔여 포인트에 표시하고 1000보다 작으면 0으로 표시한다.
					$.ajax({
						type: 'GET',
						url: './users',
						data: { phone: phone_number },
						dataType: 'json',
					}).done(function (json) {
						console.log(json);
						for (let i in json) {
							user_point = json[i];
							$('.accumulation_point').html(`${comma_func(user_point)}`);
							if (user_point > 1000) {
								$('.residual_point').html(`${comma_func(user_point)}`);
							} else {
								$('.residual_point').html(`${user_point}`);
							}
						}
						console.log(user_point);
						// 신규회원
						if (user_point == 0) {
							new_membership_box.style.display = 'block';
						} else {
							coupon_input_box.style.display = 'none';
							// console.log("what?");
							// let previous_btn = document.querySelectorAll('.confirmation_box > .select_btn');
							// previous_btn[0].addEventListener('click', () => {
							// 	payment_box.style.display = 'none';
							// 	rgba_wrap.style.display = 'none';
							// });

							// previous_btn[1].addEventListener('click', () => {
							// 	payment_box.style.display = 'flex';
							// 	console.log(payment_box);
							// 	rgba_wrap.style.display = 'block';
							// 	let card_charge_img = document.querySelector('.card_charge_img');
							// 	card_charge_img.style.animation = 'card 3s infinite';
							// 	let text_box = document.querySelector('.charge_text > span');
							// 	text_box.innerHTML = '"결제가 진행중입니다.<br>잠시만 기다려 주세요."';
							// 	let small_charge_text = document.querySelector('.small_charge_text');
							// 	small_charge_text.style.visibility = 'visible';
							// 	previous_area.style.visibility = 'hidden';
							// 	console.log("2");
							// 	setTimeout(order_list_receipt_box_func, 3000);
							// });
						}
						identify_btn.addEventListener('click', () => {
							new_membership_box.style.display = 'none';
							point_detailed.style.display = 'none';
							rgba_wrap.style.display = 'none';
							payment_box.style.display = 'flex';
							console.log(payment_box);
							rgba_wrap.style.display = 'block';

							let previous_btn = document.querySelectorAll('.previous_btn > .card_box_btn');
							previous_btn[0].addEventListener('click', () => {
								payment_box.style.display = 'none';
								rgba_wrap.style.display = 'none';
							});

							previous_btn[1].addEventListener('click', () => {
								let card_charge_img = document.querySelector('.card_charge_img');
								card_charge_img.style.animation = 'card 3s infinite';
								let text_box = document.querySelector('.charge_text > span');
								text_box.innerHTML = '"결제가 진행중입니다.<br>잠시만 기다려 주세요."';
								let small_charge_text = document.querySelector('.small_charge_text');
								small_charge_text.style.visibility = 'visible';
								previous_area.style.visibility = 'hidden';
								console.log('3');
								setTimeout(order_list_receipt_box_func, 3000);
							});
						});
					});
				});
			});
		} else {
			payment_box.style.display = 'flex';
			rgba_wrap.style.display = 'block';

			let previous_btn = document.querySelectorAll('.previous_btn > .card_box_btn');
			previous_btn[0].addEventListener('click', () => {
				payment_box.style.display = 'none';
				rgba_wrap.style.display = 'none';
			});

			previous_btn[1].addEventListener('click', () => {
				let card_charge_img = document.querySelector('.card_charge_img');
				card_charge_img.style.animation = 'card 3s infinite';
				let text_box = document.querySelector('.charge_text > span');
				text_box.innerHTML = '"결제가 진행중입니다.<br>잠시만 기다려 주세요."';
				let small_charge_text = document.querySelector('.small_charge_text');
				small_charge_text.style.visibility = 'visible';
				previous_area.style.visibility = 'hidden';
				console.log('4');
				setTimeout(order_list_receipt_box_func, 3000);
			});
		}
	});

	let receipt_btn = document.querySelectorAll('.select_footer > button');
	let phone_number = '';
	// 포인트 결제 페이지
	let coupon_input_box = document.querySelector('.coupon_input_box');
	let point_detailed = document.querySelector('.point_detailed');
	let user_point = 0;
	//user_point = Number(user_point);
	let use_point = 0;
	let accumulation_point_area = document.querySelector('.accumulation_point'); //누적포인트공간
	let use_point_area = document.querySelector('.use_point'); // 사용할 포인트
	let residual_point = document.querySelector('.residual_point'); // 잔여 포인트
	let coupon_array = [];

	pay_box[1].addEventListener('click', () => {
		rgba_wrap.style.display = 'block';
		coupon_array = [];
		number_visible.innerHTML = '';

		use_point = 0;
		use_point_area.innerHTML = use_point;

		coupon_input_box.style.display = 'flex';

		let number_input_box = document.querySelector('.number_input_box');
		let test_number = document.querySelector('.test_number');

		number_input_box.addEventListener('mouseover', () => {
			test_number.style.visibility = 'visible';
		});

		number_input_box.addEventListener('mouseout', () => {
			test_number.style.visibility = 'hidden';
		});

		let select_btn = document.querySelectorAll('.coupon_input_box > .confirmation_box > .select_btn');
		let new_membership_box = document.querySelector('.new_membership_box');
		let identify_btn = document.querySelector('.identify_btn');

		select_btn[0].addEventListener('click', () => {
			coupon_input_box.style.display = 'none';
			rgba_wrap.style.display = 'none';
		});
		select_btn[1].addEventListener('click', () => {
			coupon_input_box.style.display = 'none';
			phone_number = phone_number.replace(/\-/g, '');
			point_detailed.style.display = 'flex';
			coupon_input_box.style.display = 'none';

			$.ajax({
				type: 'GET',
				url: './users',
				data: { phone: phone_number },
				dataType: 'json',
			}).done(function (json) {
				console.log(json);
				for (let i in json) {
					user_point = json[i];
					$('.accumulation_point').html(`${comma_func(user_point)}`);
					if (user_point > 1000) {
						$('.residual_point').html(`${comma_func(user_point)}`);
					} else {
						$('.residual_point').html(`${user_point}`);
					}
				}
				console.log(user_point);
				// 신규회원
				if (user_point == 0) {
					new_membership_box.style.display = 'block';
				} else {
					// phone_number = phone_number.replace(/\-/g, '');
					// point_detailed.style.display = 'flex';
					coupon_input_box.style.display = 'none';
				}
				identify_btn.addEventListener('click', () => {
					new_membership_box.style.display = 'none';
					point_detailed.style.display = 'none';
					rgba_wrap.style.display = 'none';
				});
			});
		});
	});

	let number_btn = document.querySelectorAll('.number_input_box > div');
	let number_visible = document.querySelector('.number_visible');

	number_btn.forEach((v, i, a) => {
		if (i < 9) {
			v.addEventListener('click', () => {
				if (coupon_array.length < 11) {
					coupon_array.push(i + 1);
				}
				input_coupon_array();
			});
		} else if (i == 9) {
			v.addEventListener('click', () => {
				if (coupon_array.length < 1) {
					coupon_array.push(0, 1, 0);
				}
				input_coupon_array();
			});
		} else if (i == 10) {
			v.addEventListener('click', () => {
				if (coupon_array.length < 11) {
					coupon_array.push(0);
				}
				input_coupon_array();
			});
		} else if (i == 11) {
			v.addEventListener('click', () => {
				coupon_array.pop();
				input_coupon_array();
			});
		}
	});

	let input_coupon_array = () => {
		let array_text = '';
		coupon_array.forEach((v, i, a) => {
			if (i == 3) {
				array_text += '-';
			} else if (i == 7) {
				array_text += '-';
			}
			array_text += v;
		});
		// console.log(array_text);
		number_visible.innerHTML = array_text;
		// console.log(coupon_array);
		//number_visible.innerHTML = array_text;
		phone_number = array_text;
	};

	//accumulation_point_area.innerHTML = comma_func(user_point);
	use_point_area.innerHTML = comma_func(use_point);
	residual_point.innerHTML = comma_func(user_point - use_point);

	let point_display = document.querySelector('.point_display'); // 포인트사용 박스
	let point_minus_btn = document.querySelector('.point_minus_btn');
	let point_plus_btn = document.querySelector('.point_plus_btn');

	point_minus_btn.addEventListener('click', () => {
		//포인트 마이너스버튼
		use_point = use_point - 1000 >= 0 ? use_point - 1000 : 0;
		accumulation_point_area.innerHTML = comma_func(user_point);
		use_point_area.innerHTML = comma_func(use_point);
		residual_point.innerHTML = comma_func(user_point - use_point);
	});

	point_plus_btn.addEventListener('click', () => {
		// 포인트 플러스 버튼
		console.log(point_plus_btn);
		//use_point = use_point + 1000 <= user_point ? use_point + 1000 : user_point; //잔여액 안넘어감
		use_point = user_point < 1000 ? user_point : use_point;
		use_point = use_point + 1000 <= user_point ? use_point + 1000 : use_point; //잔여액 안넘어감
		use_point = use_point > sum_money ? sum_money : use_point; //결제총금액 안넘어감
		accumulation_point_area.innerHTML = comma_func(user_point);
		use_point_area.innerHTML = comma_func(use_point);
		residual_point.innerHTML = comma_func(user_point - use_point);
	});

	let point_use_btn = document.querySelectorAll('.point_detailed > .confirmation_box > .select_btn');

	point_use_btn[1].addEventListener('click', () => {
		// alert(1);
		// 사용하기버튼 클릭시
		if (sum_money == 0) {
			return;
		} else {
			rgba_wrap.style.display = 'none';
			let now_use_point = document.querySelector('.now_use_point');
			now_use_point.innerHTML = `${comma_func(use_point)}`;

			let point_used_money = comma_func(sum_money - use_point);
			result_money.innerHTML = point_used_money;

			coupon_input_box.style.display = 'none';
			point_detailed.style.display = 'none';
			point_display.style.visibility = 'visible';
			console.log(sum_money);
			if (sum_money == use_point) order_list_receipt_box_func();
		}
	});

	point_use_btn[0].addEventListener('click', () => {
		coupon_input_box.style.display = 'none';
		point_detailed.style.display = 'none';
		rgba_wrap.style.display = 'none';
	});
	// 영수증 출력 예 아니오
	const print_receipt = () => {
		// let answer_area = document.querySelectorAll('.answer_area');
		let answer_question = document.querySelector('.answer_question');
		let answer_box = document.querySelectorAll('.answer_box');
		let answer_btn_area = document.querySelector('.answer_btn_area');
		let order_list_area = document.querySelector('.order_list_area');
		let list_height = document.querySelector('.order_list_receipt_text ul');

		answer_box[0].addEventListener('click', () => {
			location.reload();
		});
		answer_box[1].addEventListener('click', () => {
			// answer_area.forEach((v, i, a) => {
			// 	v.style.display = 'none';
			// 	answer_btn_area.style.display = 'none';
			// });
			answer_question.style.display = 'none';
			answer_btn_area.style.display = 'none';
			order_list_area.style.height = '85%';
			list_height.style.height = '500px';
			window.print();
			location.reload();
		});
	};
	print_receipt();
};
