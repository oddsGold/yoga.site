@extends('site/base')

@section('title', '500 Занадто багато запитів')

@section('content')

    <main class="error-page">

        <header class="header">
            @include('site.components.header')
        </header>

        <section class="error">
            <div class="container">
                <h1 class="h1 text-center">500</h1>
                <h3 class="text-center h3">Упс. На сайті виникла помилка.</h3>
                <h3 class="text-center h3">Спробуйте повторити запит, трохи пізніше.</h3>
            </div>
        </section>
    </main>

@endsection
