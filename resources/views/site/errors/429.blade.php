@extends('site/base')

@section('title', '429 Занадто багато запитів')

@section('content')

    <main class="error-page">

        <header class="header">
            @include('site.components.header')
        </header>

        <section class="error">
            <div class="container">
                <h1 class="h1 text-center">429</h1>
                <h3 class="text-center h3">Занадто багато запитів.</h3>
                <h3 class="text-center h3">Зачекайте хвилинку та спробуйте ще.</h3>
            </div>
        </section>
    </main>

@endsection

