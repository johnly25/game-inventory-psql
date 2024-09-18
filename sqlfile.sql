--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: johnny
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.companies OWNER TO johnny;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: johnny
--

ALTER TABLE public.companies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: consoles; Type: TABLE; Schema: public; Owner: johnny
--

CREATE TABLE public.consoles (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.consoles OWNER TO johnny;

--
-- Name: consoles_id_seq; Type: SEQUENCE; Schema: public; Owner: johnny
--

ALTER TABLE public.consoles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.consoles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: games; Type: TABLE; Schema: public; Owner: johnny
--

CREATE TABLE public.games (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    imageurl text,
    consoleid integer,
    companyid integer
);


ALTER TABLE public.games OWNER TO johnny;

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: johnny
--

ALTER TABLE public.games ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.games_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: johnny
--

COPY public.companies (id, name) FROM stdin;
1	Nintendo
2	SEGA
\.


--
-- Data for Name: consoles; Type: TABLE DATA; Schema: public; Owner: johnny
--

COPY public.consoles (id, name) FROM stdin;
1	Nintendo Switch
2	Nintendo 3DS
3	SEGA
4	SEGA
5	PC
6	PlayStation 1
7	Nintendo Switch 2
\.


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: johnny
--

COPY public.games (id, title, description, imageurl, consoleid, companyid) FROM stdin;
5	Fire Emblem Fates: Conquest	\N	https://m.media-amazon.com/images/I/71WLosVgUAL._AC_UF1000,1000_QL80_.jpg	2	1
6	Fire Emblem Fates: Birthright	\N	https://m.media-amazon.com/images/I/71lqKauVJ2L.jpg	2	1
7	Fire Emblem Fates: Special Edition	\N	https://assets2.ignimgs.com/2015/08/03/fire-emblem-fates-button-03jpg-434ea3.jpg	2	1
8	Fire Emblem Fates: Revelation	\N	https://i.redd.it/fal7kp5aoni81.jpg	2	1
10	Yakuza	\N	https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/638970/capsule_616x353.jpg?t=1717075546	\N	\N
14	Yakuza 1	\N	https://upload.wikimedia.org/wikipedia/en/e/e4/Yakuza-sega.jpg	6	2
2	Fire Emblem: Three Houses	\N	https://m.media-amazon.com/images/I/817KFp1wiOL._AC_UF1000,1000_QL80_.jpg	7	1
3	Fire Emblem Warriors: Three Hopes	\N	https://m.media-amazon.com/images/I/81B09cs6pGL.jpg	7	1
4	Fire Emblem: Awakening	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSNA7KrxSnfDS50ZW4aTFPpVneKvztbZjtvA&s	2	1
1	Fire Emblem Engage	description is new	https://m.media-amazon.com/images/I/81JJ-9rB0vL._AC_UF1000,1000_QL80_.jpg	7	1
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: johnny
--

SELECT pg_catalog.setval('public.companies_id_seq', 2, true);


--
-- Name: consoles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: johnny
--

SELECT pg_catalog.setval('public.consoles_id_seq', 7, true);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: johnny
--

SELECT pg_catalog.setval('public.games_id_seq', 14, true);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: johnny
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: consoles consoles_pkey; Type: CONSTRAINT; Schema: public; Owner: johnny
--

ALTER TABLE ONLY public.consoles
    ADD CONSTRAINT consoles_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: johnny
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: games games_companyid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: johnny
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_companyid_fkey FOREIGN KEY (companyid) REFERENCES public.companies(id);


--
-- Name: games games_consoleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: johnny
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_consoleid_fkey FOREIGN KEY (consoleid) REFERENCES public.consoles(id);


--
-- PostgreSQL database dump complete
--

