"use strict"

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i)
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i)
	},
	IOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i)
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i)
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i)
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.IOS() ||
			isMobile.Opera() ||
			isMobile.Windows())
	}
}


if (isMobile.any()) {
	document.body.classList.add("_touch")
	let menuArrows = document.querySelectorAll(".menu__arrow");
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			menuArrows[index].addEventListener("click", function () {
				menuArrows[index].parentElement.classList.toggle("_active")
			})
		}
	}
} else {
	document.body.classList.add("_pc")
}



//бургер
let menuIcon = document.querySelector(".menu__icon")
const menuBody = document.querySelector(".menu__body");
if (menuIcon) {
	menuIcon.addEventListener("click", function (e) {
		document.body.classList.toggle("_lock")//добавляем класс чтобы не скролился контент за шапкой
		menuBody.classList.toggle("_active")
		menuIcon.classList.toggle("_active")
	})
}


//прокрутка

let menuLinks = document.querySelectorAll(".menu__link[data-goto]") //искать все классы menu__link с атрибутом data-goto
if (menuLinks.length > 0) {
	menuLinks.forEach(elem => {
		elem.addEventListener("click", function onMenuLinkClick(e) {
			let menuLink = e.target
			if (document.querySelector(menuLink.dataset.goto)) {
				let gotoBlock = document.querySelector(menuLink.dataset.goto)
				let gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector(".header").offsetHeight

				if (menuIcon.classList.contains("_active")) {
					document.body.classList.remove("_lock")
					menuBody.classList.remove("_active")
					menuIcon.classList.remove("_active")
				}

				window.scrollTo(0, gotoBlockValue) // без e.preventDefault() работать не будет тк мы нажимаем на ссылку
				e.preventDefault()
			}
		})
	})
}


