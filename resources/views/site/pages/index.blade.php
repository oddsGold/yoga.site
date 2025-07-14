@extends('site/base')

@section('title', 'Yoga з Марією Саванчук')
@section('description', 'Yoga з Марією Саванчук')


@section('style')

@endsection

@section('content')

    <main class="index-page">
        <section class="main position-relative overflow-hidden">
            <picture class="position-absolute top-0 start-0 w-100 h-100">
                <!-- Десктоп: якщо ширина ≥ 992px -->
                <source
                    media="(min-width: 1024px)"
                    srcset="{{ Vite::image('main-bg-mb.jpg') }}"
                >

                <!-- Планшет: якщо ширина ≥ 768px -->
                <source
                    media="(min-width: 768px)"
                    srcset="{{ Vite::image('main-bg-mb.jpg') }}"
                >

                <!-- За замовчуванням (mobile-first) -->
                <img
                    src="{{ Vite::image('main-bg-mb.jpg') }}"
                    alt="фон"
                    class="w-100 h-100"
                    style="object-fit: cover;"
                >
            </picture>

            <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark" style="opacity: .4;"></div>

            <div class="position-relative">
                <div class="main-name">
                    <span class="line-arrow"></span>
                    <p>Марія Саванчук</p>
                    <span class="line-arrow line-arrow--reverse"></span>
                </div>
                <div class="container">
                    <p class="main-info">7-ми денний онлайн курс</p>
                    <div class="main-title">
                        <h1 class="text-end">
                            <span class="d-block text-start">З МАРІЄЮ</span>
                            САВАНЧУК
                        </h1>
                    </div>
                    <div class="main-access">
                        <p class="main-access-info">Доступ на 2 місяці</p>
                    </div>
                    <div class="main-additional-text">
                        <p>Сім струн душі</p>
                        <p>ЙОГА АРОМАТИ ЧАКРИ</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="start">
            <div class="container">
                <button class="btn btn-base" data-bs-toggle="modal" data-bs-target="#get-presentation">Старт</button>
            </div>
        </section>

        <section class="slider">
            <div class="container">
                <div class="slider-row">
                    <a href="#worth" class="active">
                        Для кого?
                        <div class="divider">
                            <span class="romb"></span>
                        </div>
                    </a>
                    <a href="#get">
                        Що ти отримаєш?
                        <div class="divider">
                            <span class="romb"></span>
                        </div>
                    </a>
                    <a href="#biography">
                        Хто створив курс?
                        <div class="divider">
                            <span class="romb"></span>
                        </div>
                    </a>
                    <a href="#program">
                        Програма
                        <div class="divider">
                            <span class="romb"></span>
                        </div>
                    </a>
                    <a href="#how">
                        Як проходитиме навчання?
                        <div class="divider">
                            <span class="romb"></span>
                        </div>
                    </a>
                    <a href="#faq">
                        Часті запитання
                        <div class="divider">
                            <span class="romb"></span>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <section class="gallery gallery-first gallery-second">
            <div class="container">
                <div class="grid-gallery">
                    <div class="item item-1">
                        <img src="{{ Vite::image('gallery-second-img-1.png') }}" alt="">
                    </div>
                    <div class="item item-2">
                        <img src="{{ Vite::image('gallery-second-img-2.png') }}" alt="">
                    </div>
                    <div class="item item-3">
                        <img src="{{ Vite::image('gallery-second-img-3.png') }}" alt="">
                    </div>
                    <div class="item item-4">
                        <img src="{{ Vite::image('gallery-second-img-4.png') }}" alt="">
                    </div>
                </div>
            </div>
        </section>

        <section class="strings-soul">
            <div class="container">
                <div class="strings-soul-title">
                    <h2>
                        Сім струн душі. Йога, аромати й чакри, що пробуджують твою силу
                    </h2>
                </div>
                <div class="strings-soul-description">
                    <p>
                        Тіло. Дихання. Аромат. 7 практик, що пробуджують енергію, гармонізують розум і ведуть тебе до
                        внутрішньої сили та простору свободи
                    </p>
                </div>
                <div class="strings-soul-btn">
                    <button class="btn btn-base" data-bs-toggle="modal" data-bs-target="#get-presentation">Старт
                    </button>
                </div>
            </div>
        </section>

        @if(!empty($worth))
            <section class="worth" id="worth">
            <div class="worth-bg">
                <div class="worth-title">
                    <h2>
                        Тобі варто пройти цей курс, якщо:
                    </h2>
                </div>
                <ul class="worth-list">
                    @foreach($worth as $item)
                        <li>
                            <span></span>
                            {{ $item->description }}
                        </li>
                    @endforeach
                </ul>
            </div>
        </section>
        @endif

        <section class="for-you">
            <div class="container">
                <div class="for-you-text">
                    <p>
                        <span class="diamond-divider">
                            <span class="diamond-divider__line"></span>
                            <span class="diamond-divider__diamond"></span>
                        </span>
                        <span class="for-you-text-desc">
                            Цей курс — для тебе, якщо ти хочеш не просто технік, а відчуття, що ти знову жива, відчуваєш, дихаєш, звучиш.
                        </span>
                    </p>
                </div>
            </div>
        </section>

        @if(!empty($benefits))
            <section class="get" id="get">
            <div class="container">
                <div class="get-title">
                    <h2>
                        Що ти отримаєш на курсі «Сім струн душі»
                    </h2>
                    <p>
                        Це не просто йога. І не просто аромати. Це 7 практик, що відкривають тебе — чакра за чакрою.
                    </p>
                </div>
                <div class="get-list">
                    <ul>
                        @foreach($benefits as $benefit)
                            <li>
                                <span></span>
                                {{ $benefit->description }}
                            </li>
                        @endforeach
                    </ul>
                    <button class="btn btn-base" data-bs-toggle="modal" data-bs-target="#get-presentation">Старт
                    </button>
                </div>
            </div>
        </section>
        @endif

        <section class="tool">
            <div class="container">
                <p>
                    <span class="diamond-divider">
                        <span class="diamond-divider__line"></span>
                        <span class="diamond-divider__diamond"></span>
                    </span>
                    <span class="for-you-text-desc">
                        Це твій персональний інструмент, щоб знімати напругу, наповнюватись, повертати тілу гнучкість, а душі — ясність. І все це ти проходиш у власному темпі — з глибоким диханням і м’яким настроєм.
                    </span>
                </p>
            </div>
        </section>

        @if(!empty($author))
            <section class="biography" id="biography">
            <div class="biography-bg">
                <div class="biography-title">
                    <h2>
                        {{ $author->title }}
                    </h2>
                </div>
                <div class="biography-photo">
                    <picture class="w-100 h-100">
                        <!-- Десктоп: якщо ширина ≥ 992px -->
                        @isset($author->desktopPreview)
                            <source
                                media="(min-width: 1024px)"
                                srcset="{{ $author->desktopPreview->path }}/{{  $author->desktopPreview->name }}"
                            >
                        @endisset

                        <!-- Планшет: якщо ширина ≥ 768px -->
                        @isset($author->tabletPreview)
                            <source
                                media="(min-width: 768px)"
                                srcset="{{ $author->tabletPreview->path }}/{{  $author->tabletPreview->name }}"
                            >
                        @endisset

                        <!-- За замовчуванням (mobile-first) -->
                        @isset($author->mobilePreview)
                            <img
                                src="{{ $author->mobilePreview->path }}/{{  $author->mobilePreview->name }}"
                                alt="фон"
                                class="w-100 h-100"
                                style="object-fit: cover;"
                            >
                        @else
                            <!-- Fallback якщо немає мобільного зображення -->
                            <img
                                src="{{ Vite::image('default-image.jpg') }}"
                                alt="фон"
                                class="w-100 h-100"
                                style="object-fit: cover;"
                            >
                        @endisset
                    </picture>
                </div>
                <div class="biography-description">
                    {!! $author->description !!}
                </div>
            </div>
        </section>
        @endif

        <section class="experience for-you">
            <div class="container">
                <div class="for-you-text">
                    <p>
                        <span class="diamond-divider">
                            <span class="diamond-divider__line"></span>
                            <span class="diamond-divider__diamond"></span>
                        </span>
                        <span class="for-you-text-desc">
                            Цей курс — це мій досвід, серце і намір, передані тобі з турботою. Щоб ти могла доторкнутися до себе — справжньої. Вільної. Наповненої.
                        </span>
                    </p>
                </div>
            </div>
        </section>

        @if(!empty($program))
            <section class="program" id="program">
                <div class="container">
                    <div class="program-title">
                        <p>Програма курсу:</p>
                        <h2>
                            7 чакр — 7 енергій —
                            7 кроків до себе
                        </h2>
                    </div>
                    <div class="program-row" id="programRow">
                        @foreach($program as $item)
                            <div class="program-row-step">
                                <div class="program-steps-title">
                                    <h3>
                                        {{ $item->title }}
                                    </h3>
                                </div>
                                <div class="program-steps-description">
                                    <p>
                                        {{ $item->description }}
                                    </p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="program-btn">
                        <button class="btn btn-base" data-bs-toggle="modal" data-bs-target="#get-presentation">Старт
                        </button>
                    </div>
                </div>
            </section>
        @endif

        <section class="lesson for-you">
            <div class="container">
                <div class="for-you-text">
                    <p>
                        <span class="diamond-divider">
                            <span class="diamond-divider__line"></span>
                            <span class="diamond-divider__diamond"></span>
                        </span>
                        <span class="for-you-text-desc">
                            Кожне заняття — не просто практика, а тілесний міст до нової якості життя.
                        </span>
                    </p>
                </div>
            </div>
        </section>

        @if(!empty($learning))
            <section class="how" id="how">
            <div class="container">
                <div class="how-title">
                    <h2>
                        Як проходитиме навчання
                    </h2>
                    <p>
                        У тебе буде свій простір сили — тихий, затишний, тільки для тебе.
                    </p>
                </div>
                <div class="how-steps">
                    @foreach($learning as $item)
                        <div class="how-steps-row">
                            <span>{{ $item->title }}</span>
                            <p>
                                {{ $item->description }}
                            </p>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
        @endif

        <section class="waiting">
            <picture class="position-absolute top-0 start-0 w-100 h-100">
                <!-- Десктоп: якщо ширина ≥ 992px -->
                <source
                    media="(min-width: 1024px)"
                    srcset="{{ Vite::image('waiting-bg-mob.png') }}"
                >

                <!-- Планшет: якщо ширина ≥ 768px -->
                <source
                    media="(min-width: 768px)"
                    srcset="{{ Vite::image('waiting-bg-mob.png') }}"
                >

                <!-- За замовчуванням (mobile-first) -->
                <img
                    src="{{ Vite::image('waiting-bg-mob.png') }}"
                    alt="фон"
                    class="w-100 h-100 waiting-bg"
                    style="object-fit: cover;"
                >
            </picture>

            <div class="waiting-list">
                <div class="container">
                    <div class="waiting-list-bg">
                        <div class="waiting-title">
                            <h2>
                                У кожному уроці тебе чекає:
                            </h2>
                        </div>
                        <ul class="custom-list">
                            <li>
                                практика йоги з акцентом на певну зону тіла;
                            </li>
                            <li>
                                дихальна вправа для очищення й наповнення
                            </li>
                            <li>
                                ароматерапевтична підказка (яке масло підсилює цей стан і чому)
                            </li>
                            <li>
                                медитація або коротке занурення в енергію чакри
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </section>

        <section class="access">
            <div class="container">
                <div class="access-row">
                    <div class="access-row-item">
                        <div class="access-row-item-title">
                            <h3>
                                Доступ до курсу — 2 місяці
                            </h3>
                        </div>
                        <div class="access-row-item-text">
                            <p>
                                Цього більш ніж достатньо, щоб пройти курс, повернутись до улюблених практик і вплести
                                їх у свій ритм життя.
                            </p>
                        </div>
                    </div>

                    <div class="access-row-item">
                        <div class="access-row-item-title">
                            <h3>
                                І головне — все вже готове.
                            </h3>
                        </div>
                        <div class="access-row-item-text">
                            <p>
                                Тобі не треба нічого шукати, планувати, придумувати. Просто відкриваєш урок, стелиш
                                килимок — і занурюєшся в себе.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="gallery gallery-second">
            <div class="container">
                <div class="grid-gallery">
                    <div class="item item-1">
                        <img src="{{ Vite::image('gallery-second-img-1.png') }}" alt="">
                    </div>
                    <div class="item item-2">
                        <img src="{{ Vite::image('gallery-second-img-2.png') }}" alt="">
                    </div>
                    <div class="item item-3">
                        <img src="{{ Vite::image('gallery-second-img-3.png') }}" alt="">
                    </div>
                    <div class="item item-4">
                        <img src="{{ Vite::image('gallery-second-img-4.png') }}" alt="">
                    </div>
                </div>
            </div>
        </section>

        <section class="faq" id="faq"></section>

        <section class="ready worth">
            <div class="worth-bg">
                <div class="worth-title">
                    <h2>
                        Готова увімкнути свою внутрішню силу?
                    </h2>
                </div>
                <div class="ready-description">
                    <p>
                        Твоя енергія — це не загадка. Це система, з якою можна працювати. І ти вже на порозі змін.
                    </p>
                    <p>
                        <b>Бонус:</b> медитація "Активація всіх чакр". Коротка ранкова практика, яка допоможе
                        налаштувати енергію на день.
                    </p>
                </div>
                <div class="ready-btn">
                    <button class="btn btn-base" data-bs-toggle="modal" data-bs-target="#get-presentation">Старт
                    </button>
                </div>
            </div>
        </section>

        <section class="f-menu main">
            <div class="main-name">
                <span class="line-arrow"></span>
                <p>Марія Саванчук</p>
                <span class="line-arrow line-arrow--reverse"></span>
            </div>
            <div class="f-menu-links">
                <ul>
                    <li>
                        <a href="#worth">Для кого?</a>
                    </li>
                    <li>
                        <a href="#get">Що ти отримаєш?</a>
                    </li>
                    <li>
                        <a href="#biography">Хто створив курс?</a>
                    </li>
                    <li>
                        <a href="#program">Програма</a>
                    </li>
                    <li>
                        <a href="#how">Як проходитиме навчання?</a>
                    </li>
                    <li>
                        <a href="#faq">Часті запитання</a>
                    </li>
                </ul>
            </div>

            @if(!empty($socialLinks))
                <div class="f-menu-social">
                    @if($socialLinks->facebook)
                        <a href="{{ $socialLinks->facebook }}">
                            <img src="{{ Vite::image('social/facebook.svg') }}" alt="">
                        </a>
                    @endif
                    @if($socialLinks->instagram)
                        <a href="{{ $socialLinks->instagram }}">
                            <img src="{{ Vite::image('social/instagram.svg') }}" alt="">
                        </a>
                    @endif
                    @if($socialLinks->tik_tok)
                        <a href="{{ $socialLinks->tik_tok }}">
                            <img src="{{ Vite::image('social/tik.svg') }}" alt="">
                        </a>
                    @endif
                    @if($socialLinks->you_tube)
                        <a href="{{ $socialLinks->you_tube }}">
                            <img src="{{ Vite::image('social/you-tube.svg') }}" alt="">
                        </a>
                    @endif
                    @if($socialLinks->telegram)
                        <a href="{{ $socialLinks->telegram }}">
                            <img src="{{ Vite::image('social/telegram.svg') }}" alt="">
                        </a>
                    @endif
                </div>
            @endif
        </section>
    </main>

    <footer>
        <div class="footer-row">
            <img src="{{ Vite::image('footer-img-1.png') }}" alt="">
            <img src="{{ Vite::image('footer-img-2.png') }}" alt="">
            <img src="{{ Vite::image('footer-img-3.png') }}" alt="">
            <img src="{{ Vite::image('footer-img-4.png') }}" alt="">
            <img src="{{ Vite::image('footer-img-5.png') }}" alt="">
            <img src="{{ Vite::image('footer-img-6.png') }}" alt="">
        </div>
    </footer>

    <div class="modal fade get-presentation" id="get-presentation" tabindex="-1" aria-labelledby="get-presentation"
         aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="row justify-content-center">
                        <div class="col-lg-9 col-md-12">
                            <div class="message">
                                Заповніть форму та отримайте доступ до курсу "Сім струн душі. Йога, аромати й чакри, що
                                пробуджують твою силу"
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-9 col-md-12">
                            <div id="presentation-modal-form-root" data-v-app="">
                                <div class="presentation-form" id="presentation-root"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection


@section('script-body')
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const slider = document.querySelector('.slider');
            const sliderRow = document.querySelector('.slider-row');
            const links = Array.from(sliderRow.querySelectorAll('a'));
            const sections = links.map(link => document.querySelector(link.getAttribute('href')));
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            let isSticky = false;
            let sliderOriginalOffset = slider.offsetTop; // Запам'ятовуємо початкову позицію

            const isDesktop = window.matchMedia('(min-width: 320px)').matches;

            const scrollToActiveLink = (activeLink) => {
                const containerWidth = sliderRow.offsetWidth;
                const linkLeft = activeLink.offsetLeft;
                const linkWidth = activeLink.offsetWidth;

                const scrollPosition = linkLeft - (containerWidth / 2) + (linkWidth / 2);

                sliderRow.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            };

            const setupMobileSlider = () => {
                sliderRow.style.overflowX = 'auto';
                sliderRow.style.justifyContent = 'flex-start';

                const checkActiveElement = () => {
                    const sliderRect = sliderRow.getBoundingClientRect();
                    let found = false;

                    links.forEach(a => {
                        if (found) return;
                        const r = a.getBoundingClientRect();
                        const visible = Math.min(r.right, sliderRect.right) - Math.max(r.left, sliderRect.left);
                        if (visible > r.width * 0.5) {
                            links.forEach(x => x.classList.remove('active'));
                            a.classList.add('active');
                            found = true;
                        }
                    });
                };

                sliderRow.addEventListener('scroll', checkActiveElement);
                checkActiveElement();
            };

            const setupDesktopSticky = () => {
                const handleScroll = () => {
                    const scrollY = window.scrollY || window.pageYOffset;
                    const sliderRect = slider.getBoundingClientRect();
                    const shouldStick = sliderRect.top <= headerHeight;
                    const shouldUnstick = scrollY <= sliderOriginalOffset - headerHeight;

                    if (shouldStick && !isSticky) {
                        slider.classList.add('sticky');
                        isSticky = true;
                    } else if ((!shouldStick || shouldUnstick) && isSticky) {
                        slider.classList.remove('sticky');
                        isSticky = false;
                    }
                };

                const setActiveLink = () => {
                    let closestSection = null;
                    let smallestDistance = Infinity;
                    const offset = headerHeight + 20;

                    sections.forEach(section => {
                        if (!section) return;
                        const rect = section.getBoundingClientRect();

                        const distance = Math.abs(rect.top - offset);

                        if (rect.top <= offset && rect.bottom >= 0) {
                            if (distance < smallestDistance) {
                                smallestDistance = distance;
                                closestSection = section;
                            }
                        }
                    });

                    if (closestSection) {
                        links.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${closestSection.id}`) {
                                link.classList.add('active');
                                scrollToActiveLink(link); // Плавний скрол до пункту (якщо треба)
                            }
                        });
                    }
                };

                window.addEventListener('scroll', () => {
                    handleScroll();
                    if (isSticky) setActiveLink();
                });
                handleScroll();
            };

            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        if (!isDesktop) {
                            links.forEach(a => a.classList.remove('active'));
                            link.classList.add('active');
                            scrollToActiveLink(link);
                        }
                    }
                });
            });

            if (isDesktop) {
                setupDesktopSticky();
            } else {
                setupMobileSlider();
            }

            window.addEventListener('resize', () => {
                sliderOriginalOffset = slider.offsetTop;
                const newIsDesktop = window.matchMedia('(min-width: 768px)').matches;
                if (newIsDesktop !== isDesktop) {
                    location.reload();
                }
            });
        });
    </script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const programRow = document.querySelector('.program-row');
            const steps = document.querySelectorAll('.program-row-step');

            const line = document.createElement('div');
            line.className = 'program-line';
            programRow.prepend(line);

            const updateElements = () => {
                document.querySelectorAll('.diamond').forEach(el => el.remove());

                if (steps.length === 0) return;

                const firstTitle = steps[0].querySelector('.program-steps-title');
                const lastTitle = steps[steps.length - 1].querySelector('.program-steps-title');

                const firstPos = firstTitle.getBoundingClientRect();
                const lastPos = lastTitle.getBoundingClientRect();
                const rowPos = programRow.getBoundingClientRect();

                const firstTop = firstPos.top - rowPos.top;
                const lastTop = lastPos.top - rowPos.top;

                line.style.top = `${firstTop + 4}px`;
                line.style.height = `${lastTop - firstTop}px`;

                steps.forEach(step => {
                    const title = step.querySelector('.program-steps-title');
                    const titlePos = title.getBoundingClientRect();
                    const diamondTop = titlePos.top - rowPos.top;

                    const diamond = document.createElement('div');
                    diamond.className = 'diamond';
                    diamond.style.top = `${diamondTop + 4}px`;
                    programRow.appendChild(diamond);
                });
            };

            const observer = new ResizeObserver(updateElements);
            observer.observe(programRow);
            steps.forEach(step => observer.observe(step));

            updateElements();

            window.addEventListener('scroll', updateElements);
        });
    </script>
@endsection
