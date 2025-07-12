
@extends('layout')


@section('head')

    <title>@yield('title', 'Admin panel')</title>

    <!-- Scripts -->
    @yield('script')

    <!-- Fonts -->
    @yield('fonts')
    @vite('resources/assets/admin/style/index.sass')

    <!-- Styles -->
    @yield('style')

@endsection

@section('body')

    @yield('container')

@endsection

